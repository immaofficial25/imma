import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getCourseById } from "@/lib/courses";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";

export const runtime = "nodejs";

function parseRupeesAmount(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return NaN;
  const numeric = value.replace(/[^0-9.]/g, "");
  return Number(numeric);
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const courseId = body?.courseId;
    const referralNumberRaw = body?.referralNumber;
    const name = body?.name;
    const phone = body?.phone;

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const course = getCourseById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const amountRupees = parseRupeesAmount(course.price);
    if (!Number.isFinite(amountRupees) || amountRupees <= 0) {
      return NextResponse.json({ error: "Invalid course price" }, { status: 500 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay keys are not configured" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amountRupees * 100), // ₹ -> paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Save pending payment to DB
    await connectDB();
    const referralNumber =
      typeof referralNumberRaw === "string" && referralNumberRaw.trim()
        ? referralNumberRaw.trim()
        : undefined;
    await Payment.create({
      userId: session.user.id,
      email: session.user.email,
      name: name,
      phoneNumber: phone,
      courseId: courseId,
      razorpayOrderId: order.id,
      amount: amountRupees,
      currency: "INR",
      status: "pending",
      receipt: order.receipt,
      referralNumber: referralNumber,
    });

    return NextResponse.json(order);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const amountRupees = Number(body?.amount);
    const courseId = body?.courseId;
    const referralNumber = body?.referralNumber;
    const name = body?.name;
    const phone = body?.phone;

    if (!Number.isFinite(amountRupees) || amountRupees <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
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



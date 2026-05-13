import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { getAdminSession } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request) {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const paymentId = String(formData.get("paymentId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!paymentId) {
    return NextResponse.json({ error: "Missing paymentId" }, { status: 400 });
  }

  if (status !== "pending" && status !== "failed") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await connectDB();
  const updated = await Payment.findOneAndUpdate(
    { _id: paymentId, status: { $ne: "completed" } },
    { $set: { status } },
    { new: true }
  ).lean();

  if (!updated) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  const referer = request.headers.get("referer");
  const redirectUrl = new URL(referer ?? "/admin", url);
  return NextResponse.redirect(redirectUrl, 303);
}

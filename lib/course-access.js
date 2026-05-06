import "server-only";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function hasCompletedCoursePayment({ userId, courseId }) {
  if (!userId || !courseId) return false;

  await connectDB();

  const payment = await Payment.findOne({
    userId,
    courseId,
    status: "completed",
  }).lean();

  return Boolean(payment);
}

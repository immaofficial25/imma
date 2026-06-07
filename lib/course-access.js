import "server-only";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";


/**
 * Check if a user has completed payment for a course.
 */
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

/**
 * Unified access check: purchase OR admin grant.
 */
export async function canAccessCourse({ userId, courseId }) {
  // Since admin grants are now stored as completed payments,
  // we only need to check for a completed payment.
  return await hasCompletedCoursePayment({ userId, courseId });
}

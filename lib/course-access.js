import "server-only";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { hasAdminGrant } from "@/lib/admin";

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
  // First, check purchase
  const purchased = await hasCompletedCoursePayment({ userId, courseId });
  if (purchased) return true;

  // Then, check admin grant
  const adminGranted = await hasAdminGrant(userId, courseId);
  return Boolean(adminGranted);
}

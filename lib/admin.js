import "server-only";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import User from "@/models/User";

/** Retrieve admin email list from env */
function getAdminEmails() {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

/** Check if an email belongs to an admin */
export function isAdminEmail(email) {
  if (typeof email !== "string" || !email.trim()) return false;
  const normalized = email.trim().toLowerCase();
  const admins = getAdminEmails();
  return admins.includes(normalized);
}

/** Get the current session if the user is an admin */
export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  if (!isAdminEmail(session.user.email)) return null;
  return session;
}

/** Grant access to a course for a user (identified by email) */
export async function grantCourseAccess({ email, courseId, name, phoneNumber, adminId }) {
  await connectDB();
  if (!adminId) throw new Error("adminId required");
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { $setOnInsert: { email: email.toLowerCase(), name: name || "Student", phoneNumber: phoneNumber || "0000000000" } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
  
  const grant = await Payment.findOneAndUpdate(
    { userId: user._id, courseId, referralNumber: "admin" },
    {
      userId: user._id,
      courseId,
      email: user.email,
      name: name || user.name || "Student",
      phoneNumber: phoneNumber || user.phoneNumber || "0000000000",
      amount: 0,
      status: "completed",
      referralNumber: "admin",
      $setOnInsert: {
        razorpayOrderId: `admin_grant_${Date.now()}_${user._id}`
      }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
  return grant;
}

/** Revoke access for a user (identified by email) */
export async function revokeCourseAccess({ email, courseId }) {
  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase() }).lean();
  if (!user) {
    throw new Error("User not found");
  }
  await Payment.deleteMany({ userId: user._id, courseId, referralNumber: "admin" });
  return true;
}



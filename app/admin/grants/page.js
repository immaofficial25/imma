import "server-only";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin";
import GrantAccessForm from "./GrantAccessForm";
import { getCourses, getCourseById } from "@/lib/courses";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";

export default async function GrantsPage() {
  const session = await getAdminSession();
  const courses = getCourses();

  if (!session) {
    redirect("/");
  }

  await connectDB();

  const adminPayments = await Payment.find({ referralNumber: "admin" })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
            Admin Tools
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Grant Course Access
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Give a student access to any course without requiring payment.
            Access is granted immediately and can be revoked later if needed.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Access Type</p>
            <p className="mt-2 text-lg font-semibold">Manual Grant</p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Payment Required</p>
            <p className="mt-2 text-lg font-semibold">No</p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Access Status</p>
            <p className="mt-2 text-lg font-semibold">Permanent</p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="rounded-3xl border bg-card shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">Add Student Access</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the student&apos;s email and select the course you want to unlock.
            </p>
          </div>

          <div className="p-6">
            <GrantAccessForm courses={courses} />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-medium text-amber-900">Important</h3>
          <ul className="mt-2 space-y-1 text-sm text-amber-800">
            <li>• Student must already have an account.</li>
            <li>• Access is granted immediately.</li>
            <li>• Duplicate grants are automatically prevented.</li>
            <li>• Existing purchases are not affected.</li>
          </ul>
        </div>

        {/* Admin Referral Students Section */}
        <div className="mt-12">
          <div className="mb-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Students via Admin Referral
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Payments where{" "}
              <code className="rounded bg-muted/20 px-1.5 py-0.5 font-mono text-xs">
                referralNumber = &quot;admin&quot;
              </code>
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-indigo-100 bg-indigo-50/50 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Student</th>
                    <th className="px-5 py-3">Course</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Order ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {adminPayments.length === 0 ? (
                    <tr>
                      <td
                        className="px-5 py-6 text-muted-foreground"
                        colSpan={6}
                      >
                        No students found with referral code{" "}
                        <strong>admin</strong>.
                      </td>
                    </tr>
                  ) : (
                    adminPayments.map((payment) => {
                      const course = getCourseById(payment.courseId);
                      const createdAt = payment.createdAt
                        ? new Date(payment.createdAt).toLocaleString("en-IN")
                        : "";

                      return (
                        <tr key={String(payment._id)}>
                          <td className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                            {createdAt}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground">
                                {payment.email}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {payment.name} · {payment.phoneNumber}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground">
                                {course?.title ?? payment.courseId}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {payment.courseId}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 font-semibold text-emerald-600">
                            ₹{payment.amount}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                payment.status === "completed"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : payment.status === "pending"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-rose-100 text-rose-700"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                            {payment.razorpayOrderId}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {adminPayments.length > 0 && (
              <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
                {adminPayments.length} record
                {adminPayments.length !== 1 ? "s" : ""} found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
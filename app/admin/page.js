import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { getAdminSession } from "@/lib/admin";
import Marketer from "@/models/Marketer";
import { getCourseById, getCourses } from "@/lib/courses";

function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function AdminPage({ searchParams }) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/");
  }

  const sp = (await searchParams) ?? {};
  const status = typeof sp.status === "string" ? sp.status : "";
  const courseId = typeof sp.courseId === "string" ? sp.courseId : "";
  const queryText = typeof sp.q === "string" ? sp.q.trim() : "";

  const filter = {};
  if (status === "pending" || status === "completed" || status === "failed") {
    filter.status = status;
  }
  if (courseId) {
    filter.courseId = courseId;
  }
  if (queryText) {
    const safe = escapeRegex(queryText);
    filter.$or = [
      { email: { $regex: safe, $options: "i" } },
      { name: { $regex: safe, $options: "i" } },
      { phoneNumber: { $regex: safe, $options: "i" } },
      { razorpayOrderId: { $regex: safe, $options: "i" } },
    ];
  }

  await connectDB();

  const [
    payments,
    pendingCount,
    completedCount,
    failedCount,
    marketers,
    marketerStats,
  ] = await Promise.all([
    Payment.find(filter).sort({ createdAt: -1 }).limit(200).lean(),
    Payment.countDocuments({ status: "pending" }),
    Payment.countDocuments({ status: "completed" }),
    Payment.countDocuments({ status: "failed" }),
    Marketer.find({}).sort({ createdAt: -1 }).select("+passwordHash").lean(),
    Payment.aggregate([
      {
        $match: {
          status: "completed",
          referralNumber: { $exists: true, $nin: [null, ""] },
        },
      },
      {
        $group: {
          _id: "$referralNumber",
          enrollments: { $sum: 1 },
          revenue: { $sum: "$amount" },
          userIds: { $addToSet: "$userId" },
        },
      },
      {
        $project: {
          marketerId: "$_id",
          enrollments: 1,
          revenue: 1,
          uniqueStudents: { $size: "$userIds" },
        },
      },
      { $sort: { enrollments: -1 } },
    ]),
  ]);

  const courses = getCourses();
  const marketerStatsById = new Map(
    marketerStats.map((row) => [String(row.marketerId), row])
  );

  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-14 sm:px-10">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted">Admin</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Payments Dashboard
          </h1>
          <p className="text-base text-muted">
            Signed in as {session.user.email}
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <p className="text-sm font-medium text-muted">Pending</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {pendingCount}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <p className="text-sm font-medium text-muted">Completed</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {completedCount}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <p className="text-sm font-medium text-muted">Failed</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {failedCount}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Marketers</p>
              <h2 className="mt-1 text-xl font-semibold text-foreground">
                Referral Performance
              </h2>
              <p className="mt-1 text-sm text-muted">
                Enrollment counts are based on completed payments where Referral Number matches the marketer ID.
              </p>
            </div>
          </div>

          <form
            method="post"
            action="/api/admin/marketers/create"
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-5"
          >
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foreground">
                Marketer ID
              </label>
              <input
                name="marketerId"
                placeholder="e.g. MKT1001"
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foreground">Name</label>
              <input
                name="name"
                placeholder="Optional"
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                Add marketer
              </button>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foreground">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foreground">Email</label>
              <input
                name="email"
                placeholder="Optional"
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foreground">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                placeholder="Optional"
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Active</label>
              <select
                name="isActive"
                defaultValue="true"
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-background text-xs font-semibold uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3">Marketer</th>
                  <th className="px-5 py-3">Enrollments</th>
                  <th className="px-5 py-3">Unique Students</th>
                  <th className="px-5 py-3">Revenue</th>
                  <th className="px-5 py-3">Password</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {marketers.length === 0 ? (
                  <tr>
                    <td className="px-5 py-6 text-muted" colSpan={6}>
                      No marketers created yet.
                    </td>
                  </tr>
                ) : (
                  marketers.map((marketer) => {
                    const stats = marketerStatsById.get(String(marketer.marketerId));
                    const createdAt = marketer.createdAt
                      ? new Date(marketer.createdAt).toLocaleString()
                      : "";

                    return (
                      <tr key={marketer._id}>
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">
                              {marketer.marketerId}
                            </span>
                            <span className="text-muted">
                              {marketer.name || marketer.email || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-foreground/80">
                          {stats?.enrollments ?? 0}
                        </td>
                        <td className="px-5 py-4 text-foreground/80">
                          {stats?.uniqueStudents ?? 0}
                        </td>
                        <td className="px-5 py-4 text-foreground/80">
                          INR {stats?.revenue ?? 0}
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-muted/10 px-3 py-1 text-xs font-semibold text-muted">
                            {marketer.passwordHash ? "set" : "not set"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-muted/10 px-3 py-1 text-xs font-semibold text-muted">
                            {marketer.isActive ? "active" : "inactive"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-muted">{createdAt}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-4" method="get">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Search</label>
              <input
                name="q"
                defaultValue={queryText}
                placeholder="Email, name, phone, order id"
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Status</label>
              <select
                name="status"
                defaultValue={status}
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Course</label>
              <select
                name="courseId"
                defaultValue={courseId}
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title} ({course.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                Apply
              </button>
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-background text-xs font-semibold uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3">Created</th>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Course</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payments.length === 0 ? (
                  <tr>
                    <td className="px-5 py-6 text-muted" colSpan={7}>
                      No payments found.
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => {
                    const course = getCourseById(payment.courseId);
                    const createdAt = payment.createdAt
                      ? new Date(payment.createdAt).toLocaleString()
                      : "";
                    const canUpdate = payment.status !== "completed";

                    return (
                      <tr key={payment._id}>
                        <td className="px-5 py-4 text-muted">{createdAt}</td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">
                              {payment.email}
                            </span>
                            <span className="text-muted">
                              {payment.name} · {payment.phoneNumber}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-foreground/80">
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">
                              {course?.title ?? payment.courseId}
                            </span>
                            <span className="text-muted">{payment.courseId}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-foreground/80">
                          INR {payment.amount}
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-muted/10 px-3 py-1 text-xs font-semibold text-muted">
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-muted">
                          {payment.razorpayOrderId}
                        </td>
                        <td className="px-5 py-4">
                          {canUpdate ? (
                            <div className="flex flex-wrap gap-2">
                              {payment.status !== "failed" ? (
                                <form
                                  method="post"
                                  action="/api/admin/payments/status"
                                >
                                  <input
                                    type="hidden"
                                    name="paymentId"
                                    value={String(payment._id)}
                                  />
                                  <input type="hidden" name="status" value="failed" />
                                  <button
                                    type="submit"
                                    className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-foreground hover:bg-muted/10"
                                  >
                                    Mark failed
                                  </button>
                                </form>
                              ) : null}
                              {payment.status !== "pending" ? (
                                <form
                                  method="post"
                                  action="/api/admin/payments/status"
                                >
                                  <input
                                    type="hidden"
                                    name="paymentId"
                                    value={String(payment._id)}
                                  />
                                  <input
                                    type="hidden"
                                    name="status"
                                    value="pending"
                                  />
                                  <button
                                    type="submit"
                                    className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-foreground hover:bg-muted/10"
                                  >
                                    Mark pending
                                  </button>
                                </form>
                              ) : null}
                            </div>
                          ) : (
                            <span className="text-xs text-muted/60">Locked</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { getMarketerSessionFromCookies } from "@/lib/marketer-auth";

function parseMonthInput(value) {
  if (typeof value !== "string") return null;
  const match = /^(\d{4})-(\d{2})$/.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  if (!Number.isInteger(year) || year < 1970 || year > 2100) return null;
  if (!Number.isInteger(month) || month < 1 || month > 12) return null;

  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1));

  return {
    year,
    month,
    value: `${String(year)}-${String(month).padStart(2, "0")}`,
    start,
    end,
  };
}

function formatMonthLabel({ year, month }) {
  return new Date(year, month - 1, 1).toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export default async function MarketerDashboardPage({ searchParams }) {
  const session = await getMarketerSessionFromCookies();
  if (!session) {
    redirect("/marketer/login");
  }

  const sp = (await searchParams) ?? {};
  const selectedMonth = parseMonthInput(sp.month);

  await connectDB();

  const match = {
    status: "completed",
    referralNumber: session.marketerId,
  };

  const monthlyMatch = selectedMonth
    ? {
        ...match,
        createdAt: { $gte: selectedMonth.start, $lt: selectedMonth.end },
      }
    : null;

  const [stats, recentPayments, selectedMonthStats, monthBreakdown] = await Promise.all([
    Payment.aggregate([
      {
        $match: match,
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
          _id: 0,
          enrollments: 1,
          revenue: 1,
          uniqueStudents: { $size: "$userIds" },
        },
      },
    ]),
    Payment.find(monthlyMatch ?? match)
      .sort({ createdAt: -1 })
      .limit(selectedMonth ? 200 : 50)
      .lean(),
    monthlyMatch
      ? Payment.aggregate([
          { $match: monthlyMatch },
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
              _id: 0,
              enrollments: 1,
              revenue: 1,
              uniqueStudents: { $size: "$userIds" },
            },
          },
        ])
      : Promise.resolve([]),
    Payment.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          enrollments: { $sum: 1 },
          revenue: { $sum: "$amount" },
          userIds: { $addToSet: "$userId" },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          enrollments: 1,
          revenue: 1,
          uniqueStudents: { $size: "$userIds" },
        },
      },
      { $sort: { year: -1, month: -1 } },
      { $limit: 12 },
    ]),
  ]);

  const summary = Array.isArray(stats) && stats.length > 0 ? stats[0] : null;
  const monthSummary =
    Array.isArray(selectedMonthStats) && selectedMonthStats.length > 0
      ? selectedMonthStats[0]
      : null;

  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-14 sm:px-10">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted">Marketer</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Dashboard
          </h1>
          <p className="text-base text-muted">
            Marketer ID: {session.marketerId}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-surface px-4 text-sm font-semibold text-foreground hover:bg-background"
            >
              Home
            </Link>
            <form method="post" action="/api/marketer/logout">
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                Logout
              </button>
            </form>
          </div>

          <form
            method="get"
            action="/marketer"
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">
                Month-wise filter
              </label>
              <input
                type="month"
                name="month"
                defaultValue={selectedMonth?.value ?? ""}
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
              >
                Apply
              </button>
              {selectedMonth ? (
                <Link
                  href="/marketer"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground hover:bg-background"
                >
                  Reset
                </Link>
              ) : null}
            </div>
          </form>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5 shadow-sm">
            <p className="text-sm font-medium text-blue-600">Enrollments</p>
            <p className="mt-2 text-2xl font-semibold text-blue-700">
              {summary?.enrollments ?? 0}
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5 shadow-sm">
            <p className="text-sm font-medium text-indigo-600">Unique Students</p>
            <p className="mt-2 text-2xl font-semibold text-indigo-700">
              {summary?.uniqueStudents ?? 0}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 shadow-sm">
            <p className="text-sm font-medium text-emerald-600">Revenue</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-700">
              ₹{summary?.revenue ?? 0}
            </p>
          </div>
        </section>

        {selectedMonth ? (
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-foreground">
                {formatMonthLabel(selectedMonth)}
              </h2>
              <p className="text-sm text-muted">
                Month-wise enrollments attributed to your marketer ID.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
                <p className="text-sm font-medium text-blue-600">Enrollments</p>
                <p className="mt-2 text-2xl font-semibold text-blue-700">
                  {monthSummary?.enrollments ?? 0}
                </p>
              </div>
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
                <p className="text-sm font-medium text-indigo-600">Unique Students</p>
                <p className="mt-2 text-2xl font-semibold text-indigo-700">
                  {monthSummary?.uniqueStudents ?? 0}
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <p className="text-sm font-medium text-emerald-600">Revenue</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-700">
                  ₹{monthSummary?.revenue ?? 0}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="px-6 py-5">
            <h2 className="text-lg font-semibold text-foreground">
              Last 12 months
            </h2>
            <p className="mt-1 text-sm text-muted">
              Click a month to filter.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-indigo-50/50 text-xs font-semibold uppercase tracking-wide text-indigo-700 border-b border-indigo-100">
                <tr>
                  <th className="px-5 py-3">Month</th>
                  <th className="px-5 py-3">Enrollments</th>
                  <th className="px-5 py-3">Unique Students</th>
                  <th className="px-5 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {monthBreakdown.length === 0 ? (
                  <tr>
                    <td className="px-5 py-6 text-muted" colSpan={4}>
                      No enrollments yet.
                    </td>
                  </tr>
                ) : (
                  monthBreakdown.map((row) => {
                    const monthValue = `${String(row.year)}-${String(row.month).padStart(
                      2,
                      "0"
                    )}`;
                    const label = formatMonthLabel(row);

                    return (
                      <tr key={monthValue}>
                        <td className="px-5 py-4">
                          <Link
                            href={`/marketer?month=${encodeURIComponent(monthValue)}`}
                            className="font-semibold text-foreground hover:underline"
                          >
                            {label}
                          </Link>
                        </td>
                        <td className="px-5 py-4 font-semibold text-blue-600">{row.enrollments}</td>
                        <td className="px-5 py-4 font-semibold text-indigo-600">
                          {row.uniqueStudents}
                        </td>
                        <td className="px-5 py-4 font-semibold text-emerald-600">
                          ₹{row.revenue}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="px-6 py-5">
            <h2 className="text-lg font-semibold text-foreground">
              {selectedMonth
                ? `Enrollments for ${formatMonthLabel(selectedMonth)}`
                : "Recent Enrollments"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              Completed payments using your marketer ID.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-primary/5 text-xs font-semibold uppercase tracking-wide text-primary border-b border-primary/10">
                <tr>
                  <th className="px-5 py-3">Created</th>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Course</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentPayments.length === 0 ? (
                  <tr>
                    <td className="px-5 py-6 text-muted" colSpan={5}>
                      No enrollments found.
                    </td>
                  </tr>
                ) : (
                  recentPayments.map((payment) => {
                    const createdAt = payment.createdAt
                      ? new Date(payment.createdAt).toLocaleString()
                      : "";

                    return (
                      <tr key={payment._id}>
                        <td className="px-5 py-4 text-muted">{createdAt}</td>
                        <td className="px-5 py-4 font-medium text-foreground">{payment.email}</td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            {payment.courseId}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-semibold text-emerald-600">
                          ₹{payment.amount}
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-muted">
                          {payment.razorpayOrderId}
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

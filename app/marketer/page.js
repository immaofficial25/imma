import Link from "next/link";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { getMarketerSessionFromCookies } from "@/lib/marketer-auth";
import MarketerEarningsBreakdown from "@/components/MarketerEarningsBreakdown";
import { Clock, Calendar, CalendarDays, CalendarRange, Award } from "lucide-react";

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
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleString(undefined, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function runStatsQuery(match, additionalMatch) {
  return Payment.aggregate([
    { $match: { ...match, ...additionalMatch } },
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
  ]);
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

  const now = new Date();

  // Daily: Today start UTC
  const utcTodayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  // Weekly: Monday start UTC
  const day = now.getUTCDay();
  const diff = now.getUTCDate() - day + (day === 0 ? -6 : 1);
  const utcWeekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), diff));

  // Monthly: Month start UTC
  const utcMonthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  // Yearly: Year start UTC
  const utcYearStart = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));

  // Breakdown ranges
  const sevenDaysAgo = new Date(utcTodayStart);
  sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 6);

  const eightWeeksAgo = new Date(utcWeekStart);
  eightWeeksAgo.setUTCDate(eightWeeksAgo.getUTCDate() - 7 * 7);

  const [
    stats,
    recentPayments,
    selectedMonthStats,
    monthBreakdown,
    dailyStats,
    weeklyStats,
    monthlyStats,
    yearlyStats,
    dailyBreakdown,
    weeklyBreakdown,
    yearlyBreakdown,
  ] = await Promise.all([
    runStatsQuery(match, {}),
    Payment.find(monthlyMatch ?? match)
      .sort({ createdAt: -1 })
      .limit(selectedMonth ? 200 : 50)
      .lean(),
    monthlyMatch ? runStatsQuery(monthlyMatch, {}) : Promise.resolve([]),
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
    runStatsQuery(match, { createdAt: { $gte: utcTodayStart } }),
    runStatsQuery(match, { createdAt: { $gte: utcWeekStart } }),
    runStatsQuery(match, { createdAt: { $gte: utcMonthStart } }),
    runStatsQuery(match, { createdAt: { $gte: utcYearStart } }),
    Payment.aggregate([
      { $match: { ...match, createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
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
          day: "$_id.day",
          enrollments: 1,
          revenue: 1,
          uniqueStudents: { $size: "$userIds" },
        },
      },
      { $sort: { year: -1, month: -1, day: -1 } },
    ]),
    Payment.aggregate([
      { $match: { ...match, createdAt: { $gte: eightWeeksAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $week: "$createdAt" },
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
          week: "$_id.week",
          enrollments: 1,
          revenue: 1,
          uniqueStudents: { $size: "$userIds" },
        },
      },
      { $sort: { year: -1, week: -1 } },
    ]),
    Payment.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
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
          enrollments: 1,
          revenue: 1,
          uniqueStudents: { $size: "$userIds" },
        },
      },
      { $sort: { year: -1 } },
    ]),
  ]);

  const summary = stats[0] ?? null;
  const monthSummary = selectedMonthStats[0] ?? null;
  const todaySummary = dailyStats[0] ?? null;
  const weekSummary = weeklyStats[0] ?? null;
  const monthSummaryStats = monthlyStats[0] ?? null;
  const yearSummary = yearlyStats[0] ?? null;


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

        <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {/* Today Card */}
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Today</span>
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-foreground">₹{todaySummary?.revenue ?? 0}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-muted border-t border-border/50 pt-2.5">
              <span>{todaySummary?.enrollments ?? 0} enrolls</span>
              <span>{todaySummary?.uniqueStudents ?? 0} students</span>
            </div>
          </div>

          {/* Weekly Card */}
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">This Week</span>
              <Calendar className="h-4 w-4 text-indigo-500" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-foreground">₹{weekSummary?.revenue ?? 0}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-muted border-t border-border/50 pt-2.5">
              <span>{weekSummary?.enrollments ?? 0} enrolls</span>
              <span>{weekSummary?.uniqueStudents ?? 0} students</span>
            </div>
          </div>

          {/* Monthly Card */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">This Month</span>
              <CalendarDays className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-foreground">₹{monthSummaryStats?.revenue ?? 0}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-muted border-t border-border/50 pt-2.5">
              <span>{monthSummaryStats?.enrollments ?? 0} enrolls</span>
              <span>{monthSummaryStats?.uniqueStudents ?? 0} students</span>
            </div>
          </div>

          {/* Yearly Card */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">This Year</span>
              <CalendarRange className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-foreground">₹{yearSummary?.revenue ?? 0}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-muted border-t border-border/50 pt-2.5">
              <span>{yearSummary?.enrollments ?? 0} enrolls</span>
              <span>{yearSummary?.uniqueStudents ?? 0} students</span>
            </div>
          </div>

          {/* Lifetime Card */}
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 shadow-sm hover:shadow-md transition-shadow col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Lifetime</span>
              <Award className="h-4 w-4 text-purple-500" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-foreground">₹{summary?.revenue ?? 0}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-muted border-t border-border/50 pt-2.5">
              <span>{summary?.enrollments ?? 0} enrolls</span>
              <span>{summary?.uniqueStudents ?? 0} students</span>
            </div>
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

        <MarketerEarningsBreakdown
          dailyBreakdown={dailyBreakdown}
          weeklyBreakdown={weeklyBreakdown}
          monthlyBreakdown={monthBreakdown}
          yearlyBreakdown={yearlyBreakdown}
        />

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

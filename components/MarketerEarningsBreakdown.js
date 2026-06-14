"use client";

import React, { useState } from "react";
import {
  Calendar,
  CalendarDays,
  CalendarRange,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

export default function MarketerEarningsBreakdown({
  dailyBreakdown = [],
  weeklyBreakdown = [],
  monthlyBreakdown = [],
  yearlyBreakdown = [],
}) {
  const [activeTab, setActiveTab] = useState("daily");

  // Formatters
  const formatDayLabel = (year, month, day) => {
    // MongoDB month is 1-indexed, JS Date constructor expects 0-indexed month
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  const formatWeekLabel = (year, week) => {
    // Simple ISO week conversion
    const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
    const dow = simple.getUTCDay();
    const weekStart = new Date(simple);
    if (dow <= 4) {
      weekStart.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
    } else {
      weekStart.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
    }
    const weekEnd = new Date(weekStart);
    weekEnd.setUTCDate(weekStart.getUTCDate() + 6);

    const options = { month: "short", day: "numeric", timeZone: "UTC" };
    return `${weekStart.toLocaleDateString(undefined, options)} - ${weekEnd.toLocaleDateString(undefined, options)} (${year})`;
  };

  const formatMonthLabel = (year, month) => {
    const date = new Date(Date.UTC(year, month - 1, 1));
    return date.toLocaleString(undefined, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const formatYearLabel = (year) => {
    return `${year}`;
  };

  // Get active data and details
  const getActiveData = () => {
    switch (activeTab) {
      case "daily":
        return {
          list: dailyBreakdown,
          label: "Daily",
          icon: Calendar,
          format: (row) => formatDayLabel(row.year, row.month, row.day),
          description: "Earnings and enrollments for the last 7 days.",
        };
      case "weekly":
        return {
          list: weeklyBreakdown,
          label: "Weekly",
          icon: CalendarDays,
          format: (row) => formatWeekLabel(row.year, row.week),
          description: "Earnings and enrollments for the last 8 weeks.",
        };
      case "monthly":
        return {
          list: monthlyBreakdown,
          label: "Monthly",
          icon: CalendarRange,
          format: (row) => formatMonthLabel(row.year, row.month),
          description: "Earnings and enrollments for the last 12 months.",
        };
      case "yearly":
        return {
          list: yearlyBreakdown,
          label: "Yearly",
          icon: BarChart3,
          format: (row) => formatYearLabel(row.year),
          description: "Annual earnings and enrollments summary.",
        };
      default:
        return {
          list: [],
          label: "",
          icon: Calendar,
          format: () => "",
          description: "",
        };
    }
  };

  const { list, label, icon: TabIcon, format, description } = getActiveData();

  // Calculations for active data
  const totalRevenue = list.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const totalEnrollments = list.reduce((sum, item) => sum + (item.enrollments || 0), 0);
  const maxRevenue = Math.max(...list.map((item) => item.revenue || 0), 1);

  const tabs = [
    { id: "daily", label: "Daily (7d)" },
    { id: "weekly", label: "Weekly (8w)" },
    { id: "monthly", label: "Monthly (12m)" },
    { id: "yearly", label: "Yearly" },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      {/* Header and Tab Controls */}
      <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <TabIcon className="h-5 w-5 text-primary" />
            Earnings Trends
          </h2>
          <p className="mt-1 text-sm text-muted">{description}</p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="flex rounded-xl bg-background p-1 border border-border max-w-sm sm:max-w-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all sm:text-sm
                ${
                  activeTab === tab.id
                    ? "bg-surface text-primary shadow-sm border border-border/50"
                    : "text-muted hover:text-foreground"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mini Stats Summary for View */}
      {list.length > 0 && (
        <div className="grid grid-cols-2 gap-4 border-b border-border bg-slate-50/50 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Total Revenue</p>
              <h3 className="text-lg font-bold text-emerald-700">₹{totalRevenue}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Enrollments</p>
              <h3 className="text-lg font-bold text-blue-700">{totalEnrollments}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Main List / Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-border">
            <tr>
              <th className="px-6 py-3.5">Period</th>
              <th className="px-6 py-3.5">Revenue Share</th>
              <th className="px-6 py-3.5 text-right">Enrollments</th>
              <th className="px-6 py-3.5 text-right">Unique Students</th>
              <th className="px-6 py-3.5 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.length === 0 ? (
              <tr>
                <td className="px-6 py-10 text-center text-muted" colSpan={5}>
                  No earnings records found for this period.
                </td>
              </tr>
            ) : (
              list.map((row, index) => {
                const rowLabel = format(row);
                const sharePercent = Math.round(((row.revenue || 0) / maxRevenue) * 100);

                return (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground whitespace-nowrap">
                      {rowLabel}
                    </td>
                    <td className="px-6 py-4 w-1/3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-primary transition-all duration-500"
                            style={{ width: `${sharePercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-muted w-8">{sharePercent}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-blue-600">
                      {row.enrollments}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-indigo-600">
                      {row.uniqueStudents}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600 whitespace-nowrap">
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
  );
}

"use client";

import { useState } from "react";

export default function GrantAccessForm() {
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/grants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          courseId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to grant access");
      }

      setMessage("Course access granted successfully.");
      setEmail("");
      setCourseId("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Student Email
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@example.com"
          className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Course ID */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Course ID
        </label>

        <input
          type="text"
          required
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          placeholder="e.g. ai-masterclass"
          className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Success Message */}
      {message && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          ✓ {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Granting Access..." : "Grant Course Access"}
      </button>
    </form>
  );
}

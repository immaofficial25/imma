"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function MarketerLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <main className="mx-auto w-full max-w-md px-6 py-14">
        <Link href="/" className="text-sm text-muted hover:text-foreground">
          ← Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-foreground">Marketer Login</h1>
        <p className="mt-2 text-sm text-muted">
          Login with your marketer ID and password to see your enrollments.
        </p>

        <form
          method="post"
          action="/api/marketer/login"
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 shadow-sm"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground ml-1">
              Marketer ID
            </label>
            <input
              type="text"
              name="marketerId"
              placeholder="e.g. MKT1001"
              className="rounded-2xl border border-border bg-background px-4 py-3.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full rounded-2xl border border-border bg-background pl-4 pr-12 py-3.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover active:scale-[0.98]"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}


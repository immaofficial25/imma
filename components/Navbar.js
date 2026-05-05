"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ContinueWithGoogleButton from "@/components/ContinueWithGoogleButton";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const isLoading = status === "loading";

  const handleLogout = async () => {
    if (isSigningOut) return;
    try {
      setIsSigningOut(true);
      await signOut({ callbackUrl: "/" });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="pointer-events-auto w-full max-w-4xl"
      >
        <div className="rounded-full border border-zinc-200/80 bg-white/80 p-2 shadow-lg shadow-zinc-900/5 backdrop-blur-md">
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold tracking-tight text-zinc-950 hover:bg-zinc-950/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              aria-label="Go to home"
            >
              <span className="grid size-8 place-items-center rounded-full bg-zinc-950 text-xs font-bold text-white">
                IM
              </span>
              <span className="hidden sm:inline">IMMA Courses</span>
            </Link>

            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="rounded-full px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-950/5 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              >
                Home
              </Link>
              <Link
                href="/#courses"
                className="rounded-full px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-950/5 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              >
                Courses
              </Link>
            </div>

            <div
              className="flex items-center gap-3 transition-all duration-200"
              suppressHydrationWarning
            >
              {isLoading ? (
                <div className="h-10 w-[140px] rounded-full bg-zinc-200/70" />
              ) : session ? (
                <>
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="User avatar"
                      width={36}
                      height={36}
                      className="hidden size-9 rounded-full ring-1 ring-zinc-200 sm:block"
                      referrerPolicy="no-referrer"
                    />
                  ) : null}
                  {session.user?.email ? (
                    <span className="hidden text-sm text-zinc-600 sm:block">
                      {session.user.email}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isSigningOut}
                    aria-busy={isSigningOut}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-sm font-semibold text-background transition-colors hover:bg-[#383838] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <ContinueWithGoogleButton
                  compact
                  className="px-3 sm:px-4"
                  disabled={isLoading}
                  aria-busy={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

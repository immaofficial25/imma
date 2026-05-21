"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Home, BookOpen, User, LogOut, LayoutDashboard } from "lucide-react";
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
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-6">
      <nav
        aria-label="Primary"
        className="pointer-events-auto w-full max-w-5xl"
      >
        <div className="glass rounded-full px-2 sm:px-3 py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] ring-1 ring-border">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-full px-3 py-1.5 transition-all hover:bg-muted/10"
              aria-label="Go to home"
            >
              <Image
                src="/imma_logo.png"
                alt="IMMA Logo"
                width={36}
                height={36}
                className="size-9 rounded-full shadow-lg shadow-primary/20"
              />
              <span className="hidden font-bold tracking-tight text-foreground sm:inline-block">
                IMMA Pvt. Ltd.
              </span>
            </Link>

            <div className="flex items-center gap-1.5 rounded-full bg-muted/5 p-1 ring-1 ring-border">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted transition-all hover:bg-muted/10 hover:text-foreground"
              >
                <Home className="size-4" />
                <span className="hidden md:inline">Home</span>
              </Link>
              <Link
                href="/courses"
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted transition-all hover:bg-muted/10 hover:text-foreground"
              >
                <BookOpen className="size-4" />
                <span className="hidden md:inline">Courses</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {isLoading ? (
                <div className="h-10 w-24 animate-pulse rounded-full bg-muted/10" />
              ) : session ? (
                <div className="flex items-center gap-3">
                  <div className="hidden flex-col items-end gap-0.5 sm:flex">
                    <span className="text-xs font-bold text-foreground line-clamp-1">
                      {session.user?.name || "User"}
                    </span>
                    <span className="text-[10px] font-medium text-muted line-clamp-1 uppercase tracking-wider">
                      {session.user?.isAdmin ? "Administrator" : "Student"}
                    </span>
                  </div>

                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="size-10 rounded-full ring-2 ring-primary/20 shadow-lg shadow-primary/10"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted/10 ring-1 ring-border">
                      <User className="size-5 text-muted" />
                    </div>
                  )}

                  <div className="h-6 w-px bg-border mx-1" />

                  <div className="flex items-center gap-2">
                    {session.user?.isAdmin && (
                      <Link
                        href="/admin"
                        title="Admin Dashboard"
                        className="flex size-10 items-center justify-center rounded-full bg-muted/10 text-muted transition-all hover:bg-muted/20 hover:text-primary ring-1 ring-border"
                      >
                        <LayoutDashboard className="size-5" />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isSigningOut}
                      title="Logout"
                      className="flex size-10 items-center justify-center rounded-full bg-muted/10 text-muted transition-all hover:bg-red-500/10 hover:text-red-600 ring-1 ring-border disabled:opacity-50"
                    >
                      <LogOut className="size-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <ContinueWithGoogleButton
                  compact
                  className="!rounded-full !h-10 !bg-primary !text-white !border-none !shadow-lg !shadow-primary/20 hover:!bg-primary-hover transition-all"
                  disabled={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

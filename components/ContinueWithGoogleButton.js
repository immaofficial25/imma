"use client";

import { signIn } from "next-auth/react";

export default function ContinueWithGoogleButton({
  className = "",
  compact = false,
  disabled = false,
  onClick,
  ...buttonProps
}) {
  return (
    <button
      {...buttonProps}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        signIn("google", { callbackUrl: "/" });
      }}
      disabled={disabled || buttonProps.disabled}
      className={[
        "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      ].join(" ")}
    >
      <GoogleIcon />
      <span className={compact ? "hidden sm:inline" : ""}>
        Continue with Google
      </span>
      {compact ? <span className="sm:hidden">Google</span> : null}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.02 1.53 7.4 2.8l5.4-5.4C33.52 3.86 29.18 2 24 2 14.63 2 6.52 7.38 2.56 15.22l6.3 4.89C10.48 13.45 16.76 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.57-.14-3.07-.41-4.5H24v8.53h12.64c-.55 2.95-2.23 5.45-4.73 7.13l7.24 5.62c4.24-3.92 6.35-9.7 6.35-16.78z"
      />
      <path
        fill="#FBBC05"
        d="M8.86 28.11A14.51 14.51 0 0 1 8.1 24c0-1.43.25-2.81.76-4.11l-6.3-4.89A23.93 23.93 0 0 0 0 24c0 3.87.92 7.53 2.56 10.78l6.3-4.67z"
      />
      <path
        fill="#34A853"
        d="M24 46c6.48 0 11.92-2.14 15.9-5.78l-7.24-5.62c-2.01 1.35-4.58 2.15-8.66 2.15-7.24 0-13.52-3.95-15.14-10.39l-6.3 4.67C6.52 40.62 14.63 46 24 46z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}

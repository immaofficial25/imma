import Link from "next/link";

export default function MarketerLoginPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans">
      <main className="mx-auto w-full max-w-md px-6 py-14">
        <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-950">
          ← Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-zinc-950">Marketer Login</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Login with your marketer ID and password to see your enrollments.
        </p>

        <form
          method="post"
          action="/api/marketer/login"
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-900 ml-1">
              Marketer ID
            </label>
            <input
              type="text"
              name="marketerId"
              placeholder="e.g. MKT1001"
              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-zinc-950 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-900 ml-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-zinc-950 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-2xl bg-black py-4 text-lg font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 font-sans">
      <p className="text-sm font-medium text-zinc-600">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-zinc-950">
        Course not found
      </h1>
      <p className="mt-3 text-base text-zinc-600">
        The course you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl bg-black px-5 py-3 text-white"
      >
        Go back home
      </Link>
    </div>
  );
}

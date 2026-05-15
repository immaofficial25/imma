import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 font-sans text-center sm:text-left">
      <p className="text-sm font-bold uppercase tracking-widest text-primary">404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        Course not found
      </h1>
      <p className="mt-4 text-lg text-muted">
        The course you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:scale-105 active:scale-95"
      >
        Go back home
      </Link>
    </div>
  );
}

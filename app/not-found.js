import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-4 py-16 text-center">
      <div className="stitch p-10">
        <p className="font-display text-7xl font-extrabold text-primary">404</p>
        <h1 className="mt-2 text-2xl font-bold">
          This page could not be found
        </h1>
        <p className="mt-2 opacity-80">
          The link may be old, or the event may have been removed.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/events" className="btn btn-outline btn-primary">
            Browse events
          </Link>
        </div>
      </div>
    </div>
  );
}

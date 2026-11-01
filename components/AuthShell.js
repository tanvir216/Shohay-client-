import Link from "next/link";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto grid min-h-[75vh] max-w-5xl items-stretch px-4 py-12 md:grid-cols-2">
      <div className="relative hidden overflow-hidden rounded-l-box bg-primary p-10 text-primary-content md:flex md:flex-col md:justify-between">
        <div className="absolute inset-4 rounded-box border-2 border-dashed border-primary-content/30" />
        <div className="relative">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-content/15 font-display text-2xl">
            স
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight">
            Small drives. Warm neighbourhoods.
          </h2>
          <p className="mt-3 opacity-90">
            Join events near you, or host one of your own in two minutes.
          </p>
        </div>
        <Link href="/events" className="relative link text-sm font-medium">
          Browse events without an account
        </Link>
      </div>
      <div className="rounded-box border border-base-300 bg-base-100 p-8 md:rounded-l-none md:border-l-0">
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        <p className="mb-6 mt-1 opacity-80">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

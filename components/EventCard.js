import Link from "next/link";
import { FiCalendar, FiMapPin, FiArrowRight } from "react-icons/fi";
import { fmtDate } from "@/lib/api";

export default function EventCard({ ev }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[16/10] overflow-hidden bg-base-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ev.thumbnail}
          alt={ev.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* soft gradient so the badge stays readable on any photo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"
        />
        <span className="badge badge-accent absolute left-3 top-3 gap-1 border-0 px-3 py-3 font-semibold shadow-md">
          {ev.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 min-h-[3.5rem] font-display text-xl font-bold leading-snug transition-colors group-hover:text-primary">
          {ev.title}
        </h3>

        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2.5 opacity-80">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <FiMapPin size={14} />
            </span>
            <span className="line-clamp-1">{ev.location}</span>
          </p>
          <p className="flex items-center gap-2.5 opacity-80">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <FiCalendar size={14} />
            </span>
            {fmtDate(ev.date)}
          </p>
        </div>

        <Link
          href={`/events/${ev._id}`}
          className="btn btn-primary mt-auto gap-2 shadow-md shadow-primary/25"
        >
          View Event
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export const CardSkeletons = ({ n = 6 }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: n }).map((_, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-2xl border border-base-300 bg-base-100"
      >
        <div className="skeleton aspect-[16/10] w-full rounded-none" />
        <div className="space-y-3 p-5">
          <div className="skeleton h-6 w-4/5" />
          <div className="skeleton h-6 w-3/5" />
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton mt-4 h-10 w-full" />
        </div>
      </div>
    ))}
  </div>
);

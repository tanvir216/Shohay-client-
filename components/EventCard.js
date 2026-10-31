import Link from "next/link";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { fmtDate } from "@/lib/api";

export default function EventCard({ ev }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-200/50">
      <div className="relative aspect-[16/10] bg-base-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ev.thumbnail}
          alt={ev.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="badge badge-accent absolute left-3 top-3 font-medium">
          {ev.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-xl font-bold">
          {ev.title}
        </h3>
        <p className="flex items-center gap-2 text-sm opacity-80">
          <FiMapPin className="shrink-0 text-primary" />
          {ev.location}
        </p>
        <p className="flex items-center gap-2 text-sm opacity-80">
          <FiCalendar className="shrink-0 text-primary" />
          {fmtDate(ev.date)}
        </p>
        <Link href={`/events/${ev._id}`} className="btn btn-primary mt-auto">
          View Event
        </Link>
      </div>
    </article>
  );
}

export const CardSkeletons = ({ n = 6 }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className="skeleton h-[26rem] w-full" />
    ))}
  </div>
);

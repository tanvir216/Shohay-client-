import Link from "next/link";
import { FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";
import { leftLabel, TYPE_META } from "@/lib/meta";

const parts = (d) => {
  const dt = new Date(d + "T00:00:00");
  return [
    dt.toLocaleDateString("en-GB", { day: "2-digit" }),
    dt.toLocaleDateString("en-GB", { month: "short" }),
  ];
};

export default function EventCard({ ev }) {
  const [day, mon] = parts(ev.date);
  const Icon = TYPE_META[ev.type]?.icon;
  return (
    <article className="event-card group flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100">
      <Link
        href={`/events/${ev._id}`}
        className="relative block aspect-[16/10] overflow-hidden bg-base-300"
        tabIndex={-1}
        aria-hidden="true"
      >
     
        <img
          src={ev.thumbnail}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="badge badge-accent absolute left-3 top-3 gap-1.5 py-3 font-medium">
          {Icon && <Icon />}
          {ev.type}
        </span>
        <div className="absolute bottom-3 right-3 rounded-lg bg-base-100 px-3 py-1.5 text-center leading-none shadow">
          <div className="font-display text-xl font-extrabold text-primary">
            {day}
          </div>
          <div className="mt-0.5 text-xs font-semibold">{mon}</div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-snug">
          <Link href={`/events/${ev._id}`}>{ev.title}</Link>
        </h3>
        <p className="flex items-center gap-2 text-sm opacity-80">
          <FiMapPin className="shrink-0 text-primary" />
          {ev.location}
        </p>
        <p className="flex items-center gap-2 text-sm font-medium text-primary">
          <FiClock className="shrink-0" />
          {leftLabel(ev.date)}
        </p>
        <Link href={`/events/${ev._id}`} className="btn btn-primary mt-auto">
          View event <FiArrowRight />
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

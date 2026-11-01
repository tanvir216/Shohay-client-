"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiMapPin,
  FiUser,
  FiShare2,
  FiClock,
  FiChevronLeft,
} from "react-icons/fi";
import { api, fmtDate, todayStr } from "@/lib/api";
import { leftLabel, TYPE_META } from "@/lib/meta";
import { authClient } from "@/lib/auth-client";
import EventCard from "@/components/EventCard";

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [ev, setEv] = useState(null);
  const [related, setRelated] = useState([]);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api(`/events/${id}`)
      .then((e) => {
        setEv(e);
        api(`/events?type=${encodeURIComponent(e.type)}&limit=4`)
          .then((l) => setRelated(l.filter((x) => x._id !== id).slice(0, 3)))
          .catch(() => {});
      })
      .catch((e) => setErr(e.message));
  }, [id]);

  const join = async () => {
    if (!session) {
      toast.error("Please log in to join this event.");
      return router.push(`/login?next=/events/${id}`);
    }
    setBusy(true);
    try {
      await api(`/events/${id}/join`, { method: "POST", auth: true });
      toast.success("You have joined this event. See you there!");
    } catch (e) {
      toast.error(e.message);
    }
    setBusy(false);
  };
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: ev.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied.");
      }
    } catch {}
  };
  const calendar = () => {
    const d = ev.date.replaceAll("-", "");
    const next = new Date(ev.date + "T00:00:00");
    next.setDate(next.getDate() + 1);
    const end = next.toISOString().slice(0, 10).replaceAll("-", "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title)}&dates=${d}/${end}&location=${encodeURIComponent(ev.location)}&details=${encodeURIComponent(ev.description.slice(0, 300))}`;
  };

  if (err)
    return (
      <p className="mx-auto max-w-3xl px-4 py-20 text-center text-error">
        {err}
      </p>
    );
  if (!ev)
    return (
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-12">
        <div className="skeleton h-80 w-full" />
        <div className="skeleton h-8 w-2/3" />
        <div className="skeleton h-32 w-full" />
      </div>
    );
  const past = ev.date < todayStr();
  const Icon = TYPE_META[ev.type]?.icon;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/events" className="btn btn-ghost btn-sm mb-4">
        <FiChevronLeft />
        All events
      </Link>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ev.thumbnail}
        alt={ev.title}
        className="aspect-[16/7] w-full rounded-box object-cover"
      />
      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="badge badge-accent badge-lg gap-2">
            {Icon && <Icon />}
            {ev.type}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
            {ev.title}
          </h1>
          <div className="stitch-line my-6" />
          <h2 className="text-xl font-bold">About this event</h2>
          <p className="mt-3 max-w-prose whitespace-pre-line text-lg leading-relaxed">
            {ev.description}
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="stitch bg-base-200/60 p-6">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <FiCalendar className="mt-1 shrink-0 text-xl text-primary" />
                <div>
                  <div className="text-sm opacity-70">Date</div>
                  <div className="font-semibold">{fmtDate(ev.date)}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <FiClock className="mt-1 shrink-0 text-xl text-primary" />
                <div>
                  <div className="text-sm opacity-70">Starts</div>
                  <div className="font-semibold">
                    {past ? "Ended" : leftLabel(ev.date)}
                  </div>
                </div>
              </li>
              <li className="flex gap-3">
                <FiMapPin className="mt-1 shrink-0 text-xl text-primary" />
                <div>
                  <div className="text-sm opacity-70">Location</div>
                  <div className="font-semibold">{ev.location}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <FiUser className="mt-1 shrink-0 text-xl text-primary" />
                <div>
                  <div className="text-sm opacity-70">Hosted by</div>
                  <div className="font-semibold">
                    {ev.creatorName || ev.creatorEmail}
                  </div>
                </div>
              </li>
            </ul>
            <button
              onClick={join}
              disabled={busy || past}
              className="btn btn-primary btn-lg mt-6 w-full"
            >
              {busy ? (
                <span className="loading loading-spinner" />
              ) : past ? (
                "This event has ended"
              ) : (
                "Join event"
              )}
            </button>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={share} className="btn btn-outline btn-sm">
                <FiShare2 />
                Share
              </button>
              <a
                href={calendar()}
                target="_blank"
                rel="noreferrer"
                className={`btn btn-outline btn-sm ${past ? "btn-disabled" : ""}`}
              >
                <FiCalendar />
                Add to calendar
              </a>
            </div>
          </div>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title">More {ev.type.toLowerCase()} events</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <EventCard key={e._id} ev={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

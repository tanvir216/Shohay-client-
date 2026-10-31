"use client";
import { useEffect, useState } from "react";
import { api, EVENT_TYPES } from "@/lib/api";
import EventCard, { CardSkeletons } from "@/components/EventCard";

export default function Events() {
  const [events, setEvents] = useState(null);
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setEvents(null);
    const t = setTimeout(() => {
      api(`/events?type=${encodeURIComponent(type)}&search=${encodeURIComponent(search)}`).then(setEvents).catch((e) => setErr(e.message));
    }, 250);
    return () => clearTimeout(t);
  }, [type, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="section-title">Upcoming events</h1>
      <p className="mt-2 opacity-80">Every event here is still open. Past events are removed automatically.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by event title" aria-label="Search events" className="input input-bordered w-full sm:max-w-sm" />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type" className="select select-bordered w-full sm:max-w-xs">
          <option>All</option>{EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="mt-8">
        {err ? <p className="text-error">{err}</p> : !events ? <CardSkeletons /> : events.length === 0 ? (
          <p className="rounded-box border border-dashed border-base-300 p-10 text-center">No events match your search. Try another type or clear the search box.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{events.map((e) => <EventCard key={e._id} ev={e} />)}</div>
        )}
      </div>
    </div>
  );
}

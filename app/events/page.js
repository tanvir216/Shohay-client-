"use client";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { api, EVENT_TYPES } from "@/lib/api";
import { TYPE_META } from "@/lib/meta";
import EventCard, { CardSkeletons } from "@/components/EventCard";

export default function Events() {
  const [events, setEvents] = useState(null);
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("soon");
  const [err, setErr] = useState("");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t && EVENT_TYPES.includes(t)) setType(t);
  }, []);
  useEffect(() => {
    setEvents(null);
    setErr("");
    const t = setTimeout(() => {
      api(
        `/events?type=${encodeURIComponent(type)}&search=${encodeURIComponent(search)}`,
      )
        .then(setEvents)
        .catch((e) => setErr(e.message));
    }, 250);
    return () => clearTimeout(t);
  }, [type, search]);

  const list = useMemo(() => {
    if (!events) return null;
    const c = [...events];
    c.sort((a, b) =>
      sort === "soon"
        ? a.date.localeCompare(b.date)
        : sort === "late"
          ? b.date.localeCompare(a.date)
          : a.title.localeCompare(b.title),
    );
    return c;
  }, [events, sort]);

  return (
    <>
      <div className="dots border-b border-base-300 bg-base-200">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="section-title">Upcoming events</h1>
          <p className="mt-2 opacity-80">
            Every event here is still open. Past events are removed
            automatically.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label className="input input-bordered flex w-full items-center gap-2 sm:max-w-md">
              <FiSearch className="opacity-60" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by event title"
                aria-label="Search events"
                className="grow"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort events"
              className="select select-bordered w-full sm:max-w-xs"
            >
              <option value="soon">Soonest first</option>
              <option value="late">Latest first</option>
              <option value="az">Title A–Z</option>
            </select>
          </div>
          <div
            className="mt-5 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by type"
          >
            {["All", ...EVENT_TYPES].map((t) => {
              const I = TYPE_META[t]?.icon;
              return (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  aria-pressed={type === t}
                  className={`btn btn-sm rounded-full ${type === t ? "btn-primary" : "btn-outline border-base-300"}`}
                >
                  {I && <I />}
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        {list && (
          <p className="mb-5 text-sm opacity-75" aria-live="polite">
            {list.length} {list.length === 1 ? "event" : "events"} found
          </p>
        )}
        {err ? (
          <p className="text-error">{err}</p>
        ) : !list ? (
          <CardSkeletons />
        ) : list.length === 0 ? (
          <div className="stitch p-10 text-center">
            <p>
              No events match your search. Try another type or clear the search
              box.
            </p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => {
                setType("All");
                setSearch("");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((e) => (
              <EventCard key={e._id} ev={e} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

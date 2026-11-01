"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiHeart, FiMapPin, FiUsers, FiCheckCircle } from "react-icons/fi";
import { api } from "@/lib/api";
import EventCard, { CardSkeletons } from "@/components/EventCard";

const IMG = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;
const gallery = [
  ["photo-1488521787991-ed7bbaae773c", "Volunteers sorting donated clothes"],
  ["photo-1593113598332-cd288d649433", "Neighbours planting saplings"],
  ["photo-1559027615-cd4628902d4a", "Food packs ready for delivery"],
  ["photo-1532629345422-7515f3d16bb6", "Street cleanup crew"],
  ["photo-1469571486292-0ba58a3f068b", "Children at a reading drive"],
  ["photo-1509099836639-18ba1795216d", "Community health camp"],
];
const features = [
  [FiMapPin, "Find drives nearby", "Browse upcoming events by area and cause, from Mirpur to Mohammadpur."],
  [FiHeart, "Host your own", "Post a distribution or cleanup in two minutes and let neighbours sign up."],
  [FiUsers, "Join in one tap", "Sign up for an event and see everything you have committed to in one list."],
  [FiCheckCircle, "Always current", "Events disappear the moment their date passes, so every card is still open."],
];

export default function Home() {
  const [events, setEvents] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => { api("/events?limit=6").then(setEvents).catch((e) => setErr(e.message)); }, []);

  return (
    <>
      <section className="bg-base-200">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
              Winter is coming. Your neighbours need a warm hand.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-85">
              Shohay lists clothes drives, blanket distributions, cleanups and plantation days near you. Pick one, show up, and make a difference this weekend.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/events" className="btn btn-primary btn-lg">Browse upcoming events</Link>
              <Link href="/create-event" className="btn btn-outline btn-primary btn-lg">Host an event</Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {gallery.slice(0, 3).map(([id, alt], i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={id} src={IMG(id)} alt={alt} className={`h-64 w-full rounded-box object-cover md:h-80 ${i === 1 ? "mt-8" : ""}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <h2 className="section-title">How Shohay helps</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([I, t, d]) => (
            <div key={t} className="h-full rounded-box border border-base-300 p-6">
              <I className="text-3xl text-primary" />
              <h3 className="mt-4 text-xl font-bold">{t}</h3>
              <p className="mt-2 leading-relaxed opacity-80">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="section-title">Coming up soon</h2>
          <Link href="/events" className="btn btn-ghost text-primary">See all events</Link>
        </div>
        {err ? <p className="text-error">{err}</p> : !events ? <CardSkeletons /> : events.length === 0 ? (
          <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
            <p className="text-lg">No upcoming events yet.</p>
            <Link href="/create-event" className="btn btn-primary mt-4">Create the first one</Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{events.map((e) => <EventCard key={e._id} ev={e} />)}</div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <h2 className="section-title">From our past drives</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map(([id, alt]) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={id} src={IMG(id)} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-box object-cover" />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="rounded-box bg-primary px-6 py-12 text-primary-content md:px-14">
        <h2 className="section-title">Get the weekly event list</h2>
          <p className="mt-2 max-w-xl opacity-90">One short email every Thursday with the drives happening near you.</p>
          <div className="mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="you@example.com" aria-label="Email address" className="input w-full text-base-content" />
            <button type="button" className="btn btn-accent">Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );
}

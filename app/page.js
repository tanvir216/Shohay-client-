"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FiArrowRight,
  FiSearch,
  FiUserPlus,
  FiSmile,
  FiChevronRight,
  FiMapPin,
  FiHeart,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";

import { api, EVENT_TYPES } from "@/lib/api";
import { TYPE_META } from "@/lib/meta";
import EventCard, { CardSkeletons } from "@/components/EventCard";

const IMG = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;
const gallery = [
  ["photo-1488521787991-ed7bbaae773c", "Volunteers sorting donated clothes"],
  ["photo-1593113598332-cd288d649433", "Neighbours planting saplings"],
  ["photo-1559027615-cd4628902d4a", "Food packs ready for delivery"],
  ["photo-1532629345422-7515f3d16bb6", "Street cleanup crew"],
  ["photo-1469571486292-0ba58a3f068b", "Children at a reading drive"],
  ["photo-1509099836639-18ba1795216d", "Community health camp"],
];

const features = [
  [
    FiMapPin,
    "Find drives nearby",
    "Browse upcoming events by area and cause, from Mirpur to Mohammadpur.",
  ],
  [
    FiHeart,
    "Host your own",
    "Post a distribution or cleanup in two minutes and let neighbours sign up.",
  ],
  [
    FiUsers,
    "Join in one tap",
    "Sign up for an event and see everything you have committed to in one list.",
  ],
  [
    FiCheckCircle,
    "Always current",
    "Events disappear the moment their date passes, so every card is still open.",
  ],
];
const steps = [
  [
    FiSearch,
    "Find a drive",
    "Filter by cause or search by title. Every event shown is still open.",
  ],
  [
    FiUserPlus,
    "Join in one tap",
    "Log in, press Join event, and it is saved to your list.",
  ],
  [
    FiSmile,
    "Show up and help",
    "Bring what the host asks for. Meet neighbours you did not know yet.",
  ],
];
const faqs = [
  [
    "Do I need an account to browse?",
    "No. Anyone can browse events. You only need to log in to join or host one.",
  ],
  ["Is Shohay free?", "Yes. Joining and hosting events costs nothing."],
  [
    "What happens when an event date passes?",
    "It is removed from the public list automatically, so you only see drives you can still join.",
  ],
  [
    "Can I edit or delete my event?",
    "Yes. Open Manage events from your account menu to update details or remove an event.",
  ],
];

export default function Home() {
  const [events, setEvents] = useState(null);
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    api("/events?limit=6")
      .then(setEvents)
      .catch((e) => setErr(e.message));
  }, []);

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email))
      return toast.error("Enter a valid email address.");
    toast.success("Thanks! You are on the list.");
    setEmail("");
  };

  return (
    <>
      <section className="dots bg-base-200">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-12 lg:py-24">
          <div className="hero-in lg:col-span-6">
            <span className="badge badge-accent badge-lg">
              Winter drives are open
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] md:text-6xl">
              Winter is coming. Your neighbours need a warm hand.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-85">
              Shohay lists clothes drives, blanket distributions, cleanups and
              plantation days near you. Pick one, show up, and make a difference
              this weekend.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/events" className="btn btn-primary btn-lg">
                Browse upcoming events <FiArrowRight />
              </Link>
              <Link
                href="/create-event"
                className="btn btn-outline btn-primary btn-lg"
              >
                Host an event
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div>
                <div className="font-display text-4xl font-extrabold text-primary">
                  {events ? (events.length >= 6 ? "6+" : events.length) : "–"}
                </div>
                <div className="text-sm opacity-75">events open right now</div>
              </div>
              <div className="h-10 border-l-2 border-dashed border-primary/40" />
              <div>
                <div className="font-display text-4xl font-extrabold text-primary">
                  {EVENT_TYPES.length}
                </div>
                <div className="text-sm opacity-75">ways to help</div>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-6">
            <div className="stitch grid grid-cols-6 grid-rows-6 gap-3 bg-base-100 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG(gallery[0][0])}
                alt={gallery[0][1]}
                className="col-span-4 row-span-4 h-full w-full rounded-lg object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG(gallery[1][0])}
                alt={gallery[1][1]}
                className="col-span-2 row-span-3 h-full w-full rounded-lg object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG(gallery[2][0])}
                alt={gallery[2][1]}
                className="col-span-2 row-span-3 h-full w-full rounded-lg object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG(gallery[3][0])}
                alt={gallery[3][1]}
                className="col-span-4 row-span-2 h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-box bg-accent px-4 py-3 text-accent-content shadow-lg">
              <p className="text-sm font-semibold">
                Every card is still open to join
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <h2 className="section-title">Choose how you want to help</h2>
        <p className="mt-2 max-w-xl opacity-80">
          Six kinds of drives, one place to find them.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_TYPES.map((t) => {
            const M = TYPE_META[t];
            return (
              <Link
                key={t}
                href={`/events?type=${encodeURIComponent(t)}`}
                className="group flex items-center gap-4 rounded-box border border-base-300 p-5 transition-colors hover:border-primary hover:bg-base-200"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/10 text-2xl text-primary">
                  {M && <M.icon />}
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-bold">{t}</span>
                  <span className="block text-sm opacity-75">{M?.blurb}</span>
                </span>
                <FiChevronRight className="opacity-40 transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="section-title">Coming up soon</h2>
          <Link href="/events" className="btn btn-ghost text-primary">
            See all events <FiArrowRight />
          </Link>
        </div>
        {err ? (
          <p className="text-error">{err}</p>
        ) : !events ? (
          <CardSkeletons />
        ) : events.length === 0 ? (
          <div className="stitch p-10 text-center">
            <p className="text-lg">No upcoming events yet.</p>
            <Link href="/create-event" className="btn btn-primary mt-4">
              Create the first one
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <EventCard key={e._id} ev={e} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <h2 className="section-title">Three steps to your first drive</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map(([I, t, d], i) => (
            <li key={t} className="stitch relative p-6">
              <span className="absolute -top-4 left-6 grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-content">
                {i + 1}
              </span>
              <I className="text-3xl text-primary" />
              <h3 className="mt-4 text-xl font-bold">{t}</h3>
              <p className="mt-2 leading-relaxed opacity-80">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <h2 className="section-title">From our past drives</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map(([id, alt]) => (
            <figure
              key={id}
              className="group relative overflow-hidden rounded-box"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG(id)}
                alt={alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm text-white">
                {alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <h2 className="section-title">Questions neighbours ask</h2>
        <div className="mt-8 space-y-3">
          {faqs.map(([q, a], i) => (
            <div
              key={q}
              className="collapse-arrow collapse rounded-box border border-base-300"
            >
              <input
                type="radio"
                name="faq"
                defaultChecked={i === 0}
                aria-label={q}
              />
              <div className="collapse-title text-lg font-semibold">{q}</div>
              <div className="collapse-content leading-relaxed opacity-85">
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="rounded-box bg-primary px-6 py-12 text-primary-content md:px-14">
          <div className="rounded-box border-2 border-dashed border-primary-content/40 p-6 md:p-10">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Get the weekly event list
            </h2>
            <p className="mt-2 max-w-xl opacity-90">
              One short email every Thursday with the drives happening near you.
            </p>
            <form
              onSubmit={subscribe}
              className="mt-6 flex max-w-lg flex-col gap-3 sm:flex-row"
              noValidate
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="input w-full text-base-content"
              />
              <button className="btn btn-accent">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

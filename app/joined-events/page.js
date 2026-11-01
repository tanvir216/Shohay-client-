"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Private from "@/components/Private";
import EventCard, { CardSkeletons } from "@/components/EventCard";
import { api } from "@/lib/api";

export default function Joined() {
  const [list, setList] = useState(null);
  useEffect(() => {
    api("/joined", { auth: true })
      .then(setList)
      .catch((e) => {
        toast.error(e.message);
        setList([]);
      });
  }, []);
  return (
    <Private>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="section-title">Events you have joined</h1>
        <p className="mt-2 opacity-80">
          {list && list.length > 0
            ? `You have joined ${list.length} ${list.length === 1 ? "event" : "events"}. `
            : ""}
          Sorted by event date, soonest first.
        </p>
        <div className="mt-8">
          {!list ? (
            <CardSkeletons n={3} />
          ) : list.length === 0 ? (
            <div className="stitch p-10 text-center">
              <p>You have not joined any events yet.</p>
              <Link href="/events" className="btn btn-primary mt-4">
                Find an event
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((j) => (
                <EventCard key={j._id} ev={{ ...j.event, _id: j.eventId }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Private>
  );
}

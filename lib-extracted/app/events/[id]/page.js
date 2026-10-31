"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiCalendar, FiMapPin, FiUser } from "react-icons/fi";
import { api, fmtDate, todayStr } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [ev, setEv] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { api(`/events/${id}`).then(setEv).catch((e) => setErr(e.message)); }, [id]);

  const join = async () => {
    if (!session) {
      toast.error("Please log in to join this event.");
      return router.push(`/login?next=/events/${id}`);
    }
    setBusy(true);
    try {
      await api(`/events/${id}/join`, { method: "POST", auth: true });
      toast.success("You have joined this event. See you there!");
    } catch (e) { toast.error(e.message); }
    setBusy(false);
  };

  if (err) return <p className="mx-auto max-w-3xl px-4 py-20 text-center text-error">{err}</p>;
  if (!ev) return <div className="mx-auto max-w-4xl space-y-4 px-4 py-12"><div className="skeleton h-80 w-full" /><div className="skeleton h-8 w-2/3" /><div className="skeleton h-32 w-full" /></div>;
  const past = ev.date < todayStr();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ev.thumbnail} alt={ev.title} className="aspect-[16/8] w-full rounded-box object-cover" />
      <span className="badge badge-accent mt-6">{ev.type}</span>
      <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">{ev.title}</h1>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 opacity-85">
        <span className="flex items-center gap-2"><FiMapPin className="text-primary" />{ev.location}</span>
        <span className="flex items-center gap-2"><FiCalendar className="text-primary" />{fmtDate(ev.date)}</span>
        <span className="flex items-center gap-2"><FiUser className="text-primary" />Hosted by {ev.creatorName || ev.creatorEmail}</span>
      </div>
      <p className="mt-6 max-w-prose whitespace-pre-line text-lg leading-relaxed">{ev.description}</p>
      <button onClick={join} disabled={busy || past} className="btn btn-primary btn-lg mt-8">
        {busy ? <span className="loading loading-spinner" /> : past ? "This event has ended" : "Join Event"}
      </button>
    </div>
  );
}

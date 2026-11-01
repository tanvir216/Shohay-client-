"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Private from "@/components/Private";
import EventForm from "@/components/EventForm";
import { api } from "@/lib/api";

export default function CreateEvent() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const create = async (f) => {
    setBusy(true);
    try {
      await api("/events", { method: "POST", body: f, auth: true });
      toast.success(
        "Your event is live! You can edit or delete it anytime from here.",
        { duration: 5000 },
      );
      router.push("/manage-events");
    } catch (e) {
      toast.error(e.message);
      setBusy(false);
    }
  };
  return (
    <Private>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="section-title">Create an event</h1>
        <p className="mb-8 mt-2 opacity-80">
          Tell neighbours what you are organising and where to show up.
        </p>
        <EventForm onSubmit={create} submitLabel="Publish event" busy={busy} />
      </div>
    </Private>
  );
}

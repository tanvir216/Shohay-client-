"use client";
import { useState } from "react";
import { EVENT_TYPES, todayStr, validateEvent } from "@/lib/api";

const empty = { title: "", description: "", type: "", thumbnail: "", location: "", date: "" };

function Field({ label, error, children }) {
  return (
    <label className="block w-full">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-error">{error}</span>}
    </label>
  );
}

export default function EventForm({ initial = empty, onSubmit, submitLabel, busy }) {
  const [f, setF] = useState({ ...empty, ...initial });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errs = validateEvent(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit(f);
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2"><Field label="Event title" error={errors.title}>
        <input className="input input-bordered w-full" value={f.title} onChange={set("title")} placeholder="Winter Clothes Distribution" />
      </Field></div>
      <Field label="Event type" error={errors.type}>
        <select className="select select-bordered w-full" value={f.type} onChange={set("type")}>
          <option value="">Select a type</option>
          {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Event date" error={errors.date}>
        <input type="date" min={todayStr()} className="input input-bordered w-full" value={f.date} onChange={set("date")} />
      </Field>
      <Field label="Location" error={errors.location}>
        <input className="input input-bordered w-full" value={f.location} onChange={set("location")} placeholder="Mirpur 10, Dhaka" />
      </Field>
      <Field label="Thumbnail image URL" error={errors.thumbnail}>
        <input className="input input-bordered w-full" value={f.thumbnail} onChange={set("thumbnail")} placeholder="https://..." />
      </Field>
      <div className="md:col-span-2"><Field label="Description" error={errors.description}>
        <textarea rows={5} className="textarea textarea-bordered w-full" value={f.description} onChange={set("description")}
          placeholder="What will volunteers do, what should they bring, and who will it help?" />
      </Field></div>
      <div className="md:col-span-2">
        <button className="btn btn-primary" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : submitLabel}</button>
      </div>
    </form>
  );
}

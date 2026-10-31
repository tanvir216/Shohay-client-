"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Private from "@/components/Private";
import EventForm from "@/components/EventForm";
import { api, fmtDate } from "@/lib/api";

export default function ManageEvents() {
  const [list, setList] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => api("/my-events", { auth: true }).then(setList).catch((e) => { toast.error(e.message); setList([]); }), []);
  useEffect(() => { load(); }, [load]);

  const update = async (f) => {
    setBusy(true);
    try {
      await api(`/events/${editing._id}`, { method: "PUT", body: f, auth: true });
      toast.success("Event updated.");
      setEditing(null); load();
    } catch (e) { toast.error(e.message); }
    setBusy(false);
  };
  const remove = async () => {
    setBusy(true);
    try {
      await api(`/events/${deleting._id}`, { method: "DELETE", auth: true });
      toast.success("Event deleted.");
      setDeleting(null); load();
    } catch (e) { toast.error(e.message); }
    setBusy(false);
  };

  return (
    <Private>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="section-title">Manage your events</h1>
        {!list ? <div className="skeleton mt-8 h-64 w-full" /> : list.length === 0 ? (
          <div className="mt-8 rounded-box border border-dashed border-base-300 p-10 text-center">
            <p>You have not created any events yet.</p>
            <Link href="/create-event" className="btn btn-primary mt-4">Create your first event</Link>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead><tr><th>Event</th><th>Type</th><th>Date</th><th>Location</th><th className="text-right">Actions</th></tr></thead>
              <tbody>
                {list.map((e) => (
                  <tr key={e._id}>
                    <td className="font-medium">{e.title}</td><td>{e.type}</td><td>{fmtDate(e.date)}</td><td>{e.location}</td>
                    <td className="space-x-2 whitespace-nowrap text-right">
                      <button className="btn btn-sm btn-outline btn-primary" onClick={() => setEditing(e)}>Update</button>
                      <button className="btn btn-sm btn-outline btn-error" onClick={() => setDeleting(e)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold">Update event</h2>
            <EventForm initial={editing} onSubmit={update} submitLabel="Save changes" busy={busy} />
            <button className="btn btn-ghost mt-3" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </dialog>
      )}
      {deleting && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold">Delete this event?</h2>
            <p className="py-3">“{deleting.title}” and everyone’s sign-ups for it will be removed. This cannot be undone.</p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setDeleting(null)}>Keep event</button>
              <button className="btn btn-error" onClick={remove} disabled={busy}>{busy ? <span className="loading loading-spinner" /> : "Delete event"}</button>
            </div>
          </div>
        </dialog>
      )}
    </Private>
  );
}

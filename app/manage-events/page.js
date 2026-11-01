"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Private from "@/components/Private";
import EventForm from "@/components/EventForm";
import { FiEye, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { api, fmtDate, todayStr } from "@/lib/api";

export default function ManageEvents() {
  const [list, setList] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(
    () =>
      api("/my-events", { auth: true })
        .then(setList)
        .catch((e) => {
          toast.error(e.message);
          setList([]);
        }),
    [],
  );
  useEffect(() => {
    load();
  }, [load]);

  const update = async (f) => {
    setBusy(true);
    try {
      await api(`/events/${editing._id}`, {
        method: "PUT",
        body: f,
        auth: true,
      });
      toast.success("Event updated.");
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message);
    }
    setBusy(false);
  };
  const remove = async () => {
    setBusy(true);
    try {
      await api(`/events/${deleting._id}`, { method: "DELETE", auth: true });
      toast.success("Event deleted.");
      setDeleting(null);
      load();
    } catch (e) {
      toast.error(e.message);
    }
    setBusy(false);
  };

  return (
    <Private>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="section-title">Manage your events</h1>
            <p className="mt-2 opacity-80">
              Update details, or remove an event that is no longer happening.
            </p>
          </div>
          <Link href="/create-event" className="btn btn-primary">
            <FiPlus />
            New event
          </Link>
        </div>
        {list && list.length > 0 && (
          <div className="stats stats-vertical mt-8 w-full border border-base-300 sm:stats-horizontal">
            <div className="stat">
              <div className="stat-title">Total events</div>
              <div className="stat-value text-primary">{list.length}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Upcoming</div>
              <div className="stat-value text-primary">
                {list.filter((e) => e.date >= todayStr()).length}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Past</div>
              <div className="stat-value">
                {list.filter((e) => e.date < todayStr()).length}
              </div>
            </div>
          </div>
        )}
        {!list ? (
          <div className="skeleton mt-8 h-64 w-full" />
        ) : list.length === 0 ? (
          <div className="stitch mt-8 p-10 text-center">
            <p>You have not created any events yet.</p>
            <Link href="/create-event" className="btn btn-primary mt-4">
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((e) => (
                  <tr key={e._id}>
                    <td className="min-w-64">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={e.thumbnail}
                          alt=""
                          className="h-12 w-16 shrink-0 rounded-md object-cover"
                        />
                        <span className="font-medium">{e.title}</span>
                      </div>
                    </td>
                    <td>{e.type}</td>
                    <td className="whitespace-nowrap">
                      {fmtDate(e.date)}{" "}
                      {e.date < todayStr() && (
                        <span className="badge badge-ghost badge-sm ml-1">
                          Ended
                        </span>
                      )}
                    </td>
                    <td>{e.location}</td>
                    <td className="space-x-2 whitespace-nowrap text-right">
                      <Link
                        href={`/events/${e._id}`}
                        className="btn btn-sm btn-ghost"
                        aria-label={`View ${e.title}`}
                      >
                        <FiEye />
                      </Link>
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => setEditing(e)}
                      >
                        <FiEdit2 />
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => setDeleting(e)}
                      >
                        <FiTrash2 />
                        Delete
                      </button>
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
            <EventForm
              initial={editing}
              onSubmit={update}
              submitLabel="Save changes"
              busy={busy}
            />
            <button
              className="btn btn-ghost mt-3"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </dialog>
      )}
      {deleting && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold">Delete this event?</h2>
            <p className="py-3">
              “{deleting.title}” and everyone’s sign-ups for it will be removed.
              This cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setDeleting(null)}
              >
                Keep event
              </button>
              <button
                className="btn btn-error"
                onClick={remove}
                disabled={busy}
              >
                {busy ? (
                  <span className="loading loading-spinner" />
                ) : (
                  "Delete event"
                )}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </Private>
  );
}

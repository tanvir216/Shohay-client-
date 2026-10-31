"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaImage } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import Private from "@/components/Private";

const fallbackAvatar = (name) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name || "User")}`;

function ProfileForm() {
  const { data } = authClient.useSession();
  const user = data.user;

  const [name, setName] = useState(user.name || "");
  const [photo, setPhoto] = useState(user.image || "");
  const [busy, setBusy] = useState(false);
  const [imgBroken, setImgBroken] = useState(false);

  const unchanged =
    name.trim() === (user.name || "") && photo.trim() === (user.image || "");

  const save = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2)
      return toast.error("Name needs at least 2 characters.");
    if (photo.trim()) {
      try {
        new URL(photo.trim());
      } catch {
        return toast.error("Enter a valid photo URL (https://...).");
      }
    }
    setBusy(true);
    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: photo.trim() || null,
    });
    setBusy(false);
    if (error)
      return toast.error(error.message || "Could not update your profile.");
    toast.success("Profile updated.");
  };

  const reset = () => {
    setName(user.name || "");
    setPhoto(user.image || "");
    setImgBroken(false);
  };

  const preview =
    photo.trim() && !imgBroken
      ? photo.trim()
      : fallbackAvatar(name || user.name);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="section-title">My profile</h1>
      <p className="mb-8 mt-2 opacity-80">
        Update how your name and photo appear to other neighbours.
      </p>

      <div className="grid gap-6 md:grid-cols-[18rem_1fr]">
        {/* identity card */}
        <aside className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-4 ring-offset-base-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt={name || user.name}
                onError={() => setImgBroken(true)}
              />
            </div>
          </div>
          <h2 className="mt-5 truncate font-display text-xl font-bold">
            {name || user.name}
          </h2>
          <p className="truncate text-sm opacity-70">{user.email}</p>
          {user.createdAt && (
            <p className="mt-4 text-xs opacity-60">
              Member since{" "}
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </aside>

        {/* edit form */}
        <form
          onSubmit={save}
          noValidate
          className="space-y-5 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8"
        >
          <div>
            <span className="mb-1.5 block text-sm font-medium">Full name</span>
            <label className="input input-bordered flex w-full items-center gap-3 focus-within:border-primary focus-within:outline-primary">
              <FaUser className="opacity-50" />
              <input
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                aria-label="Full name"
                autoComplete="name"
              />
            </label>
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium">Email</span>
            <label className="input input-bordered flex w-full items-center gap-3 opacity-70">
              <FaEnvelope className="opacity-50" />
              <input
                className="grow"
                value={user.email}
                readOnly
                disabled
                aria-label="Email"
              />
            </label>
            <p className="mt-1 text-xs opacity-60">
              Your email is your login, so it can&apos;t be changed here.
            </p>
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium">Photo URL</span>
            <label className="input input-bordered flex w-full items-center gap-3 focus-within:border-primary focus-within:outline-primary">
              <FaImage className="opacity-50" />
              <input
                className="grow"
                value={photo}
                onChange={(e) => {
                  setPhoto(e.target.value);
                  setImgBroken(false);
                }}
                placeholder="https://... (leave empty for a default avatar)"
                aria-label="Photo URL"
              />
            </label>
            {imgBroken && (
              <p className="mt-1 text-xs text-error">
                We couldn&apos;t load that image. Check the link.
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={reset}
              className="btn btn-ghost"
              disabled={busy || unchanged}
            >
              Reset
            </button>
            <button
              className="btn btn-primary shadow-md shadow-primary/25"
              disabled={busy || unchanged}
            >
              {busy ? (
                <span className="loading loading-spinner" />
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <Private>
      <ProfileForm />
    </Private>
  );
}

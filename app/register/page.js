"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { validatePassword } from "@/lib/api";
import AuthShell from "@/components/AuthShell";

export default function Register() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");
  const score = [
    pw.length >= 6,
    /[A-Z]/.test(pw),
    /[a-z]/.test(pw),
    pw.length >= 10,
  ].filter(Boolean).length;
  const rules = [
    ["6+ characters", pw.length >= 6],
    ["Uppercase letter", /[A-Z]/.test(pw)],
    ["Lowercase letter", /[a-z]/.test(pw)],
  ];

  const submit = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = Object.fromEntries(
      new FormData(e.target),
    );
    if (!name.trim() || !email.trim())
      return toast.error("Name and email are required.");
    const pErr = validatePassword(password);
    if (pErr) return toast.error(pErr);
    setBusy(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL || undefined,
    });
    setBusy(false);
    if (error)
      return toast.error(error.message || "Could not create your account.");
    toast.success("Account created. Welcome to Shohay!");
    router.push("/");
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join your neighbours in making a difference."
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <input
          name="name"
          placeholder="Full name"
          aria-label="Full name"
          className="input input-bordered w-full"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          className="input input-bordered w-full"
        />
        <input
          name="photoURL"
          placeholder="Photo URL (optional)"
          aria-label="Photo URL"
          className="input input-bordered w-full"
        />
        <label className="input input-bordered flex w-full items-center">
          <input
            name="password"
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            className="grow"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Hide password" : "Show password"}
            className="opacity-70"
          >
            {show ? <FiEyeOff /> : <FiEye />}
          </button>
        </label>
        <progress
          className={`progress w-full ${score >= 3 ? "progress-success" : "progress-warning"}`}
          value={score}
          max="4"
          aria-label="Password strength"
        />
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {rules.map(([t, ok]) => (
            <li key={t} className={ok ? "text-success" : "opacity-60"}>
              {ok ? "✓" : "○"} {t}
            </li>
          ))}
        </ul>
        <button className="btn btn-primary w-full" disabled={busy}>
          {busy ? (
            <span className="loading loading-spinner" />
          ) : (
            "Create account"
          )}
        </button>
      </form>
      <p className="mt-6 text-center">
        Already registered?{" "}
        <Link href="/login" className="link link-primary font-medium">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}

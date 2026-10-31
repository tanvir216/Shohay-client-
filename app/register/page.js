"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { validatePassword } from "@/lib/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthShell from "@/components/AuthShell";

export default function Register() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            aria-label="Password"
            className="input input-bordered w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        <p className="text-sm opacity-70">
          At least 6 characters, with one uppercase and one lowercase letter.
        </p>
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

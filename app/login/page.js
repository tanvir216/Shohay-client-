"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import AuthShell from "@/components/AuthShell";

export default function Login() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const next = () => new URLSearchParams(window.location.search).get("next") || "/";

  const submit = async (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));
    if (!email || !password) return toast.error("Enter your email and password.");
    setBusy(true);
    const { error } = await authClient.signIn.email({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message || "Email or password is incorrect.");
    toast.success("Welcome back! You are logged in.");
    router.push(next());
  };
  const google = () => authClient.signIn.social({ provider: "google", callbackURL: next() });

  return (
    <AuthShell title="Log in" subtitle="Pick up where you left off.">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <input name="email" type="email" placeholder="Email" aria-label="Email" className="input input-bordered w-full" />
        <input name="password" type="password" placeholder="Password" aria-label="Password" className="input input-bordered w-full" />
        <button className="btn btn-primary w-full" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : "Log in"}</button>
      </form>
      <div className="divider">or</div>
      <button onClick={google} className="btn btn-outline w-full"><FcGoogle size={20} />Continue with Google</button>
      <p className="mt-6 text-center">New to Shohay? <Link href="/register" className="link link-primary font-medium">Create an account</Link></p>
    </AuthShell>
  );
}

"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// Waits for the session to load before deciding, so a reload never bounces a logged-in user to /login.
export default function Private({ children }) {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!isPending && !data) router.replace(`/login?next=${encodeURIComponent(path)}`);
  }, [isPending, data, router, path]);

  if (isPending || !data) {
    return <div className="mx-auto max-w-3xl space-y-4 px-4 py-16"><div className="skeleton h-10 w-1/2" /><div className="skeleton h-64 w-full" /></div>;
  }
  return children;
}

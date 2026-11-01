"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export const Logo = () => (
  <Link
    href="/"
    className="flex items-center gap-2 font-display text-2xl font-bold text-primary"
  >
    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-lg text-primary-content">
      স
    </span>
    Shohay
  </Link>
);

export default function Navbar() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const user = data?.user;

  const logout = async () => {
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <Logo />
        </div>
        <nav className="navbar-center hidden sm:flex">
          <Link href="/events" className="btn btn-ghost">
            Upcoming Events
          </Link>
        </nav>
        <div className="navbar-end gap-1">
          <Link href="/events" className="btn btn-ghost btn-sm sm:hidden">
            Events
          </Link>
          <ThemeToggle />
          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full" />
          ) : !user ? (
            <Link href="/login" className="btn btn-primary btn-sm md:btn-md">
              Login
            </Link>
          ) : (
            <>
              <div className="dropdown dropdown-end">
                <div className="tooltip tooltip-bottom" data-tip={user.name}>
                  <button
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                    aria-label="Open account menu"
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          user.image ||
                          `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name)}`
                        }
                        alt={user.name}
                      />
                    </div>
                  </button>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
                >
                  <li className="menu-title truncate">{user.email}</li>
                  <li>
                    <Link href="/profile">My profile</Link>
                  </li>
                  <li>
                    <Link href="/create-event">Create event</Link>
                  </li>
                  <li>
                    <Link href="/manage-events">Manage Events</Link>
                  </li>
                  <li>
                    <Link href="/joined-events">Joined Events</Link>
                  </li>
                </ul>
              </div>
              <button
                onClick={logout}
                className="btn btn-outline btn-primary btn-sm md:btn-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

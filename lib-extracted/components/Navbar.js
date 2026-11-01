"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiMenu, FiX, FiPlus } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export const Logo = () => (
  <Link
    href="/"
    className="flex items-center gap-2 font-display text-2xl font-bold text-primary"
  >
    <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-dashed border-primary-content/60 bg-primary text-lg text-primary-content">
      স
    </span>
    Shohay
  </Link>
);

const links = [
  ["/events", "Upcoming events"],
  ["/create-event", "Host an event"],
  ["/joined-events", "My events"],
];

export default function Navbar() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = data?.user;

  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const logout = async () => {
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
  };
  const active = (h) => path === h || path.startsWith(h + "/");

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-base-100/90 backdrop-blur transition-shadow ${scrolled ? "border-base-300 shadow-sm" : "border-transparent"}`}
    >
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <Logo />
        </div>
        <nav className="navbar-center hidden gap-1 md:flex" aria-label="Main">
          {links.map(([h, l]) => (
            <Link
              key={h}
              href={h}
              className={`btn btn-ghost btn-sm ${active(h) ? "bg-base-200 text-primary" : ""}`}
              aria-current={active(h) ? "page" : undefined}
            >
              {l}
            </Link>
          ))}
        </nav>
        <div className="navbar-end gap-1">
          <ThemeToggle />
          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full" />
          ) : !user ? (
            <>
              <Link href="/login" className="btn btn-primary btn-sm md:btn-md">
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-outline btn-primary btn-sm hidden sm:inline-flex md:btn-md"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/create-event"
                className="btn btn-primary btn-sm hidden lg:inline-flex"
              >
                <FiPlus />
                New event
              </Link>
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
                  className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
                >
                  <li className="px-3 pb-1 pt-2">
                    <span className="block font-semibold leading-tight">
                      {user.name}
                    </span>
                    <span className="block truncate text-xs opacity-70">
                      {user.email}
                    </span>
                  </li>
                  <li className="stitch-line mt-1" />
                  <li>
                    <Link href="/profile">My profile</Link>
                  </li>
                  <li>
                    <Link href="/create-event">Create event</Link>
                  </li>
                  <li>
                    <Link href="/manage-events">Manage events</Link>
                  </li>
                  <li>
                    <Link href="/joined-events">Joined events</Link>
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
          <button
            className="btn btn-ghost btn-circle md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="border-t border-base-300 bg-base-100 px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          <ul className="menu w-full gap-1">
            {links.map(([h, l]) => (
              <li key={h}>
                <Link href={h} className={active(h) ? "menu-active" : ""}>
                  {l}
                </Link>
              </li>
            ))}
            {user ? (
              <li>
                <Link href="/profile">My profile</Link>
              </li>
            ) : (
              <li>
                <Link href="/register">Register</Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

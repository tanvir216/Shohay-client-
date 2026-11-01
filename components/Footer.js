import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Logo } from "./Navbar";
import { TYPE_META } from "@/lib/meta";

export default function Footer() {
  return (
    <footer className="mt-24 bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="[&_a]:text-accent">
            <Logo />
          </div>
          <p className="mt-4 max-w-md leading-relaxed opacity-80">
            Shohay brings neighbours together for winter clothes drives, blanket
            distribution, cleanups and tree planting across Bangladesh.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              [FaFacebookF, "Facebook"],
              [FaXTwitter, "X"],
              [FaInstagram, "Instagram"],
              [FaLinkedinIn, "LinkedIn"],
            ].map(([I, n]) => (
              <a
                key={n}
                href="#"
                aria-label={n}
                className="btn btn-circle btn-sm btn-outline border-neutral-content/40 text-neutral-content hover:border-accent hover:bg-accent hover:text-accent-content"
              >
                <I />
              </a>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-3 text-lg font-semibold">Explore</h3>
          <ul className="space-y-2 opacity-80">
            <li>
              <Link href="/events" className="hover:text-accent">
                Upcoming events
              </Link>
            </li>
            <li>
              <Link href="/create-event" className="hover:text-accent">
                Host an event
              </Link>
            </li>
            <li>
              <Link href="/joined-events" className="hover:text-accent">
                My joined events
              </Link>
            </li>
            <li>
              <Link href="/manage-events" className="hover:text-accent">
                Manage events
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-3 text-lg font-semibold">Causes</h3>
          <ul className="space-y-2 opacity-80">
            {Object.keys(TYPE_META)((t) => (
              <li key={t}>
                <Link
                  href={`/events?type=${encodeURIComponent(t)}`}
                  className="hover:text-accent"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <h3 className="mb-3 text-lg font-semibold">Contact</h3>
          <ul className="space-y-3 opacity-80">
            <li className="flex gap-2">
              <FiMapPin className="mt-1 shrink-0" />
              House 12, Road 4, Mirpur 10, Dhaka
            </li>
            <li className="flex gap-2">
              <FiMail className="mt-1 shrink-0" />
              hello@shohay.org
            </li>
            <li className="flex gap-2">
              <FiPhone className="mt-1 shrink-0" />
              +880 1700-000000
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <div className="stitch-line opacity-40" />
      </div>
      <div className="py-5 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Shohay. Built for neighbours, by
        neighbours.
      </div>
    </footer>
  );
}

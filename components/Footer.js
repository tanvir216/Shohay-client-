import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Logo } from "./Navbar";

export default function Footer() {
  return (
    <footer className="mt-20 bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="[&_a]:text-accent"><Logo /></div>
          <p className="mt-4 max-w-md leading-relaxed opacity-80">
            Shohay brings neighbours together for winter clothes drives, blanket distribution, cleanups and tree planting across Bangladesh.
          </p>
          <div className="mt-5 flex gap-3">
            {[[FaFacebookF, "Facebook"], [FaXTwitter, "X"], [FaInstagram, "Instagram"], [FaLinkedinIn, "LinkedIn"]].map(([I, n]) => (
              <a key={n} href="#" aria-label={n} className="btn btn-circle btn-sm btn-outline border-neutral-content/40 text-neutral-content hover:bg-accent hover:text-accent-content"><I /></a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold">Explore</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link href="/events">Upcoming Events</Link></li>
            <li><Link href="/create-event">Host an Event</Link></li>
            <li><Link href="/joined-events">My Joined Events</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold">Contact</h3>
          <ul className="space-y-2 opacity-80">
            <li>House 12, Road 4, Mirpur 10, Dhaka</li>
            <li>hello@shohay.org</li>
            <li>+880 1700-000000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-content/20 py-4 text-center text-sm opacity-70">© {new Date().getFullYear()} Shohay. Built for neighbours, by neighbours.</div>
    </footer>
  );
}

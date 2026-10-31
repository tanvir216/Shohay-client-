import { FaHandsHelping, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const perks = [
  {
    icon: FaMapMarkerAlt,
    text: "Find service drives right in your neighbourhood",
  },
  { icon: FaHandsHelping, text: "Host an event and rally people to help" },
  { icon: FaUsers, text: "Join neighbours who are making a difference" },
];

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="relative isolate overflow-hidden">
      {/* soft decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-[78vh] max-w-5xl items-center px-4 py-10 md:py-16">
        <div className="grid overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-2xl shadow-primary/10 md:grid-cols-2">
          {/* brand panel */}
          <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-secondary p-10 text-primary-content md:flex">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10"
            />
            <div className="relative">
              <span className="font-display text-2xl font-bold tracking-tight">
                Shohay
              </span>
              <h2 className="mt-8 font-display text-3xl font-bold leading-tight">
                Small acts.
                <br />
                Big change.
              </h2>
              <p className="mt-3 max-w-xs opacity-90">
                A home for community service events, built by neighbours, for
                neighbours.
              </p>
            </div>
            <ul className="relative mt-10 space-y-4">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20">
                    <Icon size={16} />
                  </span>
                  <span className="text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* form panel */}
          <section className="p-6 sm:p-10">
            <h1 className="font-display text-3xl font-bold">{title}</h1>
            <p className="mb-7 mt-1 opacity-75">{subtitle}</p>
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}

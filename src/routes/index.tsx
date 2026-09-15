import { createFileRoute, Link } from "@tanstack/react-router";
import { InstallerCards } from "@/components/cinevo/installers";
import { Logo } from "@/components/cinevo/logo";

export const Route = createFileRoute("/")({ component: Home });

const BILLS = [
  { line: "Still with Plex? Babe…", invert: false },
  { line: "Be honest. Plex is your ex.", invert: true },
  { line: "You outgrew Plex. We’re glad.", invert: false },
  { line: "Dump Plex already.", invert: false, accent: true },
];

const ACTS = [
  { k: "01", t: "Your library.", d: "Point at a folder. Or bring Plex and Jellyfin with you. Nothing uploads." },
  { k: "02", t: "Your house.", d: "CINEVO Node sits on the machine with the files. Pair once. Playback stays home." },
  { k: "03", t: "Your cinema.", d: "4K. No ads. No subscriptions. A private screen that does not phone home." },
];

function Home() {
  return (
    <div className="bg-black text-cine-text">
      <section className="relative min-h-svh overflow-hidden bg-black">
        <div className="cine-letterbox pointer-events-none absolute inset-0 z-20 hidden md:block" />
        <img
          src="/stills/hero-theater.jpg"
          alt=""
          className="cine-hero-still absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
        <div className="cine-grain absolute inset-0 z-10" />

        <header className="relative z-30 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8 md:pt-8">
          <span className="font-display text-sm font-extrabold tracking-[0.28em] text-white">CINEVO</span>
          <nav className="flex items-center gap-2">
            <a href="#press" className="hidden h-11 items-center px-3 font-ui text-sm font-medium text-white/70 hover:text-white sm:inline-flex">
              Press
            </a>
            <Link to="/node" className="hidden h-11 items-center px-3 font-ui text-sm font-medium text-white/70 hover:text-white sm:inline-flex">
              Node
            </Link>
            <Link
              to="/app"
              className="inline-flex h-11 items-center rounded-full bg-white px-5 font-ui text-sm font-semibold uppercase tracking-wider text-black"
            >
              Enter
            </Link>
          </nav>
        </header>

        <div className="relative z-30 mx-auto flex min-h-[calc(100svh-5.5rem)] max-w-5xl flex-col items-center justify-center px-5 pb-28 pt-6 text-center md:pb-36">
          <p className="cine-rise font-ui text-[11px] font-semibold uppercase tracking-[0.42em] text-white/70">A private cinema</p>
          <div className="cine-rise-delay mt-5">
            <Logo size="lg" className="text-white" />
          </div>
          <h1 className="cine-rise-late mt-6 font-display text-5xl font-extrabold leading-[0.9] tracking-tight text-white md:text-7xl">
            Cinema,
            <br />
            Reinvented.
          </h1>
          <div className="cine-rise-late mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/app"
              className="inline-flex h-12 items-center rounded-full bg-white px-8 font-ui text-sm font-semibold uppercase tracking-wider text-black"
            >
              Enter cinema
            </Link>
            <a
              href="#rebound"
              className="inline-flex h-12 items-center rounded-full border border-white/35 px-8 font-ui text-sm font-semibold uppercase tracking-wider text-white"
            >
              The campaign
            </a>
          </div>
          <p className="cine-rise-late mt-10 font-ui text-xs uppercase tracking-[0.28em] text-white/55">
            4K · Local privacy · No ads · No subscriptions
          </p>
        </div>
      </section>

      <section className="relative flex min-h-[85vh] items-end overflow-hidden border-y border-white/10">
        <img src="/stills/screen-glow.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 saturate-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-5 py-24 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:py-28">
          <h2 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
            The house lights go down.
            <br />
            Your library stays.
          </h2>
          <p className="self-end max-w-md text-lg text-white/70">
            CINEVO is a private cinema for films you already own. Folders on disk. Plex. Jellyfin. Playback never leaves the building.
          </p>
        </div>
      </section>

      <section className="grid gap-px border-y border-white/10 bg-white/10 md:grid-cols-3">
        {ACTS.map((act) => (
          <article key={act.k} className="bg-black px-6 py-12 md:px-8 md:py-16">
            <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.32em] text-cine-cyan">{act.k}</p>
            <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight md:text-4xl">{act.t}</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{act.d}</p>
          </article>
        ))}
      </section>

      <section id="rebound">
        <p className="px-5 pt-16 text-center font-ui text-[11px] font-semibold uppercase tracking-[0.42em] text-white/45">
          Rebound with CINEVO
        </p>
        {BILLS.map((bill) => (
          <article
            key={bill.line}
            className={`flex min-h-[78vh] flex-col justify-between px-6 py-16 md:min-h-[88vh] md:px-20 md:py-20 ${
              bill.invert ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <p className={`font-ui text-[11px] font-semibold uppercase tracking-[0.4em] ${bill.invert ? "text-black/40" : "text-white/40"}`}>
              Outdoor · 2026
            </p>
            <p className="max-w-5xl font-display text-5xl font-extrabold leading-[0.9] tracking-tight sm:text-6xl md:text-8xl">
              {bill.line}
            </p>
            <Logo size="md" className={bill.accent ? "text-cine-cyan" : bill.invert ? "text-black" : "text-white"} />
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:px-8" id="downloads">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.32em] text-white/45">Feature presentation</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight md:text-6xl">
          Windows. Mac. Node.
          <br />
          The projector lives at home.
        </h2>
        <p className="mt-5 mb-10 max-w-xl text-white/60">
          Install CINEVO Node on the computer that holds the files. Pair once. Stream to the house.
        </p>
        <div className="mb-10 flex flex-wrap gap-2">
          {["Windows", "Mac", "Linux", "Android TV"].map((p) => (
            <span key={p} className="inline-flex h-11 items-center rounded-full border border-white/20 px-4 font-ui text-sm">
              {p}
            </span>
          ))}
        </div>
        <InstallerCards />
      </section>

      <section id="press" className="bg-white text-black">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
          <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.32em] text-black/40">Press kit</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Cinema, Reinvented.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="flex min-h-56 items-center justify-center bg-black">
              <Logo size="lg" className="text-white" />
            </div>
            <div className="flex min-h-56 items-center justify-center border border-black/15 bg-white">
              <Logo size="lg" className="text-black" />
            </div>
            <div className="flex min-h-56 items-center justify-center bg-black">
              <Logo size="lg" className="text-cine-cyan" />
            </div>
          </div>
          <p className="mt-10 max-w-lg text-sm text-black/55">
            CINEVO is a private cinema for libraries you already own. Folders, Plex, and Jellyfin. No ads. No subscriptions.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-5 py-12 md:px-8">
          <div>
            <Logo size="md" className="text-white" />
            <p className="mt-4 font-ui text-[11px] uppercase tracking-[0.32em] text-white/35">End titles · 2026</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-white/50">
            <a href="#press" className="hover:text-white">Press kit</a>
            <Link to="/node" className="hover:text-white">Support</Link>
            <Link to="/app" className="hover:text-white">Enter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

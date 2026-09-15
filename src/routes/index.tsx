import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { InstallerCards } from "@/components/cinevo/installers";
import { Logo } from "@/components/cinevo/logo";
import { Reveal, useParallax } from "@/components/cinevo/cine-motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const BILLS = [
  { line: "Still with Plex? Babe…", still: "/stills/hero-theater.jpg", invert: false },
  { line: "Be honest. Plex is your ex.", still: "", invert: true },
  { line: "You outgrew Plex. We’re glad.", still: "/stills/doorway.jpg", invert: false },
  { line: "Dump Plex already.", still: "/stills/projector.jpg", invert: false, accent: true },
];

const ACTS = [
  { k: "I", t: "Your library.", d: "Point at a folder. Or bring Plex and Jellyfin with you. Nothing uploads." },
  { k: "II", t: "Your house.", d: "CINEVO Node sits on the machine with the files. Pair once. Playback stays home." },
  { k: "III", t: "Your cinema.", d: "4K. No ads. No subscriptions. A private screen that does not phone home." },
];

const CREDITS = [
  ["Written by", "Your library"],
  ["Directed by", "You"],
  ["Photography", "The house"],
  ["Projection", "CINEVO Node"],
  ["Sound", "Local only"],
  ["No studio", "No ads"],
];

function Reel({
  still,
  ken,
  bars,
  factor = 36,
  children,
  className,
}: {
  still?: string;
  ken?: boolean;
  bars?: boolean;
  factor?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const imgRef = useParallax(ken ? 0 : factor);
  return (
    <section className={cn("relative min-h-svh overflow-hidden bg-black", className)}>
      {still ? (
        <img
          ref={imgRef}
          src={still}
          alt=""
          className={cn("absolute inset-0 h-full w-full", ken ? "cine-hero-still" : "cine-still")}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/25" />
      <div className="cine-vignette absolute inset-0" />
      <div className="cine-grain absolute inset-0 z-10" />
      {bars ? (
        <>
          <div className="cine-bar cine-bar-top" />
          <div className="cine-bar cine-bar-bottom" />
        </>
      ) : (
        <div className="cine-letterbox pointer-events-none absolute inset-0 z-20" />
      )}
      <div className="relative z-30 flex min-h-svh flex-col">{children}</div>
    </section>
  );
}

function Home() {
  return (
    <div className="bg-black text-white">
      <Reel still="/stills/hero-theater.jpg" ken bars>
        <div className="cine-curtain absolute inset-0 z-40" />
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 pt-8 md:px-8 md:pt-14">
          <span className="font-display text-sm font-extrabold tracking-[0.32em]">CINEVO</span>
          <nav className="flex items-center gap-2">
            <a href="#press" className="hidden h-11 items-center px-3 font-ui text-sm font-medium text-white/70 hover:text-white sm:inline-flex">
              Press
            </a>
            <Link to="/node" className="hidden h-11 items-center px-3 font-ui text-sm font-medium text-white/70 hover:text-white sm:inline-flex">
              Node
            </Link>
            <Link
              to="/app"
              className="inline-flex h-11 items-center rounded-full bg-white px-5 font-ui text-sm font-semibold uppercase tracking-wider text-black transition-transform duration-150 active:scale-[0.96]"
            >
              Enter
            </Link>
          </nav>
        </header>

        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pb-28 text-center md:pb-36">
          <p className="cine-rise font-ui text-[11px] font-semibold uppercase tracking-[0.48em] text-white/65">
            A CINEVO picture
          </p>
          <h1 className="mt-7 font-display font-extrabold leading-[0.88] tracking-tight">
            <span className="cine-rise-delay block text-5xl md:text-7xl">Cinema,</span>
            <span className="cine-rise-late mt-2 block text-5xl md:text-7xl">Reinvented.</span>
          </h1>
          <span className="cine-rise-end mt-10 inline-flex">
            <Link
              to="/app"
              aria-label="Enter cinema"
              className="cine-play flex size-16 items-center justify-center rounded-full border border-white/70 text-white transition-transform duration-150 active:scale-[0.96] md:size-20"
            >
              <Play size={22} fill="currentColor" className="ml-0.5" />
            </Link>
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden h-[76px] items-center justify-between px-8 font-ui text-[11px] uppercase tracking-[0.28em] text-white/55 md:flex">
          <span>CINEVO · 2026</span>
          <span>Feature · 4K · No ads</span>
          <span>Your library · Your house</span>
        </div>
      </Reel>

      <Reel still="/stills/doorway.jpg" factor={42}>
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-28 pt-24 md:px-8 md:pb-36">
          <Reveal as="p" className="font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50" variant="hold">
            2.39:1
          </Reveal>
          <Reveal as="h2" className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-7xl" delay={80}>
            The house lights go down.
            <br />
            Your library stays.
          </Reveal>
          <Reveal as="p" className="mt-8 max-w-md text-lg text-white/70" delay={180}>
            A private cinema for films you already own. Folders on disk. Plex. Jellyfin. Playback never leaves the building.
          </Reveal>
        </div>
      </Reel>

      <section className="bg-black">
        {ACTS.map((act, i) => (
          <article key={act.k} className="relative overflow-hidden border-t border-white/10">
            {i === 1 ? (
              <img src="/stills/screen-glow.jpg" alt="" className="cine-still absolute inset-0 h-full w-full opacity-50" />
            ) : null}
            <div className="relative mx-auto grid max-w-6xl items-end gap-6 px-5 py-20 md:grid-cols-[0.35fr_1.65fr] md:px-8 md:py-28">
              <Reveal as="p" className="font-display text-6xl font-extrabold leading-none tracking-tight text-white/25 md:text-8xl" variant="hold">
                {act.k}
              </Reveal>
              <div>
                <Reveal as="h3" className="font-display text-4xl font-extrabold tracking-tight md:text-5xl" delay={90}>
                  {act.t}
                </Reveal>
                <Reveal as="p" className="mt-4 max-w-xl text-base leading-relaxed text-white/60" delay={160}>
                  {act.d}
                </Reveal>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section id="rebound">
        <Reveal as="p" className="bg-black px-5 py-10 text-center font-ui text-[11px] font-semibold uppercase text-white/40" variant="track">
          Rebound with CINEVO
        </Reveal>
        {BILLS.map((bill, i) =>
          bill.invert ? (
            <article key={bill.line} className="flex min-h-[85vh] flex-col justify-between bg-white px-6 py-16 text-black md:px-20 md:py-20">
              <Reveal as="p" className="font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-black/35" variant="hold">
                Outdoor · 2026
              </Reveal>
              <Reveal as="p" className="max-w-5xl font-display text-5xl font-extrabold leading-[0.88] sm:text-6xl md:text-8xl" variant="track" delay={70}>
                {bill.line}
              </Reveal>
              <Reveal delay={140}>
                <Logo size="md" className="text-black" />
              </Reveal>
            </article>
          ) : (
            <Reel key={bill.line} still={bill.still} factor={24 + i * 6}>
              <div className="flex min-h-svh flex-col justify-between px-6 py-16 md:px-20 md:py-20">
                <Reveal as="p" className="font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45" variant="hold">
                  Outdoor · 2026
                </Reveal>
                <Reveal as="p" className="max-w-5xl font-display text-5xl font-extrabold leading-[0.88] sm:text-6xl md:text-8xl" variant="track" delay={70}>
                  {bill.line}
                </Reveal>
                <Reveal delay={140}>
                  <Logo size="md" className={bill.accent ? "text-cine-cyan" : "text-white"} />
                </Reveal>
              </div>
            </Reel>
          ),
        )}
      </section>

      <Reel still="/stills/projector.jpg" factor={48}>
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-24 pt-24 md:px-8 md:pb-32" id="downloads">
          <Reveal as="p" className="font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50" variant="hold">
            Feature presentation
          </Reveal>
          <Reveal as="h2" className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight md:text-6xl" delay={80}>
            Windows. Mac. Node.
            <br />
            The projector lives at home.
          </Reveal>
          <Reveal as="p" className="mt-5 mb-10 max-w-xl text-white/65" delay={160}>
            Install CINEVO Node on the computer that holds the files. Pair once. Stream to the house.
          </Reveal>
          <div className="mb-8 flex flex-wrap gap-2">
            {["Windows", "Mac", "Linux", "Android TV"].map((p) => (
              <span key={p} className="inline-flex h-11 items-center rounded-full border border-white/25 px-4 font-ui text-sm">
                {p}
              </span>
            ))}
          </div>
          <InstallerCards />
        </div>
      </Reel>

      <section id="press" className="bg-white text-black">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
          <Reveal as="p" className="font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-black/40" variant="hold">
            Press kit
          </Reveal>
          <Reveal as="h2" className="mt-4 font-display text-5xl font-extrabold tracking-tight md:text-7xl" delay={80}>
            Cinema, Reinvented.
          </Reveal>
          <div className="mt-14 grid gap-3 md:grid-cols-3">
            <div className="flex min-h-64 items-center justify-center bg-black">
              <Logo size="lg" className="text-white" />
            </div>
            <div className="flex min-h-64 items-center justify-center border border-black/12">
              <Logo size="lg" className="text-black" />
            </div>
            <div className="flex min-h-64 items-center justify-center bg-black">
              <Logo size="lg" className="text-cine-cyan" />
            </div>
          </div>
          <p className="mt-12 max-w-lg text-sm leading-relaxed text-black/55">
            CINEVO is a private cinema for libraries you already own. Folders, Plex, and Jellyfin. No ads. No subscriptions.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <Reveal as="p" className="font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-white/35" variant="hold">
            End titles
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {CREDITS.map(([role, name], i) => (
              <Reveal key={role} delay={i * 70} className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-3">
                <span className="font-ui text-xs uppercase tracking-[0.22em] text-white/40">{role}</span>
                <span className="font-display text-xl font-semibold tracking-tight">{name}</span>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-end justify-between gap-6">
            <Logo size="md" className="text-white" />
            <div className="flex flex-wrap gap-5 text-sm text-white/50">
              <a href="#press" className="hover:text-white">Press kit</a>
              <Link to="/node" className="hover:text-white">Support</Link>
              <Link to="/app" className="hover:text-white">Enter</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

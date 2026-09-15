import { Check, ListPlus, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Title } from "@/lib/catalog";
import { useCinevo } from "@/lib/cinevo-store";

const glow: Record<Title["accent"], string> = {
  cyan: "hover:glow-cyan",
  magenta: "hover:glow-magenta",
  violet: "hover:glow-violet",
  amber: "hover:glow-amber",
};

export function PosterCard({
  title,
}: {
  title: Title;
  compact?: boolean;
}) {
  const progress = useCinevo((s) => s.progress[title.id]);
  const fav = useCinevo((s) => s.favorites.includes(title.id));
  const openTitle = useCinevo((s) => s.openTitle);
  const play = useCinevo((s) => s.play);
  const toggleFavorite = useCinevo((s) => s.toggleFavorite);

  return (
    <article className="group min-w-0">
      <div
        className={cn(
          "relative overflow-hidden rounded-md border border-cine-border bg-cine-surface transition duration-200",
          glow[title.accent],
        )}
      >
        <button type="button" onClick={() => openTitle(title.id)} aria-label={`Open ${title.title}`} className="block w-full">
          <img
            src={title.poster}
            alt=""
            className="aspect-2/3 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </button>
        {title.live ? (
          <span className="pointer-events-none absolute left-2 top-2 rounded-sm bg-cine-cyan px-1.5 py-0.5 font-ui text-xs font-bold tracking-widest text-cine-bg">
            LIVE
          </span>
        ) : title.source && title.source !== "cinevo" ? (
          <span className="pointer-events-none absolute left-2 top-2 rounded-sm bg-cine-bg/80 px-1.5 py-0.5 font-ui text-xs font-bold uppercase tracking-widest text-cine-cyan">
            {title.source}
          </span>
        ) : null}
        {progress != null && progress > 0 ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-cine-well">
            <i className="block h-full bg-cine-cyan" style={{ width: `${progress}%` }} />
          </span>
        ) : null}
        <button
          type="button"
          aria-label={`Play ${title.title}`}
          onClick={() => play(title.id)}
          className="absolute bottom-2 right-2 flex size-11 items-center justify-center rounded-full bg-cine-text text-cine-bg"
        >
          <Play size={16} fill="currentColor" />
        </button>
      </div>
      <div className="poster-meta mt-2 flex items-start justify-between gap-2">
        <button type="button" onClick={() => openTitle(title.id)} className="min-w-0 text-left">
          <h3 className="truncate font-ui text-sm font-semibold tracking-wide">{title.title}</h3>
          <p className="font-mono text-xs text-cine-faint">
            {title.rating > 0 ? (
              <>
                <Star size={10} className="mr-1 inline text-cine-amber" fill="currentColor" />
                {title.rating.toFixed(1)} · {title.year}
              </>
            ) : (
              <>{title.sourceLabel || title.source} · {title.year}</>
            )}
          </p>
        </button>
        <div className="flex shrink-0">
          <button
            type="button"
            aria-label={fav ? "Remove from My List" : "Add to My List"}
            className={cn(
              "flex size-11 items-center justify-center rounded-md",
              fav ? "text-cine-cyan" : "text-cine-muted hover:text-cine-text",
            )}
            onClick={() => toggleFavorite(title.id)}
          >
            {fav ? <Check size={16} /> : <ListPlus size={16} />}
          </button>
        </div>
      </div>
    </article>
  );
}

export function Rail({
  heading,
  titles,
  empty,
}: {
  heading: string;
  titles: Title[];
  empty?: string;
}) {
  if (!titles.length) {
    if (!empty) return null;
    return (
      <section className="rounded-xl border border-dashed border-cine-border bg-cine-elevated/60 px-4 py-5">
        <h2 className="font-display text-xs font-bold tracking-[0.22em] text-cine-muted">{heading}</h2>
        <p className="mt-2 text-sm text-cine-faint">{empty}</p>
      </section>
    );
  }
  return (
    <section className="space-y-3">
      <header className="flex items-end justify-between">
        <h2 className="font-display text-xs font-bold tracking-[0.22em] text-cine-muted">{heading}</h2>
        <span className="font-mono text-xs text-cine-faint">{titles.length}</span>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {titles.map((t) => (
          <PosterCard key={t.id} title={t} />
        ))}
      </div>
    </section>
  );
}

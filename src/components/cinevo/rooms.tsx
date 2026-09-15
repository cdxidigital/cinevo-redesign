import { Play, Shuffle, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  MOODS,
  byMood,
  filterCatalog,
  genresIn,
  pickFeatured,
  recentlyAdded,
  type Title,
} from "@/lib/catalog";
import { titleById, useCinevo, type Room, type SourceFilter } from "@/lib/cinevo-store";
import { askCinevo } from "@/lib/ask-cinevo";
import { useLibrary } from "@/lib/use-library";
import { PosterCard, Rail } from "./poster";
import { AddLibrary } from "./add-library";

export function StageRoom() {
  const play = useCinevo((s) => s.play);
  const openTitle = useCinevo((s) => s.openTitle);
  const progress = useCinevo((s) => s.progress);
  const favorites = useCinevo((s) => s.favorites);
  const tonight = useCinevo((s) => s.tonight);
  const mood = useCinevo((s) => s.mood);
  const setMood = useCinevo((s) => s.setMood);
  const addTonight = useCinevo((s) => s.addTonight);
  const shufflePlay = useCinevo((s) => s.shufflePlay);
  const setCoreOpen = useCinevo((s) => s.setCoreOpen);
  const setRoom = useCinevo((s) => s.setRoom);
  const aiConsent = useCinevo((s) => s.aiConsent);
  const sourceFilter = useCinevo((s) => s.sourceFilter);
  const setSourceFilter = useCinevo((s) => s.setSourceFilter);
  const sources = useCinevo((s) => s.sources);
  const library = useLibrary();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [pending, setPending] = useState(false);

  const filtered = useMemo(() => {
    if (sourceFilter === "all") return library;
    return library.filter((t) => t.source === sourceFilter);
  }, [library, sourceFilter]);

  const pool = byMood(mood, filtered);
  const hero = pickFeatured({ mood, progress, tonight, pool: filtered });
  const heroProgress = hero ? progress[hero.id] ?? 0 : 0;
  const continueWatching = filtered.filter((t) => {
    const p = progress[t.id];
    return p != null && p > 0 && p < 100;
  });
  const added = recentlyAdded(8, pool);
  const addedIds = new Set(added.map((t) => t.id));
  const myList = filtered.filter((t) => favorites.includes(t.id));
  const suggestions = pool.filter((t) => !favorites.includes(t.id) && !addedIds.has(t.id)).slice(0, 8);
  const moodMeta = MOODS.find((m) => m.id === mood) ?? MOODS[0];
  const queueable = pool.filter((t) => !tonight.includes(t.id)).slice(0, 8);

  const ask = async () => {
    if (!question.trim() || pending) return;
    if (!aiConsent) {
      setCoreOpen(true, "ai");
      return;
    }
    setPending(true);
    try {
      const res = await askCinevo({
        data: {
          question,
          titles: pool.map((t) => ({
            title: t.title,
            year: t.year,
            kind: t.kind,
            genre: t.genre,
            rating: t.rating,
            synopsis: t.synopsis,
          })),
        },
      });
      if (res.ok) setAnswer(res.text.replace(/\*\*/g, ""));
      else setAnswer(res.error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      {hero ? (
        <section className="relative min-h-[58vh] overflow-hidden rounded-xl border border-cine-border">
          <img src={hero.still || "/stills/theater.jpg"} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-cine-bg/95 via-cine-bg/55 to-transparent" />
          <div className="relative flex min-h-[58vh] max-w-xl flex-col justify-end p-6 md:p-10">
            <p className="font-ui text-xs tracking-[0.28em] text-cine-muted">FEATURED</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-6xl">{hero.title}</h1>
            <p className="mt-3 font-mono text-sm text-cine-muted">
              {hero.year} · {hero.runtime} · {hero.genre}
              {hero.rating > 0 ? (
                <>
                  {" "}
                  · <Star size={12} className="inline text-cine-amber" fill="currentColor" /> {hero.rating.toFixed(1)}
                </>
              ) : null}
            </p>
            <p className="mt-3 text-sm text-cine-muted">{hero.synopsis}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => play(hero.id)}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-cine-text px-5 font-ui font-semibold tracking-wide text-cine-bg"
              >
                <Play size={16} fill="currentColor" /> {heroProgress > 0 && heroProgress < 100 ? "Resume" : "Play"}
              </button>
              <button
                type="button"
                onClick={() => openTitle(hero.id)}
                className="inline-flex h-11 items-center rounded-md border border-cine-cyan px-5 font-ui font-bold tracking-wider text-cine-cyan"
              >
                More info
              </button>
              <button
                type="button"
                onClick={shufflePlay}
                className="inline-flex h-11 items-center gap-2 rounded-md border border-cine-border px-4 font-ui font-bold tracking-wider text-cine-muted"
              >
                <Shuffle size={16} /> Surprise me
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative min-h-[58vh] overflow-hidden rounded-xl border border-cine-border">
          <img src="/stills/theater.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-linear-to-r from-cine-bg/95 via-cine-bg/70 to-transparent" />
          <div className="relative flex min-h-[58vh] max-w-xl flex-col justify-end p-6 md:p-10">
            <p className="font-ui text-xs tracking-[0.28em] text-cine-muted">CINEVO</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-6xl">Cinema, reinvented.</h1>
            <p className="mt-3 text-sm text-cine-muted">
              Start with a folder on this computer, or pair CINEVO Node for Plex and Jellyfin.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setRoom("sidebar")}
                className="inline-flex h-11 items-center rounded-md bg-cine-text px-5 font-ui font-semibold tracking-wide text-cine-bg"
              >
                Add library
              </button>
            </div>
          </div>
        </section>
      )}

      {library.length ? (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMood(m.id)}
                className={`h-11 rounded-full px-4 font-ui text-sm font-semibold ${
                  mood === m.id ? "bg-cine-cyan text-cine-bg" : "text-cine-muted"
                }`}
                aria-pressed={mood === m.id}
              >
                {m.label}
              </button>
            ))}
          </div>
          {sources.length > 1 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["all", "All"],
                  ["folder", "Folders"],
                  ["plex", "Plex"],
                  ["jellyfin", "Jellyfin"],
                ] as [SourceFilter, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSourceFilter(id)}
                  className={`h-11 rounded-full px-4 font-ui text-sm ${
                    sourceFilter === id ? "text-cine-cyan" : "text-cine-faint"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <aside className="glass rounded-xl p-4">
              <header className="mb-3 flex items-center justify-between">
                <div>
                  <p className="font-ui text-xs tracking-[0.22em] text-cine-cyan">QUEUE</p>
                  <h2 className="font-display text-xl tracking-widest">Tonight</h2>
                </div>
                <span className="font-mono text-xs text-cine-faint">{tonight.length}/8</span>
              </header>
              {tonight.length ? (
                <div className="mb-4 grid grid-cols-4 gap-2">
                  {tonight
                    .map((id) => titleById(id))
                    .filter((t): t is Title => Boolean(t))
                    .map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => openTitle(t.id)}
                        className="overflow-hidden rounded-md border border-cine-border"
                        aria-label={`Open ${t.title}`}
                      >
                        <img src={t.poster} alt="" className="aspect-2/3 w-full object-cover" />
                      </button>
                    ))}
                </div>
              ) : (
                <p className="mb-4 text-sm text-cine-faint">Tap a poster to queue it.</p>
              )}
              {queueable.length ? (
                <div>
                  <p className="mb-2 font-ui text-xs tracking-[0.18em] text-cine-muted">ADD</p>
                  <div className="grid grid-cols-4 gap-2">
                    {queueable.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => addTonight(t.id)}
                        className="overflow-hidden rounded-md border border-cine-border"
                        aria-label={`Queue ${t.title}`}
                      >
                        <img src={t.poster} alt="" className="aspect-2/3 w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>

            <section className="rounded-xl border border-cine-border bg-cine-surface p-4">
              <p className="font-ui text-xs tracking-[0.22em] text-cine-cyan">NOW BROWSING</p>
              <h2 className="font-display mt-1 text-2xl tracking-widest">{moodMeta.hint}</h2>
              <p className="mt-2 text-sm text-cine-muted">Curated from titles already in this library. Mood only reshuffles the frame.</p>
              <form
                className="mt-4 flex flex-col gap-2 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  void ask();
                }}
              >
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  maxLength={400}
                  placeholder="What should I watch tonight?"
                  aria-label="Ask CINEVO"
                  className="h-11 flex-1 rounded-md border border-cine-border bg-cine-well px-3 font-ui"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="h-11 rounded-md bg-cine-cyan px-4 font-ui font-bold text-cine-bg"
                >
                  {pending ? "Thinking…" : "Ask"}
                </button>
              </form>
              {answer ? <p className="mt-3 text-sm text-cine-muted">{answer}</p> : null}
            </section>
          </div>

          <div className="mt-8 space-y-8">
            {continueWatching.length ? <Rail heading="Up Next" titles={continueWatching} /> : null}
            {added.length ? <Rail heading="Recently added" titles={added} /> : null}
            {suggestions.length ? <Rail heading="Recommended" titles={suggestions} /> : null}
            {myList.length ? <Rail heading="My List" titles={myList} /> : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function BrowseRoom({ kind: initialKind = "all" }: { kind?: "all" | "movie" | "series" }) {
  const [kind, setKind] = useState<"all" | "movie" | "series">(initialKind);
  const [genre, setGenre] = useState("All");
  useEffect(() => {
    setKind(initialKind);
    setGenre("All");
  }, [initialKind]);
  const library = useLibrary();
  const titles = useMemo(() => filterCatalog({ kind, genre, pool: library }), [kind, genre, library]);
  const genres = genresIn(library);
  return (
    <div>
      <header className="mb-6">
        <p className="font-ui text-xs tracking-[0.28em] text-cine-muted">
          {initialKind === "movie" ? "MOVIES" : initialKind === "series" ? "TV SHOWS" : "CATALOG"}
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          {initialKind === "movie" ? "Movies" : initialKind === "series" ? "TV Shows" : "Browse"}
        </h1>
      </header>
      <div className="mb-5 flex flex-wrap gap-2">
        {(["all", "movie", "series"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={`h-11 rounded-full px-4 font-ui text-sm font-semibold capitalize ${
              kind === k ? "bg-cine-cyan text-cine-bg" : "bg-cine-surface text-cine-muted"
            }`}
          >
            {k === "all" ? "All" : k === "movie" ? "Movies" : "Series"}
          </button>
        ))}
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {genres.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGenre(g)}
            className={`h-11 rounded-full px-4 font-ui text-sm font-semibold ${
              genre === g ? "glow-cyan text-cine-cyan" : "border border-cine-border text-cine-muted"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {titles.map((t) => (
          <PosterCard key={t.id} title={t} />
        ))}
      </div>
      {!titles.length ? (
        <p className="mt-6 text-sm text-cine-faint">No titles yet. Add a folder or pair a media server.</p>
      ) : null}
    </div>
  );
}

export function SidebarRoom() {
  const local = useCinevo((s) => s.localTitles);
  const remote = useCinevo((s) => s.remoteTitles);
  const yours = [...local, ...remote];
  return (
    <div>
      <p className="font-ui text-xs tracking-[0.22em] text-cine-muted">HOME LIBRARY</p>
      <h1 className="font-display mb-2 text-3xl font-extrabold tracking-tight">Add sources</h1>
      <p className="mb-6 max-w-2xl text-sm text-cine-muted">
        Folders scan in this browser. Plex and Jellyfin pair through CINEVO Node so tokens never leave that machine.
      </p>
      <AddLibrary />
      {yours.length ? (
        <div className="mt-8">
          <Rail heading="In your library" titles={yours.slice(0, 12)} />
        </div>
      ) : null}
    </div>
  );
}

export function RoomSwitch({ room }: { room: Room }) {
  switch (room) {
    case "browse":
      return <BrowseRoom />;
    case "movies":
      return <BrowseRoom kind="movie" />;
    case "shows":
      return <BrowseRoom kind="series" />;
    case "sidebar":
      return <SidebarRoom />;
    default:
      return <StageRoom />;
  }
}

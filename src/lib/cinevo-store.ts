import { create } from "zustand";
import { persist } from "zustand/middleware";
import { byMood, type Mood, type Title } from "./catalog";
import type { LibSource, LibraryTitle, ThemeId } from "./library";
import { THEMES, makePoster } from "./library";

export type Room = "stage" | "browse" | "movies" | "shows" | "sidebar";

export type Preferences = {
  nightMode: boolean;
  zenMode: boolean;
  focusMode: boolean;
  theme: ThemeId;
};

export type SourceFilter = "all" | "folder" | "plex" | "jellyfin";

export type Invite = {
  id: string;
  name: string;
  days: number;
  status: "active" | "paused" | "revoked";
  createdAt: number;
};

export type Note = {
  id: string;
  titleId: string;
  body: string;
  createdAt: number;
};

export type Party = { titleId: string; with: string } | null;

type Library = { id: string; name: string; kind: string; selected: boolean };

type CinevoState = {
  room: Room;
  selectedId: string | null;
  playingId: string | null;
  playing: boolean;
  progress: Record<string, number>;
  favorites: string[];
  tonight: string[];
  notes: Note[];
  party: Party;
  mood: Mood;
  searchOpen: boolean;
  settingsOpen: boolean;
  coreOpen: boolean;
  coreTab: "libraries" | "sharing" | "stewardship" | "ai";
  toast: string;
  prefs: Preferences;
  libraries: Library[];
  invites: Invite[];
  aiConsent: boolean;
  nodeUrl: string;
  nodeToken: string;
  nodeDevice: string;
  sources: LibSource[];
  localTitles: LibraryTitle[];
  remoteTitles: LibraryTitle[];
  sourceFilter: SourceFilter;
  setRoom: (room: Room) => void;
  openTitle: (id: string) => void;
  closeTitle: () => void;
  play: (id: string) => void;
  stopPlay: () => void;
  togglePlay: () => void;
  setProgress: (id: string, value: number) => void;
  toggleFavorite: (id: string) => void;
  addTonight: (id: string) => void;
  removeTonight: (id: string) => void;
  addNote: (titleId: string, body: string) => void;
  removeNote: (id: string) => void;
  startParty: (titleId: string, withName: string) => void;
  endParty: () => void;
  setMood: (mood: Mood) => void;
  shufflePlay: () => void;
  setSearchOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setCoreOpen: (open: boolean, tab?: CinevoState["coreTab"]) => void;
  setCoreTab: (tab: CinevoState["coreTab"]) => void;
  flash: (msg: string) => void;
  patchPrefs: (p: Partial<Preferences>) => void;
  setTheme: (theme: ThemeId) => void;
  toggleLibrary: (id: string) => void;
  addInvite: (name: string, days: number) => void;
  setInviteStatus: (id: string, status: Invite["status"]) => void;
  setAiConsent: (on: boolean) => void;
  setNodeUrl: (url: string) => void;
  setNodeSession: (token: string, deviceId: string) => void;
  clearNodeSession: () => void;
  addFolderTitles: (titles: LibraryTitle[], source: LibSource) => void;
  addRemoteTitles: (titles: LibraryTitle[], source: LibSource) => void;
  removeSource: (id: string) => void;
  setSourceFilter: (filter: SourceFilter) => void;
  clearLocalData: () => void;
};

export const DEFAULT_LIBRARIES: Library[] = [];

const DEFAULT_PREFS: Preferences = { nightMode: true, zenMode: false, focusMode: false, theme: "pulse" };

const FRESH: Pick<
  CinevoState,
  | "progress"
  | "favorites"
  | "invites"
  | "selectedId"
  | "playingId"
  | "playing"
  | "tonight"
  | "notes"
  | "party"
  | "mood"
  | "sources"
  | "localTitles"
  | "remoteTitles"
  | "sourceFilter"
> = {
  progress: {},
  favorites: [],
  invites: [],
  selectedId: null,
  playingId: null,
  playing: false,
  tonight: [],
  notes: [],
  party: null,
  mood: "all",
  sources: [],
  localTitles: [],
  remoteTitles: [],
  sourceFilter: "all",
};

function catalogPool(get: () => CinevoState): Title[] {
  return [...get().localTitles, ...get().remoteTitles];
}

export const useCinevo = create<CinevoState>()(
  persist(
    (set, get) => ({
      room: "stage",
      searchOpen: false,
      settingsOpen: false,
      coreOpen: false,
      coreTab: "libraries",
      toast: "",
      prefs: DEFAULT_PREFS,
      libraries: [],
      aiConsent: false,
      nodeUrl: "http://127.0.0.1:48184",
      nodeToken: "",
      nodeDevice: "",
      ...FRESH,
      setRoom: (room) => set({ room, selectedId: null }),
      openTitle: (id) => set({ selectedId: id }),
      closeTitle: () => set({ selectedId: null }),
      play: (id) => {
        const p = get().progress[id] ?? 0;
        set({
          playingId: id,
          playing: true,
          selectedId: null,
          progress: p >= 100 ? { ...get().progress, [id]: 0 } : get().progress,
        });
      },
      stopPlay: () => set({ playingId: null, playing: false }),
      togglePlay: () => {
        const id = get().playingId;
        if (id && (get().progress[id] ?? 0) >= 100) {
          get().play(id);
          return;
        }
        set({ playing: !get().playing });
      },
      setProgress: (id, value) =>
        set({ progress: { ...get().progress, [id]: Math.max(0, Math.min(100, value)) } }),
      toggleFavorite: (id) => {
        const has = get().favorites.includes(id);
        set({
          favorites: has ? get().favorites.filter((x) => x !== id) : [...get().favorites, id],
        });
        get().flash(has ? "Removed from My List" : "Saved to My List");
      },
      addTonight: (id) => {
        if (get().tonight.includes(id)) {
          get().flash("Already in tonight");
          return;
        }
        if (get().tonight.length >= 8) {
          get().flash("Tonight is full");
          return;
        }
        set({ tonight: [...get().tonight, id] });
        get().flash("Queued for tonight");
      },
      removeTonight: (id) => set({ tonight: get().tonight.filter((x) => x !== id) }),
      addNote: (titleId, body) => {
        const text = body.trim().slice(0, 280);
        if (!text) return;
        set({
          notes: [
            { id: `n-${Date.now()}`, titleId, body: text, createdAt: Date.now() },
            ...get().notes,
          ].slice(0, 40),
        });
        get().flash("Note saved");
      },
      removeNote: (id) => set({ notes: get().notes.filter((n) => n.id !== id) }),
      startParty: (titleId, withName) => {
        set({ party: { titleId, with: withName.trim() } });
        get().play(titleId);
        get().flash(withName.trim() ? `Watching with ${withName.trim()}` : "Private watch started");
      },
      endParty: () => set({ party: null }),
      setMood: (mood) => set({ mood }),
      shufflePlay: () => {
        const pool = byMood(get().mood, catalogPool(get));
        const fresh = pool.filter((t) => {
          const p = get().progress[t.id];
          return p == null || p >= 100;
        });
        const list = fresh.length ? fresh : pool;
        const pick = list[Math.floor(Math.random() * list.length)];
        if (pick) get().play(pick.id);
        else get().flash("Add a library first");
      },
      setSearchOpen: (searchOpen) => set({ searchOpen }),
      setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
      setCoreOpen: (coreOpen, tab) => set({ coreOpen, coreTab: tab ?? get().coreTab }),
      setCoreTab: (coreTab) => set({ coreTab }),
      flash: (toast) => {
        set({ toast });
        window.setTimeout(() => {
          if (get().toast === toast) set({ toast: "" });
        }, 2200);
      },
      patchPrefs: (p) => set({ prefs: { ...get().prefs, ...p } }),
      setTheme: (theme) => {
        set({ prefs: { ...get().prefs, theme } });
        if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", theme);
      },
      toggleLibrary: (id) =>
        set({
          libraries: get().libraries.map((l) =>
            l.id === id ? { ...l, selected: !l.selected } : l,
          ),
          sources: get().sources.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s)),
        }),
      addInvite: (name, days) =>
        set({
          invites: [
            {
              id: `inv-${Date.now()}`,
              name: name.trim() || "Friend",
              days,
              status: "active",
              createdAt: Date.now(),
            },
            ...get().invites,
          ],
        }),
      setInviteStatus: (id, status) =>
        set({
          invites: get().invites.map((i) => (i.id === id ? { ...i, status } : i)),
        }),
      setAiConsent: (aiConsent) => set({ aiConsent }),
      setNodeUrl: (nodeUrl) => set({ nodeUrl }),
      setNodeSession: (nodeToken, nodeDevice) => set({ nodeToken, nodeDevice }),
      clearNodeSession: () => set({ nodeToken: "", nodeDevice: "" }),
      addFolderTitles: (titles, source) => {
        const existing = new Set(get().localTitles.map((t) => t.id));
        const next = titles.filter((t) => !existing.has(t.id));
        const sources = get().sources.filter((s) => s.id !== source.id);
        set({
          localTitles: [...next, ...get().localTitles].slice(0, 200),
          sources: [{ ...source, count: next.length + (get().localTitles.filter((t) => t.sourceLabel === source.name).length) }, ...sources],
        });
        get().flash(next.length ? `Added ${next.length} titles from ${source.name}` : "No new video files in that folder");
      },
      addRemoteTitles: (titles, source) => {
        const existing = new Set(get().remoteTitles.map((t) => t.id));
        const next = titles.filter((t) => !existing.has(t.id));
        const sources = get().sources.filter((s) => s.id !== source.id);
        set({
          remoteTitles: [...next, ...get().remoteTitles].slice(0, 300),
          sources: [{ ...source, count: next.length }, ...sources],
        });
        get().flash(next.length ? `Imported ${next.length} titles from ${source.name}` : "No titles in that section");
      },
      removeSource: (id) => {
        const src = get().sources.find((s) => s.id === id);
        const localTitles = get().localTitles.filter((t) => t.sourceLabel !== src?.name);
        const remoteTitles = get().remoteTitles.filter((t) => t.sourceLabel !== src?.name);
        const keep = new Set([...localTitles, ...remoteTitles].map((t) => t.id));
        const sources = get().sources.filter((s) => s.id !== id);
        set({
          sources,
          localTitles,
          remoteTitles,
          sourceFilter: sources.length <= 1 ? "all" : get().sourceFilter,
          tonight: get().tonight.filter((tid) => keep.has(tid)),
          favorites: get().favorites.filter((tid) => keep.has(tid)),
        });
        void import("./folder-handles").then((m) => m.deleteFolderHandle(id));
        get().flash("Source removed");
      },
      setSourceFilter: (sourceFilter) => set({ sourceFilter }),
      clearLocalData: () => {
        set({
          ...FRESH,
          libraries: [],
          searchOpen: false,
          coreOpen: false,
          nodeToken: "",
          nodeDevice: "",
          prefs: { ...get().prefs, theme: get().prefs.theme },
        });
        try {
          localStorage.removeItem("cinevo-state");
          localStorage.removeItem("cinevo-storage");
        } catch {
          /* ignore quota / private mode */
        }
        get().flash("Local data cleared");
      },
    }),
    {
      name: "cinevo-local-v4",
      skipHydration: true,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<CinevoState>;
        const theme = p.prefs?.theme && THEMES.some((t) => t.id === p.prefs?.theme) ? p.prefs.theme : "pulse";
        return {
          ...current,
          ...p,
          tonight: Array.isArray(p.tonight) ? p.tonight : [],
          notes: Array.isArray(p.notes) ? p.notes : [],
          party: p.party ?? null,
          mood: p.mood ?? "all",
          nodeUrl: p.nodeUrl || "http://127.0.0.1:48184",
          nodeToken: p.nodeToken ?? "",
          nodeDevice: p.nodeDevice ?? "",
          sources: Array.isArray(p.sources) ? p.sources : [],
          localTitles: Array.isArray(p.localTitles)
            ? p.localTitles.map((t) => ({
                ...t,
                cast: t.cast ?? [],
                genres: t.genres?.length ? t.genres : ["Home library"],
                poster:
                  t.poster && !t.poster.startsWith("data:")
                    ? t.poster
                    : makePoster(t.title, t.accent || "cyan"),
              }))
            : [],
          remoteTitles: Array.isArray(p.remoteTitles)
            ? p.remoteTitles.map((t) => ({
                ...t,
                cast: t.cast ?? [],
                genres: t.genres?.length ? t.genres : [t.genre || "Library"],
              }))
            : [],
          sourceFilter:
            Array.isArray(p.sources) && p.sources.length > 1 &&
            (p.sourceFilter === "folder" || p.sourceFilter === "plex" || p.sourceFilter === "jellyfin")
              ? p.sourceFilter
              : "all",
          prefs: { ...DEFAULT_PREFS, ...p.prefs, theme },
        };
      },
      partialize: (s) => ({
        progress: s.progress,
        favorites: s.favorites,
        prefs: s.prefs,
        libraries: s.libraries,
        invites: s.invites,
        aiConsent: s.aiConsent,
        tonight: s.tonight,
        notes: s.notes,
        party: s.party,
        mood: s.mood,
        nodeUrl: s.nodeUrl,
        nodeToken: s.nodeToken,
        nodeDevice: s.nodeDevice,
        sources: s.sources,
        localTitles: s.localTitles.map((t) => ({
          ...t,
          poster: t.poster?.startsWith("data:") ? "" : t.poster,
        })),
        remoteTitles: s.remoteTitles,
        sourceFilter: s.sourceFilter,
      }),
    },
  ),
);

export function titleById(id: string | null): Title | undefined {
  if (!id) return undefined;
  const s = useCinevo.getState();
  return s.localTitles.find((t) => t.id === id) ?? s.remoteTitles.find((t) => t.id === id);
}

export function libraryPool(): Title[] {
  const s = useCinevo.getState();
  return [...s.localTitles, ...s.remoteTitles];
}

import { Clapperboard, FolderOpen, Home, Menu, Search, Settings2, Tv, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCinevo, type Room } from "@/lib/cinevo-store";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const NAV: { id: Room; label: string; icon: typeof Home }[] = [
  { id: "stage", label: "Home", icon: Home },
  { id: "movies", label: "Movies", icon: Clapperboard },
  { id: "shows", label: "TV Shows", icon: Tv },
  { id: "sidebar", label: "Library", icon: FolderOpen },
];

export function Shell({
  children,
  overlays,
}: {
  children: React.ReactNode;
  overlays?: React.ReactNode;
}) {
  const room = useCinevo((s) => s.room);
  const setRoom = useCinevo((s) => s.setRoom);
  const setSearchOpen = useCinevo((s) => s.setSearchOpen);
  const setSettingsOpen = useCinevo((s) => s.setSettingsOpen);
  const setCoreOpen = useCinevo((s) => s.setCoreOpen);
  const night = useCinevo((s) => s.prefs.nightMode);
  const zen = useCinevo((s) => s.prefs.zenMode);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    if (!NAV.some((item) => item.id === room)) setRoom("stage");
  }, [room, setRoom]);

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawer(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawer]);

  const nav = (
    <>
      {NAV.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setRoom(item.id);
              setDrawer(false);
            }}
            className={cn(
              "flex h-11 w-full items-center gap-3 rounded-md px-3 font-ui text-sm font-medium",
              room === item.id ? "bg-cine-surface text-cine-text" : "text-cine-muted hover:text-cine-text",
            )}
            aria-current={room === item.id ? "page" : undefined}
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
      })}
      <button
        type="button"
        className="flex h-11 w-full items-center gap-3 rounded-md px-3 font-ui text-sm font-medium text-cine-muted hover:text-cine-text"
        onClick={() => {
          setCoreOpen(true);
          setDrawer(false);
        }}
      >
        Core
      </button>
    </>
  );

  return (
    <div className={cn("min-h-screen bg-cine-bg", night && "cinevo-night", zen && "cinevo-zen")}>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 flex-col border-r border-cine-border bg-cine-elevated px-5 py-6 md:flex">
        <Link to="/" aria-label="CINEVO home" className="mb-10 px-1">
          <Logo size="md" />
        </Link>
        <nav className="flex flex-1 flex-col gap-1" aria-label="Main">
          {nav}
        </nav>
      </aside>

      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-cine-border bg-cine-bg px-4 md:ml-72 md:h-20 md:px-6">
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-md md:hidden"
          aria-label="Open menu"
          onClick={() => setDrawer(true)}
        >
          <Menu size={20} />
        </button>
        <Link to="/" aria-label="CINEVO home" className="md:hidden">
          <Logo size="sm" />
        </Link>
        <div className="ml-auto flex items-center">
          <button type="button" aria-label="Search" className="flex size-11 items-center justify-center rounded-md" onClick={() => setSearchOpen(true)}>
            <Search size={18} />
          </button>
          <button
            type="button"
            aria-label="Settings"
            className="flex size-11 items-center justify-center rounded-md"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings2 size={18} />
          </button>
        </div>
      </header>

      {drawer ? (
        <div className="fixed inset-0 z-30 bg-cine-bg/80 md:hidden" onMouseDown={() => setDrawer(false)}>
          <aside className="h-full w-64 bg-cine-elevated p-4" onMouseDown={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <Logo size="md" />
              <button type="button" aria-label="Close menu" className="flex size-11 items-center justify-center" onClick={() => setDrawer(false)}>
                <X size={18} />
              </button>
            </div>
            {nav}
          </aside>
        </div>
      ) : null}

      <main className="relative mx-auto max-w-6xl px-4 py-6 md:ml-72 md:px-8 md:py-8">{children}</main>
      {overlays}
    </div>
  );
}

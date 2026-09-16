import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { claimUsername, getMyProfile } from "@/lib/sharing";
import { cn } from "@/lib/utils";

export function AuthSlot({ className }: { className?: string }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className={cn("size-9 shrink-0 animate-pulse rounded-full bg-cine-surface", className)} />;
  if (!user) {
    return (
      <Link
        to="/login"
        search={{ mode: "in" }}
        className={cn(
          "inline-flex h-11 items-center rounded-full border border-cine-line px-3 font-ui text-xs font-bold uppercase tracking-wider text-cine-text",
          className,
        )}
      >
        Sign in
      </Link>
    );
  }
  return (
    <div className={cn("cinevo-account", className)}>
      <UserButton />
    </div>
  );
}

export function LandingAuth() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className="size-9 animate-pulse rounded-full bg-cine-surface" />;
  if (user) {
    return (
      <div className="cinevo-account">
        <UserButton />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Link to="/login" search={{ mode: "in" }} className="public-nav__signin max-md:hidden">
        Sign in
      </Link>
      <Link to="/login" search={{ mode: "up" }} className="public-nav__enter">
        Create account
      </Link>
    </div>
  );
}

export function UsernameGate() {
  const { user, isPending } = useCurrentUserState();
  const [needed, setNeeded] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (isPending || !user || user.isDevFallback) return;
    void getMyProfile()
      .then((res) => {
        if (res.ok && !res.profile) setNeeded(true);
      })
      .catch(() => undefined);
  }, [isPending, user]);

  if (!needed) return null;

  const save = async () => {
    setPending(true);
    setError("");
    const res = await claimUsername({ data: { username, display: user?.displayName || username } });
    setPending(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setNeeded(false);
  };

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-cine-bg/80 p-4">
      <form
        className="glass-strong w-full max-w-md rounded-2xl p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <p className="font-display text-[10px] font-extrabold tracking-[0.22em] text-cine-cyan">USERNAME</p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">Claim your CINEVO name.</h2>
        <p className="mt-2 text-sm text-cine-muted">
          Friends share Plex and Jellyfin catalogs with this handle. Playback stays on the original server.
        </p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. james"
          autoComplete="username"
          aria-label="Username"
          required
          minLength={3}
          maxLength={20}
          pattern="[A-Za-z][A-Za-z0-9_]{2,19}"
          className="mt-5 h-12 w-full rounded-xl border border-cine-border bg-cine-well px-4 font-ui"
        />
        {error ? <p className="mt-2 text-sm text-cine-danger">{error}</p> : null}
        <button type="submit" disabled={pending} className="house-btn house-btn--play mt-5 w-full">
          {pending ? "Saving…" : "Save username"}
        </button>
        <button type="button" className="mt-3 w-full text-center font-ui text-sm text-cine-faint" onClick={() => setNeeded(false)}>
          Remind me later
        </button>
      </form>
    </div>
  );
}

export { SignedIn, SignedOut };

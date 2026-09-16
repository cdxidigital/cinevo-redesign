# Upgrade current CINEVO design → locked pack

Repo: `https://github.com/cdxidigital/cinevo_v2`  
This kit is **implementation-ready**. Apply in order. Do not invent parallel chrome.

## What you get in this zip

| Path | Use |
|------|-----|
| `UPGRADE.md` | This checklist |
| `SITEMAP.md` | Locked URL tree + redirects |
| `css/cine-tokens.css` | Tokens + 6 user themes (`data-theme`) |
| `themes.json` | Theme catalog for settings UI / store |
| `brand/` | Logo SVGs + app icon (CINEVO display mark) |
| `preview/` | Interactive HTML + reference PNGs |

## Spine ship order (do this first)

1. `/connect` (rename from `/node`)
2. `/app/home` · `/app/movies` · `/app/shows` · `/app/library`
3. Then: detail, watch, search, settings (themes), core tabs, share, help/legal, errors

## Step-by-step

### 1. Tokens + themes

1. Copy `css/cine-tokens.css` into the app (e.g. import from `src/styles.css`).
2. On boot / theme change, set `document.documentElement.dataset.theme = id`.
3. In `src/lib/cinevo-store.ts` (or `library` themes):
   - Extend `ThemeId` to: `pulse | noir | violet | ember | sage | day` (keep old ids as aliases if needed).
   - Default: `pulse`.
   - `setTheme` already writes `data-theme` — ensure it uses the new ids.
4. On `/app/settings`, add an **Appearance** section: one card per theme from `themes.json` (label, feel, accent swatch).
5. Map legacy CSS vars:
   - `--color-cine-cyan` / accent → `var(--cine-accent)`
   - backgrounds/text/borders → `--cine-bg` / `--cine-text` / `--cine-border` / `--cine-surface`
   - danger → `--cine-danger` (`#ff9d9d`)

### 2. Branding assets

1. Copy `brand/*.svg` + `app-icon.*` into `public/` (or existing brand folder).
2. Replace logo component to use **CINEVO** display mark from these files (horizontal / reversed as needed).
3. Do **not** restyle the product mark in Righteous lowercase.
4. Marketing outdoor “Rebound with CINEVO” copy is campaign-only — optional on `/`; not required in-app.

### 3. One chrome (`AppNav`)

1. Keep a single top header (height ≈ `--cine-nav-h`). **No sidebar.**
2. Marketing routes: Connect · Help · Log in (+ primary Connect CTA).
3. App routes: Home · Movies · Series · Library · Search · Settings.
4. Public footer legal strip on `/`, `/help`, `/legal/*` only.
5. Files today: `src/components/cinevo/shell.tsx` — stop calling `setRoom`; use `<Link>` to real paths.

### 4. Promote rooms → routes (TanStack file routes)

Add under `src/routes/` (illustrative):

```
src/routes/connect.tsx          # was node.tsx
src/routes/share.$token.tsx     # invite accept
src/routes/help.tsx
src/routes/legal.terms.tsx
src/routes/legal.privacy.tsx
src/routes/app.index.tsx        # redirect → /app/home
src/routes/app.home.tsx
src/routes/app.movies.tsx
src/routes/app.movies.$id.tsx
src/routes/app.shows.tsx
src/routes/app.shows.$id.tsx
src/routes/app.library.tsx
src/routes/app.search.tsx
src/routes/app.settings.tsx
src/routes/app.watch.$id.tsx
src/routes/app.core.$tab.tsx
```

Wire `RoomSwitch` content into these route components. Keep overlays as presentation if useful, but **URL is canonical**.

Compat redirects in router:
- `/node` → `/connect`
- `/invite/:token` → `/share/:token`

### 5. Primitives (Kit — do not invent more)

Reuse one set everywhere: `AppNav`, `Card`, `FormField`, `Skeleton`.  
Share accept = Auth Card + one primary. Core tabs = Settings stacked Cards (not a one-off modal chrome).

States on every template:
- Loading → Skeleton matching layout  
- Empty → one line + one action  
- Error → danger + Retry + back Home/Connect  
- Success → toast only  

### 6. Auth → dashboard (known bug)

Login/signup use Clerk with `forceRedirectUrl="/app"`. Ensure:
1. Clerk publishable key is set (`VITE_CLERK_PUBLISHABLE_KEY` or `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`).
2. After session, redirect to **`/app/home`** (not a bare `/app` SPA room).
3. Prefer one auth stack (Clerk **or** Better Auth) — dual stack is why “login doesn’t land in dashboard.”
4. Gate `/app/*` with `SignInGate` / wait `isPending` before treating `user === null` as signed out.

### 7. Verify

```bash
npm run lint && npm run typecheck && npm run build
node scripts/browser-smoke.mjs
```

Manual: `/connect` → pair path → `/app/home` → Movies → Library; change theme in Settings and confirm `data-theme` + accent; hard refresh keeps theme; `/share/test` shows accept card.

### 8. Ship

```bash
git checkout -b design/locked-pack-themes
# …commits…
git push -u origin HEAD
# open PR → merge to main → Vercel auto-deploy
```

## Explicit non-goals

- Do not adopt the old zip’s violet-only system as the sole theme (violet is **one** selectable theme).
- Do not add Blog / Press Kit as product routes.
- Do not ship a second empty/error pattern.
- Do not use sidebar nav from brand boards.

## Owners

| Concern | Owner |
|---------|--------|
| Sitemap / redirects | Nova (IA) — `SITEMAP.md` |
| Shell / templates | Reed |
| Tokens / primitives | Kit — `cine-tokens.css` |
| Implementation / PR | Eng (Cloud Agent when Pro available, or local) |

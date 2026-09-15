# CINEVO UI/UX Design System
**Developer Brand Guide**  
Version 1.0 · August 2026 · cinevo.cdxi.click

This document extracts a single, implementable design system from the nine CINEVO UI/UX variations. Use it as the source of truth for tokens, components, layout patterns, and motion. The nine screens are treated as first-class *views* inside one system, not nine competing products.

---

## 0. Playground

Open `cinevo-design-system-preview.html` first. It is the fun version of this spec:

- tap a swatch to copy the hex
- flip cyan / magenta / violet in the header
- click a poster to send it to Now Playing
- switch all 9 views from the pill row
- copy tokens and the glow recipe in one click

Keep this markdown as the source of truth. Keep the HTML as the thing you actually use.


---

## 1. Brand & Product Intent

Cinevo is a cinematic discovery platform: browse, original series, community, curation, and data in one dark, neon environment.

The interface should feel like:

- A luxury theater HUD
- A late-night editing suite
- A neon-lit city at night
- A film archive that also has a pulse

It is **not** a generic streaming clone (Netflix / Prime). It is denser, more expressive, and more “authored.”

### Core product surfaces (mapped to the 9 options)

| Option | Name | Role in the product |
|--------|------|---------------------|
| 1 | Dynamic Stage | Featured / now-playing hero + player chrome |
| 2 | Clean Canvas | Catalog / browse rows |
| 3 | Genre Maze | Relational / graph exploration (genres, talent, connections) |
| 4 | Community Hub | Reviews, forum, Watch Together |
| 5 | Data Dashboard | Personal + platform analytics |
| 6 | Curator’s Studio | Director / studio deep-dives |
| 7 | Sidebar Browser | Dense utility browse (genres, lists, catalog) |
| 8 | Nostalgia Project | Thematic / editorial / period experiences |
| 9 | Modular Grid | Mixed-content home / discovery wall |

A developer should be able to swap layout shells without rewriting tokens or primitives.

---

## 2. Design Principles

1. **Dark-first.** Light mode is not required for v1. Backgrounds stay near-black.
2. **Glow is hierarchy.** Neon is used for focus, selection, and brand — not as wallpaper.
3. **One accent per region.** A card or panel may use cyan *or* magenta *or* violet. Mixing many neons in one component creates noise.
4. **Cinematic framing.** Posters, portraits, and hero stills are treated as film frames (letterbox-friendly, strong crop, glow borders).
5. **Modular density.** The same tokens must support sparse (Clean Canvas) and dense (Dashboard, Genre Maze) layouts.
6. **Performance over spectacle.** Glows are CSS shadows + limited blur. Avoid full-screen particle canvases on every page.
7. **Reduced-motion is first-class.** All glow pulses and transitions have a `prefers-reduced-motion` fallback.

---

## 3. Color Tokens

Use CSS custom properties. Do not hard-code hex in components.

```css
:root {
  /* Surfaces */
  --cine-bg:          #0A0C10;
  --cine-bg-elevated: #10131A;
  --cine-surface:     #151922;
  --cine-surface-2:   #1C212C;
  --cine-border:      rgba(255, 255, 255, 0.08);
  --cine-border-strong: rgba(255, 255, 255, 0.14);

  /* Text */
  --cine-text:        #F4F6FA;
  --cine-text-muted:  #9AA3B5;
  --cine-text-faint:  #6B7385;

  /* Brand / neon */
  --cine-cyan:        #00E5FF;
  --cine-cyan-dim:    #00B8CC;
  --cine-magenta:     #FF2E9A;
  --cine-violet:      #B44CFF;
  --cine-blue:        #4D8CFF;
  --cine-amber:       #FFB020;   /* ratings, warnings */
  --cine-lime:        #7CFF6B;   /* success / “watch together” live */

  /* Semantic */
  --cine-danger:      #FF3B5C;
  --cine-success:     #3DFF9A;

  /* Overlays */
  --cine-scrim:       rgba(6, 8, 12, 0.72);
}
```

### Usage rules

- **Background stack:** `--cine-bg` for page, `--cine-surface` for cards/panels, `--cine-surface-2` for nested wells (inputs, charts).
- **Primary interactive:** cyan for navigation, play, primary CTAs.
- **Secondary / community:** magenta.
- **Curation / talent / graph:** violet.
- **Data / charts:** blue + cyan; keep series to 4–5 colors max.
- **Nostalgia view (Option 8):** allow warmer amber and slightly desaturated cyan; do not introduce new tokens — tint existing ones.

### Glow recipes (copy-paste)

```css
.glow-cyan {
  box-shadow:
    0 0 0 1px var(--cine-cyan),
    0 0 12px rgba(0, 229, 255, 0.45),
    0 0 28px rgba(0, 229, 255, 0.18);
}
.glow-magenta {
  box-shadow:
    0 0 0 1px var(--cine-magenta),
    0 0 12px rgba(255, 46, 154, 0.45),
    0 0 28px rgba(255, 46, 154, 0.16);
}
.glow-violet {
  box-shadow:
    0 0 0 1px var(--cine-violet),
    0 0 14px rgba(180, 76, 255, 0.4);
}
.text-glow-cyan {
  color: var(--cine-cyan);
  text-shadow: 0 0 8px rgba(0, 229, 255, 0.7);
}
```

Never stack more than two glow layers on a single element. Prefer a 1px neon stroke + one soft bloom.

---

## 4. Typography

### Font stack

| Role | Font | Fallback | Weight |
|------|------|----------|--------|
| Logo / wordmark | Orbitron | Rajdhani, sans-serif | 700 |
| Display / section titles | Orbitron or Rajdhani | sans-serif | 600–700 |
| UI / nav / labels | Rajdhani | Inter, sans-serif | 500–600 |
| Body / reviews / data | Inter | system-ui, sans-serif | 400–500 |
| Mono / stats / IDs | JetBrains Mono | ui-monospace | 400–500 |

Load via Google Fonts (or self-host):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@500;700&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: "Orbitron", "Rajdhani", sans-serif;
  --font-ui:      "Rajdhani", "Inter", sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;
}
```

### Scale (desktop)

| Token | Size | Line | Use |
|-------|------|------|-----|
| display | 40–56px | 1.05 | Page heroes, “CINEVO” |
| h1 | 28–32px | 1.15 | View titles |
| h2 | 20–22px | 1.2 | Section titles (Reviews, Forum) |
| h3 | 16–18px | 1.3 | Card titles |
| body | 14–15px | 1.5 | Reviews, descriptions |
| ui | 13px | 1.3 | Nav, chips, metadata |
| caption | 11–12px | 1.3 | Ratings, timestamps |

Wordmark: always **CINEVO** in uppercase, Orbitron 700, tracked +4–8%. Do not use sentence case for the logo.

---

## 5. Spacing, Radius, Elevation

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-8: 48px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 999px;

  --header-h: 56px;
  --sidebar-w: 240px;
}
```

- Cards: `--radius-md` or `--radius-lg`.
- Poster cards: slightly tighter (`10px`) so the image stays cinematic.
- Pills / chips / avatars: `--radius-full`.
- Do not use large “iOS 26” squircles. This system is angular-neon, not soft-glass.

Elevation is **glow + 1px border**, not drop-shadow. A resting card:

```css
.card {
  background: var(--cine-surface);
  border: 1px solid var(--cine-border);
  border-radius: var(--radius-lg);
}
.card:hover,
.card[data-active="true"] {
  border-color: transparent;
  /* apply .glow-cyan or the region’s accent */
}
```

---

## 6. Layout Shell

Default app chrome (shared across most views):

```
┌─────────────────────────────────────────────┐
│  CINEVO     Home  Browse  Originals  Community  Sign in │  ← 56px header
├──────────┬──────────────────────────────────┤
│ optional │                                  │
│ sidebar  │           view canvas            │
│ 240px    │                                  │
└──────────┴──────────────────────────────────┘
```

- Header is always present.
- Sidebar is **opt-in** (Option 7). Other views are full-bleed under the header.
- Content max-width: none for Stage / Nostalgia / Maze; `1440–1600px` centered for catalog-style views is acceptable.
- Grid: 8px base. Poster rows typically 5–7 columns on desktop, 2–3 on tablet, 2 on mobile.

Breakpoints:

| Name | Min |
|------|-----|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

On mobile: collapse header links into a drawer; Genre Maze and Dashboard become stacked cards, not force-fit graphs.

---

## 7. Component Inventory

### 7.1 Top navigation

- Left: wordmark `CINEVO` (cyan or white + cyan glow on hover).
- Center/left cluster: Home · Browse · Original Series · Community.
- Right: Sign in / Register (outlined neon button).
- Active item: cyan underline *or* filled pill with glow — pick one and keep it consistent.
- Height 56px, blur backdrop optional (`backdrop-filter: blur(12px)` on `--cine-bg` at 80% opacity).

### 7.2 Buttons

| Variant | Style |
|---------|--------|
| Primary | Fill `--cine-cyan`, text `#041018`, hover brighter + glow |
| Ghost / secondary | Transparent, 1px cyan or magenta border, glow on hover |
| Danger | `--cine-danger` outline |
| Icon | 36–40px square, same radius as cards |

Do not use heavy gradients on buttons. A subtle top-highlight is enough.

### 7.3 Poster / title card (used in 1, 2, 7, 8, 9)

```
┌──────────────┐
│              │
│    poster    │  aspect 2:3
│              │
├──────────────┤
│ TITLE        │  13–14px, 1–2 lines
│ ★ 8.4  2024  │  caption
└──────────────┘
```

- Image: object-fit cover, slight vignette overlay.
- Default: 1px `--cine-border`.
- Hover / focus: accent glow matching the row (cyan for featured, magenta for originals, etc.).
- Optional neon frame (Option 1): 2px accent stroke + inner glow.

### 7.4 Media player chrome (Option 1)

Minimal HUD over the hero:

- Transport: prev / play-pause / next
- Progress as a thin neon bar
- Volume / fullscreen on the right
- All controls 40px hit targets, cyan icons

### 7.5 Community blocks (Option 4)

- User chip: avatar + name + role
- Review card: rating stars (amber), snippet, timestamp
- “Watch Together” = lime live indicator + magenta/cyan CTA
- Forum list: dense, left accent bar in magenta

### 7.6 Data widgets (Option 5)

- Charts: Recharts or similar. Stroke `--cine-cyan` / `--cine-blue`. Grid lines at 8% white.
- KPI tiles: large mono number, small muted label, optional sparkline.
- Globe / map: wireframe, cyan, low opacity. Do not use photoreal Earth.

### 7.7 Graph / maze (Option 3)

- Nodes: 8–12px cores + glow; labels 11–12px Rajdhani.
- Edges: 1px, color-coded by genre family.
- Selected path: thicker + brighter.
- Implement with a canvas/SVG library (e.g. React Flow, vis-network, or custom SVG). Keep node count reasonable; paginate or cluster.

### 7.8 Curator portraits (Option 6)

- Circular or rounded-square headshots, 1px border.
- Hover: violet glow.
- Studio stills below in a 4–6 film strip.

### 7.9 Sidebar (Option 7)

- Darker than canvas (`--cine-bg-elevated`).
- Section labels 11px uppercase tracked.
- Active item: left 2px cyan bar + faint fill.

### 7.10 Modular tiles (Option 9)

Support 1×1, 2×1, and 2×2 tiles in a CSS grid (`grid-auto-flow: dense` or explicit areas). Large tiles can hold a poster + title; small tiles hold people or “Block Grid” style labels.

---

## 8. The Nine Views — Implementation Notes

### Option 1 — Dynamic Stage
Hero still or trailer loop as background. Foreground: horizontal featured posters + player. Use a strong bottom gradient scrim so titles stay readable. One accent (cyan) only.

### Option 2 — Clean Canvas
Horizontal rails. Section title + “See all”. 5–6 posters visible. Least decorative of the set — this is the default browse.

### Option 3 — Genre Maze
Full-canvas graph. Sidebar or top chips to filter genre families. Performance: virtualize; do not render 200+ glowing nodes on first paint.

### Option 4 — Community Hub
Two-column on desktop (reviews | forum + Watch Together). Avatars stay small. Magenta as the community accent.

### Option 5 — Data Dashboard
CSS grid 12-col. KPI row on top, globe or large chart center, smaller charts around. Numbers in `--font-mono`.

### Option 6 — Curator’s Studio
Header with director name + “The Architects of Light” style editorial title. Portrait row + stills row. Violet accent.

### Option 7 — Sidebar Browser
Persistent sidebar + main rails. Best for power users and “Festival Genres” style taxonomies.

### Option 8 — Nostalgia Project
Full-bleed environmental background (street, marquee). Overlay a few large vintage-style posters. Slight film grain (`opacity: 0.04` noise PNG or SVG filter). Amber allowed here.

### Option 9 — Modular Grid
CSS grid, mixed spans. Good as a logged-in home. Keep a consistent 16–20px gap.

**Routing suggestion:** `/` (Stage or Modular), `/browse` (Clean or Sidebar), `/originals`, `/community`, `/studio/:id`, `/maze`, `/dashboard`, `/themes/:slug` (Nostalgia).

---

## 9. Motion

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 150ms;
  --dur-med:  280ms;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- Hover: 150ms glow / border.
- Page / view change: 280ms fade + 8–12px vertical slide.
- Poster hover: scale(1.03) + glow. Do not scale > 1.05.
- Live indicators (Watch Together): 1.6s opacity pulse, disabled under reduced motion.
- Genre Maze: drag + gentle edge glow on the selected node only.

Avoid: bounce easings, full-page parallax, autoplaying sound, constant scanline overlays.

---

## 10. Tailwind starting point

```js
// tailwind.config.js (excerpt)
theme: {
  extend: {
    colors: {
      cine: {
        bg: "#0A0C10",
        surface: "#151922",
        cyan: "#00E5FF",
        magenta: "#FF2E9A",
        violet: "#B44CFF",
        blue: "#4D8CFF",
      },
    },
    fontFamily: {
      display: ["Orbitron", "Rajdhani", "sans-serif"],
      ui: ["Rajdhani", "Inter", "sans-serif"],
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "ui-monospace", "monospace"],
    },
    boxShadow: {
      "glow-cyan": "0 0 0 1px #00E5FF, 0 0 12px rgba(0,229,255,.45), 0 0 28px rgba(0,229,255,.18)",
      "glow-magenta": "0 0 0 1px #FF2E9A, 0 0 12px rgba(255,46,154,.45)",
    },
  },
}
```

---

## 11. Accessibility

- Contrast: body text on `--cine-bg` must stay ≥ 4.5:1. Neon-on-black is fine for labels; do not set long paragraphs in cyan.
- Focus: visible 2px cyan ring (`:focus-visible`). Do not remove outlines.
- Icons: pair with text or `aria-label`.
- Graphs and charts: provide a table or list alternative.
- Motion: honor `prefers-reduced-motion`.
- Posters: always `alt` with title + year.

---

## 12. Asset & content rules

- Posters: 2:3. Prefer 400–600px wide sources; serve WebP/AVIF.
- Hero stills: 16:9 or 21:9. Darken the lower third for type.
- Avatars: 1:1, 64–128px.
- Do not stretch type on posters. Overlay titles in the UI, don’t bake them into images unless it’s a key-art lockup.
- Fictional titles in the mockups (The Neon Blade, Quantum Horizon, etc.) are tone references — keep that neon-noir naming if you generate placeholder content.

---

## 13. Suggested React structure

```
src/
  styles/tokens.css
  components/
    chrome/Header.tsx
    chrome/Sidebar.tsx
    media/PosterCard.tsx
    media/PlayerHUD.tsx
    community/ReviewCard.tsx
    data/KpiTile.tsx
    graph/GenreMaze.tsx
  views/
    DynamicStage.tsx
    CleanCanvas.tsx
    GenreMazeView.tsx
    CommunityHub.tsx
    DataDashboard.tsx
    CuratorsStudio.tsx
    SidebarBrowser.tsx
    NostalgiaProject.tsx
    ModularGrid.tsx
```

Keep view files as composition only. All visual decisions live in tokens + primitives.

---

## 14. Do / Don’t

**Do**

- Use one accent per panel.
- Keep the wordmark uppercase Orbitron.
- Let posters breathe; 16–24px gaps.
- Implement glow with box-shadow, not extra DOM layers.

**Don’t**

- Mix cyan, magenta, and lime on the same button.
- Use white backgrounds or light-gray cards.
- Apply 20px+ blur on every card (performance + mud).
- Animate the entire maze on load.
- Copy Netflix row spacing/typography — this brand is tighter and more HUD-like.

---

*CINEVO Design System · For implementation in the Cinevo React app · cinevo.cdxi.click*

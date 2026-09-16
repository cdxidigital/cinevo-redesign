import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, b as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { n as auth } from "./server-BBgIL3Uz.mjs";
import { a as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-BnoybxU7.js
var VIDEO_EXT = /\.(mp4|mkv|mov|avi|webm|m4v|wmv|ts|m2ts)$/i;
var blobs = /* @__PURE__ */ new Map();
function mediaUrl(id) {
	return blobs.get(id);
}
function playableCount() {
	return blobs.size;
}
function rememberBlob(id, file) {
	const prev = blobs.get(id);
	if (prev) URL.revokeObjectURL(prev);
	const url = URL.createObjectURL(file);
	blobs.set(id, url);
	return url;
}
function parseFilename(fileName) {
	const base = fileName.split(/[/\\]/).pop() || fileName;
	let stem = base.replace(VIDEO_EXT, "");
	const yearHit = /\(?((?:19|20)\d{2})\)?/.exec(stem);
	const year = yearHit ? yearHit[1] : "";
	stem = stem.replace(/[._]+/g, " ").replace(/\((?:19|20)\d{2}\)/g, " ").replace(/\b(?:19|20)\d{2}\b/g, " ").replace(/\b(1080p|720p|2160p|480p|4k|uhd|hdr|bluray|webrip|web-dl|x264|x265|hevc|dts|aac|remux)\b/gi, " ").replace(/\s+/g, " ").trim();
	return {
		title: stem || base.replace(VIDEO_EXT, ""),
		year,
		fileName: base
	};
}
function isVideoFile(name) {
	return VIDEO_EXT.test(name);
}
var ACCENTS = [
	"cyan",
	"magenta",
	"violet",
	"amber"
];
function titleFromFile(file, folderName, index) {
	const parsed = parseFilename(file.name);
	const id = `folder-${hash(`${folderName}:${file.name}:${file.size}`)}`;
	rememberBlob(id, file);
	const accent = ACCENTS[index % ACCENTS.length];
	return {
		id,
		title: parsed.title,
		kind: /s\d{2}e\d{2}/i.test(file.name) ? "series" : "movie",
		year: parsed.year || "—",
		runtime: file.size > 2e9 ? "2h+" : file.size > 7e8 ? "~2h" : "~90m",
		genre: "Home library",
		genres: ["Home library", folderName],
		synopsis: `Imported from ${folderName}. File stays on this device — CINEVO only indexes the name.`,
		cast: [],
		director: folderName,
		rating: 0,
		addedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		poster: makePoster(parsed.title, accent),
		still: "/stills/theater.jpg",
		accent,
		source: "folder",
		sourceLabel: folderName,
		path: file.name
	};
}
function scanFileList(files, folderName = "Home folder") {
	const list = Array.from(files).filter((f) => isVideoFile(f.name) || isVideoFile(f.webkitRelativePath || ""));
	const name = folderName || guessFolder(list) || "Home folder";
	return list.slice(0, 80).map((file, i) => titleFromFile(file, name, i));
}
function guessFolder(files) {
	return (files.find((f) => f.webkitRelativePath)?.webkitRelativePath || "").split("/")[0] || "";
}
function hash(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
	return h.toString(16);
}
function makePoster(title, accent) {
	if (typeof document === "undefined") return "/stills/theater.jpg";
	const c = document.createElement("canvas");
	c.width = 400;
	c.height = 600;
	const ctx = c.getContext("2d");
	if (!ctx) return "/stills/theater.jpg";
	const ink = {
		cyan: "#f5f5f5",
		magenta: "#3b7bff",
		violet: "#8aa0c4",
		amber: "#d6d0c4"
	};
	ctx.fillStyle = "#0b0b0b";
	ctx.fillRect(0, 0, 400, 600);
	ctx.strokeStyle = "rgba(255,255,255,0.16)";
	ctx.lineWidth = 1;
	ctx.strokeRect(18, 18, 364, 564);
	ctx.fillStyle = ink[accent] || "#f5f5f5";
	ctx.font = "800 28px Inter, system-ui, sans-serif";
	wrapText(ctx, title, 36, 250, 328, 34);
	ctx.fillStyle = "rgba(255,255,255,0.35)";
	ctx.font = "700 12px Inter, system-ui, sans-serif";
	ctx.fillText("CINEVO", 36, 560);
	return c.toDataURL("image/jpeg", .85);
}
function wrapText(ctx, text, x, y, max, lh) {
	const words = text.split(" ");
	let line = "";
	let yy = y;
	for (const w of words) {
		const next = line ? `${line} ${w}` : w;
		if (ctx.measureText(next).width > max) {
			ctx.fillText(line, x, yy);
			line = w;
			yy += lh;
		} else line = next;
	}
	if (line) ctx.fillText(line, x, yy);
}
function remoteTitle(input) {
	const accent = input.source === "plex" ? "amber" : input.source === "shared" ? "magenta" : "violet";
	const label = input.source === "plex" ? "Plex" : input.source === "jellyfin" ? "Jellyfin" : "Shared";
	return {
		id: input.id,
		title: input.title,
		kind: input.kind ?? "movie",
		year: input.year || "—",
		runtime: "—",
		genre: input.genre || label,
		genres: [label, input.sourceLabel],
		synopsis: input.synopsis || `Indexed from ${input.sourceLabel}. Playback stays on your media server.`,
		cast: [],
		director: input.sourceLabel,
		rating: 0,
		addedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		poster: makePoster(input.title, accent),
		still: "/stills/theater.jpg",
		accent,
		source: input.source,
		sourceLabel: input.sourceLabel
	};
}
var THEMES = [
	{
		id: "pulse",
		label: "Night",
		accent: "#8B2FFF"
	},
	{
		id: "nova",
		label: "Cyan",
		accent: "#55CFFF"
	},
	{
		id: "iris",
		label: "Paper",
		accent: "#f7f5fa"
	},
	{
		id: "ember",
		label: "Pink",
		accent: "#FF4DA5"
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BkDaL0Fq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DB = "cinevo-fs";
var STORE = "handles";
async function permission(handle, request) {
	const h = handle;
	if ((h.queryPermission ? await h.queryPermission({ mode: "read" }) : "granted") === "granted") return true;
	if (!request || !h.requestPermission) return false;
	return await h.requestPermission({ mode: "read" }) === "granted";
}
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB, 1);
		req.onupgradeneeded = () => {
			if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function saveFolderHandle(id, handle, folderName) {
	try {
		const db = await openDb();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE, "readwrite");
			tx.objectStore(STORE).put({
				handle,
				folderName
			}, id);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	} catch {}
}
async function deleteFolderHandle(id) {
	try {
		const db = await openDb();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE, "readwrite");
			tx.objectStore(STORE).delete(id);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	} catch {}
}
async function walk(dir, out, depth = 0) {
	if (depth > 6 || out.length > 80) return;
	for await (const entry of dir.values()) {
		if (out.length >= 80) return;
		if (entry.kind === "file") {
			const file = await entry.getFile();
			if (isVideoFile(file.name)) out.push(file);
		} else if (entry.kind === "directory") await walk(entry, out, depth + 1);
	}
}
function folderTitleId(folderName, file) {
	let h = 0;
	const s = `${folderName}:${file.name}:${file.size}`;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
	return `folder-${h.toString(16)}`;
}
async function loadAll() {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(STORE, "readonly").objectStore(STORE).getAll();
		req.onsuccess = () => resolve(req.result || []);
		req.onerror = () => reject(req.error);
	});
}
async function restoreFolderBlobs() {
	if (typeof indexedDB === "undefined") return 0;
	try {
		const records = await loadAll();
		let n = 0;
		for (const rec of records) {
			if (!rec?.handle) continue;
			if (!await permission(rec.handle, false)) continue;
			const files = [];
			await walk(rec.handle, files);
			for (const file of files) {
				rememberBlob(folderTitleId(rec.folderName, file), file);
				n += 1;
			}
		}
		return n;
	} catch {
		return 0;
	}
}
async function reconnectFolders() {
	if (typeof indexedDB === "undefined") return 0;
	try {
		const records = await loadAll();
		let n = 0;
		for (const rec of records) {
			if (!rec?.handle) continue;
			if (!await permission(rec.handle, true)) continue;
			const files = [];
			await walk(rec.handle, files);
			for (const file of files) {
				rememberBlob(folderTitleId(rec.folderName, file), file);
				n += 1;
			}
		}
		return n;
	} catch {
		return 0;
	}
}
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var CATALOG = [];
function genresIn(pool) {
	return ["All", ...Array.from(new Set(pool.flatMap((t) => t.genres))).sort()];
}
function similarTo(title, pool = CATALOG) {
	const mine = title.genres ?? [];
	return pool.filter((t) => t.id !== title.id && (t.genres ?? []).some((g) => mine.includes(g))).slice(0, 6);
}
function filterCatalog(opts) {
	const q = (opts.query ?? "").trim().toLowerCase();
	return (opts.pool ?? CATALOG).filter((t) => {
		const cast = t.cast ?? [];
		const genres = t.genres ?? [];
		const hay = `${t.title} ${t.synopsis} ${t.genre} ${cast.join(" ")} ${t.director}`.toLowerCase();
		if (q && !hay.includes(q)) return false;
		if (opts.kind && opts.kind !== "all" && t.kind !== opts.kind) return false;
		if (opts.genre && opts.genre !== "All" && !genres.includes(opts.genre)) return false;
		if (opts.minRating && t.rating < opts.minRating) return false;
		return true;
	});
}
function recentlyAdded(n = 8, pool = CATALOG) {
	return [...pool].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, n);
}
var MOODS = [
	{
		id: "all",
		label: "All",
		hint: "Find your next scene.",
		genres: []
	},
	{
		id: "neon",
		label: "Neon",
		hint: "Stay with the shadows.",
		genres: [
			"Action",
			"Noir",
			"Crime",
			"Cyberpunk",
			"Thriller"
		]
	},
	{
		id: "quiet",
		label: "Quiet",
		hint: "Settle into something human.",
		genres: [
			"Drama",
			"Romance",
			"Mystery"
		]
	},
	{
		id: "far",
		label: "Far",
		hint: "Leave the city for a while.",
		genres: ["Sci-Fi", "Adventure"]
	},
	{
		id: "warm",
		label: "Warm",
		hint: "Same tokens. Warmer grade.",
		genres: [
			"Nostalgia",
			"History",
			"Western",
			"Music"
		]
	}
];
function byMood(mood, pool = CATALOG) {
	if (mood === "all") return pool;
	const genres = MOODS.find((m) => m.id === mood)?.genres ?? [];
	const hits = pool.filter((t) => (t.genres ?? []).some((g) => genres.includes(g)) || genres.includes(t.genre));
	return hits.length ? hits : pool;
}
function pickFeatured(opts) {
	const all = opts.pool ?? CATALOG;
	if (!all.length) return void 0;
	const pool = byMood(opts.mood, all);
	for (const id of opts.tonight) {
		const hit = pool.find((t) => t.id === id) ?? all.find((t) => t.id === id);
		if (hit) return hit;
	}
	const cont = pool.find((t) => {
		const p = opts.progress[t.id];
		return p != null && p > 0 && p < 100;
	});
	if (cont) return cont;
	return [...pool].sort((a, b) => b.rating - a.rating)[0] ?? all[0];
}
var DEFAULT_DASHBOARD_WIDGETS = [
	"playlist",
	"continue",
	"suggestions",
	"my-list"
];
function sanitizeDashboardWidgets(value) {
	if (!Array.isArray(value)) return [...DEFAULT_DASHBOARD_WIDGETS];
	const valid = value.filter((item) => DEFAULT_DASHBOARD_WIDGETS.includes(item));
	return Array.from(new Set(valid)).concat(DEFAULT_DASHBOARD_WIDGETS.filter((item) => !valid.includes(item)));
}
var DEFAULT_PREFS = {
	nightMode: true,
	zenMode: false,
	focusMode: false,
	audioHints: true,
	theme: "pulse",
	dashboardWidgets: [...DEFAULT_DASHBOARD_WIDGETS]
};
var FRESH = {
	progress: {},
	favorites: [],
	invites: [],
	notices: [],
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
	plexToken: "",
	plexUser: "",
	plexServers: []
};
function catalogPool(get) {
	return [...get().localTitles, ...get().remoteTitles];
}
function inviteToken() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID().replace(/-/g, "").slice(0, 22);
	return `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}
function hydrateInvites(raw) {
	if (!Array.isArray(raw)) return [];
	return raw.map((item) => {
		const row = item;
		const createdAt = Number(row.createdAt) || Date.now();
		const days = Number(row.days) || 7;
		return {
			id: String(row.id || `inv-${createdAt}`),
			token: String(row.token || inviteToken()),
			name: String(row.name || "Friend"),
			days,
			status: row.status === "paused" || row.status === "revoked" ? row.status : "active",
			createdAt,
			expiresAt: Number(row.expiresAt) || createdAt + days * 864e5,
			libraries: Array.isArray(row.libraries) ? row.libraries.map(String) : []
		};
	});
}
var useCinevo = create()(persist((set, get) => ({
	room: "stage",
	searchOpen: false,
	settingsOpen: false,
	coreOpen: false,
	coreTab: "libraries",
	noticesOpen: false,
	toast: "",
	prefs: DEFAULT_PREFS,
	libraries: [],
	aiConsent: false,
	nodeUrl: "http://127.0.0.1:48184",
	nodeToken: "",
	nodeDevice: "",
	plexClientId: "",
	...FRESH,
	setRoom: (room) => set({
		room,
		selectedId: null
	}),
	openTitle: (id) => set({ selectedId: id }),
	closeTitle: () => set({ selectedId: null }),
	play: (id) => {
		set({
			playingId: id,
			playing: true,
			selectedId: null,
			progress: (get().progress[id] ?? 0) >= 100 ? {
				...get().progress,
				[id]: 0
			} : get().progress
		});
	},
	stopPlay: () => set({
		playingId: null,
		playing: false
	}),
	togglePlay: () => {
		const id = get().playingId;
		if (id && (get().progress[id] ?? 0) >= 100) {
			get().play(id);
			return;
		}
		set({ playing: !get().playing });
	},
	setProgress: (id, value) => set({ progress: {
		...get().progress,
		[id]: Math.max(0, Math.min(100, value))
	} }),
	toggleFavorite: (id) => {
		const has = get().favorites.includes(id);
		set({ favorites: has ? get().favorites.filter((x) => x !== id) : [...get().favorites, id] });
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
		set({ notes: [{
			id: `n-${Date.now()}`,
			titleId,
			body: text,
			createdAt: Date.now()
		}, ...get().notes].slice(0, 40) });
		get().flash("Note saved");
	},
	removeNote: (id) => set({ notes: get().notes.filter((n) => n.id !== id) }),
	startParty: (titleId, withName) => {
		set({ party: {
			titleId,
			with: withName.trim()
		} });
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
	setCoreOpen: (coreOpen, tab) => set({
		coreOpen,
		coreTab: tab ?? get().coreTab
	}),
	setCoreTab: (coreTab) => set({ coreTab }),
	setNoticesOpen: (noticesOpen) => set({ noticesOpen }),
	flash: (toast) => {
		set({ toast });
		window.setTimeout(() => {
			if (get().toast === toast) set({ toast: "" });
		}, 2200);
	},
	notify: (input) => {
		set({ notices: [{
			id: `nt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
			createdAt: Date.now(),
			readAt: null,
			...input
		}, ...get().notices].slice(0, 40) });
	},
	markNoticeRead: (id) => set({ notices: get().notices.map((n) => n.id === id && !n.readAt ? {
		...n,
		readAt: Date.now()
	} : n) }),
	markAllNoticesRead: () => set({ notices: get().notices.map((n) => n.readAt ? n : {
		...n,
		readAt: Date.now()
	}) }),
	dismissNotice: (id) => set({ notices: get().notices.filter((n) => n.id !== id) }),
	clearNotices: () => set({ notices: [] }),
	patchPrefs: (p) => set({ prefs: {
		...get().prefs,
		...p
	} }),
	setTheme: (theme) => {
		set({ prefs: {
			...get().prefs,
			theme
		} });
		if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", theme);
	},
	setDashboardWidgets: (dashboardWidgets) => set({ prefs: {
		...get().prefs,
		dashboardWidgets: sanitizeDashboardWidgets(dashboardWidgets)
	} }),
	toggleLibrary: (id) => set({
		libraries: get().libraries.map((l) => l.id === id ? {
			...l,
			selected: !l.selected
		} : l),
		sources: get().sources.map((s) => s.id === id ? {
			...s,
			selected: !s.selected
		} : s)
	}),
	addInvite: (name, days) => {
		const createdAt = Date.now();
		const invite = {
			id: `inv-${createdAt}`,
			token: inviteToken(),
			name: name.trim() || "Friend",
			days,
			status: "active",
			createdAt,
			expiresAt: createdAt + days * 864e5,
			libraries: get().sources.filter((s) => s.selected).map((s) => s.id)
		};
		set({ invites: [invite, ...get().invites] });
		get().notify({
			category: "sharing",
			title: "Private invitation created",
			message: `${invite.name} has ${days} days of access to selected libraries.`,
			href: "/app?core=sharing"
		});
		return invite;
	},
	setInviteStatus: (id, status) => {
		const current = get().invites.find((i) => i.id === id);
		set({ invites: get().invites.map((i) => i.id === id ? {
			...i,
			status
		} : i) });
		if (current) get().notify({
			category: "sharing",
			title: status === "revoked" ? "Invitation revoked" : status === "paused" ? "Invitation paused" : "Invitation restored",
			message: `${current.name} is now ${status}.`,
			href: "/app?core=sharing"
		});
	},
	setAiConsent: (aiConsent) => {
		set({ aiConsent });
		get().notify({
			category: "privacy",
			title: aiConsent ? "AI concierge enabled" : "AI concierge disabled",
			message: aiConsent ? "CINEVO may use selected library metadata when you ask." : "Metadata assistance is off until you opt in again.",
			href: "/app?core=ai"
		});
	},
	setNodeUrl: (nodeUrl) => set({ nodeUrl }),
	setNodeSession: (nodeToken, nodeDevice) => set({
		nodeToken,
		nodeDevice
	}),
	clearNodeSession: () => set({
		nodeToken: "",
		nodeDevice: ""
	}),
	setPlexSession: (plexToken, plexUser, plexServers, plexClientId) => set({
		plexToken,
		plexUser,
		plexServers,
		plexClientId
	}),
	setPlexServers: (plexServers) => set({ plexServers }),
	clearPlexSession: () => set({
		plexToken: "",
		plexUser: "",
		plexServers: []
	}),
	addFolderTitles: (titles, source) => {
		const existing = new Set(get().localTitles.map((t) => t.id));
		const next = titles.filter((t) => !existing.has(t.id));
		const sources = get().sources.filter((s) => s.id !== source.id);
		set({
			localTitles: [...next, ...get().localTitles].slice(0, 200),
			sources: [{
				...source,
				count: next.length + get().localTitles.filter((t) => t.sourceLabel === source.name).length
			}, ...sources]
		});
		get().flash(next.length ? `Added ${next.length} titles from ${source.name}` : "No new video files in that folder");
		if (next.length) get().notify({
			category: "library",
			title: "Folder indexed",
			message: `${next.length} titles from ${source.name} are now in CINEVO.`,
			href: "/app?core=libraries"
		});
	},
	addRemoteTitles: (titles, source) => {
		const existing = new Set(get().remoteTitles.map((t) => t.id));
		const next = titles.filter((t) => !existing.has(t.id));
		const sources = get().sources.filter((s) => s.id !== source.id);
		set({
			remoteTitles: [...next, ...get().remoteTitles].slice(0, 300),
			sources: [{
				...source,
				count: next.length
			}, ...sources]
		});
		get().flash(next.length ? `Imported ${next.length} titles from ${source.name}` : "No titles in that section");
		if (next.length) {
			const kindLabel = source.kind === "plex" ? "Plex" : source.kind === "jellyfin" ? "Jellyfin" : source.kind === "shared" ? "Shared" : "Library";
			get().notify({
				category: "library",
				title: `${kindLabel} library imported`,
				message: `${next.length} titles from ${source.name} are ready to browse.`,
				href: "/app?core=libraries"
			});
		}
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
			favorites: get().favorites.filter((tid) => keep.has(tid))
		});
		import("./folder-handles-C3hi_xBy.mjs").then((m) => m.deleteFolderHandle(id));
		get().flash("Source removed");
	},
	setSourceFilter: (sourceFilter) => set({ sourceFilter }),
	clearLocalData: () => {
		set({
			...FRESH,
			libraries: [],
			searchOpen: false,
			coreOpen: false,
			noticesOpen: false,
			nodeToken: "",
			nodeDevice: "",
			plexToken: "",
			plexUser: "",
			plexServers: [],
			prefs: {
				...get().prefs,
				theme: get().prefs.theme,
				dashboardWidgets: [...DEFAULT_DASHBOARD_WIDGETS]
			}
		});
		try {
			localStorage.removeItem("cinevo-state");
			localStorage.removeItem("cinevo-storage");
		} catch {}
		get().flash("Local data cleared");
	}
}), {
	name: "cinevo-local-v4",
	skipHydration: true,
	merge: (persisted, current) => {
		const p = persisted ?? {};
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
			plexClientId: p.plexClientId ?? "",
			plexToken: p.plexToken ?? "",
			plexUser: p.plexUser ?? "",
			plexServers: Array.isArray(p.plexServers) ? p.plexServers : [],
			sources: Array.isArray(p.sources) ? p.sources : [],
			invites: hydrateInvites(p.invites),
			notices: Array.isArray(p.notices) ? p.notices : [],
			localTitles: Array.isArray(p.localTitles) ? p.localTitles.map((t) => ({
				...t,
				cast: t.cast ?? [],
				genres: t.genres?.length ? t.genres : ["Home library"],
				poster: t.poster && !t.poster.startsWith("data:") ? t.poster : makePoster(t.title, t.accent || "cyan")
			})) : [],
			remoteTitles: Array.isArray(p.remoteTitles) ? p.remoteTitles.map((t) => ({
				...t,
				cast: t.cast ?? [],
				genres: t.genres?.length ? t.genres : [t.genre || "Library"]
			})) : [],
			sourceFilter: Array.isArray(p.sources) && p.sources.length > 1 && (p.sourceFilter === "folder" || p.sourceFilter === "plex" || p.sourceFilter === "jellyfin" || p.sourceFilter === "shared") ? p.sourceFilter : "all",
			prefs: {
				...DEFAULT_PREFS,
				...p.prefs,
				theme,
				dashboardWidgets: sanitizeDashboardWidgets(p.prefs?.dashboardWidgets),
				audioHints: p.prefs?.audioHints ?? true
			}
		};
	},
	partialize: (s) => ({
		progress: s.progress,
		favorites: s.favorites,
		prefs: s.prefs,
		libraries: s.libraries,
		invites: s.invites,
		notices: s.notices,
		aiConsent: s.aiConsent,
		tonight: s.tonight,
		notes: s.notes,
		party: s.party,
		mood: s.mood,
		nodeUrl: s.nodeUrl,
		nodeToken: s.nodeToken,
		nodeDevice: s.nodeDevice,
		plexClientId: s.plexClientId,
		plexToken: s.plexToken,
		plexUser: s.plexUser,
		plexServers: s.plexServers,
		sources: s.sources,
		localTitles: s.localTitles.map((t) => ({
			...t,
			poster: t.poster?.startsWith("data:") ? "" : t.poster
		})),
		remoteTitles: s.remoteTitles,
		sourceFilter: s.sourceFilter
	})
}));
function titleById(id) {
	if (!id) return void 0;
	const s = useCinevo.getState();
	return s.localTitles.find((t) => t.id === id) ?? s.remoteTitles.find((t) => t.id === id);
}
function libraryPool() {
	const s = useCinevo.getState();
	return [...s.localTitles, ...s.remoteTitles];
}
var STALE_KEYS = [
	"cinevo-state",
	"cinevo-storage",
	"cinevo-local-v2",
	"cinevo-local-v3"
];
function Rehydrate() {
	(0, import_react.useEffect)(() => {
		try {
			for (const key of STALE_KEYS) localStorage.removeItem(key);
		} catch {}
		Promise.resolve(useCinevo.persist.rehydrate()).then(async () => {
			const theme = useCinevo.getState().prefs.theme || "pulse";
			document.documentElement.setAttribute("data-theme", theme);
			if (await restoreFolderBlobs()) {
				const s = useCinevo.getState();
				useCinevo.setState({ localTitles: [...s.localTitles] });
			}
		});
	}, []);
	return null;
}
var styles_default = "/assets/styles-3uGGFRI7.css";
var APP_NAME = "CINEVO";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#1A1A1E"
			},
			{
				name: "description",
				content: "CINEVO — Cinema, reinvented. Your library. No ads. No subscriptions."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "apple-touch-icon",
				href: "/app-icon.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Poppins:wght@600;700;800&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-cine-bg text-cine-text antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rehydrate, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-cP037wVK.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./app-ByKOgkrR.mjs");
var Route$4 = createFileRoute("/app")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./login-BFOhWGwu.mjs");
var Route$3 = createFileRoute("/login")({
	validateSearch: (search) => ({ mode: search.mode === "up" ? "up" : "in" }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./node-Dw8_YbM-.mjs");
var Route$2 = createFileRoute("/node")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./s._token-CiPJjP4P.mjs");
var Route$1 = createFileRoute("/s/$token")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	AppRoute: Route$4.update({
		id: "/app",
		path: "/app",
		getParentRoute: () => Route$6
	}),
	LoginRoute: Route$3.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$6
	}),
	NodeRoute: Route$2.update({
		id: "/node",
		path: "/node",
		getParentRoute: () => Route$6
	}),
	STokenRoute: Route$1.update({
		id: "/s/$token",
		path: "/s/$token",
		getParentRoute: () => Route$6
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { scanFileList as S, saveFolderHandle as _, titleById as a, playableCount as b, byMood as c, pickFeatured as d, recentlyAdded as f, THEMES as g, reconnectFolders as h, libraryPool as i, filterCatalog as l, deleteFolderHandle as m, Route$1 as n, useCinevo as o, similarTo as p, Route$3 as r, MOODS as s, router_exports as t, genresIn as u, isVideoFile as v, remoteTitle as x, mediaUrl as y };

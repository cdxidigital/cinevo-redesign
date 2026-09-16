import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as cn } from "./logo-BkQ2pPmb.mjs";
import { a as getMyProfile, d as useCurrentUserState, n as claimUsername } from "./sharing-CIjTPYrd.mjs";
import { r as UserButton } from "./gates-Crs8ckTP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-ChdQnLIW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthSlot({ className }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("size-9 shrink-0 animate-pulse rounded-full bg-cine-surface", className) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		search: { mode: "in" },
		className: cn("inline-flex h-11 items-center rounded-full border border-cine-line px-3 font-ui text-xs font-bold uppercase tracking-wider text-cine-text", className),
		children: "Sign in"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("cinevo-account", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
	});
}
function LandingAuth() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-9 animate-pulse rounded-full bg-cine-surface" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "cinevo-account",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			search: { mode: "in" },
			className: "public-nav__signin max-md:hidden",
			children: "Sign in"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			search: { mode: "up" },
			className: "public-nav__enter",
			children: "Create account"
		})]
	});
}
function UsernameGate() {
	const { user, isPending } = useCurrentUserState();
	const [needed, setNeeded] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user || user.isDevFallback) return;
		getMyProfile().then((res) => {
			if (res.ok && !res.profile) setNeeded(true);
		}).catch(() => void 0);
	}, [isPending, user]);
	if (!needed) return null;
	const save = async () => {
		setPending(true);
		setError("");
		const res = await claimUsername({ data: {
			username,
			display: user?.displayName || username
		} });
		setPending(false);
		if (!res.ok) {
			setError(res.error);
			return;
		}
		setNeeded(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[70] grid place-items-center bg-cine-bg/80 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "glass-strong w-full max-w-md rounded-2xl p-6",
			onSubmit: (e) => {
				e.preventDefault();
				save();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[10px] font-extrabold tracking-[0.22em] text-cine-cyan",
					children: "USERNAME"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl font-bold tracking-tight",
					children: "Claim your CINEVO name."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-cine-muted",
					children: "Friends share Plex and Jellyfin catalogs with this handle. Playback stays on the original server."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: username,
					onChange: (e) => setUsername(e.target.value),
					placeholder: "e.g. james",
					autoComplete: "username",
					"aria-label": "Username",
					className: "mt-5 h-12 w-full rounded-xl border border-cine-border bg-cine-well px-4 font-ui"
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-cine-danger",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: pending,
					className: "house-btn house-btn--play mt-5 w-full",
					children: pending ? "Saving…" : "Save username"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "house-btn house-btn--ghost mt-2 w-full",
					onClick: () => setNeeded(false),
					children: "Later"
				})
			]
		})
	});
}
//#endregion
export { LandingAuth as n, UsernameGate as r, AuthSlot as t };

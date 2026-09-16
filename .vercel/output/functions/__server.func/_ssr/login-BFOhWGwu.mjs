import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, v as Navigate, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-BBgIL3Uz.mjs";
import { r as Route$3 } from "./router-BkDaL0Fq.mjs";
import { t as Logo } from "./logo-BkQ2pPmb.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { d as useCurrentUserState, n as claimUsername } from "./sharing-CIjTPYrd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BFOhWGwu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const nav = useNavigate();
	const { mode: initial } = Route$3.useSearch();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)(initial);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMode(initial);
	}, [initial]);
	if (!isPending && user && !user.isDevFallback) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/app" });
	const afterEmail = async (name) => {
		if (name.trim()) {
			const res = await claimUsername({ data: {
				username: name.trim(),
				display: name.trim()
			} });
			if (!res.ok) {
				setError(res.error);
				nav({ to: "/app" });
				return;
			}
		}
		nav({ to: "/app" });
	};
	const submit = async (e) => {
		e.preventDefault();
		setError("");
		setPending(true);
		try {
			if (mode === "up") {
				const { error: err } = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: username.trim() || email.split("@")[0]
				});
				if (err) {
					setError(err.message || "Could not create that account.");
					return;
				}
				await afterEmail(username);
			} else {
				const { error: err } = await authClient.signIn.email({
					email: email.trim(),
					password
				});
				if (err) {
					setError(err.message || "Email or password did not match.");
					return;
				}
				nav({ to: "/app" });
			}
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Sign-in failed.");
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-stage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-8 inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
						size: "lg",
						tagline: false
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[10px] font-extrabold tracking-[0.22em] text-cine-cyan",
					children: "PRIVATE CINEMA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-bold tracking-tight",
					children: mode === "up" ? "Create your house." : "Take your seat."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-cine-muted",
					children: "A username lets friends share Plex and Jellyfin catalogs with you. Folders still work without an account."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => signIn(p.providerId, { callbackURL: "/app" }),
							className: "h-12 rounded-xl border border-cine-border bg-cine-elevated font-ui text-sm font-bold hover:border-cine-cyan",
							children: ["Continue with ", p.label]
						}, p.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "my-5 text-center font-ui text-[11px] uppercase tracking-[0.18em] text-cine-faint",
						children: "or email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => void submit(e),
						className: "grid gap-3",
						children: [
							mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: username,
								onChange: (e) => setUsername(e.target.value),
								placeholder: "Username",
								autoComplete: "username",
								"aria-label": "Username",
								required: true,
								className: "h-12 rounded-xl border border-cine-border bg-cine-well px-4 font-ui"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "Email",
								autoComplete: "email",
								required: true,
								"aria-label": "Email",
								className: "h-12 rounded-xl border border-cine-border bg-cine-well px-4 font-ui"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Password",
								autoComplete: mode === "up" ? "new-password" : "current-password",
								required: true,
								minLength: 8,
								"aria-label": "Password",
								className: "h-12 rounded-xl border border-cine-border bg-cine-well px-4 font-ui"
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-cine-danger",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: pending,
								className: "house-btn house-btn--play h-12 w-full",
								children: pending ? "Working…" : mode === "up" ? "Create account" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-5 font-ui text-sm text-cine-cyan",
						onClick: () => {
							setMode(mode === "up" ? "in" : "up");
							setError("");
						},
						children: mode === "up" ? "Already have a house? Sign in" : "New here? Create an account"
					})
				] })
			]
		})
	});
}
//#endregion
export { Login as component };

import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-BkQ2pPmb.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var FACETS = [
	{
		d: "70,40 70,120 113.33,120",
		fill: "#FF4DA5"
	},
	{
		d: "70,120 70,200 113.33,120",
		fill: "#C13BE0"
	},
	{
		d: "70,200 135,160 113.33,120",
		fill: "#FF9F1C"
	},
	{
		d: "135,160 200,120 113.33,120",
		fill: "#3E8EFF"
	},
	{
		d: "200,120 135,80 113.33,120",
		fill: "#55CFFF"
	},
	{
		d: "135,80 70,40 113.33,120",
		fill: "#8B2FFF"
	}
];
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 240 240",
		className: cn("brand__gem", className),
		"aria-hidden": "true",
		children: [FACETS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: f.d,
			fill: f.fill,
			stroke: "#fff",
			strokeOpacity: "0.35",
			strokeWidth: "1.6",
			strokeLinejoin: "round"
		}, f.fill)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "150,88 168,100 150,108",
			fill: "#fff",
			fillOpacity: "0.55"
		})]
	});
}
function Logo({ size = "md", className, tagline = true }) {
	const showTag = tagline && size !== "sm";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("brand", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "CINEVO" }), showTag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Your media. Your moment." }) : null] })]
	});
}
//#endregion
export { Mark as n, cn as r, Logo as t };

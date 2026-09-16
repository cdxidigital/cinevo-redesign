import { _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowRight, M as ArrowDownRight, O as Check, c as Sparkles, h as Play, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as Mark, t as Logo } from "./logo-BkQ2pPmb.mjs";
import { n as LandingAuth } from "./account-ChdQnLIW.mjs";
import { t as InstallerCards } from "./installers-C5sNAYD_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-cP037wVK.js
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		label: "Home",
		href: "/"
	},
	{
		label: "Your library",
		to: "/app"
	},
	{
		label: "Node",
		to: "/node"
	},
	{
		label: "CINEVO Core",
		href: "/app"
	}
];
var STEPS = [
	{
		n: "01",
		t: "Connect a server",
		d: "Add a folder on this computer, sign in with Plex, or pair CINEVO Node for Jellyfin."
	},
	{
		n: "02",
		t: "Choose sections",
		d: "Select only the movie and series libraries you want CINEVO to index."
	},
	{
		n: "03",
		t: "Make it yours",
		d: "Your connected library appears only after your choice. Nothing is published."
	}
];
var HIGHLIGHTS = [
	{
		n: "01",
		eyebrow: "PRIVATE LIBRARIES",
		title: "Choose exactly what belongs in view.",
		description: "Folders, Plex, or Jellyfin through Node. Select the sections CINEVO may index. Media stays on your machine.",
		action: "Set up libraries",
		to: "/app"
	},
	{
		n: "02",
		eyebrow: "FRIEND SHARING",
		title: "Share with care, never by default.",
		description: "Invite by CINEVO username. Share Plex and Jellyfin catalogs — never the files. Playback stays on the original server.",
		action: "Manage sharing",
		to: "/app"
	},
	{
		n: "03",
		eyebrow: "CINEVO CORE",
		title: "A quieter way to care for your collection.",
		description: "Library health, setup, and consent — without turning private media into a social performance.",
		action: "Explore Core",
		to: "/app"
	},
	{
		n: "04",
		eyebrow: "CONSENT-LED AI",
		title: "Thoughtful suggestions on your terms.",
		description: "Ask only the titles already in this house. Nothing leaves until you opt in.",
		action: "See AI controls",
		to: "/app"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "public-home",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "public-nav",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "public-brand",
						"aria-label": "CINEVO home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "md" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Homepage",
						children: NAV.map((item) => item.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							children: item.label
						}, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							children: item.label
						}, item.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "public-nav__actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingAuth, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "public-hero",
					"aria-labelledby": "public-hero-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/stills/hero-theater.jpg",
							alt: "",
							className: "public-hero__still"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "public-hero__veil" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "public-hero__orb",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "public-hero__gem" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "public-hero__content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "public-kicker",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), " PRIVATE BY DESIGN"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									id: "public-hero-title",
									children: [
										"Your media.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Your moment." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CINEVO brings the libraries you control into a considered cinematic space — folders, Plex, and Jellyfin, shared by username with people you trust." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "public-hero__actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/app",
										className: "public-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
											size: 15,
											fill: "currentColor"
										}), " Enter CINEVO"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/login",
										search: { mode: "up" },
										className: "public-secondary",
										children: ["Create account ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { size: 16 })]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "public-hero__note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Private from the first connection" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Personal media remains on your computer or Plex server." })] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "home-reel",
					"aria-labelledby": "home-reel-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "public-kicker",
						children: "START WITH YOUR LIBRARY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "home-reel-title",
						children: "Nothing appears here until you choose it."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CINEVO never fills your library with sample media or imported catalogue data." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "home-library-steps",
						children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step.n }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: step.t }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: step.d })
						] }, step.n))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "home-manifesto",
					id: "libraries",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "home-manifesto__intro",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "public-kicker",
								children: "THE PRIVATE MEDIA OS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
								"Every library is personal.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "So CINEVO starts with permission." })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Bring together the media you own and host without turning it into someone else’s platform. Folders on this computer. Plex at home or remote. Jellyfin through Node." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/app",
								className: "public-text-link",
								children: ["Connect a library ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "home-manifesto__rules",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Select libraries deliberately" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Choose the individual sections CINEVO can see." })] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Keep sharing intentional" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Invite by username. Share the catalog, not the files." })] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Stay in control of AI" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Opt in and set the metadata scope for each request." })] })] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "home-highlights",
					id: "sharing",
					"aria-labelledby": "home-highlights-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "public-kicker",
						children: "A MORE CONSIDERED MEDIA LIFE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						id: "home-highlights-title",
						children: [
							"Everything useful.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Nothing extractive."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "home-highlights__grid",
						children: HIGHLIGHTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: "home-highlight",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.n }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: item.eyebrow }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.description }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
									item.action,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })
								] })
							]
						}, item.n))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "home-downloads",
					id: "downloads",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "public-kicker",
							children: "CINEVO NODE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl",
							children: "The projector lives at home."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 mb-10 max-w-xl text-sm text-cine-muted",
							children: "Install Node on the computer that holds the files. Pair once. Jellyfin and disk paths stay on loopback."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallerCards, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "home-closing",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							size: 18,
							className: "text-cine-cyan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "public-kicker",
							children: "CINEMA, REINVENTED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"A home for your",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "entire world of stories." })
						] })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Connect the library you trust. Claim a username. Then settle in." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app",
						className: "public-primary",
						children: ["Begin with your library ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
					})] })]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "public-footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "public-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "md" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your media. Your moment." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app",
						children: ["Open your library ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 13 })]
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };

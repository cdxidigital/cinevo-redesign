import { i as __toESM } from "../_runtime.mjs";
import { _ as Link, y as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Play } from "../_libs/lucide-react.mjs";
import { n as Logo, o as cn, t as InstallerCards } from "./installers-BtH7FpeM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CenGzKa_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function reducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function useInView(once = true) {
	const ref = (0, import_react.useRef)(null);
	const [inView, setInView] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (reducedMotion()) {
			setInView(true);
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setInView(true);
				if (once) io.disconnect();
			} else if (!once) setInView(false);
		}, {
			threshold: .16,
			rootMargin: "0px 0px -10% 0px"
		});
		io.observe(el);
		return () => io.disconnect();
	}, [once]);
	return {
		ref,
		inView
	};
}
function useParallax(factor = 28) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || !factor || reducedMotion()) return;
		let raf = 0;
		const tick = () => {
			raf = 0;
			const rect = el.getBoundingClientRect();
			const mid = rect.top + rect.height / 2;
			const p = (window.innerHeight / 2 - mid) / window.innerHeight;
			el.style.transform = `scale(1.14) translate3d(0, ${p * factor}px, 0)`;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(tick);
		};
		tick();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	}, [factor]);
	return ref;
}
function Reveal({ as: Tag = "div", children, className, delay = 0, variant = "rise" }) {
	const { ref, inView } = useInView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn("cine-reveal", `cine-reveal-${variant}`, inView && "is-in", className),
		style: { "--cine-delay": `${delay}ms` },
		children
	});
}
var STILLS = [
	"/stills/hero-theater.jpg",
	"/stills/doorway.jpg",
	"/stills/screen-glow.jpg",
	"/stills/projector.jpg",
	"/stills/theater.jpg",
	"/stills/neon-alley.jpg"
];
var TICKER = [
	"4K",
	"No ads",
	"No subscriptions",
	"Folders",
	"Plex",
	"Jellyfin",
	"CINEVO Node",
	"Local only",
	"Private cinema"
];
var ACTS = [
	{
		k: "Act I",
		t: "Your library.",
		d: "Point at a folder. Or bring Plex and Jellyfin with you. Nothing uploads.",
		still: "/stills/doorway.jpg"
	},
	{
		k: "Act II",
		t: "Your house.",
		d: "CINEVO Node sits on the machine with the files. Pair once. Playback stays home.",
		still: "/stills/projector.jpg"
	},
	{
		k: "Act III",
		t: "Your cinema.",
		d: "4K. No ads. No subscriptions. A private screen that does not phone home.",
		still: "/stills/screen-glow.jpg"
	}
];
var STEPS = [
	{
		n: "01",
		t: "Connect a server",
		d: "A folder on this computer, Plex on any server you own, or Jellyfin through Node."
	},
	{
		n: "02",
		t: "Choose what belongs",
		d: "Pick the sections CINEVO may index. Everything else stays out of frame."
	},
	{
		n: "03",
		t: "Take your seat",
		d: "The house lights go down. Your titles stay. Nothing is published."
	}
];
var POSTERS = [
	{
		line: "Still with Plex? Babe…",
		still: "/stills/hero-theater.jpg"
	},
	{
		line: "Be honest. Plex is your ex.",
		still: "",
		paper: true
	},
	{
		line: "You outgrew Plex. We’re glad.",
		still: "/stills/doorway.jpg"
	},
	{
		line: "Dump Plex already.",
		still: "/stills/projector.jpg"
	}
];
var CREDITS = [
	["Written by", "Your library"],
	["Directed by", "You"],
	["Photography", "The house"],
	["Projection", "CINEVO Node"],
	["Sound", "Local only"],
	["No studio", "No ads"]
];
function Reel({ still, ken, bars, factor = 36, children, className }) {
	const imgRef = useParallax(ken ? 0 : factor);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("relative min-h-svh overflow-hidden bg-black", className),
		children: [
			still ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				ref: imgRef,
				src: still,
				alt: "",
				className: cn("absolute inset-0 h-full w-full", ken ? "lp-hero-still" : "lp-still")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cine-vignette absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cine-grain absolute inset-0 z-10" }),
			bars ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cine-bar cine-bar-top" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cine-bar cine-bar-bottom" })] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-30 flex min-h-svh flex-col",
				children
			})
		]
	});
}
function Home() {
	const strip = [...STILLS, ...STILLS];
	const ticker = [
		...TICKER,
		...TICKER,
		...TICKER
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lp",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reel, {
				still: "/stills/hero-theater.jpg",
				ken: true,
				bars: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cine-curtain absolute inset-0 z-40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lp-beam" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lp-leak" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lp-motes",
						"aria-hidden": "true",
						children: Array.from({ length: 10 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "lp-mote" }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "lp-nav",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
							size: "md",
							className: "text-white"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#press",
									className: "hidden h-11 items-center px-3 font-ui text-sm font-medium text-white/70 hover:text-white sm:inline-flex",
									children: "Press"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/node",
									className: "hidden h-11 items-center px-3 font-ui text-sm font-medium text-white/70 hover:text-white sm:inline-flex",
									children: "Node"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/app",
									className: "lp-enter",
									children: "Enter"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-24 text-center md:pb-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "cine-rise lp-kicker",
								children: "Now showing · A CINEVO picture"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "lp-title mt-7 font-display font-extrabold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "cine-rise-delay block",
									children: "Cinema,"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "cine-rise-late mt-1 block italic",
									children: "reinvented."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "cine-rise-end mt-7 max-w-md text-base text-white/70 md:text-lg",
								children: "A private house for films you already own. Folders. Plex. Jellyfin. Playback never leaves the building."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "cine-rise-end mt-10 inline-flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/app",
									"aria-label": "Enter cinema",
									className: "lp-play cine-play",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										size: 22,
										fill: "currentColor",
										className: "ml-0.5"
									})
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lp-ticker",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lp-ticker__track",
					children: ticker.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-4 text-cine-cyan",
						children: "·"
					})] }, `${item}-${i}`))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "lp-chapter",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/stills/theater.jpg",
						alt: "",
						className: "lp-chapter__still"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lp-chapter__veil" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lp-chapter__copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								as: "p",
								className: "lp-kicker",
								variant: "hold",
								children: "2.39:1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
								as: "h2",
								className: "mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.92] tracking-tight md:text-7xl",
								delay: 80,
								children: [
									"The house lights go down.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Your library stays."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								as: "p",
								className: "mt-8 max-w-lg text-lg text-white/70",
								delay: 180,
								children: "CINEVO does not host, sell, or publish media. It is a screen for the collection you already keep at home."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lp-strip",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lp-strip__track",
					children: strip.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: ""
					}, `${src}-${i}`))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "lp-acts",
				children: ACTS.map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "lp-act",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: act.still,
							alt: ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: act.k }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display",
							children: act.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: act.d })
					]
				}, act.k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-white/10 bg-black px-5 py-24 md:px-10 md:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							as: "p",
							className: "lp-kicker",
							variant: "hold",
							children: "Start with your library"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							as: "h2",
							className: "mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-tight md:text-6xl",
							delay: 80,
							children: "Nothing appears until you choose it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lp-steps mt-16",
							children: STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
								delay: i * 90,
								as: "article",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step.n }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-3 font-display text-2xl font-semibold tracking-tight",
										children: step.t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 max-w-sm text-white/60",
										children: step.d
									})
								]
							}, step.n))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "press",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					as: "p",
					className: "bg-black px-5 py-10 text-center lp-kicker",
					variant: "track",
					children: "Outdoor · Rebound with CINEVO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lp-wall",
					children: POSTERS.map((poster) => poster.paper ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lp-poster lp-poster--paper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-black/35",
								children: "Outdoor · 2026"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lp-poster__line font-display",
								children: poster.line
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								size: "sm",
								className: "text-black"
							})
						]
					}, poster.line) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lp-poster",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: poster.still,
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "relative font-ui text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50",
								children: "Outdoor · 2026"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lp-poster__line relative font-display text-white",
								children: poster.line
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								size: "sm",
								className: "relative text-white"
							})
						]
					}, poster.line))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reel, {
				still: "/stills/projector.jpg",
				factor: 48,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-24 pt-24 md:px-8 md:pb-32",
					id: "downloads",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							as: "p",
							className: "lp-kicker",
							variant: "hold",
							children: "Feature presentation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							as: "h2",
							className: "mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight md:text-6xl",
							delay: 80,
							children: [
								"Windows. Mac. Node.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"The projector lives at home."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							as: "p",
							className: "mt-5 mb-10 max-w-xl text-white/70",
							delay: 160,
							children: "Install CINEVO Node on the computer that holds the files. Pair once. Stream to the house."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallerCards, {})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-white/10 bg-black",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							as: "p",
							className: "lp-kicker",
							variant: "hold",
							children: "End titles"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							as: "h2",
							className: "mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight md:text-6xl",
							delay: 70,
							children: "A home for your entire world of stories."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid gap-8 md:grid-cols-2",
							children: CREDITS.map(([role, name], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
								delay: i * 60,
								className: "flex items-baseline justify-between gap-6 border-b border-white/10 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-ui text-xs uppercase tracking-[0.22em] text-white/40",
									children: role
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl font-semibold tracking-tight",
									children: name
								})]
							}, role))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-16 flex flex-wrap items-center justify-between gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								size: "lg",
								className: "text-white"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app",
								className: "lp-cta",
								children: "Take your seat"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Home as component };

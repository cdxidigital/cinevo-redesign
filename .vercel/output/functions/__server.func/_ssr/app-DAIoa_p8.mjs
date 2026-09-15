import { i as __toESM } from "../_runtime.mjs";
import { _ as Link, y as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { A as ChevronLeft, C as HardDrive, E as Expand, M as Captions, O as Clapperboard, S as House, T as FolderOpen, _ as Menu, a as Tv, c as Star, d as Settings2, f as Server, g as Pause, h as Play, j as Check, l as Shuffle, n as VolumeX, p as Search, r as Volume2, s as Trash2, t as X, v as LoaderCircle, w as FolderPlus, y as ListPlus } from "../_libs/lucide-react.mjs";
import { _ as mediaUrl, a as MOODS, b as scanFileList, c as genresIn, d as similarTo, g as isVideoFile, h as saveFolderHandle, i as useCinevo, l as pickFeatured, m as THEMES, n as libraryPool, o as byMood, p as reconnectFolders, r as titleById, s as filterCatalog, u as recentlyAdded, v as playableCount, y as remoteTitle } from "./router-D4bzg0ua.mjs";
import { c as listNodeSections, i as addNodeFolder, n as Logo, o as cn, r as addNodeConnection, s as importNodeSections, t as InstallerCards } from "./installers-BjzvIjD_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-DAIoa_p8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		id: "stage",
		label: "Home",
		icon: House
	},
	{
		id: "movies",
		label: "Movies",
		icon: Clapperboard
	},
	{
		id: "shows",
		label: "TV Shows",
		icon: Tv
	},
	{
		id: "sidebar",
		label: "Library",
		icon: FolderOpen
	}
];
function Shell({ children, overlays }) {
	const room = useCinevo((s) => s.room);
	const setRoom = useCinevo((s) => s.setRoom);
	const setSearchOpen = useCinevo((s) => s.setSearchOpen);
	const setSettingsOpen = useCinevo((s) => s.setSettingsOpen);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const night = useCinevo((s) => s.prefs.nightMode);
	const zen = useCinevo((s) => s.prefs.zenMode);
	const [drawer, setDrawer] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!NAV.some((item) => item.id === room)) setRoom("stage");
	}, [room, setRoom]);
	(0, import_react.useEffect)(() => {
		if (!drawer) return;
		const onKey = (e) => {
			if (e.key === "Escape") setDrawer(false);
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
		};
	}, [drawer]);
	const nav = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [NAV.map((item) => {
		const Icon = item.icon;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => {
				setRoom(item.id);
				setDrawer(false);
			},
			className: cn("flex h-11 w-full items-center gap-3 rounded-md px-3 font-ui text-sm font-medium", room === item.id ? "bg-cine-surface text-cine-text" : "text-cine-muted hover:text-cine-text"),
			"aria-current": room === item.id ? "page" : void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), item.label]
		}, item.id);
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "flex h-11 w-full items-center gap-3 rounded-md px-3 font-ui text-sm font-medium text-cine-muted hover:text-cine-text",
		onClick: () => {
			setCoreOpen(true);
			setDrawer(false);
		},
		children: "Core"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("min-h-screen bg-cine-bg", night && "cinevo-night", zen && "cinevo-zen"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-20 hidden w-56 flex-col border-r border-cine-border bg-cine-elevated p-4 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "CINEVO home",
					className: "mb-8 px-3 pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "sm" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-1 flex-col gap-1",
					"aria-label": "Main",
					children: nav
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-cine-border bg-cine-bg px-4 md:ml-56 md:h-16 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center rounded-md md:hidden",
						"aria-label": "Open menu",
						onClick: () => setDrawer(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "CINEVO home",
						className: "md:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "sm" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Search",
							className: "flex size-11 items-center justify-center rounded-md",
							onClick: () => setSearchOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Settings",
							className: "flex size-11 items-center justify-center rounded-md",
							onClick: () => setSettingsOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { size: 18 })
						})]
					})
				]
			}),
			drawer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-30 bg-cine-bg/80 md:hidden",
				onMouseDown: () => setDrawer(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-full w-64 bg-cine-elevated p-4",
					onMouseDown: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Close menu",
							className: "flex size-11 items-center justify-center",
							onClick: () => setDrawer(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
						})]
					}), nav]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "relative mx-auto max-w-6xl px-4 py-6 md:ml-56 md:px-8 md:py-8",
				children
			}),
			overlays
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askCinevo = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("7ebb63b2bc6bc267a35ed0fda7ece5b3241b752253db5bd836ae7020e8c799f4"));
function applySourceFilter(filter, local, remote) {
	if (filter === "folder") return local;
	if (filter === "plex") return remote.filter((t) => t.source === "plex");
	if (filter === "jellyfin") return remote.filter((t) => t.source === "jellyfin");
	return [...local, ...remote];
}
function useLibrary() {
	const local = useCinevo((s) => s.localTitles);
	const remote = useCinevo((s) => s.remoteTitles);
	const filter = useCinevo((s) => s.sourceFilter);
	return (0, import_react.useMemo)(() => applySourceFilter(filter, local, remote), [
		local,
		remote,
		filter
	]);
}
var glow = {
	cyan: "hover:glow-cyan",
	magenta: "hover:glow-magenta",
	violet: "hover:glow-violet",
	amber: "hover:glow-amber"
};
function PosterCard({ title }) {
	const progress = useCinevo((s) => s.progress[title.id]);
	const fav = useCinevo((s) => s.favorites.includes(title.id));
	const openTitle = useCinevo((s) => s.openTitle);
	const play = useCinevo((s) => s.play);
	const toggleFavorite = useCinevo((s) => s.toggleFavorite);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative overflow-hidden rounded-md border border-cine-border bg-cine-surface transition duration-200", glow[title.accent]),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => openTitle(title.id),
					"aria-label": `Open ${title.title}`,
					className: "block w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: title.poster,
						alt: "",
						className: "aspect-2/3 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
					})
				}),
				title.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute left-2 top-2 rounded-sm bg-cine-cyan px-1.5 py-0.5 font-ui text-xs font-bold tracking-widest text-cine-bg",
					children: "LIVE"
				}) : title.source && title.source !== "cinevo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute left-2 top-2 rounded-sm bg-cine-bg/80 px-1.5 py-0.5 font-ui text-xs font-bold uppercase tracking-widest text-cine-cyan",
					children: title.source
				}) : null,
				progress != null && progress > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-cine-well",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
						className: "block h-full bg-cine-cyan",
						style: { width: `${progress}%` }
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Play ${title.title}`,
					onClick: () => play(title.id),
					className: "absolute bottom-2 right-2 flex size-11 items-center justify-center rounded-full bg-cine-text text-cine-bg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						size: 16,
						fill: "currentColor"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "poster-meta mt-2 flex items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => openTitle(title.id),
				className: "min-w-0 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "truncate font-ui text-sm font-semibold tracking-wide",
					children: title.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-cine-faint",
					children: title.rating > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							size: 10,
							className: "mr-1 inline text-cine-amber",
							fill: "currentColor"
						}),
						title.rating.toFixed(1),
						" · ",
						title.year
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						title.sourceLabel || title.source,
						" · ",
						title.year
					] })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": fav ? "Remove from My List" : "Add to My List",
					className: cn("flex size-11 items-center justify-center rounded-md", fav ? "text-cine-cyan" : "text-cine-muted hover:text-cine-text"),
					onClick: () => toggleFavorite(title.id),
					children: fav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, { size: 16 })
				})
			})]
		})]
	});
}
function Rail({ heading, titles, empty }) {
	if (!titles.length) {
		if (!empty) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-dashed border-cine-border bg-cine-elevated/60 px-4 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xs font-bold tracking-[0.22em] text-cine-muted",
				children: heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-cine-faint",
				children: empty
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-end justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xs font-bold tracking-[0.22em] text-cine-muted",
				children: heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-cine-faint",
				children: titles.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
			children: titles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, { title: t }, t.id))
		})]
	});
}
function AddLibrary() {
	const sources = useCinevo((s) => s.sources);
	const localTitles = useCinevo((s) => s.localTitles);
	const removeSource = useCinevo((s) => s.removeSource);
	const addFolderTitles = useCinevo((s) => s.addFolderTitles);
	const addRemoteTitles = useCinevo((s) => s.addRemoteTitles);
	const nodeUrl = useCinevo((s) => s.nodeUrl);
	const nodeToken = useCinevo((s) => s.nodeToken);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const fileRef = (0, import_react.useRef)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [folderPath, setFolderPath] = (0, import_react.useState)("");
	const [plexUrl, setPlexUrl] = (0, import_react.useState)("http://127.0.0.1:32400");
	const [plexToken, setPlexToken] = (0, import_react.useState)("");
	const [jfUrl, setJfUrl] = (0, import_react.useState)("http://127.0.0.1:8096");
	const [jfUser, setJfUser] = (0, import_react.useState)("");
	const [jfPass, setJfPass] = (0, import_react.useState)("");
	const [sections, setSections] = (0, import_react.useState)(null);
	const [picked, setPicked] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const onFiles = (event) => {
			const files = event.detail;
			if (Array.isArray(files) && files.length) ingestFiles(files, "Home folder");
		};
		window.addEventListener("cinevo:files", onFiles);
		return () => window.removeEventListener("cinevo:files", onFiles);
	}, []);
	const ingestFiles = (files, name) => {
		const titles = scanFileList(files, name);
		if (!titles.length) {
			setMessage("No video files in that folder. mp4, mkv, mov, webm.");
			return;
		}
		const folder = titles[0].sourceLabel;
		addFolderTitles(titles, {
			id: `src-folder-${folder}`,
			kind: "folder",
			name: folder,
			selected: true,
			count: titles.length
		});
		setMessage(`Indexed ${titles.length} files from ${folder}.`);
	};
	const onFolder = (e) => {
		if (e.target.files?.length) ingestFiles(e.target.files);
		e.target.value = "";
	};
	const pickDirectory = async () => {
		const picker = window.showDirectoryPicker;
		if (!picker) {
			fileRef.current?.click();
			return;
		}
		try {
			const handle = await picker();
			const files = [];
			await walkDir(handle, files);
			ingestFiles(files, handle.name);
			await saveFolderHandle(`src-folder-${handle.name}`, handle, handle.name);
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") return;
			fileRef.current?.click();
		}
	};
	const addPath = async () => {
		if (!folderPath.trim()) return;
		if (!nodeToken) {
			setMessage("Pair CINEVO Node to scan a path on the computer that holds the files.");
			return;
		}
		setPending(true);
		try {
			const res = await addNodeFolder(nodeUrl, nodeToken, folderPath.trim());
			if (!res.ok) {
				setMessage(res.error);
				return;
			}
			const titles = res.titles.map((t, i) => remoteTitle({
				id: t.id || `node-folder-${i}`,
				title: t.title || "Untitled",
				year: t.year,
				source: "plex",
				sourceLabel: res.name,
				synopsis: `Scanned from ${res.name} on CINEVO Node.`,
				genre: "Home library"
			}));
			addFolderTitles(titles.map((t) => ({
				...t,
				source: "folder",
				sourceLabel: res.name,
				genre: "Home library",
				genres: ["Home library", res.name]
			})), {
				id: res.id,
				kind: "folder",
				name: res.name,
				path: folderPath.trim(),
				selected: true,
				count: res.count
			});
			setFolderPath("");
			setMessage(`Scanned ${res.count} files on Node.`);
		} finally {
			setPending(false);
		}
	};
	const connect = async (provider) => {
		if (!nodeToken) {
			setMessage("Pair CINEVO Node first — Plex and Jellyfin stay on that computer.");
			return;
		}
		if (provider === "plex" && !plexToken.trim()) {
			setMessage("Paste your Plex token first.");
			return;
		}
		if (provider === "jellyfin" && (!jfUser.trim() || !jfPass)) {
			setMessage("Enter your Jellyfin username and password.");
			return;
		}
		setPending(true);
		const body = provider === "plex" ? {
			provider,
			baseUrl: plexUrl.trim(),
			token: plexToken.trim()
		} : {
			provider,
			baseUrl: jfUrl.trim(),
			username: jfUser.trim(),
			password: jfPass
		};
		try {
			const added = await addNodeConnection(nodeUrl, nodeToken, body);
			if (!added.ok) {
				setMessage(added.error);
				return;
			}
			const listed = await listNodeSections(nodeUrl, nodeToken, added.id);
			if (!listed.ok) {
				setMessage(listed.error);
				return;
			}
			setSections({
				connectionId: added.id,
				provider,
				items: listed.sections
			});
			setPicked(listed.sections.map((s) => s.key));
			setMessage(`Connected. Select the sections CINEVO may index.`);
		} finally {
			setPending(false);
		}
	};
	const importPicked = async () => {
		if (!sections || !nodeToken) return;
		setPending(true);
		try {
			const res = await importNodeSections(nodeUrl, nodeToken, sections.connectionId, picked);
			if (!res.ok) {
				setMessage(res.error);
				return;
			}
			const titles = res.titles.map((t) => remoteTitle({
				id: t.id,
				title: t.title,
				year: t.year,
				kind: t.kind === "series" ? "series" : "movie",
				synopsis: t.synopsis,
				source: sections.provider,
				sourceLabel: t.sourceLabel || sections.provider,
				genre: t.genre
			}));
			addRemoteTitles(titles, {
				id: sections.connectionId,
				kind: sections.provider,
				name: sections.provider === "plex" ? "Plex" : "Jellyfin",
				selected: true,
				count: titles.length
			});
			setSections(null);
			setMessage(`Imported ${titles.length} titles. Playback stays on your server.`);
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				multiple: true,
				webkitdirectory: "",
				className: "hidden",
				"aria-label": "Select media folder",
				onChange: onFolder
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "glass rounded-xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, {
								className: "text-cine-cyan",
								size: 20
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display tracking-widest",
								children: "Folders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-cine-faint",
								children: "Pick a folder on this computer. We index names only."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void pickDirectory(),
								className: "mt-4 h-11 w-full rounded-md bg-cine-cyan font-ui font-bold text-cine-bg",
								children: "Select folders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: folderPath,
									onChange: (e) => setFolderPath(e.target.value),
									placeholder: "/Movies or D:\\\\Media",
									"aria-label": "Folder path on Node",
									className: "h-11 min-w-0 flex-1 rounded-md border border-cine-border bg-cine-well px-3 font-mono text-sm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void addPath(),
									disabled: pending,
									className: "h-11 rounded-md border border-cine-cyan px-3 font-ui font-bold text-cine-cyan",
									children: "Scan"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "glass rounded-xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, {
								className: "text-cine-cyan",
								size: 20
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display tracking-widest",
								children: "Plex"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-cine-faint",
								children: "Token stays in Node. Choose sections after connect."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: plexUrl,
								onChange: (e) => setPlexUrl(e.target.value),
								"aria-label": "Plex server address",
								className: "mt-3 h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-mono text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: plexToken,
								onChange: (e) => setPlexToken(e.target.value),
								placeholder: "X-Plex-Token",
								"aria-label": "Plex token",
								className: "mt-2 h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-mono text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void connect("plex"),
								disabled: pending,
								className: "mt-3 h-11 w-full rounded-md border border-cine-cyan font-ui font-bold text-cine-cyan",
								children: pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "mx-auto animate-spin",
									size: 16
								}) : "Connect Plex"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "glass rounded-xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, {
								className: "text-cine-cyan",
								size: 20
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display tracking-widest",
								children: "Jellyfin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-cine-faint",
								children: "Username stays local. CINEVO never stores the password in the browser."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: jfUrl,
								onChange: (e) => setJfUrl(e.target.value),
								"aria-label": "Jellyfin server address",
								className: "mt-3 h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-mono text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: jfUser,
								onChange: (e) => setJfUser(e.target.value),
								placeholder: "Username",
								"aria-label": "Jellyfin username",
								className: "mt-2 h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-ui"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: jfPass,
								onChange: (e) => setJfPass(e.target.value),
								placeholder: "Password",
								"aria-label": "Jellyfin password",
								className: "mt-2 h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-ui"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void connect("jellyfin"),
								disabled: pending,
								className: "mt-3 h-11 w-full rounded-md border border-cine-cyan font-ui font-bold text-cine-cyan",
								children: "Connect Jellyfin"
							})
						]
					})
				]
			}),
			!nodeToken ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-cine-muted",
				children: [
					"Plex, Jellyfin, and disk paths need",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/node",
						className: "text-cine-cyan",
						onClick: () => setCoreOpen(false),
						children: "a paired CINEVO Node"
					}),
					". Folder pick works in this browser now."
				]
			}) : null,
			sections ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs tracking-[0.18em] text-cine-cyan",
						children: "SELECT SECTIONS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2",
						children: sections.items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center justify-between gap-3 rounded-md bg-cine-well px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-ui",
								children: s.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "size-5 accent-cine-cyan",
								checked: picked.includes(s.key),
								onChange: (e) => setPicked((cur) => e.target.checked ? [...cur, s.key] : cur.filter((k) => k !== s.key))
							})]
						}, s.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void importPicked(),
						disabled: pending || !picked.length,
						className: "mt-4 h-11 rounded-md bg-cine-cyan px-5 font-ui font-bold text-cine-bg",
						children: "Add selected to CINEVO"
					})
				]
			}) : null,
			localTitles.length && playableCount() === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-xl px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-cine-muted",
					children: "Titles are indexed, but this browser session has no files. Reconnect the folder to play."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-3 h-11 rounded-md bg-cine-cyan px-4 font-ui font-bold text-cine-bg",
					onClick: async () => {
						const n = await reconnectFolders();
						if (n) {
							useCinevo.setState({ localTitles: [...useCinevo.getState().localTitles] });
							setMessage(`Reconnected ${n} files.`);
						} else fileRef.current?.click();
					},
					children: "Reconnect folders"
				})]
			}) : null,
			sources.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-ui text-xs tracking-[0.18em] text-cine-cyan",
					children: "ACTIVE SOURCES"
				}), sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass flex items-center justify-between rounded-xl px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "font-ui capitalize",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-cine-faint",
						children: [
							s.kind,
							" · ",
							s.count,
							" titles ",
							s.path ? `· ${s.path}` : ""
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Remove ${s.name}`,
						className: "flex size-11 items-center justify-center text-cine-muted hover:text-cine-danger",
						onClick: () => removeSource(s.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
					})]
				}, s.id))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed border-cine-border px-4 py-5 text-sm text-cine-faint",
				children: "Nothing added yet. Select a folder, or pair Node and connect Plex or Jellyfin."
			}),
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-cine-cyan",
				children: message
			}) : null
		]
	});
}
async function walkDir(dir, out, depth = 0) {
	if (depth > 6 || out.length > 80) return;
	for await (const entry of dir.values()) {
		if (out.length > 80) return;
		if (entry.kind === "file") {
			const file = await entry.getFile();
			if (isVideoFile(file.name)) out.push(file);
		} else if (entry.kind === "directory") await walkDir(entry, out, depth + 1);
	}
}
function StageRoom() {
	const play = useCinevo((s) => s.play);
	const openTitle = useCinevo((s) => s.openTitle);
	const progress = useCinevo((s) => s.progress);
	const favorites = useCinevo((s) => s.favorites);
	const tonight = useCinevo((s) => s.tonight);
	const mood = useCinevo((s) => s.mood);
	const setMood = useCinevo((s) => s.setMood);
	const addTonight = useCinevo((s) => s.addTonight);
	const shufflePlay = useCinevo((s) => s.shufflePlay);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const setRoom = useCinevo((s) => s.setRoom);
	const aiConsent = useCinevo((s) => s.aiConsent);
	const sourceFilter = useCinevo((s) => s.sourceFilter);
	const setSourceFilter = useCinevo((s) => s.setSourceFilter);
	const sources = useCinevo((s) => s.sources);
	const library = useLibrary();
	const [question, setQuestion] = (0, import_react.useState)("");
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const filtered = (0, import_react.useMemo)(() => {
		if (sourceFilter === "all") return library;
		return library.filter((t) => t.source === sourceFilter);
	}, [library, sourceFilter]);
	const pool = byMood(mood, filtered);
	const hero = pickFeatured({
		mood,
		progress,
		tonight,
		pool: filtered
	});
	const heroProgress = hero ? progress[hero.id] ?? 0 : 0;
	const continueWatching = filtered.filter((t) => {
		const p = progress[t.id];
		return p != null && p > 0 && p < 100;
	});
	const added = recentlyAdded(8, pool);
	const addedIds = new Set(added.map((t) => t.id));
	const myList = filtered.filter((t) => favorites.includes(t.id));
	const suggestions = pool.filter((t) => !favorites.includes(t.id) && !addedIds.has(t.id)).slice(0, 8);
	const moodMeta = MOODS.find((m) => m.id === mood) ?? MOODS[0];
	const queueable = pool.filter((t) => !tonight.includes(t.id)).slice(0, 8);
	const ask = async () => {
		if (!question.trim() || pending) return;
		if (!aiConsent) {
			setCoreOpen(true, "ai");
			return;
		}
		setPending(true);
		try {
			const res = await askCinevo({ data: {
				question,
				titles: pool.map((t) => ({
					title: t.title,
					year: t.year,
					kind: t.kind,
					genre: t.genre,
					rating: t.rating,
					synopsis: t.synopsis
				}))
			} });
			if (res.ok) setAnswer(res.text.replace(/\*\*/g, ""));
			else setAnswer(res.error);
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [hero ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-[58vh] overflow-hidden rounded-xl border border-cine-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero.still || "/stills/theater.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-r from-cine-bg/95 via-cine-bg/55 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-[58vh] max-w-xl flex-col justify-end p-6 md:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs tracking-[0.28em] text-cine-muted",
						children: "FEATURED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-extrabold tracking-tight md:text-6xl",
						children: hero.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-mono text-sm text-cine-muted",
						children: [
							hero.year,
							" · ",
							hero.runtime,
							" · ",
							hero.genre,
							hero.rating > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								" ",
								"· ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
									size: 12,
									className: "inline text-cine-amber",
									fill: "currentColor"
								}),
								" ",
								hero.rating.toFixed(1)
							] }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-cine-muted",
						children: hero.synopsis
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => play(hero.id),
								className: "inline-flex h-11 items-center gap-2 rounded-md bg-cine-text px-5 font-ui font-semibold tracking-wide text-cine-bg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										size: 16,
										fill: "currentColor"
									}),
									" ",
									heroProgress > 0 && heroProgress < 100 ? "Resume" : "Play"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => openTitle(hero.id),
								className: "inline-flex h-11 items-center rounded-md border border-cine-cyan px-5 font-ui font-bold tracking-wider text-cine-cyan",
								children: "More info"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: shufflePlay,
								className: "inline-flex h-11 items-center gap-2 rounded-md border border-cine-border px-4 font-ui font-bold tracking-wider text-cine-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { size: 16 }), " Surprise me"]
							})
						]
					})
				]
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-[58vh] overflow-hidden rounded-xl border border-cine-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/stills/theater.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-r from-cine-bg/95 via-cine-bg/70 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-[58vh] max-w-xl flex-col justify-end p-6 md:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs tracking-[0.28em] text-cine-muted",
						children: "CINEVO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-extrabold tracking-tight md:text-6xl",
						children: "Cinema, reinvented."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-cine-muted",
						children: "Start with a folder on this computer, or pair CINEVO Node for Plex and Jellyfin."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRoom("sidebar"),
							className: "inline-flex h-11 items-center rounded-md bg-cine-text px-5 font-ui font-semibold tracking-wide text-cine-bg",
							children: "Add library"
						})
					})
				]
			})
		]
	}), library.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: MOODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setMood(m.id),
				className: `h-11 rounded-full px-4 font-ui text-sm font-semibold ${mood === m.id ? "bg-cine-cyan text-cine-bg" : "text-cine-muted"}`,
				"aria-pressed": mood === m.id,
				children: m.label
			}, m.id))
		}),
		sources.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 flex flex-wrap gap-2",
			children: [
				["all", "All"],
				["folder", "Folders"],
				["plex", "Plex"],
				["jellyfin", "Jellyfin"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setSourceFilter(id),
				className: `h-11 rounded-full px-4 font-ui text-sm ${sourceFilter === id ? "text-cine-cyan" : "text-cine-faint"}`,
				children: label
			}, id))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "glass rounded-xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-ui text-xs tracking-[0.22em] text-cine-cyan",
							children: "QUEUE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl tracking-widest",
							children: "Tonight"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-cine-faint",
							children: [tonight.length, "/8"]
						})]
					}),
					tonight.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 grid grid-cols-4 gap-2",
						children: tonight.map((id) => titleById(id)).filter((t) => Boolean(t)).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => openTitle(t.id),
							className: "overflow-hidden rounded-md border border-cine-border",
							"aria-label": `Open ${t.title}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: t.poster,
								alt: "",
								className: "aspect-2/3 w-full object-cover"
							})
						}, t.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-sm text-cine-faint",
						children: "Tap a poster to queue it."
					}),
					queueable.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 font-ui text-xs tracking-[0.18em] text-cine-muted",
						children: "ADD"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-2",
						children: queueable.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => addTonight(t.id),
							className: "overflow-hidden rounded-md border border-cine-border",
							"aria-label": `Queue ${t.title}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: t.poster,
								alt: "",
								className: "aspect-2/3 w-full object-cover"
							})
						}, t.id))
					})] }) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-cine-border bg-cine-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs tracking-[0.22em] text-cine-cyan",
						children: "NOW BROWSING"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-1 text-2xl tracking-widest",
						children: moodMeta.hint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-cine-muted",
						children: "Curated from titles already in this library. Mood only reshuffles the frame."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col gap-2 sm:flex-row",
						onSubmit: (e) => {
							e.preventDefault();
							ask();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: question,
							onChange: (e) => setQuestion(e.target.value),
							maxLength: 400,
							placeholder: "What should I watch tonight?",
							"aria-label": "Ask CINEVO",
							className: "h-11 flex-1 rounded-md border border-cine-border bg-cine-well px-3 font-ui"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: pending,
							className: "h-11 rounded-md bg-cine-cyan px-4 font-ui font-bold text-cine-bg",
							children: pending ? "Thinking…" : "Ask"
						})]
					}),
					answer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-cine-muted",
						children: answer
					}) : null
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 space-y-8",
			children: [
				continueWatching.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
					heading: "Up Next",
					titles: continueWatching
				}) : null,
				added.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
					heading: "Recently added",
					titles: added
				}) : null,
				suggestions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
					heading: "Recommended",
					titles: suggestions
				}) : null,
				myList.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
					heading: "My List",
					titles: myList
				}) : null
			]
		})
	] }) : null] });
}
function BrowseRoom({ kind: initialKind = "all" }) {
	const [kind, setKind] = (0, import_react.useState)(initialKind);
	const [genre, setGenre] = (0, import_react.useState)("All");
	(0, import_react.useEffect)(() => {
		setKind(initialKind);
		setGenre("All");
	}, [initialKind]);
	const library = useLibrary();
	const titles = (0, import_react.useMemo)(() => filterCatalog({
		kind,
		genre,
		pool: library
	}), [
		kind,
		genre,
		library
	]);
	const genres = genresIn(library);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-ui text-xs tracking-[0.28em] text-cine-muted",
				children: initialKind === "movie" ? "MOVIES" : initialKind === "series" ? "TV SHOWS" : "CATALOG"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-extrabold tracking-tight",
				children: initialKind === "movie" ? "Movies" : initialKind === "series" ? "TV Shows" : "Browse"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: [
				"all",
				"movie",
				"series"
			].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setKind(k),
				className: `h-11 rounded-full px-4 font-ui text-sm font-semibold capitalize ${kind === k ? "bg-cine-cyan text-cine-bg" : "bg-cine-surface text-cine-muted"}`,
				children: k === "all" ? "All" : k === "movie" ? "Movies" : "Series"
			}, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex flex-wrap gap-2",
			children: genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setGenre(g),
				className: `h-11 rounded-full px-4 font-ui text-sm font-semibold ${genre === g ? "glow-cyan text-cine-cyan" : "border border-cine-border text-cine-muted"}`,
				children: g
			}, g))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
			children: titles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, { title: t }, t.id))
		}),
		!titles.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-cine-faint",
			children: "No titles yet. Add a folder or pair a media server."
		}) : null
	] });
}
function SidebarRoom() {
	const local = useCinevo((s) => s.localTitles);
	const remote = useCinevo((s) => s.remoteTitles);
	const yours = [...local, ...remote];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-ui text-xs tracking-[0.22em] text-cine-muted",
			children: "HOME LIBRARY"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display mb-2 text-3xl font-extrabold tracking-tight",
			children: "Add sources"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-6 max-w-2xl text-sm text-cine-muted",
			children: "Folders scan in this browser. Plex and Jellyfin pair through CINEVO Node so tokens never leave that machine."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddLibrary, {}),
		yours.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
				heading: "In your library",
				titles: yours.slice(0, 12)
			})
		}) : null
	] });
}
function RoomSwitch({ room }) {
	switch (room) {
		case "browse": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowseRoom, {});
		case "movies": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowseRoom, { kind: "movie" });
		case "shows": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowseRoom, { kind: "series" });
		case "sidebar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarRoom, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageRoom, {});
	}
}
function Detail() {
	const id = useCinevo((s) => s.selectedId);
	const closeTitle = useCinevo((s) => s.closeTitle);
	const play = useCinevo((s) => s.play);
	const fav = useCinevo((s) => id ? s.favorites.includes(id) : false);
	const queued = useCinevo((s) => id ? s.tonight.includes(id) : false);
	const progress = useCinevo((s) => id ? s.progress[id] ?? 0 : 0);
	const toggleFavorite = useCinevo((s) => s.toggleFavorite);
	const addTonight = useCinevo((s) => s.addTonight);
	const removeTonight = useCinevo((s) => s.removeTonight);
	const addNote = useCinevo((s) => s.addNote);
	const title = titleById(id);
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setNote("");
	}, [id]);
	if (!title) return null;
	const similar = similarTo(title, libraryPool());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-30 overflow-y-auto bg-cine-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: title.still,
				alt: "",
				className: "absolute inset-0 h-[70vh] w-full object-cover opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-b from-cine-bg/20 via-cine-bg/70 to-cine-bg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-5xl px-5 pb-16 pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: closeTitle,
						className: "mb-6 inline-flex h-11 items-center gap-1 font-ui text-sm text-cine-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 }), " Back"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs tracking-[0.28em] text-cine-cyan",
						children: title.kind === "series" ? "SERIES" : "FEATURE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-bold tracking-wide md:text-5xl",
						children: title.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-mono text-sm text-cine-muted",
						children: [
							title.year,
							" · ",
							title.runtime,
							" · ",
							title.genre,
							title.rating > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								" ",
								"· ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
									size: 12,
									className: "inline text-cine-amber",
									fill: "currentColor"
								}),
								" ",
								title.rating.toFixed(1)
							] }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => play(title.id),
								className: "inline-flex h-11 items-center gap-2 rounded-md bg-cine-cyan px-5 font-ui font-bold tracking-wider text-cine-bg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										size: 16,
										fill: "currentColor"
									}),
									" ",
									progress > 0 && progress < 100 ? "Resume" : "Play"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleFavorite(title.id),
								className: "inline-flex h-11 items-center gap-2 rounded-md border border-cine-cyan px-5 font-ui font-bold tracking-wider text-cine-cyan",
								children: [fav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, { size: 16 }), fav ? "In My List" : "My List"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => queued ? removeTonight(title.id) : addTonight(title.id),
								className: "inline-flex h-11 items-center rounded-md border border-cine-border px-5 font-ui font-bold tracking-wider text-cine-muted",
								children: queued ? "Queued" : "Tonight"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl text-cine-muted",
						children: title.synopsis
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-ui text-sm text-cine-faint",
						children: [
							title.sourceLabel ? `From ${title.sourceLabel}` : null,
							title.director && title.director !== title.sourceLabel ? ` · Dir. ${title.director}` : null,
							title.cast.length ? ` · ${title.cast.join(" · ")}` : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-8 max-w-xl",
						onSubmit: (e) => {
							e.preventDefault();
							addNote(title.id, note);
							setNote("");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-ui text-xs tracking-[0.22em] text-cine-muted",
								children: "A NOTE ON THIS TITLE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: note,
								onChange: (e) => setNote(e.target.value),
								maxLength: 280,
								placeholder: "Private. Stays on this device.",
								className: "mt-2 h-20 w-full rounded-md border border-cine-border bg-cine-well p-3 font-ui"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "mt-2 h-11 rounded-md border border-cine-border px-4 font-ui font-bold text-cine-cyan",
								children: "Save note"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
							heading: "Similar titles",
							titles: similar
						})
					})
				]
			})
		]
	});
}
function SearchOverlay() {
	const open = useCinevo((s) => s.searchOpen);
	const setSearchOpen = useCinevo((s) => s.setSearchOpen);
	const openTitle = useCinevo((s) => s.openTitle);
	const [q, setQ] = (0, import_react.useState)("");
	const extra = useCinevo((s) => s.localTitles);
	const remote = useCinevo((s) => s.remoteTitles);
	const results = (0, import_react.useMemo)(() => filterCatalog({
		query: q,
		pool: [...extra, ...remote]
	}).slice(0, 8), [
		q,
		extra,
		remote
	]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-start justify-center bg-cine-bg/80 p-4 pt-20",
		onMouseDown: () => setSearchOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-strong w-full max-w-2xl rounded-xl p-4",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-lg border border-cine-border bg-cine-well px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							size: 16,
							className: "text-cine-cyan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search your library",
							"aria-label": "Search your library",
							className: "h-12 flex-1 bg-transparent font-ui text-base outline-none",
							onKeyDown: (e) => {
								if (e.key === "Enter" && q.trim() && results[0]) {
									openTitle(results[0].id);
									setSearchOpen(false);
								}
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Close search",
							className: "flex size-11 items-center justify-center",
							onClick: () => setSearchOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-mono text-xs text-cine-faint",
					children: extra.length + remote.length === 0 ? "Nothing in your library yet." : q.trim() && !results.length ? "No matches." : `${results.length} titles · Enter opens · Esc`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 space-y-1",
					children: results.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex min-h-11 w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-cine-well",
						onClick: () => {
							openTitle(t.id);
							setSearchOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: t.poster,
							alt: "",
							className: "h-14 w-10 rounded-sm object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "block font-ui",
							children: t.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
							className: "text-cine-faint",
							children: [
								t.year,
								" · ",
								t.genre
							]
						})] })]
					}, t.id))
				})
			]
		})
	});
}
function SettingsModal() {
	const open = useCinevo((s) => s.settingsOpen);
	const setSettingsOpen = useCinevo((s) => s.setSettingsOpen);
	const prefs = useCinevo((s) => s.prefs);
	const patchPrefs = useCinevo((s) => s.patchPrefs);
	const setTheme = useCinevo((s) => s.setTheme);
	const clearLocalData = useCinevo((s) => s.clearLocalData);
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) setConfirmClear(false);
	}, [open]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 bg-cine-bg/80 p-4",
		onMouseDown: () => setSettingsOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-strong mx-auto mt-16 max-w-lg rounded-xl p-5",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-4 flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs tracking-[0.22em] text-cine-cyan",
						children: "LOCAL PREFERENCES"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg tracking-widest",
						children: "Settings"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close settings",
						onClick: () => setSettingsOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-ui text-xs tracking-[0.18em] text-cine-cyan",
							children: "NEON THEME"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
							children: THEMES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-label": `${t.label} theme`,
								"aria-pressed": prefs.theme === t.id,
								onClick: () => setTheme(t.id),
								className: `flex h-11 flex-col items-center justify-center rounded-md border ${prefs.theme === t.id ? "border-cine-cyan glow-cyan" : "border-cine-border"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
									className: "swatch size-4 rounded-full",
									"data-swatch": t.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-ui text-xs",
									children: t.label
								})]
							}, t.id))
						}),
						[
							{
								key: "nightMode",
								label: "OLED night",
								hint: "True black surfaces"
							},
							{
								key: "zenMode",
								label: "Zen mode",
								hint: "Hide poster metadata"
							},
							{
								key: "focusMode",
								label: "Focus player",
								hint: "Quieter playback chrome"
							}
						].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-4 rounded-lg bg-cine-surface px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "block font-ui text-sm",
								children: row.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-cine-faint",
								children: row.hint
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: prefs[row.key],
								onChange: (e) => patchPrefs({ [row.key]: e.target.checked }),
								className: "size-5 accent-cine-cyan"
							})]
						}, row.key))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-lg border border-cine-danger/40 bg-cine-surface px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "block font-ui text-sm",
							children: "Local data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-cine-faint",
							children: "This clears watch progress, My List, indexed titles, and Node pairing on this device."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `mt-3 h-11 w-full rounded-md font-ui font-bold ${confirmClear ? "bg-cine-danger text-cine-text" : "border border-cine-danger text-cine-danger"}`,
							onClick: () => {
								if (!confirmClear) {
									setConfirmClear(true);
									return;
								}
								clearLocalData();
								setConfirmClear(false);
								setSettingsOpen(false);
							},
							children: confirmClear ? "Tap again to clear everything" : "Clear all local data"
						})
					]
				})
			]
		})
	});
}
function CoreModal() {
	const open = useCinevo((s) => s.coreOpen);
	const tab = useCinevo((s) => s.coreTab);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const setCoreTab = useCinevo((s) => s.setCoreTab);
	const sources = useCinevo((s) => s.sources);
	const invites = useCinevo((s) => s.invites);
	const addInvite = useCinevo((s) => s.addInvite);
	const setInviteStatus = useCinevo((s) => s.setInviteStatus);
	const aiConsent = useCinevo((s) => s.aiConsent);
	const setAiConsent = useCinevo((s) => s.setAiConsent);
	const flash = useCinevo((s) => s.flash);
	const [name, setName] = (0, import_react.useState)("");
	const [days, setDays] = (0, import_react.useState)(7);
	const [question, setQuestion] = (0, import_react.useState)("");
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	if (!open) return null;
	const points = (sources.length ? 1 : 0) + (invites.length ? 1 : 0) + (aiConsent ? 1 : 0) + 1;
	const ask = async () => {
		if (!question.trim() || pending) return;
		setPending(true);
		try {
			const res = await askCinevo({ data: {
				question,
				titles: libraryPool().map((t) => ({
					title: t.title,
					year: t.year,
					kind: t.kind,
					genre: t.genre,
					rating: t.rating,
					synopsis: t.synopsis
				}))
			} });
			if (res.ok) setAnswer(res.text.replace(/\*\*/g, ""));
			else flash(res.error);
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 overflow-y-auto bg-cine-bg/80 p-4",
		onMouseDown: () => setCoreOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-strong mx-auto my-8 max-w-3xl rounded-xl p-5",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-4 flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs tracking-[0.22em] text-cine-cyan",
						children: "CINEVO CORE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-widest",
						children: "Your media. Your rules."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close Core",
						onClick: () => setCoreOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mb-5 flex flex-wrap gap-2",
					children: [
						"libraries",
						"sharing",
						"stewardship",
						"ai"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCoreTab(t),
						className: `h-11 rounded-full px-4 font-ui text-sm font-semibold ${tab === t ? "bg-cine-cyan text-cine-bg" : "bg-cine-surface text-cine-muted"}`,
						children: t === "libraries" ? "Libraries" : t === "sharing" ? "Sharing" : t === "stewardship" ? "Privacy" : "AI"
					}, t))
				}),
				tab === "libraries" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-cine-muted",
							children: sources.length ? `${sources.length} source${sources.length === 1 ? "" : "s"} connected.` : "No sources yet. Folders scan in the browser. Plex and Jellyfin use CINEVO Node."
						}),
						sources.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg bg-cine-surface px-3 py-3 font-ui text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "capitalize",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 font-mono text-xs text-cine-faint",
									children: [
										s.kind,
										" · ",
										s.count
									]
								})]
							}, s.id))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 rounded-md bg-cine-cyan px-5 font-ui font-bold text-cine-bg",
							onClick: () => {
								setCoreOpen(false);
								useCinevo.getState().setRoom("sidebar");
							},
							children: "Open Library"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-ui text-xs tracking-[0.18em] text-cine-cyan",
								children: "NODE INSTALLERS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-3 text-sm text-cine-muted",
								children: "Required for Plex, Jellyfin, and disk paths. Folder pick works without it."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallerCards, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/node",
								className: "mt-3 inline-flex h-11 items-center font-ui text-sm font-bold text-cine-cyan",
								onClick: () => setCoreOpen(false),
								children: "Open pairing"
							})
						] })
					]
				}),
				tab === "sharing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "h-11 rounded-md border border-cine-border bg-cine-well px-3 font-ui",
								placeholder: "Friend name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: days,
								onChange: (e) => setDays(Number(e.target.value)),
								className: "h-11 rounded-md border border-cine-border bg-cine-well px-3 font-ui",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 3,
										children: "3 days"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 7,
										children: "7 days"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 14,
										children: "14 days"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 rounded-md bg-cine-magenta px-4 font-ui font-bold text-cine-bg",
								onClick: () => {
									addInvite(name, days);
									flash("Invite created");
								},
								children: "Create invite"
							})
						]
					}), invites.length ? invites.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex items-center justify-between rounded-lg bg-cine-surface px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "font-ui",
							children: i.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
							className: "ml-2 text-cine-faint",
							children: [
								i.status,
								" · ",
								i.days,
								"d"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "font-ui text-sm text-cine-cyan",
								onClick: () => setInviteStatus(i.id, i.status === "paused" ? "active" : "paused"),
								children: i.status === "paused" ? "Restore" : "Pause"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "font-ui text-sm text-cine-danger",
								onClick: () => setInviteStatus(i.id, "revoked"),
								children: "Revoke"
							})]
						})]
					}, i.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-lg border border-dashed border-cine-border px-3 py-4 text-sm text-cine-faint",
						children: "No invites yet. Name a friend and create one — nothing is pre-seeded."
					})]
				}),
				tab === "stewardship" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-4xl text-cine-cyan",
						children: points
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-sm text-cine-muted",
						children: "stewardship points — for care, not watch-time."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-2 gap-3",
						children: [
							"Private index",
							"Library care",
							"Invite boundary",
							"AI consent"
						].map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-lg border border-cine-border bg-cine-surface p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "font-ui text-sm",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-cine-faint",
								children: i < points ? "Complete" : "Open"
							})]
						}, label))
					})
				] }),
				tab === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between rounded-lg bg-cine-surface px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "block font-ui text-sm",
							children: "Private metadata assistance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-cine-faint",
							children: "Only titles in this CINEVO library"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: aiConsent,
							onChange: (e) => setAiConsent(e.target.checked),
							className: "size-5 accent-cine-cyan"
						})]
					}), aiConsent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: question,
							onChange: (e) => setQuestion(e.target.value),
							maxLength: 400,
							placeholder: "What should I watch tonight?",
							className: "h-24 w-full rounded-md border border-cine-border bg-cine-well p-3 font-ui"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: ask,
							disabled: pending,
							className: "h-11 rounded-md bg-cine-cyan px-5 font-ui font-bold text-cine-bg",
							children: pending ? "Thinking…" : "Ask CINEVO"
						}),
						answer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-lg bg-cine-surface p-3 text-sm text-cine-muted",
							children: answer
						}) : null
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-cine-faint",
						children: "Enable consent to ask the concierge."
					})]
				})
			]
		})
	});
}
function Toast() {
	const toast = useCinevo((s) => s.toast);
	if (!toast) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-cine-cyan bg-cine-elevated px-4 py-2 font-ui text-sm tracking-wide",
		children: toast
	});
}
function Player() {
	const playingId = useCinevo((s) => s.playingId);
	const playing = useCinevo((s) => s.playing);
	const progress = useCinevo((s) => s.playingId ? s.progress[s.playingId] ?? 0 : 0);
	const focusMode = useCinevo((s) => s.prefs.focusMode);
	const play = useCinevo((s) => s.play);
	const togglePlay = useCinevo((s) => s.togglePlay);
	const stopPlay = useCinevo((s) => s.stopPlay);
	const setProgress = useCinevo((s) => s.setProgress);
	const flash = useCinevo((s) => s.flash);
	const title = titleById(playingId);
	const videoRef = (0, import_react.useRef)(null);
	const stageRef = (0, import_react.useRef)(null);
	const [muted, setMuted] = (0, import_react.useState)(true);
	const [chrome, setChrome] = (0, import_react.useState)(true);
	const file = title ? mediaUrl(title.id) : void 0;
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video || !file) return;
		if (playing) video.play().catch(() => useCinevo.setState({ playing: false }));
		else video.pause();
	}, [
		playing,
		file,
		playingId
	]);
	(0, import_react.useEffect)(() => {
		if (!playing || !file) {
			setChrome(true);
			return;
		}
		let timer = window.setTimeout(() => setChrome(false), 2200);
		const bump = () => {
			setChrome(true);
			window.clearTimeout(timer);
			timer = window.setTimeout(() => setChrome(false), 2200);
		};
		window.addEventListener("mousemove", bump);
		window.addEventListener("touchstart", bump);
		return () => {
			window.clearTimeout(timer);
			window.removeEventListener("mousemove", bump);
			window.removeEventListener("touchstart", bump);
		};
	}, [playing, file]);
	if (!title) return null;
	const seek = (value) => {
		setProgress(title.id, value);
		const video = videoRef.current;
		if (video && Number.isFinite(video.duration) && video.duration > 0) video.currentTime = value / 100 * video.duration;
	};
	const missing = !file && (title.source === "folder" ? "Re-select this folder to play. CINEVO does not store the file." : title.source === "plex" || title.source === "jellyfin" ? "Open this title on your server. CINEVO does not proxy playback." : "No playable file on this device.");
	const onToggle = () => progress >= 100 ? play(title.id) : togglePlay();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: stageRef,
		className: "fixed inset-0 z-50 bg-cine-bg text-cine-text",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": `${title.title} player`,
		onClick: () => file && onToggle(),
		children: [
			file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: file,
				className: "absolute inset-0 h-full w-full bg-cine-bg object-contain",
				playsInline: true,
				autoPlay: true,
				muted,
				onLoadedData: (e) => {
					if (playing) e.currentTarget.play().catch(() => useCinevo.setState({ playing: false }));
				},
				onTimeUpdate: (e) => {
					const v = e.currentTarget;
					if (!v.duration) return;
					setProgress(title.id, v.currentTime / v.duration * 100);
				},
				onEnded: () => {
					setProgress(title.id, 100);
					useCinevo.setState({ playing: false });
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: title.still || title.poster,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-cine-bg to-transparent transition-opacity ${chrome ? "opacity-100" : "opacity-0"}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Close player",
				onClick: (e) => {
					e.stopPropagation();
					stopPlay();
				},
				className: `absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-cine-line bg-cine-elevated/80 text-cine-text transition-opacity ${chrome ? "opacity-100" : "opacity-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 transition-opacity ${file && playing && !chrome ? "opacity-0" : "opacity-100"}`,
				children: file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-16 items-center justify-center rounded-full bg-cine-text text-cine-bg",
					children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
						size: 26,
						fill: "currentColor"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						size: 26,
						fill: "currentColor"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-center font-ui text-sm text-cine-muted",
					children: missing
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `absolute inset-x-0 bottom-0 z-10 space-y-3 p-5 transition-opacity ${chrome ? "opacity-100" : "pointer-events-none opacity-0"} ${focusMode ? "opacity-70" : ""}`,
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs tracking-widest text-cine-muted",
						children: progress >= 100 ? "Finished · Play again from the start" : file ? "Esc closes · Space pauses" : "Esc closes"
					}),
					file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 font-mono text-xs text-cine-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-10 tabular-nums",
								children: [Math.round(progress), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Timeline",
								type: "range",
								min: 0,
								max: 100,
								value: progress,
								onChange: (e) => seek(Number(e.target.value)),
								className: "h-1 flex-1 accent-cine-cyan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title.runtime })
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onToggle,
								"aria-label": playing ? "Pause" : "Play",
								className: "flex size-11 items-center justify-center",
								children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 18 })
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "truncate font-ui text-lg tracking-wide",
								children: title.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center text-cine-muted",
							children: [file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": muted ? "Unmute" : "Mute",
									className: "flex size-11 items-center justify-center",
									onClick: () => setMuted((m) => !m),
									children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Subtitles",
									className: "flex size-11 items-center justify-center",
									onClick: () => flash("No subtitles on this file"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Fullscreen",
									className: "flex size-11 items-center justify-center",
									onClick: () => {
										const node = stageRef.current;
										if (!node) return;
										if (document.fullscreenElement) document.exitFullscreen();
										else node.requestFullscreen();
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Expand, { size: 18 })
								})
							] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 px-3 font-ui text-sm font-bold text-cine-cyan",
								onClick: stopPlay,
								children: "Close"
							})]
						})]
					})
				]
			})
		]
	});
}
function isTyping(target) {
	if (!(target instanceof HTMLElement)) return false;
	const tag = target.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}
function Keys() {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const s = useCinevo.getState();
			if (s.playingId) {
				if (e.key === "Escape") s.stopPlay();
				else if (e.key === " " && !isTyping(e.target)) {
					e.preventDefault();
					s.togglePlay();
				}
				return;
			}
			if (e.key === "Escape") {
				if (s.searchOpen) s.setSearchOpen(false);
				else if (s.settingsOpen) s.setSettingsOpen(false);
				else if (s.coreOpen) s.setCoreOpen(false);
				else if (s.selectedId) s.closeTitle();
				return;
			}
			if (isTyping(e.target)) return;
			if (e.key === "/") {
				e.preventDefault();
				s.setSearchOpen(true);
			}
			if (e.key === "t" || e.key === "T") {
				if (s.searchOpen || s.settingsOpen || s.coreOpen || s.selectedId) return;
				const i = THEMES.findIndex((th) => th.id === s.prefs.theme);
				const next = THEMES[(i + 1) % THEMES.length];
				s.setTheme(next.id);
				s.flash(`${next.label} theme`);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return null;
}
function Cinema() {
	const room = useCinevo((s) => s.room);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		overlays: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Player, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {})
		] }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keys, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomSwitch, { room })]
	});
}
//#endregion
export { Cinema as component };

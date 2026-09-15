#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(root, "../..");
const dist = path.join(root, "dist");
const out = path.join(repo, "public", "installers");

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.mkdirSync(out, { recursive: true });

const pkgBin = path.join(repo, "node_modules", "@yao-pkg", "pkg", "lib-es5", "bin.js");
const targets = [
  { t: "node22-win-x64", name: "cinevo-node-win-x64.exe", os: "win" },
  { t: "node22-macos-x64", name: "cinevo-node-macos-x64", os: "mac" },
  { t: "node22-macos-arm64", name: "cinevo-node-macos-arm64", os: "mac" },
  { t: "node22-linux-x64", name: "cinevo-node-linux-x64", os: "linux" },
];

function runPkg() {
  const args = [
    path.join(root, "index.cjs"),
    "--targets",
    targets.map((x) => x.t).join(","),
    "--output",
    path.join(dist, "cinevo-node"),
    "--compress",
    "GZip",
    "--public",
  ];
  if (fs.existsSync(pkgBin)) {
    execFileSync(process.execPath, [pkgBin, ...args], { stdio: "inherit" });
    return;
  }
  execFileSync("npx", ["--yes", "@yao-pkg/pkg", ...args], { stdio: "inherit" });
}

function write(file, content, mode = 0o644) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  fs.chmodSync(file, mode);
}

function zipDir(src, destZip) {
  if (fs.existsSync(destZip)) fs.unlinkSync(destZip);
  const base = destZip.replace(/\.zip$/i, "");
  const py = spawnSync(
    "python3",
    ["-c", "import shutil, sys; shutil.make_archive(sys.argv[1], 'zip', sys.argv[2])", base, src],
    { stdio: "inherit" },
  );
  if (py.status !== 0 || !fs.existsSync(destZip)) {
    throw new Error(`zip failed for ${destZip}`);
  }
}

function verifyBinary(file, kind) {
  const buf = fs.readFileSync(file);
  if (kind === "pe") {
    if (buf[0] !== 0x4d || buf[1] !== 0x5a) throw new Error(`${file} is not a PE executable`);
  }
  if (kind === "macho") {
    const magic = buf.readUInt32BE(0);
    const ok = [0xfeedface, 0xfeedfacf, 0xcafebabe, 0xcffaedfe, 0xcefaedfe].includes(magic);
    if (!ok) throw new Error(`${file} is not a Mach-O executable`);
  }
  console.log(`verified ${kind}: ${path.basename(file)} (${buf.length} bytes)`);
}

const WIN_PS1 = `# CINEVO Node installer for Windows
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Dest = Join-Path $env:LOCALAPPDATA "CINEVO\\Node"
New-Item -ItemType Directory -Force -Path $Dest | Out-Null
Copy-Item -Force (Join-Path $Root "cinevo-node.exe") (Join-Path $Dest "cinevo-node.exe")
$Wsh = New-Object -ComObject WScript.Shell
$StartMenu = Join-Path $env:APPDATA "Microsoft\\Windows\\Start Menu\\Programs\\CINEVO"
New-Item -ItemType Directory -Force -Path $StartMenu | Out-Null
$Shortcut = $Wsh.CreateShortcut((Join-Path $StartMenu "CINEVO Node.lnk"))
$Shortcut.TargetPath = Join-Path $Dest "cinevo-node.exe"
$Shortcut.WorkingDirectory = $Dest
$Shortcut.Description = "CINEVO Node — private loopback companion"
$Shortcut.Save()
Write-Host "Installed to $Dest"
Write-Host "Starting CINEVO Node on 127.0.0.1:48184"
Start-Process -FilePath (Join-Path $Dest "cinevo-node.exe")
`;

const WIN_BAT = `@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install.ps1"
`;

const WIN_README = `CINEVO Node for Windows (x64)
==============================

Loopback-only companion. Binds 127.0.0.1:48184. Never forwards ports.
Never streams media. Plex / Jellyfin tokens stay on this PC.

Install
  Double-click "Install CINEVO Node.bat"
  or: powershell -ExecutionPolicy Bypass -File install.ps1

Then open CINEVO and enter the pairing code shown in the dashboard.

Uninstall
  Quit CINEVO Node from Task Manager, then delete:
  %LOCALAPPDATA%\\CINEVO\\Node

This candidate is unsigned. Windows SmartScreen may warn until it is Authenticode-signed.
`;

const MAC_INSTALL = `#!/bin/bash
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
APP="$HERE/CINEVO Node.app"
DEST="/Applications/CINEVO Node.app"
if [ ! -d "$APP" ]; then
  echo "CINEVO Node.app is missing from this folder." >&2
  exit 1
fi
rm -rf "$DEST"
cp -R "$APP" "$DEST"
chmod +x "$DEST/Contents/MacOS/cinevo-node" || true
open "$DEST"
echo "CINEVO Node installed to /Applications and launched."
echo "Dashboard: http://127.0.0.1:48184"
`;

const MAC_README = `CINEVO Node for macOS
=====================

Loopback-only companion. Binds 127.0.0.1:48184.

Install
  Double-click install.command
  or drag "CINEVO Node.app" into /Applications, then open it.

First launch opens the private dashboard with a 10-minute pairing code.
Enter that code in CINEVO on this Mac.

This candidate is not notarized. If macOS blocks it:
  System Settings → Privacy & Security → Open Anyway
  or: xattr -dr com.apple.quarantine "/Applications/CINEVO Node.app"
`;

function infoPlist(arch) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>CINEVO Node</string>
  <key>CFBundleDisplayName</key><string>CINEVO Node</string>
  <key>CFBundleIdentifier</key><string>im.cinevo.node</string>
  <key>CFBundleVersion</key><string>0.1.0</string>
  <key>CFBundleShortVersionString</key><string>0.1.0</string>
  <key>CFBundleExecutable</key><string>cinevo-node</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>LSMinimumSystemVersion</key><string>12.0</string>
  <key>NSHighResolutionCapable</key><true/>
  <key>LSArchitecturePriority</key>
  <array><string>${arch === "arm64" ? "arm64" : "x86_64"}</string></array>
</dict>
</plist>
`;
}

function wrapMac(binary, archLabel, arch) {
  const dir = path.join(dist, `mac-${archLabel}`, "CINEVO Node.app", "Contents");
  write(path.join(dir, "Info.plist"), infoPlist(arch));
  const exe = path.join(dir, "MacOS", "cinevo-node");
  fs.mkdirSync(path.dirname(exe), { recursive: true });
  fs.copyFileSync(binary, exe);
  fs.chmodSync(exe, 0o755);
  write(path.join(dist, `mac-${archLabel}`, "install.command"), MAC_INSTALL, 0o755);
  write(path.join(dist, `mac-${archLabel}`, "README.txt"), MAC_README);
}

console.log("Packaging CINEVO Node executables…");
runPkg();

const produced = fs.readdirSync(dist);
console.log("pkg output", produced);

function findOut(fragment) {
  const hit = produced.find((f) => f.includes(fragment));
  if (!hit) throw new Error(`missing pkg output for ${fragment}`);
  return path.join(dist, hit);
}

const winExe = findOut("win-x64");
const macX64 = findOut("macos-x64");
const macArm = findOut("macos-arm64");
verifyBinary(winExe, "pe");
verifyBinary(macX64, "macho");
verifyBinary(macArm, "macho");

const winDir = path.join(dist, "win-x64");
fs.mkdirSync(winDir, { recursive: true });
fs.copyFileSync(winExe, path.join(winDir, "cinevo-node.exe"));
write(path.join(winDir, "install.ps1"), WIN_PS1);
write(path.join(winDir, "Install CINEVO Node.bat"), WIN_BAT);
write(path.join(winDir, "README.txt"), WIN_README);

wrapMac(macArm, "arm64", "arm64");
wrapMac(macX64, "intel", "x86_64");

const zips = [
  [winDir, path.join(out, "CINEVO-Node-Windows-x64.zip")],
  [path.join(dist, "mac-arm64"), path.join(out, "CINEVO-Node-macOS-Apple-Silicon.zip")],
  [path.join(dist, "mac-intel"), path.join(out, "CINEVO-Node-macOS-Intel.zip")],
];
for (const [src, zip] of zips) {
  zipDir(src, zip);
  console.log("wrote", zip, fs.statSync(zip).size, "bytes");
}

const manifest = {
  version: "0.1.0",
  builtAt: new Date().toISOString(),
  port: 48184,
  bind: "127.0.0.1",
  installers: {
    windowsX64: "/installers/CINEVO-Node-Windows-x64.zip",
    macAppleSilicon: "/installers/CINEVO-Node-macOS-Apple-Silicon.zip",
    macIntel: "/installers/CINEVO-Node-macOS-Intel.zip",
  },
};
fs.writeFileSync(path.join(out, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log("CINEVO Node installers ready.");

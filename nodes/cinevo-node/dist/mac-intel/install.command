#!/bin/bash
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
xattr -dr com.apple.quarantine "$DEST" 2>/dev/null || true
open "$DEST"
echo "CINEVO Node installed to /Applications and launched."
echo "Dashboard: http://127.0.0.1:48184"

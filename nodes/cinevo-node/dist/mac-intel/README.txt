CINEVO Node for macOS
=====================

Loopback-only companion. Binds 127.0.0.1:48184.

The app includes the CINEVO icon (AppIcon.icns). The Mach-O binary is
signed by the packager. macOS Gatekeeper still requires Apple notarization
with a Developer ID for a silent first launch.

Install
  Double-click install.command
  or drag "CINEVO Node.app" into /Applications, then open it.

If macOS blocks it:
  System Settings → Privacy & Security → Open Anyway
  or: xattr -dr com.apple.quarantine "/Applications/CINEVO Node.app"

First launch opens the private dashboard with a 10-minute pairing code.
Enter that code in CINEVO on this Mac.

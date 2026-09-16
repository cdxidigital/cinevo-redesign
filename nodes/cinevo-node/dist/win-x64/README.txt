CINEVO Node for Windows (x64)
==============================

Loopback-only companion. Binds 127.0.0.1:48184. Never forwards ports.
Never streams media. Plex / Jellyfin tokens stay on this PC.

The executable carries the CINEVO icon and an Authenticode signature
issued as "CINEVO Node". Windows SmartScreen may still prompt until an
EV certificate from a public CA is used in production.

Install
  Double-click "Install CINEVO Node.bat"
  or: powershell -ExecutionPolicy Bypass -File install.ps1

Then open CINEVO and enter the pairing code shown in the dashboard.

Uninstall
  Quit CINEVO Node from Task Manager, then delete:
  %LOCALAPPDATA%\CINEVO\Node

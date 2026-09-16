# CINEVO Node installer for Windows
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Dest = Join-Path $env:LOCALAPPDATA "CINEVO\Node"
New-Item -ItemType Directory -Force -Path $Dest | Out-Null
Copy-Item -Force (Join-Path $Root "cinevo-node.exe") (Join-Path $Dest "cinevo-node.exe")
if (Test-Path (Join-Path $Root "icon.ico")) {
  Copy-Item -Force (Join-Path $Root "icon.ico") (Join-Path $Dest "icon.ico")
}
$Wsh = New-Object -ComObject WScript.Shell
$StartMenu = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\CINEVO"
New-Item -ItemType Directory -Force -Path $StartMenu | Out-Null
$Shortcut = $Wsh.CreateShortcut((Join-Path $StartMenu "CINEVO Node.lnk"))
$Shortcut.TargetPath = Join-Path $Dest "cinevo-node.exe"
$Shortcut.WorkingDirectory = $Dest
$Shortcut.Description = "CINEVO Node — private loopback companion"
$Shortcut.IconLocation = (Join-Path $Dest "cinevo-node.exe") + ",0"
$Shortcut.Save()
Write-Host "Installed to $Dest"
Write-Host "Starting CINEVO Node on 127.0.0.1:48184"
Start-Process -FilePath (Join-Path $Dest "cinevo-node.exe")

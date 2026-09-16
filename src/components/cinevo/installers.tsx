import { Download } from "lucide-react";
import { INSTALLERS } from "@/lib/node-client";

export function InstallerCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {INSTALLERS.map((item) => (
        <a
          key={item.id}
          href={item.href}
          download
          className="group rounded-xl border border-cine-border bg-cine-surface p-4 transition hover:border-cine-cyan"
        >
          <img src="/node-icon.png" alt="" className="size-11 rounded-lg" />
          <p className="mt-3 font-ui text-xs font-semibold uppercase tracking-[0.18em] text-cine-muted">{item.label}</p>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{item.arch}</h3>
          <p className="mt-2 text-sm text-cine-faint">{item.hint}</p>
          <span className="mt-4 inline-flex h-11 items-center gap-2 font-ui text-sm font-bold text-cine-cyan">
            <Download size={16} /> Download
          </span>
        </a>
      ))}
    </div>
  );
}

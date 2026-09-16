import { useMemo } from "react";
import type { Title } from "./catalog";
import { useCinevo, type SourceFilter } from "./cinevo-store";
import type { LibraryTitle } from "./library";

export function applySourceFilter(
  filter: SourceFilter,
  local: LibraryTitle[],
  remote: LibraryTitle[],
): Title[] {
  const all = [...local, ...remote];
  if (filter === "all") return all;
  return all.filter((t) => t.source === filter);
}

export function useLibrary() {
  const local = useCinevo((s) => s.localTitles);
  const remote = useCinevo((s) => s.remoteTitles);
  const filter = useCinevo((s) => s.sourceFilter);
  return useMemo(() => applySourceFilter(filter, local, remote), [local, remote, filter]);
}

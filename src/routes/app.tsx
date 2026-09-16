import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shell } from "@/components/cinevo/shell";
import { RoomSwitch } from "@/components/cinevo/rooms";
import {
  CoreModal,
  Detail,
  NoticesOverlay,
  SearchOverlay,
  SettingsModal,
  Toast,
} from "@/components/cinevo/overlays";
import { Player } from "@/components/cinevo/player";
import { Keys } from "@/components/cinevo/keys";
import { useCinevo, type CoreTab } from "@/lib/cinevo-store";

const CORE_TABS: CoreTab[] = ["libraries", "sharing", "stewardship", "ai"];

export const Route = createFileRoute("/app")({
  validateSearch: (search: Record<string, unknown>) => ({
    core: CORE_TABS.includes(search.core as CoreTab) ? (search.core as CoreTab) : undefined,
  }),
  component: Cinema,
});

function Cinema() {
  const room = useCinevo((s) => s.room);
  const setCoreOpen = useCinevo((s) => s.setCoreOpen);
  const search = Route.useSearch();
  useEffect(() => {
    if (search.core) setCoreOpen(true, search.core);
  }, [search.core, setCoreOpen]);
  return (
    <Shell
      overlays={
        <>
          <Detail />
          <SearchOverlay />
          <SettingsModal />
          <CoreModal />
          <NoticesOverlay />
          <Player />
          <Toast />
        </>
      }
    >
      <Keys />
      <RoomSwitch room={room} />
    </Shell>
  );
}

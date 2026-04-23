import { Icons } from "./icons";
import { getEngagementHeader } from "@/app/_lib/sanity/fetch";
import { getWorkspaceSlug } from "@/app/_lib/workspace";
import { totalDays } from "@/app/_lib/time";
import type { SanityEngagementHeader } from "@/app/_lib/sanity/types";

export async function Topbar() {
  const workspace = await getWorkspaceSlug();
  const engagement = (await getEngagementHeader(workspace)) as SanityEngagementHeader | null;

  const days = engagement
    ? totalDays(engagement.startDate, engagement.endDate)
    : null;
  const currentDay = engagement?.currentDay ?? null;

  return (
    <header className="topbar">
      <div className="topbar-engagement">
        <div className="engagement-dot" />
        {engagement ? (
          <>
            <span className="engagement-client">{engagement.client}</span>
            <span className="engagement-sep">—</span>
            <span className="engagement-sprint">Midnight Protocol</span>
            {currentDay && days && (
              <span className="engagement-day">
                Day {currentDay} / {days}
              </span>
            )}
          </>
        ) : (
          <span className="engagement-client">No engagement scoped</span>
        )}
      </div>
      <div className="topbar-right">
        <div className="topbar-search">
          <Icons.search /> <span>Search the portal…</span>
          <kbd>⌘K</kbd>
        </div>
        <button className="topbar-btn" title="Notifications">
          <Icons.bell />
        </button>
        <button className="topbar-btn" title="Share">
          <Icons.share />
        </button>
      </div>
    </header>
  );
}

import { Icons } from "./icons";
import { getEngagement } from "@/app/_lib/sanity/fetch";
import type { SanityEngagement } from "@/app/_lib/sanity/types";

function totalDays(start: string, end: string): number {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1);
}

export async function Topbar() {
  const engagement = (await getEngagement()) as SanityEngagement | null;
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

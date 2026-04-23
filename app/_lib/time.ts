const MS_PER_DAY = 1000 * 60 * 60 * 24;

const SHORT_DATE = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const SHORT_DATE_WITH_YEAR = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const LONG_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function timeAgo(iso: string, now = Date.now()): string {
  const diff = now - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return SHORT_DATE.format(new Date(iso));
}

export function totalDays(start: string, end: string): number {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.max(1, Math.round((e - s) / MS_PER_DAY) + 1);
}

export function formatDateRange(start: string, end: string): string {
  return `${SHORT_DATE.format(new Date(start))} → ${SHORT_DATE.format(new Date(end))}`;
}

export function formatDate(iso: string, style: "short" | "long" = "short"): string {
  const d = new Date(iso);
  return style === "long"
    ? LONG_DATE.format(d)
    : SHORT_DATE_WITH_YEAR.format(d);
}

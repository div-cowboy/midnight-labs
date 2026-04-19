import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "data");
const INSTALLS_FILE = join(DATA_DIR, "installs.ndjson");
const UNLOCKS_FILE = join(DATA_DIR, "unlocks.ndjson");

export type InstallFormat = "claude" | "cursor";

export type InstallEvent =
  | {
      type: "agent";
      slug: string;
      format: InstallFormat;
      ts: string;
      ua: string | null;
    }
  | {
      type: "crew";
      slug: string;
      agentSlugs: string[];
      format: InstallFormat;
      ts: string;
      ua: string | null;
    };

export type Stats = {
  agentInstalls: Record<string, number>;
  crewInstalls: Record<string, number>;
  totalInstalls: number;
  totalUnlocks: number;
  unlocksLast7d: number;
};

async function readNdjson<T>(path: string): Promise<T[]> {
  try {
    const raw = await readFile(path, "utf8");
    const out: T[] = [];
    for (const line of raw.split("\n")) {
      if (!line.trim()) continue;
      try {
        out.push(JSON.parse(line) as T);
      } catch {
        // skip malformed line
      }
    }
    return out;
  } catch {
    return [];
  }
}

export async function readStats(): Promise<Stats> {
  const [installs, unlocks] = await Promise.all([
    readNdjson<InstallEvent>(INSTALLS_FILE),
    readNdjson<{ ts: string }>(UNLOCKS_FILE),
  ]);

  const agentInstalls: Record<string, number> = {};
  const crewInstalls: Record<string, number> = {};

  for (const e of installs) {
    if (e.type === "agent") {
      agentInstalls[e.slug] = (agentInstalls[e.slug] ?? 0) + 1;
    } else if (e.type === "crew") {
      crewInstalls[e.slug] = (crewInstalls[e.slug] ?? 0) + 1;
      for (const s of e.agentSlugs) {
        agentInstalls[s] = (agentInstalls[s] ?? 0) + 1;
      }
    }
  }

  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  let last7d = 0;
  for (const u of unlocks) {
    const t = Date.parse(u.ts);
    if (!Number.isNaN(t) && t >= cutoff) last7d++;
  }

  return {
    agentInstalls,
    crewInstalls,
    totalInstalls: installs.length,
    totalUnlocks: unlocks.length,
    unlocksLast7d: last7d,
  };
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export async function logInstall(
  event: DistributiveOmit<InstallEvent, "ts">,
): Promise<void> {
  const record = { ...event, ts: new Date().toISOString() };
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(INSTALLS_FILE, JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    console.error("[stats] failed to log install", err);
  }
}

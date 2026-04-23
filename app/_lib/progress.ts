import { cache } from "react";
import { currentUser } from "@clerk/nextjs/server";

export type ProgressMap = Record<string, number>;

const getCurrentUserCached = cache(currentUser);

export async function getProgressMap(): Promise<ProgressMap> {
  const user = await getCurrentUserCached();
  const raw = user?.publicMetadata?.progress;
  if (raw && typeof raw === "object") return raw as ProgressMap;
  return {};
}

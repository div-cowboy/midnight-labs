import { currentUser } from "@clerk/nextjs/server";

export type ProgressMap = Record<string, number>;

export async function getProgressMap(): Promise<ProgressMap> {
  try {
    const user = await currentUser();
    const raw = user?.publicMetadata?.progress;
    if (raw && typeof raw === "object") {
      return raw as ProgressMap;
    }
  } catch {
    // ignore — unauthenticated or Clerk not ready
  }
  return {};
}

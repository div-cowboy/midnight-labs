import "server-only";
import { cache } from "react";
import { writeClient } from "@/sanity/lib/client";

export const resolveWorkspaceId = cache(async (slug: string) => {
  return writeClient.fetch<string | null>(
    `*[_type == "engagement" && slug.current == $slug][0]._id`,
    { slug },
  );
});

export async function verifyOwnedByWorkspace(
  targetType: "thread" | "reply",
  id: string,
  workspaceId: string,
): Promise<boolean> {
  const hit = await writeClient.fetch<string | null>(
    `*[_type == $type && _id == $id && workspace._ref == $ws][0]._id`,
    { type: targetType, id, ws: workspaceId },
  );
  return hit !== null;
}

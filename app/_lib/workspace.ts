import { cache } from "react";
import { currentUser } from "@clerk/nextjs/server";

export type CurrentAuthor = {
  clerkUserId: string;
  displayName: string;
  email?: string;
  isMidnightStaff: boolean;
  workspace?: string;
};

const getCurrentUserCached = cache(currentUser);

export async function getCurrentAuthor(): Promise<CurrentAuthor | null> {
  const user = await getCurrentUserCached();
  if (!user) return null;
  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    user.primaryEmailAddress?.emailAddress ||
    "Team member";
  const workspace =
    typeof user.publicMetadata?.workspace === "string"
      ? user.publicMetadata.workspace
      : undefined;
  return {
    clerkUserId: user.id,
    displayName,
    email: user.primaryEmailAddress?.emailAddress ?? undefined,
    isMidnightStaff: Boolean(user.publicMetadata?.midnightStaff),
    workspace,
  };
}

export async function getWorkspaceSlug(): Promise<string | undefined> {
  return (await getCurrentAuthor())?.workspace;
}

export async function isMidnightStaff(): Promise<boolean> {
  return Boolean((await getCurrentAuthor())?.isMidnightStaff);
}

import { currentUser } from "@clerk/nextjs/server";

// Workspace slug identifies which engagement a user belongs to. For V1
// this is stored on Clerk publicMetadata.workspace (set by Midnight staff
// when onboarding the client). Clerk Organizations will replace this in
// a later phase.
export async function getWorkspaceSlug(): Promise<string | undefined> {
  try {
    const user = await currentUser();
    const raw = user?.publicMetadata?.workspace;
    if (typeof raw === "string" && raw.length > 0) return raw;
  } catch {
    // unauthenticated or Clerk not ready
  }
  return undefined;
}

export async function isMidnightStaff(): Promise<boolean> {
  try {
    const user = await currentUser();
    return Boolean(user?.publicMetadata?.midnightStaff);
  } catch {
    return false;
  }
}

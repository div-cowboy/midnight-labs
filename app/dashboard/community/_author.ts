import { currentUser } from "@clerk/nextjs/server";

export type CommunityAuthor = {
  clerkUserId: string;
  displayName: string;
  email?: string;
  isMidnightStaff: boolean;
};

export async function getCommunityAuthor(): Promise<CommunityAuthor | null> {
  const user = await currentUser();
  if (!user) return null;
  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    user.primaryEmailAddress?.emailAddress ||
    "Team member";
  return {
    clerkUserId: user.id,
    displayName,
    email: user.primaryEmailAddress?.emailAddress ?? undefined,
    isMidnightStaff: Boolean(user.publicMetadata?.midnightStaff),
  };
}

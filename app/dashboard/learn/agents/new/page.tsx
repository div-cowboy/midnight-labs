import { currentUser } from "@clerk/nextjs/server";
import { NewAgentForm } from "./_new-agent-form";

export default async function NewAgentPage() {
  const user = await currentUser();
  const workspaceSlug = (user?.publicMetadata?.workspace ?? "") as string;
  const userDisplay =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "Signed-in user";

  return (
    <NewAgentForm
      workspaceSlug={workspaceSlug || undefined}
      userDisplay={userDisplay}
    />
  );
}

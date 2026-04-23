import { getCurrentAuthor } from "@/app/_lib/workspace";
import { NewAgentForm } from "./_new-agent-form";

export default async function NewAgentPage() {
  const author = await getCurrentAuthor();
  return (
    <NewAgentForm
      workspaceSlug={author?.workspace}
      userDisplay={author?.displayName ?? "Signed-in user"}
    />
  );
}

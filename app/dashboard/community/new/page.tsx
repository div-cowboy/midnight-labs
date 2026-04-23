import { getWorkspaceSlug } from "@/app/_lib/workspace";
import { NewThreadForm } from "./_new-thread-form";

export default async function NewThreadPage() {
  const workspace = await getWorkspaceSlug();
  return <NewThreadForm workspaceSlug={workspace} />;
}

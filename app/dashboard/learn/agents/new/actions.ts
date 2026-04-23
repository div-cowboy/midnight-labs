"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { writeClient } from "@/sanity/lib/client";
import { getCurrentAuthor } from "@/app/_lib/workspace";
import { parseCsv, slugify } from "@/app/_lib/strings";
import { resolveWorkspaceId } from "@/app/_lib/sanity/write-helpers";
import { MODELS, type Model } from "@/app/_lib/sanity/transformers";

export type AuthorAgentState = {
  error?: string;
};

export async function authorAgent(
  _prev: AuthorAgentState,
  formData: FormData,
): Promise<AuthorAgentState> {
  const author = await getCurrentAuthor();
  if (!author) return { error: "You must be signed in to author an agent." };
  if (!author.workspace) {
    return {
      error:
        "No workspace is assigned to your account. Ask your Midnight lead to set one.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const systemPrompt = String(formData.get("systemPrompt") ?? "").trim();
  const example = String(formData.get("example") ?? "").trim();
  const model = String(formData.get("model") ?? "sonnet") as Model;
  const tools = parseCsv(formData.get("tools"));
  const tags = parseCsv(formData.get("tags"));

  if (!name) return { error: "Name is required." };
  if (!description) return { error: "Description is required." };
  if (!systemPrompt)
    return { error: "System prompt is required — this is the agent's body." };
  if (!MODELS.includes(model)) return { error: "Pick a valid model." };

  const slug = slugify(slugInput || name, 60);
  if (!slug) return { error: "Can't derive a slug from that name." };

  const [workspaceId, existing] = await Promise.all([
    resolveWorkspaceId(author.workspace),
    writeClient.fetch<string | null>(
      `*[_type == "agent" && slug.current == $slug][0]._id`,
      { slug },
    ),
  ]);

  if (!workspaceId) {
    return { error: `No engagement found for workspace "${author.workspace}".` };
  }
  if (existing) {
    return {
      error: `An agent with the slug "${slug}" already exists. Pick another.`,
    };
  }

  await writeClient.create({
    _type: "agent",
    name,
    slug: { _type: "slug", current: slug },
    tier: "custom",
    tagline,
    description,
    systemPrompt,
    example,
    model,
    tools,
    tags,
    stats: { power: 3, speed: 4, depth: 3 },
    author: `${author.displayName} · ${author.workspace}`,
    workspace: { _type: "reference", _ref: workspaceId },
  });

  revalidateTag("agent", "max");
  revalidateTag(`agent:workspace:${author.workspace}`, "max");

  redirect(`/dashboard/learn/agents/${slug}`);
}

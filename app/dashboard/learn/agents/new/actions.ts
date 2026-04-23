"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { writeClient } from "@/sanity/lib/client";

export type AuthorAgentState = {
  error?: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function parseCsv(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 20);
}

export async function authorAgent(
  _prev: AuthorAgentState,
  formData: FormData,
): Promise<AuthorAgentState> {
  const user = await currentUser();
  if (!user) return { error: "You must be signed in to author an agent." };

  const workspaceSlug = (user.publicMetadata?.workspace ?? "") as string;
  if (!workspaceSlug) {
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
  const model = String(formData.get("model") ?? "sonnet");
  const tools = parseCsv(formData.get("tools"));
  const tags = parseCsv(formData.get("tags"));

  if (!name) return { error: "Name is required." };
  if (!description) return { error: "Description is required." };
  if (!systemPrompt)
    return { error: "System prompt is required — this is the agent's body." };
  if (!["haiku", "sonnet", "opus"].includes(model)) {
    return { error: "Pick a valid model." };
  }

  const slug = slugify(slugInput || name);
  if (!slug) return { error: "Can't derive a slug from that name." };

  const authorDisplay =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    (user.primaryEmailAddress?.emailAddress ?? "Team");

  // Look up the engagement by workspace slug
  const engagement = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "engagement" && slug.current == $slug][0]{ _id }`,
    { slug: workspaceSlug },
  );
  if (!engagement) {
    return {
      error: `No engagement found for workspace "${workspaceSlug}".`,
    };
  }

  // Collision check
  const existing = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "agent" && slug.current == $slug][0]{ _id }`,
    { slug },
  );
  if (existing) {
    return {
      error: `An agent with the slug "${slug}" already exists. Pick another.`,
    };
  }

  const doc = await writeClient.create({
    _type: "agent",
    name,
    slug: { _type: "slug", current: slug },
    tier: "custom",
    tagline: tagline || undefined,
    description,
    systemPrompt,
    example: example || undefined,
    model,
    tools: tools.length ? tools : undefined,
    tags: tags.length ? tags : undefined,
    stats: { power: 3, speed: 4, depth: 3 },
    author: `${authorDisplay} · ${workspaceSlug}`,
    workspace: { _type: "reference", _ref: engagement._id },
  });

  revalidateTag("agent", "max");
  revalidateTag(`agent:workspace:${workspaceSlug}`, "max");

  redirect(`/dashboard/learn/agents/${slug}`);
}

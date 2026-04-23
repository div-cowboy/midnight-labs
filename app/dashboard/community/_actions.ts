"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { writeClient } from "@/sanity/lib/client";
import { getWorkspaceSlug } from "@/app/_lib/workspace";
import { getCommunityAuthor } from "./_author";

export type CommunityActionState = {
  error?: string;
  threadId?: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function parseCsv(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 10);
}

async function engagementRefForWorkspace(slug: string) {
  return writeClient.fetch<{ _id: string } | null>(
    `*[_type == "engagement" && slug.current == $slug][0]{ _id }`,
    { slug },
  );
}

export async function createThread(
  _prev: CommunityActionState,
  formData: FormData,
): Promise<CommunityActionState> {
  const [workspace, author] = await Promise.all([
    getWorkspaceSlug(),
    getCommunityAuthor(),
  ]);

  if (!author) return { error: "You must be signed in to post." };
  if (!workspace)
    return {
      error: "No workspace is assigned to your account. Ask your Midnight lead.",
    };

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const kind = String(formData.get("kind") ?? "question");
  const tags = parseCsv(formData.get("tags"));

  if (!title) return { error: "Give your question or tip a title." };
  if (!body) return { error: "Add a body — what are you asking or sharing?" };
  if (!["question", "tip"].includes(kind))
    return { error: "Pick question or tip." };

  const engagement = await engagementRefForWorkspace(workspace);
  if (!engagement)
    return { error: `No engagement found for workspace "${workspace}".` };

  const slug = slugify(title) || `thread-${Date.now()}`;

  const doc = await writeClient.create({
    _type: "thread",
    title,
    slug: { _type: "slug", current: slug },
    kind,
    body,
    tags: tags.length ? tags : undefined,
    upvotes: 0,
    author: { _type: "authoredBy", ...author },
    workspace: { _type: "reference", _ref: engagement._id },
  });

  revalidateTag(`thread:workspace:${workspace}`, "max");
  redirect(`/dashboard/community/${doc._id}`);
}

export async function createReply(
  _prev: CommunityActionState,
  formData: FormData,
): Promise<CommunityActionState> {
  const [workspace, author] = await Promise.all([
    getWorkspaceSlug(),
    getCommunityAuthor(),
  ]);

  if (!author) return { error: "You must be signed in to reply." };
  if (!workspace) return { error: "No workspace assigned." };

  const threadId = String(formData.get("threadId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!threadId) return { error: "Missing thread id." };
  if (!body) return { error: "Write something before replying." };

  const engagement = await engagementRefForWorkspace(workspace);
  if (!engagement) return { error: "Workspace is not scoped to an engagement." };

  // Verify the thread belongs to this workspace
  const thread = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "thread" && _id == $id && workspace._ref == $ws][0]{ _id }`,
    { id: threadId, ws: engagement._id },
  );
  if (!thread) return { error: "Thread not found in your workspace." };

  await writeClient.create({
    _type: "reply",
    thread: { _type: "reference", _ref: thread._id },
    workspace: { _type: "reference", _ref: engagement._id },
    body,
    upvotes: 0,
    isOfficial: author.isMidnightStaff,
    author: { _type: "authoredBy", ...author },
  });

  revalidateTag(`thread:${threadId}`, "max");
  revalidateTag(`thread:workspace:${workspace}`, "max");
  return { threadId };
}

export async function upvote(
  _prev: CommunityActionState,
  formData: FormData,
): Promise<CommunityActionState> {
  const author = await getCommunityAuthor();
  if (!author) return { error: "Sign in to upvote." };
  const workspace = await getWorkspaceSlug();
  if (!workspace) return { error: "No workspace." };

  const target = String(formData.get("target") ?? "");
  const targetType = String(formData.get("targetType") ?? "");

  if (!target || !["thread", "reply"].includes(targetType)) {
    return { error: "Bad upvote target." };
  }

  // Ensure the target belongs to the user's workspace before incrementing
  const engagement = await engagementRefForWorkspace(workspace);
  if (!engagement) return { error: "Workspace is not scoped to an engagement." };

  const existing = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == $type && _id == $id && workspace._ref == $ws][0]{ _id }`,
    { type: targetType, id: target, ws: engagement._id },
  );
  if (!existing) return { error: "Not found in your workspace." };

  await writeClient
    .patch(target)
    .setIfMissing({ upvotes: 0 })
    .inc({ upvotes: 1 })
    .commit();

  revalidateTag(`thread:workspace:${workspace}`, "max");
  if (targetType === "reply") revalidateTag("thread", "max");
  return {};
}

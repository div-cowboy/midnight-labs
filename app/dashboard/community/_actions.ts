"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { writeClient } from "@/sanity/lib/client";
import { getCurrentAuthor } from "@/app/_lib/workspace";
import { parseCsv, slugify } from "@/app/_lib/strings";
import {
  resolveWorkspaceId,
  verifyOwnedByWorkspace,
} from "@/app/_lib/sanity/write-helpers";
import {
  THREAD_KINDS,
  UPVOTE_TARGETS,
  type ThreadKind,
  type UpvoteTarget,
} from "@/app/_lib/sanity/constants";

export type CommunityActionState = {
  error?: string;
  threadId?: string;
};

async function requireAuthorAndWorkspace(): Promise<
  | { error: string }
  | {
      author: NonNullable<Awaited<ReturnType<typeof getCurrentAuthor>>>;
      workspace: string;
      workspaceId: string;
    }
> {
  const author = await getCurrentAuthor();
  if (!author) return { error: "You must be signed in." };
  if (!author.workspace)
    return { error: "No workspace is assigned to your account." };
  const workspaceId = await resolveWorkspaceId(author.workspace);
  if (!workspaceId)
    return { error: `No engagement found for workspace "${author.workspace}".` };
  return { author, workspace: author.workspace, workspaceId };
}

export async function createThread(
  _prev: CommunityActionState,
  formData: FormData,
): Promise<CommunityActionState> {
  const ctx = await requireAuthorAndWorkspace();
  if ("error" in ctx) return ctx;

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const kind = String(formData.get("kind") ?? "question") as ThreadKind;
  const tags = parseCsv(formData.get("tags"), 10);

  if (!title) return { error: "Give your question or tip a title." };
  if (!body) return { error: "Add a body — what are you asking or sharing?" };
  if (!THREAD_KINDS.includes(kind)) return { error: "Pick question or tip." };

  const slug = slugify(title) || `thread-${Date.now()}`;

  const doc = await writeClient.create({
    _type: "thread",
    title,
    slug: { _type: "slug", current: slug },
    kind,
    body,
    tags,
    upvotes: 0,
    author: { _type: "authoredBy", ...ctx.author },
    workspace: { _type: "reference", _ref: ctx.workspaceId },
  });

  revalidateTag(`thread:workspace:${ctx.workspace}`, "max");
  redirect(`/dashboard/community/${doc._id}`);
}

export async function createReply(
  _prev: CommunityActionState,
  formData: FormData,
): Promise<CommunityActionState> {
  const ctx = await requireAuthorAndWorkspace();
  if ("error" in ctx) return ctx;

  const threadId = String(formData.get("threadId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!threadId) return { error: "Missing thread id." };
  if (!body) return { error: "Write something before replying." };

  const owned = await verifyOwnedByWorkspace("thread", threadId, ctx.workspaceId);
  if (!owned) return { error: "Thread not found in your workspace." };

  await writeClient.create({
    _type: "reply",
    thread: { _type: "reference", _ref: threadId },
    workspace: { _type: "reference", _ref: ctx.workspaceId },
    body,
    upvotes: 0,
    isOfficial: ctx.author.isMidnightStaff,
    author: { _type: "authoredBy", ...ctx.author },
  });

  revalidateTag(`thread:${threadId}`, "max");
  revalidateTag(`thread:workspace:${ctx.workspace}`, "max");
  return { threadId };
}

export async function upvote(
  _prev: CommunityActionState,
  formData: FormData,
): Promise<CommunityActionState> {
  const ctx = await requireAuthorAndWorkspace();
  if ("error" in ctx) return ctx;

  const target = String(formData.get("target") ?? "");
  const targetType = String(formData.get("targetType") ?? "") as UpvoteTarget;
  if (!target || !UPVOTE_TARGETS.includes(targetType)) {
    return { error: "Bad upvote target." };
  }

  const owned = await verifyOwnedByWorkspace(
    targetType,
    target,
    ctx.workspaceId,
  );
  if (!owned) return { error: "Not found in your workspace." };

  await writeClient
    .patch(target)
    .setIfMissing({ upvotes: 0 })
    .inc({ upvotes: 1 })
    .commit();

  revalidateTag(`thread:workspace:${ctx.workspace}`, "max");
  if (targetType === "reply") revalidateTag("thread", "max");
  return {};
}

"use client";

import { useActionState } from "react";
import { upvote, type CommunityActionState } from "../_actions";
import type { UpvoteTarget } from "@/app/_lib/sanity/constants";

const initialState: CommunityActionState = {};

export function UpvoteButton({
  targetId,
  targetType,
  count,
}: {
  targetId: string;
  targetType: UpvoteTarget;
  count: number;
}) {
  const [state, formAction, pending] = useActionState(upvote, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="target" value={targetId} />
      <input type="hidden" name="targetType" value={targetType} />
      <button
        type="submit"
        disabled={pending}
        title={state.error ?? "Upvote"}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: "6px 10px",
          borderRadius: 8,
          background: "var(--bg-1)",
          border: `1px solid ${state.error ? "rgba(239,37,37,0.6)" : "var(--line-2)"}`,
          color: state.error ? "#fca5a5" : "var(--fg-2)",
          cursor: "pointer",
          minWidth: 44,
          fontFamily: "var(--mono)",
        }}
      >
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M5 1L9 7H1L5 1Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{ fontSize: 12, color: state.error ? "#fca5a5" : "var(--fg)" }}>
          {count}
        </span>
      </button>
    </form>
  );
}

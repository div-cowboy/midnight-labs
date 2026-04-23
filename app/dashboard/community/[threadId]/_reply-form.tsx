"use client";

import { useActionState, useEffect, useRef } from "react";
import { createReply, type CommunityActionState } from "../_actions";

const initialState: CommunityActionState = {};

export function ReplyForm({
  threadId,
  canReply,
  isMidnightStaff,
}: {
  threadId: string;
  canReply: boolean;
  isMidnightStaff: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    createReply,
    initialState,
  );
  const ref = useRef<HTMLFormElement>(null);

  // Reset the textarea after a successful reply (state.threadId = this thread).
  useEffect(() => {
    if (state.threadId && !state.error && ref.current) {
      ref.current.reset();
    }
  }, [state]);

  if (!canReply) {
    return (
      <div
        style={{
          marginTop: 18,
          padding: 16,
          border: "1px dashed var(--line-3)",
          borderRadius: 10,
          color: "var(--fg-3)",
          fontSize: 13,
          textAlign: "center",
        }}
      >
        Sign in with a workspace-bound account to reply.
      </div>
    );
  }

  return (
    <form
      ref={ref}
      action={formAction}
      style={{ marginTop: 18, display: "grid", gap: 10 }}
    >
      <input type="hidden" name="threadId" value={threadId} />
      <textarea
        name="body"
        rows={4}
        placeholder={
          isMidnightStaff
            ? "Reply as Midnight (gets the official-answer badge)…"
            : "Write a reply…"
        }
        className="form-input"
        required
        style={{ fontFamily: "var(--mono)", fontSize: 13 }}
      />
      {state.error && (
        <div
          style={{
            fontSize: 12,
            color: "#fca5a5",
          }}
        >
          {state.error}
        </div>
      )}
      <div className="row" style={{ justifyContent: "flex-end", gap: 8 }}>
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary"
          style={{ padding: "8px 16px" }}
        >
          {pending ? "Posting…" : "Post reply"}
        </button>
      </div>
    </form>
  );
}

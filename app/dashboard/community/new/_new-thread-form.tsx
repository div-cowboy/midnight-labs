"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createThread, type CommunityActionState } from "../_actions";

const initialState: CommunityActionState = {};

export function NewThreadForm({ workspaceSlug }: { workspaceSlug?: string }) {
  const [state, formAction, pending] = useActionState(
    createThread,
    initialState,
  );

  return (
    <div className="fade-enter" style={{ maxWidth: 760 }}>
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <div className="page-eyebrow">
              Community · new post {workspaceSlug && `· ${workspaceSlug}`}
            </div>
            <h1 className="page-title">Ask a question, or share what worked.</h1>
            <div className="page-sub">
              Private to your engagement. Midnight team members get an{" "}
              <b style={{ color: "var(--fg)" }}>official answer</b> badge when
              they reply.
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Link href="/dashboard/community" className="btn">
              Cancel
            </Link>
          </div>
        </div>
      </div>

      <form action={formAction} style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <Label>Kind</Label>
          <div className="row" style={{ gap: 10 }}>
            <RadioPill name="kind" value="question" defaultChecked>
              Question
            </RadioPill>
            <RadioPill name="kind" value="tip">
              Tip
            </RadioPill>
          </div>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <Label>Title</Label>
          <input
            name="title"
            required
            maxLength={160}
            placeholder="Claude keeps re-reading the same file on long refactors — how do you scope that?"
            className="form-input"
          />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <Label>Body</Label>
          <textarea
            name="body"
            required
            rows={8}
            placeholder="Share context. Paste the error. What have you tried?"
            className="form-input"
            style={{ fontFamily: "var(--mono)", fontSize: 13 }}
          />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <Label>Tags</Label>
          <input
            name="tags"
            placeholder="claude-code, refactor"
            className="form-input"
          />
          <span style={{ fontSize: 11.5, color: "var(--fg-3)" }}>
            Comma-separated. Up to 10.
          </span>
        </div>

        {state.error && (
          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: "rgba(239,37,37,0.1)",
              border: "1px solid rgba(239,37,37,0.4)",
              color: "#fca5a5",
              fontSize: 13,
            }}
          >
            {state.error}
          </div>
        )}

        <div className="row" style={{ gap: 10 }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={pending || !workspaceSlug}
          >
            {pending ? "Posting…" : "Post"}
          </button>
          <Link href="/dashboard/community" className="btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 11.5,
        fontFamily: "var(--mono)",
        textTransform: "uppercase",
        letterSpacing: ".08em",
        color: "var(--fg-2)",
      }}
    >
      {children}
    </span>
  );
}

function RadioPill({
  name,
  value,
  defaultChecked,
  children,
}: {
  name: string;
  value: string;
  defaultChecked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 20,
        border: "1px solid var(--line-2)",
        cursor: "pointer",
        fontSize: 13,
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        style={{ accentColor: "#8b5cf6" }}
      />
      {children}
    </label>
  );
}

"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Icons } from "../../../_components/icons";
import { authorAgent, type AuthorAgentState } from "./actions";

const initialState: AuthorAgentState = {};

export function NewAgentForm({
  workspaceSlug,
  userDisplay,
}: {
  workspaceSlug?: string;
  userDisplay: string;
}) {
  const [state, formAction, pending] = useActionState(
    authorAgent,
    initialState,
  );
  const [name, setName] = useState("");
  const autoSlug = slugify(name);

  return (
    <div className="fade-enter">
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <div className="page-eyebrow">Agent library · new</div>
            <h1 className="page-title">Author an agent for your team.</h1>
            <div className="page-sub">
              Custom agents are scoped to your workspace. Only your teammates
              see them in the library.
              {workspaceSlug ? (
                <>
                  {" "}
                  Authoring as <b style={{ color: "var(--fg)" }}>{userDisplay}</b>{" "}
                  in <code>{workspaceSlug}</code>.
                </>
              ) : (
                <>
                  {" "}
                  <span style={{ color: "var(--red)" }}>
                    No workspace is assigned to your account yet.
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Link href="/dashboard/learn/agents" className="btn">
              Cancel
            </Link>
          </div>
        </div>
      </div>

      <form
        action={formAction}
        style={{
          maxWidth: 760,
          display: "grid",
          gap: 16,
          gridTemplateColumns: "1fr",
        }}
      >
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Stripe webhook replay"
            className="form-input"
          />
        </Field>

        <Field
          label="Slug"
          htmlFor="slug"
          hint={`Used as the invocation command — /${autoSlug || "your-agent"}`}
        >
          <input
            id="slug"
            name="slug"
            placeholder={autoSlug || "your-agent"}
            className="form-input"
            defaultValue=""
          />
        </Field>

        <Field label="Tagline" htmlFor="tagline" hint="One short line">
          <input
            id="tagline"
            name="tagline"
            placeholder="Replays failed webhooks against a staging environment."
            className="form-input"
          />
        </Field>

        <Field label="Description" htmlFor="description" required>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            placeholder="Longer version shown on the detail page. 2–4 sentences."
            className="form-input"
          />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Model" htmlFor="model">
            <select
              id="model"
              name="model"
              defaultValue="sonnet"
              className="form-input"
            >
              <option value="haiku">Haiku 4.5 · fastest</option>
              <option value="sonnet">Sonnet 4.6 · default</option>
              <option value="opus">Opus 4.7 · most capable</option>
            </select>
          </Field>
          <Field
            label="Tools"
            htmlFor="tools"
            hint="Comma-separated (Read, Grep, Bash, WebFetch)"
          >
            <input
              id="tools"
              name="tools"
              placeholder="Read, Grep, Bash"
              className="form-input"
            />
          </Field>
        </div>

        <Field
          label="Tags"
          htmlFor="tags"
          hint="Comma-separated. Used for grouping in the library."
        >
          <input
            id="tags"
            name="tags"
            placeholder="payments, webhooks"
            className="form-input"
          />
        </Field>

        <Field
          label="System prompt"
          htmlFor="systemPrompt"
          required
          hint="Markdown is fine. This is the body that ships in .claude/agents/<slug>.md"
        >
          <textarea
            id="systemPrompt"
            name="systemPrompt"
            required
            rows={12}
            placeholder="You replay failed Stripe webhooks against staging.&#10;&#10;Rules:&#10;- Pull from the last 24h of failures&#10;- Group by event type&#10;- Emit a structured diff of response deltas"
            className="form-input"
            style={{ fontFamily: "var(--mono)", fontSize: 13 }}
          />
        </Field>

        <Field
          label="Example invocation"
          htmlFor="example"
          hint="Optional — shown on the detail page."
        >
          <textarea
            id="example"
            name="example"
            rows={5}
            placeholder="> /stripe-webhook-replay&#10;&#10;Replayed 8 webhooks against staging.&#10;3 succeeded, 2 mismatches, 3 errored."
            className="form-input"
            style={{ fontFamily: "var(--mono)", fontSize: 13 }}
          />
        </Field>

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
            {pending ? "Publishing…" : <><Icons.plus /> Publish agent</>}
          </button>
          <Link href="/dashboard/learn/agents" className="btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      style={{ display: "grid", gap: 6, gridAutoRows: "min-content" }}
    >
      <span
        style={{
          fontSize: 11.5,
          fontFamily: "var(--mono)",
          textTransform: "uppercase",
          letterSpacing: ".08em",
          color: "var(--fg-2)",
        }}
      >
        {label} {required && <span style={{ color: "var(--red)" }}>*</span>}
      </span>
      {children}
      {hint && (
        <span style={{ fontSize: 11.5, color: "var(--fg-3)" }}>{hint}</span>
      )}
    </label>
  );
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "midnight_unlocked";

export function InstallReveal({
  slug,
  accent,
  kind = "agent",
}: {
  slug: string;
  accent: { from: string; to: string; ring: string };
  kind?: "agent" | "crew";
}) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setUnlocked(false);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Something went wrong.");
      }
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // localStorage disabled — still reveal for this session
      }
      setUnlocked(true);
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (unlocked === null) {
    return (
      <div
        className="rounded-2xl border border-white/10 bg-neutral-950 p-6"
        style={{ boxShadow: `0 0 0 1px ${accent.ring}` }}
      >
        <div className="h-5 w-48 animate-pulse rounded bg-white/5" />
        <div className="mt-4 h-12 w-full animate-pulse rounded bg-white/5" />
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div
        className="rounded-2xl border border-white/10 bg-neutral-950 p-6"
        style={{
          boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.04), 0 0 0 1px ${accent.ring}`,
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          One-command install — locked
        </p>
        <h3 className="mt-3 text-[20px] text-white tracking-tight">
          Drop your email to reveal the install command.
        </h3>
        <p className="mt-2 text-[14px] text-neutral-400 leading-relaxed">
          One-time unlock. You&apos;ll see the command for every agent in the
          library after this.
        </p>

        <form onSubmit={submit} className="mt-5 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full border border-white/10 bg-black px-5 py-3 text-[14px] text-white placeholder:text-neutral-600 focus:border-white/30 focus:outline-none"
            disabled={state === "loading"}
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="rounded-full bg-white px-6 py-3 text-[14px] text-black transition-colors hover:bg-white/90 disabled:opacity-50"
          >
            {state === "loading" ? "Unlocking…" : "Reveal command"}
          </button>
        </form>

        {errorMsg && (
          <p className="mt-3 text-[13px] text-rose-400">{errorMsg}</p>
        )}

        <p className="mt-4 font-mono text-[11px] text-neutral-600">
          No newsletter. No spam. We log the email so we know who&apos;s
          installing agents from the library.
        </p>
      </div>
    );
  }

  return <InstallCommand slug={slug} accent={accent} kind={kind} />;
}

type Format = "claude" | "cursor";

const FORMATS: { key: Format; label: string; target: (slug: string) => string }[] = [
  {
    key: "claude",
    label: "Claude Code",
    target: (slug) => `.claude/agents/${slug}.md`,
  },
  {
    key: "cursor",
    label: "Cursor",
    target: (slug) => `.cursor/rules/${slug}.mdc`,
  },
];

function InstallCommand({
  slug,
  accent,
  kind = "agent",
}: {
  slug: string;
  accent: { from: string; to: string; ring: string };
  kind?: "agent" | "crew";
}) {
  const [format, setFormat] = useState<Format>("claude");
  const [copied, setCopied] = useState(false);

  const path = kind === "crew" ? `/agents/crews/${slug}/install` : `/agents/${slug}/install`;
  const qs = format === "claude" ? "" : `?format=${format}`;
  const command = `curl -fsSL https://trymidnightai.com${path}${qs} | sh`;
  const currentTarget = FORMATS.find((f) => f.key === format)!.target(slug);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fall through silently
    }
  }

  return (
    <div
      className="rounded-2xl border border-white/10 bg-neutral-950 p-6"
      style={{
        boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.04), 0 0 0 1px ${accent.ring}`,
      }}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          One-command install
        </p>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Unlocked
        </span>
      </div>

      <h3 className="mt-3 text-[20px] text-white tracking-tight">
        Drop it into your stack.
      </h3>
      <p className="mt-2 text-[14px] text-neutral-400 leading-relaxed">
        Writes to{" "}
        <code className="font-mono text-white/80">{currentTarget}</code>
        {kind === "crew" ? " (and the rest of the crew)." : "."} No package
        install. No auth.
      </p>

      <div className="mt-5 flex gap-1 rounded-full border border-white/8 bg-black/60 p-1 w-fit">
        {FORMATS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFormat(f.key)}
            className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
              format === f.key
                ? "bg-white text-black"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        className="group relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-black"
        style={{ boxShadow: `inset 0 0 0 1px ${accent.ring}` }}
      >
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] text-neutral-200">
          <span className="text-neutral-500">$ </span>
          {command}
        </pre>
        <button
          type="button"
          onClick={copy}
          className="absolute top-2 right-2 rounded-md border border-white/10 bg-neutral-950/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 backdrop-blur transition-colors hover:border-white/20 hover:text-white"
          aria-label="Copy install command"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <p className="mt-4 font-mono text-[11px] text-neutral-600">
        Run it from the root of your project. Inspect the script first —{" "}
        <a
          href={`${path}${qs}`}
          className="underline underline-offset-2 hover:text-neutral-300"
        >
          view source
        </a>
        .
      </p>
    </div>
  );
}

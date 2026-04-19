import Image from "next/image";
import Link from "next/link";
import type { Agent } from "../_content/agents";
import { StatBars } from "./stat-bars";

export function AgentCard({
  agent,
  href,
  installs,
}: {
  agent: Agent;
  href?: string;
  installs?: number;
}) {
  const card = (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-5 transition-all duration-300 hover:border-white/20"
      style={{
        boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.04), 0 0 0 1px ${agent.accent.ring}, 0 30px 60px -30px ${agent.accent.ring}`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background: `radial-gradient(circle, ${agent.accent.from}, transparent 70%)`,
        }}
      />

      <header className="relative flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          {agent.codename}
        </span>
        <RarityBadge agent={agent} />
      </header>

      <div className="relative mt-4 aspect-[16/11] overflow-hidden rounded-xl border border-white/10">
        <ArtWindow agent={agent} />
      </div>

      <div className="relative mt-5">
        <h3 className="text-white text-[22px] tracking-tight leading-tight">
          {agent.name}
        </h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          {agent.role}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-neutral-400">
          {agent.tagline}
        </p>
      </div>

      <div className="relative mt-5 border-t border-white/8 pt-5">
        <StatBars stats={agent.stats} accent={agent.accent} compact />
      </div>

      <footer className="relative mt-5 flex items-center justify-between gap-3 text-[11px] text-neutral-500">
        <span className="font-mono uppercase tracking-[0.2em]">
          {agent.model}
        </span>
        {typeof installs === "number" && installs > 0 && (
          <span className="font-mono uppercase tracking-[0.2em] text-neutral-400">
            {installs.toLocaleString()} installs
          </span>
        )}
        <span className="font-mono">{agent.tools.length} tools</span>
      </footer>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {card}
      </Link>
    );
  }
  return card;
}

export function ArtWindow({ agent }: { agent: Agent }) {
  if (agent.artSrc) {
    return (
      <Image
        src={agent.artSrc}
        alt={`${agent.name} — ${agent.role}`}
        fill
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    );
  }
  return (
    <div
      className="relative h-full w-full"
      style={{
        background: `radial-gradient(120% 90% at 20% 20%, ${agent.accent.from}, ${agent.accent.to} 55%, #020617 110%)`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(255,255,255,0.14),transparent_55%)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 3px)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-[family-name:var(--font-instrument-serif)] text-[140px] leading-none italic text-white/95"
          style={{ textShadow: `0 0 50px ${agent.accent.ring}` }}
        >
          {agent.glyph}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-white/70">
        <span>{agent.codename}</span>
        <span>midnight · ai</span>
      </div>
    </div>
  );
}

function RarityBadge({ agent }: { agent: Agent }) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[9px] uppercase tracking-[0.3em] text-neutral-300">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background: agent.accent.from,
          boxShadow: `0 0 10px ${agent.accent.ring}`,
        }}
      />
      {agent.rarity}
    </span>
  );
}

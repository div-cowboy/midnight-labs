import Link from "next/link";
import { agents, type Agent } from "../_content/agents";
import { bundleAgents, bundles, type Bundle } from "../_content/bundles";
import { AgentCard } from "../_components/agent-card";
import { readStats } from "../_lib/stats";

export const metadata = {
  title: "The Agent Library",
  description:
    "A curated library of premium Claude Code subagents and crews. One-command install. Built for serious SaaS teams.",
};

export default async function AgentsPage() {
  const stats = await readStats();

  return (
    <div className="min-h-screen bg-black text-neutral-50">
      <Navbar />
      <Hero />
      <CrewsSection stats={stats} />
      <AgentsSection stats={stats} />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-black/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white">
          <SparklesIcon className="w-5 h-5" />
          <span className="tracking-tight">Midnight AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[14px] text-neutral-400">
          <Link href="/#process" className="hover:text-white transition-colors">
            Process
          </Link>
          <Link href="/#protocol" className="hover:text-white transition-colors">
            Protocol
          </Link>
          <Link href="/agents" className="text-white">
            Agents
          </Link>
          <Link href="/book" className="hover:text-white transition-colors">
            Book a call
          </Link>
        </div>
        <Link
          href="/book"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-[14px] hover:bg-white/90 transition-colors"
        >
          Book a call <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/8 text-[13px] text-neutral-400 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          The Midnight Library — open for drop-in
        </div>

        <h1 className="text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-white mb-6 max-w-3xl">
          Agents for serious
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            SaaS crews.
          </span>
        </h1>

        <p className="text-[18px] text-neutral-400 max-w-2xl leading-relaxed">
          A curated library of Claude Code subagents — each one a specialist,
          each one a one-command install. Run solo or assemble a crew.
        </p>

        <div className="mt-10 flex items-center gap-6 text-[13px] font-mono uppercase tracking-[0.2em] text-neutral-500">
          <span>{agents.length} agents</span>
          <span className="h-1 w-1 rounded-full bg-neutral-700" />
          <span>{bundles.length} crews</span>
          <span className="h-1 w-1 rounded-full bg-neutral-700" />
          <span>Claude · Cursor</span>
        </div>
      </div>
    </section>
  );
}

function CrewsSection({
  stats,
}: {
  stats: { crewInstalls: Record<string, number> };
}) {
  return (
    <section id="crews" className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
              Crews
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] text-white tracking-[-0.02em]">
              Pre-assembled for the job.
            </h2>
          </div>
          <p className="hidden sm:block text-[14px] text-neutral-500 max-w-sm text-right">
            Three curated combinations. One command installs the whole crew.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {bundles.map((b) => (
            <CrewTile
              key={b.slug}
              bundle={b}
              members={bundleAgents(b)}
              installs={stats.crewInstalls[b.slug] ?? 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CrewTile({
  bundle,
  members,
  installs,
}: {
  bundle: Bundle;
  members: Agent[];
  installs: number;
}) {
  return (
    <Link href={`/agents/crews/${bundle.slug}`} className="block">
      <article
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 transition-all duration-300 hover:border-white/20"
        style={{
          boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.04), 0 0 0 1px ${bundle.accent.ring}, 0 30px 60px -30px ${bundle.accent.ring}`,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-60"
          style={{
            background: `radial-gradient(circle, ${bundle.accent.from}, transparent 70%)`,
          }}
        />

        <header className="relative flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            {bundle.codename}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-300">
            Crew · {members.length}
          </span>
        </header>

        <h3 className="relative mt-5 text-[22px] text-white tracking-tight leading-tight">
          {bundle.name}
        </h3>
        <p className="relative mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          {bundle.role}
        </p>
        <p className="relative mt-3 text-[14px] text-neutral-400 leading-relaxed">
          {bundle.tagline}
        </p>

        <div className="relative mt-6 flex items-center gap-3">
          <div className="flex -space-x-2">
            {members.map((m) => (
              <span
                key={m.slug}
                className="h-9 w-9 rounded-lg border-2 border-neutral-950 flex items-center justify-center font-[family-name:var(--font-instrument-serif)] italic text-[16px] text-white"
                style={{
                  background: `radial-gradient(80% 80% at 20% 20%, ${m.accent.from}, ${m.accent.to} 70%)`,
                }}
                title={m.name}
              >
                {m.glyph}
              </span>
            ))}
          </div>
          <p className="font-mono text-[11px] text-neutral-500">
            {members.map((m) => m.name.replace(/^The /, "")).join(" · ")}
          </p>
        </div>

        <footer className="relative mt-5 pt-5 border-t border-white/8 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="font-mono uppercase tracking-[0.2em]">
            One command
          </span>
          {installs > 0 && (
            <span className="font-mono uppercase tracking-[0.2em]">
              {installs.toLocaleString()} deployments
            </span>
          )}
        </footer>
      </article>
    </Link>
  );
}

function AgentsSection({
  stats,
}: {
  stats: { agentInstalls: Record<string, number> };
}) {
  return (
    <section id="agents" className="px-6 pb-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
              Solo operators
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] text-white tracking-[-0.02em]">
              The roster.
            </h2>
          </div>
          <p className="hidden sm:block text-[14px] text-neutral-500 max-w-sm text-right">
            Pick a specialist. Drop it in. Assemble your own crew.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard
              key={agent.slug}
              agent={agent}
              href={`/agents/${agent.slug}`}
              installs={stats.agentInstalls[agent.slug] ?? 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-neutral-400">
          <SparklesIcon className="w-4 h-4" />
          <span className="text-[14px]">Midnight AI</span>
        </div>
        <p className="text-[13px] text-neutral-500/70">
          © {new Date().getFullYear()} trymidnightai.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

type IconProps = { className?: string };

function SparklesIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

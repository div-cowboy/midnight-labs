import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { agents, getAgent } from "../../_content/agents";
import { bundles } from "../../_content/bundles";
import { ArtWindow } from "../../_components/agent-card";
import { StatBars } from "../../_components/stat-bars";
import { InstallReveal } from "../../_components/install-reveal";
import { readStats } from "../../_lib/stats";

export async function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return { title: "Agent not found" };
  return {
    title: `${agent.name} — ${agent.role}`,
    description: agent.summary,
  };
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  const stats = await readStats();
  const installs = stats.agentInstalls[agent.slug] ?? 0;
  const others = agents.filter((a) => a.slug !== agent.slug).slice(0, 3);
  const memberOfCrews = bundles.filter((b) =>
    b.agentSlugs.includes(agent.slug),
  );

  return (
    <div className="min-h-screen bg-black text-neutral-50">
      <Navbar />

      <main className="relative px-6 pt-32 pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px] opacity-40"
          style={{
            background: `radial-gradient(80% 60% at 50% 0%, ${agent.accent.from}33, transparent 70%)`,
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          <Link
            href="/agents"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition-colors"
          >
            ← The Library
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
                style={{
                  boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.04), 0 0 0 1px ${agent.accent.ring}, 0 40px 80px -30px ${agent.accent.ring}`,
                }}
              >
                <ArtWindow agent={agent} />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                <span>{agent.codename}</span>
                <span>v{agent.version}</span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-neutral-300">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: agent.accent.from,
                      boxShadow: `0 0 10px ${agent.accent.ring}`,
                    }}
                  />
                  {agent.rarity}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                  {agent.role}
                </span>
                {installs > 0 && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                    {installs.toLocaleString()} installs
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-white">
                {agent.name}
              </h1>
              <p className="mt-4 text-[20px] text-neutral-300 leading-snug font-[family-name:var(--font-instrument-serif)] italic">
                {agent.tagline}
              </p>

              <p className="mt-6 text-[16px] text-neutral-400 leading-relaxed">
                {agent.summary}
              </p>

              <figure
                className="mt-8 rounded-2xl border border-white/10 bg-neutral-950 p-5"
                style={{ boxShadow: `inset 4px 0 0 0 ${agent.accent.from}` }}
              >
                <figcaption className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Field report · {agent.caseStudy.scenario}
                </figcaption>
                <blockquote className="mt-3 text-[15px] text-neutral-200 leading-relaxed">
                  {agent.caseStudy.body}
                </blockquote>
              </figure>

              <div className="mt-8 rounded-2xl border border-white/8 bg-neutral-950 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">
                  Stat line
                </p>
                <StatBars stats={agent.stats} accent={agent.accent} />
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-10">
              <section>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Good for
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {agent.goodFor.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] text-neutral-300 leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full"
                        style={{ background: agent.accent.from }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Loadout
                </h2>
                <dl className="mt-4 space-y-3 text-[14px]">
                  <div className="flex justify-between gap-6 border-b border-white/8 pb-3">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      Model
                    </dt>
                    <dd className="text-neutral-200">{agent.model}</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-white/8 pb-3">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      Tools
                    </dt>
                    <dd className="font-mono text-neutral-200">
                      {agent.tools.join(", ")}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-white/8 pb-3">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      Format
                    </dt>
                    <dd className="font-mono text-neutral-200 text-right">
                      Claude · Cursor
                    </dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      Version
                    </dt>
                    <dd className="font-mono text-neutral-200">
                      v{agent.version}
                    </dd>
                  </div>
                </dl>
              </section>

              <section>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Changelog
                </h2>
                <ol className="mt-4 space-y-4">
                  {agent.changelog.map((entry) => (
                    <li
                      key={entry.version}
                      className="border-l-2 border-white/10 pl-4"
                      style={{ borderColor: agent.accent.ring }}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[12px] text-white">
                          v{entry.version}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                          {entry.date}
                        </span>
                      </div>
                      <p className="mt-1 text-[14px] text-neutral-300 leading-relaxed">
                        {entry.note}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              {memberOfCrews.length > 0 && (
                <section>
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                    Runs with
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {memberOfCrews.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/agents/crews/${c.slug}`}
                        className="group flex items-center gap-2 rounded-full border border-white/10 bg-neutral-950 px-3 py-1.5 text-[12px] text-neutral-300 hover:border-white/25 hover:text-white transition-colors"
                      >
                        <span
                          aria-hidden
                          className="h-2 w-2 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${c.accent.from}, ${c.accent.to})`,
                          }}
                        />
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div>
              <InstallReveal slug={agent.slug} accent={agent.accent} />
            </div>
          </div>

          <section className="mt-24 border-t border-white/8 pt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Rest of the crew
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/agents/${o.slug}`}
                  className="group block rounded-xl border border-white/8 bg-neutral-950 p-5 transition-colors hover:border-white/15"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-8 w-8 flex-none rounded-lg border border-white/10"
                      style={{
                        background: `radial-gradient(80% 80% at 20% 20%, ${o.accent.from}, ${o.accent.to} 70%)`,
                      }}
                    />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                        {o.codename}
                      </p>
                      <p className="text-[15px] text-white">{o.name}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[13px] text-neutral-400 leading-relaxed">
                    {o.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

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
          Book a call
        </Link>
      </div>
    </nav>
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

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { bundleAgents, bundles, getBundle } from "../../../_content/bundles";
import { AgentCard } from "../../../_components/agent-card";
import { InstallReveal } from "../../../_components/install-reveal";
import { readStats } from "../../../_lib/stats";

export async function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) return { title: "Crew not found" };
  return {
    title: `${bundle.name} — ${bundle.role}`,
    description: bundle.summary,
  };
}

export default async function CrewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) notFound();

  const members = bundleAgents(bundle);
  const stats = await readStats();
  const crewInstalls = stats.crewInstalls[bundle.slug] ?? 0;

  const otherCrews = bundles.filter((b) => b.slug !== bundle.slug);

  return (
    <div className="min-h-screen bg-black text-neutral-50">
      <Navbar />

      <main className="relative px-6 pt-32 pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px] opacity-40"
          style={{
            background: `radial-gradient(80% 60% at 50% 0%, ${bundle.accent.from}33, transparent 70%)`,
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          <Link
            href="/agents"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition-colors"
          >
            ← The Library
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-neutral-300"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: bundle.accent.from,
                  boxShadow: `0 0 10px ${bundle.accent.ring}`,
                }}
              />
              Crew · {bundle.codename}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
              {bundle.role}
            </span>
            {crewInstalls > 0 && (
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                {crewInstalls.toLocaleString()} deployments
              </span>
            )}
          </div>

          <h1 className="mt-5 text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-white">
            {bundle.name}
          </h1>
          <p className="mt-5 text-[22px] text-neutral-300 leading-snug font-[family-name:var(--font-instrument-serif)] italic max-w-3xl">
            {bundle.tagline}
          </p>
          <p className="mt-6 text-[17px] text-neutral-400 leading-relaxed max-w-2xl">
            {bundle.summary}
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((a) => (
              <AgentCard
                key={a.slug}
                agent={a}
                href={`/agents/${a.slug}`}
              />
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                How the crew runs a job
              </h2>
              <ol className="mt-6 space-y-5">
                {bundle.playbook.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span
                      className="flex-none w-7 h-7 rounded-full border border-white/10 flex items-center justify-center font-mono text-[11px] text-white"
                      style={{
                        background: `linear-gradient(135deg, ${bundle.accent.from}, ${bundle.accent.to})`,
                      }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-[15px] text-neutral-300 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <div>
              <InstallReveal slug={bundle.slug} accent={bundle.accent} kind="crew" />
            </div>
          </div>

          {otherCrews.length > 0 && (
            <section className="mt-24 border-t border-white/8 pt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Other crews
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {otherCrews.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/agents/crews/${c.slug}`}
                    className="group block rounded-xl border border-white/8 bg-neutral-950 p-5 transition-colors hover:border-white/15"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="h-9 w-9 flex-none rounded-lg border border-white/10"
                        style={{
                          background: `linear-gradient(135deg, ${c.accent.from}, ${c.accent.to})`,
                        }}
                      />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                          {c.codename}
                        </p>
                        <p className="text-[15px] text-white">{c.name}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-[13px] text-neutral-400 leading-relaxed">
                      {c.tagline}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
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

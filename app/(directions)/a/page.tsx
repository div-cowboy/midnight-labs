import Link from "next/link";
import {
  hero,
  benchLogos,
  benchLabel,
  positioning,
  protocol,
  phases,
  phaseNote,
  toolsGroups,
  forWho,
  founder,
  faqs,
  footer,
} from "../../_content/homepage";

export const metadata = {
  title: "Direction A — IDE / Linear",
};

export default function DirectionA() {
  return (
    <main className="min-h-screen bg-black text-neutral-100 font-mono selection:bg-cyan-400/30">
      <NavA />

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative border-b border-neutral-900">
        <div className="grid-lines absolute inset-0 pointer-events-none opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-32 md:pt-32 md:pb-40">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cyan-400">
            <span className="inline-block h-1.5 w-1.5 bg-cyan-400" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-8 font-sans text-5xl md:text-7xl font-semibold tracking-[-0.02em] leading-[1.02] text-white">
            Your company,
            <br />
            <span className="text-cyan-400">AI-native.</span> In 90 days.
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-base md:text-lg text-neutral-400 leading-relaxed">
            {hero.sub}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primary.href}
              className="group inline-flex items-center gap-2 bg-cyan-400 px-5 py-3 text-sm font-medium text-black hover:bg-cyan-300"
            >
              {hero.primary.label}
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href={hero.secondary.href}
              className="inline-flex items-center gap-2 border border-neutral-800 px-5 py-3 text-sm text-neutral-300 hover:border-neutral-600 hover:text-white"
            >
              {hero.secondary.label}
            </Link>
          </div>

          {/* Terminal block */}
          <div className="mt-20 overflow-hidden rounded-md border border-neutral-900 bg-neutral-950/70 backdrop-blur">
            <div className="flex items-center justify-between border-b border-neutral-900 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                midnight-protocol @ ~/your-org
              </span>
              <span className="w-10" />
            </div>
            <div className="p-5 text-xs md:text-sm leading-relaxed text-neutral-300">
              <p>
                <span className="text-neutral-600">$</span>{" "}
                <span className="text-cyan-400">midnight</span> audit --org your-company
              </p>
              <p className="mt-2 text-neutral-500">
                → mapping current AI usage across 7 teams…
              </p>
              <p className="text-neutral-500">→ identifying capability gaps…</p>
              <p className="text-neutral-500">→ ranking opportunity backlog…</p>
              <p className="mt-3 text-emerald-400">
                ✓ ready for Phase 02 · The Tooling Protocol
              </p>
              <p className="mt-4 flex items-center gap-1">
                <span className="text-neutral-600">$</span>
                <span className="ml-1 inline-block h-4 w-2 bg-cyan-400 animate-pulse" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── BENCH LOGOS ──────────────── */}
      <section className="border-b border-neutral-900 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-600">
            {benchLabel}
          </p>
          <div className="mt-6 overflow-hidden">
            <div className="marquee flex gap-14 whitespace-nowrap font-sans text-2xl md:text-3xl font-medium tracking-tight text-neutral-500">
              {[...benchLogos, ...benchLogos, ...benchLogos].map((logo, i) => (
                <span key={i} className="hover:text-white transition">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── POSITIONING ──────────────── */}
      <section className="border-b border-neutral-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">
              // {positioning.eyebrow}
            </p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-sans text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-white">
              {positioning.title}
            </h2>
            <div className="mt-8 space-y-5 font-sans text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              {positioning.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── PROTOCOL ──────────────── */}
      <section id="protocol" className="border-b border-neutral-900 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-baseline justify-between gap-8 border-b border-neutral-900 pb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">
                // the methodology
              </p>
              <h2 className="mt-3 font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white">
                {protocol.name}
              </h2>
            </div>
            <p className="hidden md:block text-xs text-neutral-600">
              4 pillars · 1:1 phase mapping
            </p>
          </div>

          <ul className="mt-0">
            {protocol.pillars.map((p) => (
              <li
                key={p.id}
                className="group grid gap-6 border-b border-neutral-900 py-8 md:grid-cols-12 md:gap-10 md:py-10 hover:bg-neutral-950/60 transition"
              >
                <div className="md:col-span-1 text-xs text-cyan-400">{p.number}</div>
                <div className="md:col-span-4">
                  <h3 className="font-sans text-xl md:text-2xl font-medium tracking-tight text-white">
                    {p.name}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-sans text-base text-neutral-400 leading-relaxed">
                    {p.oneLiner}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ──────────────── HOW IT WORKS (PHASES) ──────────────── */}
      <section className="border-b border-neutral-900 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">
            // how it works
          </p>
          <h2 className="mt-3 font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white">
            A 90-day install, in four phases.
          </h2>
          <p className="mt-4 text-xs text-neutral-600">{phaseNote}</p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase) => (
              <div
                key={phase.number}
                className="rounded-md border border-neutral-900 bg-neutral-950 p-5 hover:border-cyan-400/40 transition"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-cyan-400 text-xs">Phase {phase.number}</span>
                  <span className="text-[10px] text-neutral-600 uppercase tracking-wider">
                    {phase.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-sans text-2xl font-semibold tracking-tight text-white">
                  {phase.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">{phase.protocol}</p>
                <ul className="mt-6 space-y-2 font-sans text-sm text-neutral-400">
                  {phase.outcomes.map((o, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-cyan-400">→</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── WHAT WE TEACH ──────────────── */}
      <section className="border-b border-neutral-900 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">
            // what we teach
          </p>
          <h2 className="mt-3 font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Every tool your team should actually be using.
          </h2>

          <div className="mt-12 space-y-10">
            {toolsGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-6 border-t border-neutral-900 pt-8 md:grid-cols-12"
              >
                <p className="md:col-span-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
                  {group.label}
                </p>
                <div className="md:col-span-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="rounded-md border border-neutral-900 p-4 hover:border-neutral-700 transition"
                    >
                      <p className="font-sans text-base font-medium text-white">
                        {tool.name}
                      </p>
                      <p className="mt-1 font-sans text-xs text-neutral-500 leading-relaxed">
                        {tool.blurb}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── WHO THIS IS FOR ──────────────── */}
      <section className="border-b border-neutral-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">// fit</p>
            <h3 className="mt-3 font-sans text-2xl font-semibold text-white">
              {forWho.fit.title}
            </h3>
            <ul className="mt-6 space-y-3 font-sans text-sm text-neutral-400 leading-relaxed">
              {forWho.fit.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:border-l md:border-neutral-900 md:pl-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-600">
              // not a fit
            </p>
            <h3 className="mt-3 font-sans text-2xl font-semibold text-neutral-500">
              {forWho.notFit.title}
            </h3>
            <ul className="mt-6 space-y-3 font-sans text-sm text-neutral-600 leading-relaxed">
              {forWho.notFit.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-neutral-700 mt-1">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────── ABOUT SAM ──────────────── */}
      <section className="border-b border-neutral-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="aspect-square bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-700">
              <span className="font-sans text-xs">[founder photo]</span>
            </div>
            <p className="mt-4 font-sans text-sm text-white">{founder.name}</p>
            <p className="font-sans text-xs text-neutral-500">{founder.title}</p>
            <p className="mt-1 text-[11px] text-cyan-400">
              ex-{founder.logos.join(" · ex-")}
            </p>
          </div>
          <div className="md:col-span-8 md:border-l md:border-neutral-900 md:pl-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">
              // from the founder
            </p>
            <div className="mt-6 space-y-5 font-sans text-lg text-neutral-300 leading-relaxed">
              {founder.letter.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section className="border-b border-neutral-900 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">// faq</p>
          <h2 className="mt-3 font-sans text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Questions that come up.
          </h2>

          <div className="mt-12 divide-y divide-neutral-900 border-y border-neutral-900">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5 px-1">
                <summary className="flex cursor-pointer items-start justify-between gap-6 font-sans text-base md:text-lg text-white list-none">
                  <span>{faq.q}</span>
                  <span className="text-cyan-400 shrink-0 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 pr-10 font-sans text-sm md:text-base text-neutral-400 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── FINAL CTA ──────────────── */}
      <section className="py-24 md:py-40">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">
            // next step
          </p>
          <h2 className="mt-6 font-sans text-4xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] text-white">
            Ready to install
            <br />
            <span className="text-cyan-400">the Protocol?</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto font-sans text-base md:text-lg text-neutral-400">
            30 minutes. No pitch deck. We ask about your org; you ask us anything.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={hero.primary.href}
              className="group inline-flex items-center gap-2 bg-cyan-400 px-6 py-3.5 text-sm font-medium text-black hover:bg-cyan-300"
            >
              {hero.primary.label}
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>

      <FooterA />
    </main>
  );
}

function NavA() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/a" className="flex items-center gap-2 text-sm text-white">
          <span className="inline-block h-2 w-2 bg-cyan-400" />
          <span className="font-medium">Midnight AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-xs text-neutral-400">
          <Link href="#protocol" className="hover:text-white">The Protocol</Link>
          <Link href="#" className="hover:text-white">How it works</Link>
          <Link href="#" className="hover:text-white">FAQ</Link>
        </nav>
        <Link
          href={hero.primary.href}
          className="text-xs bg-cyan-400 text-black px-3 py-2 hover:bg-cyan-300"
        >
          Book a call →
        </Link>
      </div>
    </header>
  );
}

function FooterA() {
  return (
    <footer className="border-t border-neutral-900 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">
              // {footer.newsletter.eyebrow}
            </p>
            <p className="mt-4 max-w-sm font-sans text-base text-neutral-300 leading-relaxed">
              {footer.newsletter.blurb}
            </p>
            <form className="mt-6 flex max-w-md gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 border border-neutral-800 bg-neutral-950 px-3 py-2.5 font-sans text-sm text-white placeholder:text-neutral-600 focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="button"
                className="border border-cyan-400 bg-cyan-400 px-4 py-2.5 text-sm text-black hover:bg-cyan-300"
              >
                {footer.newsletter.cta}
              </button>
            </form>
          </div>
          <div className="md:col-span-7 md:border-l md:border-neutral-900 md:pl-10 flex flex-col justify-between">
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-neutral-500">
              <Link href="#" className="hover:text-white">The Protocol</Link>
              <Link href="#" className="hover:text-white">Phases</Link>
              <Link href="#" className="hover:text-white">FAQ</Link>
              <Link href={hero.primary.href} className="hover:text-white">Book a call</Link>
            </div>
            <div className="mt-10 md:mt-0 pt-10 md:pt-0 flex flex-wrap items-center gap-3 text-[11px] text-neutral-600">
              <span>© {new Date().getFullYear()} {footer.company}</span>
              <span className="text-neutral-800">·</span>
              <span>{footer.domain}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

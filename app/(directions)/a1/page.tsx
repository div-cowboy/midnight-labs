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
  title: "A1 — Refined Linear",
};

const ACCENT = "#6aa6ff"; // Linear-warm blue, not cyan

export default function DirectionA1() {
  return (
    <main className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-[#6aa6ff]/30">
      <Nav />

      {/* ───────── HERO ───────── */}
      <section className="relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-28 md:pt-36 md:pb-36">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            <span>{hero.eyebrow}</span>
            <span className="text-neutral-700">·</span>
            <span>90-day transformation</span>
          </div>

          <h1 className="mt-10 text-5xl md:text-7xl lg:text-[88px] font-semibold tracking-[-0.03em] leading-[0.98] text-white">
            Your company, AI-native.
            <br />
            <span className="text-neutral-500">In 90 days.</span>
          </h1>

          <p className="mt-10 max-w-2xl text-lg md:text-xl leading-[1.55] text-neutral-400">
            {hero.sub}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href={hero.primary.href}
              className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-neutral-200 transition"
            >
              {hero.primary.label}
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href={hero.secondary.href}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-800 px-5 py-2.5 text-sm text-neutral-300 hover:border-neutral-600 hover:text-white transition"
            >
              {hero.secondary.label}
              <span className="text-neutral-500">↓</span>
            </Link>
          </div>

          {/* Metric strip instead of terminal */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-md overflow-hidden border border-neutral-900">
            {[
              { k: "Engagement", v: "~90 days" },
              { k: "Phases", v: "4" },
              { k: "Org size", v: "30–500" },
              { k: "Format", v: "Remote + onsite" },
            ].map((m) => (
              <div
                key={m.k}
                className="bg-neutral-950/60 backdrop-blur p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  {m.k}
                </p>
                <p className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-white">
                  {m.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── BENCH LOGOS (static, not marquee) ───────── */}
      <section className="border-y border-neutral-900 py-10">
        <div className="mx-auto max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600">
            {benchLabel}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-4">
            {benchLogos.map((logo) => (
              <span
                key={logo}
                className="text-xl md:text-2xl font-medium tracking-tight text-neutral-500 hover:text-white transition"
              >
                {logo}
              </span>
            ))}
            <span className="font-mono text-xs text-neutral-700">& more</span>
          </div>
        </div>
      </section>

      {/* ───────── POSITIONING ───────── */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: ACCENT }}
              >
                {positioning.eyebrow}
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.08] text-white">
                {positioning.title}
              </h2>
              <div className="mt-8 space-y-5 text-base md:text-lg text-neutral-400 leading-[1.65] max-w-2xl">
                {positioning.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PROTOCOL ───────── */}
      <section id="protocol" className="border-t border-neutral-900 py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-baseline justify-between gap-8 border-b border-neutral-900 pb-6">
            <div>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: ACCENT }}
              >
                The methodology
              </p>
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white">
                {protocol.name}
              </h2>
            </div>
            <p className="hidden md:block font-mono text-[11px] text-neutral-600">
              4 pillars · 1:1 phase mapping
            </p>
          </div>

          <ul>
            {protocol.pillars.map((p, i) => (
              <li
                key={p.id}
                className="grid gap-6 border-b border-neutral-900 py-8 md:grid-cols-12 md:gap-10 md:py-10"
              >
                <div className="md:col-span-1 font-mono text-xs text-neutral-500">
                  {p.number}
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl md:text-2xl font-medium tracking-[-0.01em] text-white">
                    {p.name}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-base md:text-lg text-neutral-400 leading-[1.6]">
                    {p.oneLiner}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── PHASES ───────── */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            How it works
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white">
            A 90-day install, in four phases.
          </h2>
          <p className="mt-4 font-mono text-[11px] text-neutral-600">{phaseNote}</p>

          {/* Timeline bar */}
          <div className="mt-12 hidden md:grid grid-cols-12 gap-2">
            {phases.map((phase) => {
              const weeks = parseInt(phase.duration.replace(/\D/g, ""), 10);
              return (
                <div
                  key={phase.number}
                  className="rounded-sm border border-neutral-900 bg-neutral-950/60 p-3"
                  style={{ gridColumn: `span ${weeks}` }}
                >
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: ACCENT }}
                  >
                    Phase {phase.number}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{phase.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-neutral-600">
                    {phase.duration}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 space-y-0">
            {phases.map((phase, i) => (
              <div
                key={phase.number}
                className="grid gap-6 border-t border-neutral-900 py-8 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-3">
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: ACCENT }}
                  >
                    Phase {phase.number} · {phase.duration}
                  </p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-white">
                    {phase.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">{phase.protocol}</p>
                </div>
                <ul className="md:col-span-9 md:border-l md:border-neutral-900 md:pl-10 space-y-2.5 text-base text-neutral-300 leading-[1.55]">
                  {phase.outcomes.map((o, j) => (
                    <li key={j} className="flex gap-3">
                      <span style={{ color: ACCENT }}>—</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHAT WE TEACH ───────── */}
      <section className="border-t border-neutral-900 py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            Stack
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white">
            Every tool your team should be using.
          </h2>

          <div className="mt-12 space-y-8">
            {toolsGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-6 border-t border-neutral-900 pt-8 md:grid-cols-12"
              >
                <p className="md:col-span-3 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                  {group.label}
                </p>
                <div className="md:col-span-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="rounded-md border border-neutral-900 p-4 hover:border-neutral-700 transition"
                    >
                      <p className="text-base font-medium text-white">{tool.name}</p>
                      <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
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

      {/* ───────── WHO THIS IS FOR ───────── */}
      <section className="py-28 md:py-36">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: ACCENT }}
            >
              Fit
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              {forWho.fit.title}
            </h3>
            <ul className="mt-6 space-y-3 text-base text-neutral-300 leading-[1.55]">
              {forWho.fit.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: ACCENT }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:border-l md:border-neutral-900 md:pl-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-600">
              Not a fit
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-500">
              {forWho.notFit.title}
            </h3>
            <ul className="mt-6 space-y-3 text-base text-neutral-500 leading-[1.55]">
              {forWho.notFit.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-neutral-700">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── ABOUT SAM ───────── */}
      <section className="border-t border-neutral-900 py-28 md:py-36">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="aspect-square rounded-md bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-700">
              <span className="text-xs">[founder photo]</span>
            </div>
            <p className="mt-4 text-sm text-white font-medium">{founder.name}</p>
            <p className="text-xs text-neutral-500">{founder.title}</p>
            <p
              className="mt-1 font-mono text-[11px]"
              style={{ color: ACCENT }}
            >
              ex-{founder.logos.join(" · ex-")}
            </p>
          </div>
          <div className="md:col-span-8 md:border-l md:border-neutral-900 md:pl-10">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: ACCENT }}
            >
              From the founder
            </p>
            <div className="mt-6 space-y-5 text-lg text-neutral-300 leading-[1.6]">
              {founder.letter.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            FAQ
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white">
            Questions that come up.
          </h2>

          <div className="mt-12 divide-y divide-neutral-900 border-y border-neutral-900">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-6 text-base md:text-lg text-white list-none">
                  <span className="font-medium">{faq.q}</span>
                  <span
                    className="shrink-0 transition group-open:rotate-45"
                    style={{ color: ACCENT }}
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 pr-10 text-sm md:text-base text-neutral-400 leading-[1.6]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="border-t border-neutral-900 py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            Next step
          </p>
          <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] text-white">
            Ready to install
            <br />
            <span className="text-neutral-500">the Protocol?</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-neutral-400">
            30 minutes. No pitch deck. We ask about your org; you ask us anything.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={hero.primary.href}
              className="group inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-medium text-black hover:bg-neutral-200 transition"
            >
              {hero.primary.label}
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>

      <FooterMin />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/a1" className="flex items-center gap-2 text-sm">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          <span className="font-medium text-white">Midnight AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-xs text-neutral-400">
          <Link href="#protocol" className="hover:text-white">The Protocol</Link>
          <Link href="#" className="hover:text-white">How it works</Link>
          <Link href="#" className="hover:text-white">FAQ</Link>
        </nav>
        <Link
          href={hero.primary.href}
          className="rounded-md bg-white text-black text-xs px-3 py-1.5 hover:bg-neutral-200 transition"
        >
          Book a call →
        </Link>
      </div>
    </header>
  );
}

function FooterMin() {
  return (
    <footer className="border-t border-neutral-900">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: ACCENT }}
            >
              {footer.newsletter.eyebrow}
            </p>
            <p className="mt-3 max-w-sm text-sm text-neutral-300 leading-relaxed">
              {footer.newsletter.blurb}
            </p>
            <form className="mt-5 flex max-w-md gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-600 focus:outline-none"
              />
              <button
                type="button"
                className="rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-neutral-200 transition"
              >
                {footer.newsletter.cta}
              </button>
            </form>
          </div>
          <div className="md:col-span-7 md:border-l md:border-neutral-900 md:pl-10 flex flex-col justify-between">
            <div className="flex flex-wrap gap-x-7 gap-y-2 text-xs text-neutral-500">
              <Link href="#" className="hover:text-white">The Protocol</Link>
              <Link href="#" className="hover:text-white">Phases</Link>
              <Link href="#" className="hover:text-white">FAQ</Link>
              <Link href={hero.primary.href} className="hover:text-white">Book a call</Link>
            </div>
            <p className="mt-8 md:mt-0 pt-8 md:pt-0 font-mono text-[11px] text-neutral-600">
              © {new Date().getFullYear()} {footer.company} · {footer.domain}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

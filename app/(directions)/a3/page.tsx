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
  title: "A3 — Zero Chrome",
};

export default function DirectionA3() {
  return (
    <main className="min-h-screen bg-black text-neutral-300 font-sans selection:bg-white selection:text-black">
      <Nav />

      {/* ───────── HERO ───────── */}
      <section>
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 pt-28 pb-40 md:pt-40 md:pb-56">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-600">
            {hero.eyebrow} — 90-day transformation
          </p>

          <h1 className="mt-16 text-6xl md:text-8xl lg:text-[140px] font-medium tracking-[-0.04em] leading-[0.92] text-white">
            Your company,
            <br />
            AI-native.
          </h1>
          <p className="mt-6 text-6xl md:text-8xl lg:text-[140px] font-medium tracking-[-0.04em] leading-[0.92] text-neutral-600">
            In 90 days.
          </p>

          <div className="mt-20 grid gap-12 md:grid-cols-12">
            <p className="md:col-span-7 text-lg md:text-xl leading-[1.6] text-neutral-400">
              {hero.sub}
            </p>
            <div className="md:col-span-5 flex flex-col items-start gap-3 md:items-end md:justify-end">
              <Link
                href={hero.primary.href}
                className="group inline-flex items-center gap-2 bg-white text-black px-5 py-3 text-sm font-medium hover:bg-neutral-200 transition"
              >
                {hero.primary.label}
                <span className="transition group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href={hero.secondary.href}
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition"
              >
                ↓ {hero.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── BENCH LOGOS ───────── */}
      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <p className="md:col-span-3 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              {benchLabel}
            </p>
            <div className="md:col-span-9 flex flex-wrap items-center gap-x-14 gap-y-4">
              {benchLogos.map((logo) => (
                <span
                  key={logo}
                  className="text-2xl md:text-3xl font-medium tracking-[-0.01em] text-neutral-400"
                >
                  {logo}
                </span>
              ))}
              <span className="font-mono text-xs text-neutral-600">and more</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── POSITIONING ───────── */}
      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                {positioning.eyebrow}
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1.02] text-white max-w-3xl">
                {positioning.title}
              </h2>
              <div className="mt-12 space-y-6 text-lg md:text-xl text-neutral-400 leading-[1.65] max-w-2xl">
                {positioning.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PROTOCOL ───────── */}
      <section id="protocol" className="border-t border-neutral-900">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                The methodology
              </p>
              <h2 className="mt-6 text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] text-white">
                {protocol.name}
              </h2>
              <p className="mt-6 font-mono text-xs text-neutral-600 max-w-xs">
                Four pillars installed as infrastructure. Each maps to a phase, 1:1.
              </p>
            </div>

            <ol className="md:col-span-8 space-y-0">
              {protocol.pillars.map((p) => (
                <li
                  key={p.id}
                  className="grid grid-cols-12 gap-6 border-b border-neutral-900 py-10 md:py-12 first:border-t"
                >
                  <div className="col-span-2 md:col-span-1 font-mono text-xs text-neutral-500 pt-1">
                    {p.number}
                  </div>
                  <div className="col-span-10 md:col-span-11">
                    <h3 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-white">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-base md:text-lg text-neutral-400 leading-[1.6] max-w-2xl">
                      {p.oneLiner}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────── PHASES ───────── */}
      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                How it works
              </p>
              <h2 className="mt-6 text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] text-white">
                90 days.
                <br />
                <span className="text-neutral-600">Four phases.</span>
              </h2>
              <p className="mt-6 font-mono text-xs text-neutral-600">
                {phaseNote}
              </p>
            </div>

            <div className="md:col-span-8">
              {phases.map((phase, i) => (
                <div
                  key={phase.number}
                  className="grid grid-cols-12 gap-6 border-b border-neutral-900 py-10 first:border-t"
                >
                  <div className="col-span-12 md:col-span-3">
                    <p className="font-mono text-xs text-neutral-500">
                      Phase {phase.number}
                    </p>
                    <h3 className="mt-2 text-2xl md:text-3xl font-medium tracking-tight text-white">
                      {phase.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-neutral-600">
                      {phase.duration}
                    </p>
                  </div>
                  <ul className="col-span-12 md:col-span-9 space-y-2.5 text-base text-neutral-400 leading-[1.6]">
                    {phase.outcomes.map((o, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-neutral-700">—</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── WHAT WE TEACH ───────── */}
      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Stack
              </p>
              <h2 className="mt-6 text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] text-white">
                Every tool your team should be using.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-14">
              {toolsGroups.map((group) => (
                <div key={group.label}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-600 border-b border-neutral-900 pb-3">
                    {group.label}
                  </p>
                  <ul className="mt-6 divide-y divide-neutral-900">
                    {group.tools.map((tool) => (
                      <li
                        key={tool.name}
                        className="grid grid-cols-12 gap-6 py-5"
                      >
                        <p className="col-span-12 md:col-span-4 text-base font-medium text-white">
                          {tool.name}
                        </p>
                        <p className="col-span-12 md:col-span-8 text-sm text-neutral-500 leading-relaxed">
                          {tool.blurb}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── WHO THIS IS FOR ───────── */}
      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Fit
              </p>
              <h2 className="mt-6 text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] text-white">
                Who this is for.
              </h2>
            </div>
            <div className="md:col-span-8 grid gap-14 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium text-white border-b border-neutral-900 pb-3">
                  {forWho.fit.title}
                </h3>
                <ul className="mt-6 space-y-4 text-base text-neutral-300 leading-[1.6]">
                  {forWho.fit.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-neutral-500 border-b border-neutral-900 pb-3">
                  {forWho.notFit.title}
                </h3>
                <ul className="mt-6 space-y-4 text-base text-neutral-500 leading-[1.6]">
                  {forWho.notFit.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── ABOUT SAM ───────── */}
      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="aspect-[4/5] bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-700">
                <span className="font-mono text-xs">[founder portrait]</span>
              </div>
              <p className="mt-5 text-sm font-medium text-white">
                {founder.name}
              </p>
              <p className="text-xs text-neutral-500">{founder.title}</p>
              <p className="mt-1 font-mono text-[11px] text-neutral-500">
                ex-{founder.logos.join(" · ex-")}
              </p>
            </div>
            <div className="md:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                From the founder
              </p>
              <div className="mt-8 space-y-6 text-xl md:text-2xl text-neutral-300 leading-[1.5] max-w-2xl">
                {founder.letter.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                FAQ
              </p>
              <h2 className="mt-6 text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] text-white">
                Questions that come up.
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="divide-y divide-neutral-900 border-y border-neutral-900">
                {faqs.map((faq) => (
                  <details key={faq.q} className="group py-6">
                    <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                      <span className="text-lg md:text-xl font-medium text-white">
                        {faq.q}
                      </span>
                      <span className="shrink-0 text-neutral-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-5 pr-10 text-base text-neutral-400 leading-[1.65] max-w-2xl">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-40 md:py-56">
          <h2 className="text-5xl md:text-8xl lg:text-[140px] font-medium tracking-[-0.04em] leading-[0.92] text-white">
            Install
            <br />
            <span className="text-neutral-600">the Protocol.</span>
          </h2>
          <div className="mt-16 grid gap-12 md:grid-cols-12">
            <p className="md:col-span-7 text-lg md:text-xl text-neutral-400 leading-[1.6] max-w-lg">
              30 minutes. No pitch deck. We ask about your org; you ask us anything.
            </p>
            <div className="md:col-span-5 flex md:justify-end md:items-end">
              <Link
                href={hero.primary.href}
                className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 text-sm font-medium hover:bg-neutral-200 transition"
              >
                {hero.primary.label}
                <span className="transition group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterMin />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 md:px-10 py-5">
        <Link href="/a3" className="text-sm font-medium text-white tracking-[-0.01em]">
          Midnight AI
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
          <Link href="#protocol" className="hover:text-white">Protocol</Link>
          <Link href="#" className="hover:text-white">Phases</Link>
          <Link href="#" className="hover:text-white">FAQ</Link>
        </nav>
        <Link
          href={hero.primary.href}
          className="text-xs bg-white text-black px-3.5 py-1.5 hover:bg-neutral-200 transition"
        >
          Book a call
        </Link>
      </div>
    </header>
  );
}

function FooterMin() {
  return (
    <footer className="border-t border-neutral-900">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              {footer.newsletter.eyebrow}
            </p>
            <p className="mt-4 max-w-sm text-base text-neutral-300 leading-relaxed">
              {footer.newsletter.blurb}
            </p>
            <form className="mt-6 flex max-w-md gap-2 border-b border-neutral-800 pb-0">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-transparent py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none"
              />
              <button
                type="button"
                className="text-sm text-neutral-400 hover:text-white transition pb-2"
              >
                {footer.newsletter.cta} →
              </button>
            </form>
          </div>
          <div className="md:col-span-7 md:border-l md:border-neutral-900 md:pl-12 flex flex-col justify-between">
            <nav className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
              <Link href="#" className="hover:text-white">Protocol</Link>
              <Link href="#" className="hover:text-white">Phases</Link>
              <Link href="#" className="hover:text-white">FAQ</Link>
              <Link href={hero.primary.href} className="hover:text-white">Book a call</Link>
            </nav>
            <p className="mt-10 md:mt-0 pt-10 md:pt-0 font-mono text-[11px] text-neutral-700">
              © {new Date().getFullYear()} {footer.company} · {footer.domain}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

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
  title: "Direction C — Industrial Night Shift",
};

const BLOOD = "#ef2525";

export default function DirectionC() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#ef2525] selection:text-black">
      <NavC />

      {/* ──────────────── HERO ──────────────── */}
      <section className="border-b-2 border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em]">
            <span
              className="inline-block h-3 w-3"
              style={{ backgroundColor: BLOOD }}
            />
            <span className="text-white">Midnight AI</span>
            <span className="text-neutral-600">//</span>
            <span className="text-neutral-500">90-day transformation</span>
          </div>

          <h1
            className="mt-12 font-display font-bold uppercase tracking-[-0.03em] leading-[0.84] text-[14vw] md:text-[11vw] lg:text-[180px]"
          >
            Your
            <br />
            company.
            <br />
            <span style={{ color: BLOOD }}>AI-native.</span>
            <br />
            <span className="text-neutral-500">In 90 days.</span>
          </h1>

          <div className="mt-16 grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xl md:text-2xl leading-snug font-medium text-neutral-200">
                {hero.sub}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col items-start justify-end gap-3">
              <Link
                href={hero.primary.href}
                className="group inline-flex w-full items-center justify-between gap-4 px-6 py-5 text-base font-bold uppercase tracking-wider text-black transition hover:translate-x-1"
                style={{ backgroundColor: BLOOD }}
              >
                {hero.primary.label}
                <span className="text-2xl">→</span>
              </Link>
              <Link
                href={hero.secondary.href}
                className="inline-flex w-full items-center justify-between gap-4 border-2 border-white px-6 py-5 text-base font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black transition"
              >
                {hero.secondary.label}
                <span className="text-2xl">↓</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── BENCH LOGOS ──────────────── */}
      <section
        className="border-b-2 border-white/10 overflow-hidden py-8 md:py-10"
        style={{ backgroundColor: BLOOD }}
      >
        <div className="marquee flex gap-12 whitespace-nowrap text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-black">
          {[...benchLogos, ...benchLogos, ...benchLogos, ...benchLogos].map(
            (logo, i) => (
              <span key={i} className="flex items-center gap-12">
                {logo}
                <span className="text-black/40">★</span>
              </span>
            ),
          )}
        </div>
        <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-black">
          {benchLabel}
        </p>
      </section>

      {/* ──────────────── POSITIONING ──────────────── */}
      <section className="border-b-2 border-white/10 py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-8"
            style={{ color: BLOOD }}
          >
            [ {positioning.eyebrow} ]
          </p>
          <h2 className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.92] text-5xl md:text-7xl lg:text-[120px]">
            {positioning.title}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            {positioning.body.map((p, i) => (
              <p
                key={i}
                className="md:col-span-6 text-xl md:text-2xl leading-snug text-neutral-300 font-medium"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── PROTOCOL ──────────────── */}
      <section
        id="protocol"
        className="border-b-2 border-white/10 py-24 md:py-40"
      >
        <div className="mx-auto max-w-[1400px] px-6">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-8"
            style={{ color: BLOOD }}
          >
            [ the methodology ]
          </p>
          <h2 className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.92] text-5xl md:text-7xl lg:text-[120px]">
            {protocol.name}
          </h2>
          <p className="mt-6 text-lg uppercase tracking-wider text-neutral-500">
            Four pillars. 1:1 phase mapping. Zero fluff.
          </p>

          <div className="mt-20 divide-y-2 divide-white/10 border-y-2 border-white/10">
            {protocol.pillars.map((p) => (
              <div
                key={p.id}
                className="group grid grid-cols-12 gap-6 py-10 md:py-16 hover:bg-white hover:text-black transition-colors"
              >
                <div
                  className="col-span-2 md:col-span-1 font-display text-4xl md:text-6xl font-bold"
                  style={{ color: BLOOD }}
                >
                  {p.number}
                </div>
                <div className="col-span-10 md:col-span-6">
                  <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
                    {p.name}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p className="text-lg md:text-xl leading-snug font-medium">
                    {p.oneLiner}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── HOW IT WORKS (PHASES) ──────────────── */}
      <section className="border-b-2 border-white/10 py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-8"
            style={{ color: BLOOD }}
          >
            [ how it works ]
          </p>
          <h2 className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.92] text-5xl md:text-7xl lg:text-[120px]">
            90 Days. Four Phases.
          </h2>
          <p className="mt-6 text-lg uppercase tracking-wider text-neutral-500">
            {phaseNote}
          </p>

          <div className="mt-20 grid gap-0 md:grid-cols-4 border-2 border-white/10">
            {phases.map((phase, i) => (
              <div
                key={phase.number}
                className={`p-6 md:p-8 ${
                  i < 3 ? "border-b-2 md:border-b-0 md:border-r-2 border-white/10" : ""
                }`}
                style={{
                  backgroundColor: i === 0 ? BLOOD : "transparent",
                  color: i === 0 ? "black" : "white",
                }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-6xl md:text-8xl font-black">
                    {phase.number}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {phase.duration}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
                  {phase.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider opacity-70">
                  {phase.protocol}
                </p>
                <ul className="mt-8 space-y-4 text-sm md:text-base font-medium leading-snug">
                  {phase.outcomes.map((o, j) => (
                    <li key={j} className="flex gap-2">
                      <span
                        className="font-black mt-0.5"
                        style={{ color: i === 0 ? "black" : BLOOD }}
                      >
                        ▪
                      </span>
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
      <section className="border-b-2 border-white/10 py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-8"
            style={{ color: BLOOD }}
          >
            [ stack ]
          </p>
          <h2 className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.92] text-5xl md:text-7xl lg:text-[120px]">
            Every tool. No favorites.
          </h2>

          <div className="mt-20 space-y-16">
            {toolsGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">
                  ▸ {group.label}
                </p>
                <div className="mt-6 grid gap-0 border-2 border-white/10 md:grid-cols-3">
                  {group.tools.map((tool, i) => (
                    <div
                      key={tool.name}
                      className={`p-6 ${
                        i < group.tools.length - 1
                          ? "border-b-2 md:border-b-0 md:border-r-2 border-white/10"
                          : ""
                      } hover:text-black transition-colors`}
                      style={{
                        backgroundColor: undefined,
                      }}
                    >
                      <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
                        {tool.name}
                      </h3>
                      <p className="mt-3 text-sm text-neutral-400 leading-snug">
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
      <section className="border-b-2 border-white/10 py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 grid gap-12 md:grid-cols-2">
          <div
            className="p-10 md:p-14"
            style={{ backgroundColor: BLOOD, color: "black" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em]">[ fit ]</p>
            <h3 className="mt-6 font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[0.92]">
              {forWho.fit.title}
            </h3>
            <ul className="mt-10 space-y-5 text-lg font-medium leading-snug">
              {forWho.fit.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-black">▪</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 md:p-14 border-2 border-white/10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">
              [ not a fit ]
            </p>
            <h3 className="mt-6 font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[0.92] text-neutral-500">
              {forWho.notFit.title}
            </h3>
            <ul className="mt-10 space-y-5 text-lg font-medium leading-snug text-neutral-500">
              {forWho.notFit.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-neutral-700">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────── ABOUT SAM ──────────────── */}
      <section className="border-b-2 border-white/10 py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div
              className="aspect-square flex items-center justify-center border-2"
              style={{ borderColor: BLOOD, backgroundColor: "#0a0a0a", color: BLOOD }}
            >
              <span className="text-sm uppercase tracking-wider font-bold">
                [founder photo]
              </span>
            </div>
          </div>
          <div className="md:col-span-7">
            <p
              className="text-xs font-bold uppercase tracking-[0.3em] mb-6"
              style={{ color: BLOOD }}
            >
              [ from the founder ]
            </p>
            <h3 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-tight leading-[0.9]">
              {founder.name}
            </h3>
            <p className="mt-3 text-lg uppercase tracking-wider text-neutral-500">
              {founder.title} · ex-{founder.logos.join(" · ex-")}
            </p>
            <div className="mt-10 space-y-6 text-xl md:text-2xl leading-snug font-medium">
              {founder.letter.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section className="border-b-2 border-white/10 py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-8"
            style={{ color: BLOOD }}
          >
            [ faq ]
          </p>
          <h2 className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.92] text-5xl md:text-7xl lg:text-[120px]">
            Questions.
          </h2>

          <div className="mt-16 border-t-2 border-white/10">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border-b-2 border-white/10 py-8"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                  <span className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight">
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 font-black text-3xl transition group-open:rotate-45"
                    style={{ color: BLOOD }}
                  >
                    +
                  </span>
                </summary>
                <p className="mt-6 max-w-3xl text-lg md:text-xl leading-snug text-neutral-300 font-medium">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── FINAL CTA ──────────────── */}
      <section
        className="py-24 md:py-40"
        style={{ backgroundColor: BLOOD, color: "black" }}
      >
        <div className="mx-auto max-w-[1400px] px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em]">
            [ next step ]
          </p>
          <h2 className="mt-8 font-display font-black uppercase tracking-[-0.03em] leading-[0.84] text-[14vw] md:text-[11vw] lg:text-[180px]">
            Install
            <br />
            the Protocol.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-12">
            <p className="md:col-span-7 text-xl md:text-2xl font-medium leading-snug">
              30 minutes. No pitch deck. We ask about your org; you ask us anything.
            </p>
            <div className="md:col-span-5 flex items-end">
              <Link
                href={hero.primary.href}
                className="group inline-flex w-full items-center justify-between gap-4 border-2 border-black px-6 py-5 text-base font-bold uppercase tracking-wider bg-black text-white transition hover:bg-white hover:text-black"
              >
                {hero.primary.label}
                <span className="text-2xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterC />
    </main>
  );
}

function NavC() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-white/10 bg-black">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <Link href="/c" className="flex items-center gap-3">
          <span
            className="inline-block h-4 w-4"
            style={{ backgroundColor: BLOOD }}
          />
          <span className="font-display text-lg font-bold uppercase tracking-tight">
            Midnight AI
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
          <Link href="#protocol" className="hover:text-white">Protocol</Link>
          <Link href="#" className="hover:text-white">Phases</Link>
          <Link href="#" className="hover:text-white">FAQ</Link>
        </nav>
        <Link
          href={hero.primary.href}
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:translate-x-0.5"
          style={{ backgroundColor: BLOOD }}
        >
          Book →
        </Link>
      </div>
    </header>
  );
}

function FooterC() {
  return (
    <footer className="border-t-2 border-white/10 bg-black">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p
              className="text-xs font-bold uppercase tracking-[0.3em] mb-6"
              style={{ color: BLOOD }}
            >
              [ {footer.newsletter.eyebrow} ]
            </p>
            <p className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[0.92] max-w-2xl">
              {footer.newsletter.blurb}
            </p>
            <form className="mt-10 flex max-w-xl gap-0 border-2 border-white/20">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-transparent px-4 py-4 text-base font-medium placeholder:text-neutral-600 focus:outline-none"
              />
              <button
                type="button"
                className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-black"
                style={{ backgroundColor: BLOOD }}
              >
                {footer.newsletter.cta}
              </button>
            </form>
          </div>
          <div className="md:col-span-5 md:border-l-2 md:border-white/10 md:pl-12">
            <nav className="grid grid-cols-2 gap-4 text-sm font-bold uppercase tracking-wider text-neutral-400">
              <Link href="#" className="hover:text-white">Protocol</Link>
              <Link href="#" className="hover:text-white">Phases</Link>
              <Link href="#" className="hover:text-white">FAQ</Link>
              <Link href={hero.primary.href} className="hover:text-white">
                Book a call
              </Link>
            </nav>
            <p className="mt-16 text-xs uppercase tracking-wider text-neutral-600">
              © {new Date().getFullYear()} {footer.company} // {footer.domain}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

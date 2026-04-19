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
  title: "Direction B — Nocturnal Editorial",
};

const PAGE_BG = "#070a14";
const PAGE_FG = "#e8e3d5";
const GOLD = "#c9a86a";
const IVORY = "#f5f4ee";

export default function DirectionB() {
  return (
    <main
      className="min-h-screen font-sans noise"
      style={{ backgroundColor: PAGE_BG, color: PAGE_FG }}
    >
      <NavB />

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 pt-28 pb-36 md:pt-40 md:pb-48">
          <p
            className="font-serif italic text-sm tracking-wide"
            style={{ color: GOLD }}
          >
            Midnight AI — est. 2026
          </p>
          <h1
            className="mt-8 font-serif text-5xl md:text-7xl lg:text-[92px] leading-[0.98] tracking-[-0.015em]"
            style={{ color: IVORY }}
          >
            Your company,
            <br />
            <em
              className="italic"
              style={{ color: GOLD, fontStyle: "italic" }}
            >
              AI-native.
            </em>
            <br />
            In ninety days.
          </h1>
          <div className="mt-12 max-w-2xl">
            <p className="font-serif text-xl md:text-2xl leading-snug text-neutral-300">
              {hero.sub}
            </p>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-5">
            <Link
              href={hero.primary.href}
              className="group inline-flex items-center gap-3 border px-7 py-3.5 text-sm tracking-wide transition hover:bg-[#c9a86a] hover:text-black"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              {hero.primary.label}
              <span>—→</span>
            </Link>
            <Link
              href={hero.secondary.href}
              className="font-serif italic text-base underline underline-offset-4 decoration-white/20 hover:decoration-white"
              style={{ color: IVORY }}
            >
              {hero.secondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────── BENCH LOGOS ──────────────── */}
      <section className="border-b border-white/5 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p
            className="font-serif italic text-sm"
            style={{ color: GOLD }}
          >
            {benchLabel}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {benchLogos.map((logo) => (
              <span
                key={logo}
                className="font-serif text-2xl md:text-3xl"
                style={{ color: IVORY, opacity: 0.7 }}
              >
                {logo}
              </span>
            ))}
            <span
              className="font-serif italic text-lg"
              style={{ color: GOLD }}
            >
              & more
            </span>
          </div>
        </div>
      </section>

      {/* ──────────────── POSITIONING (essay-style) ──────────────── */}
      <section className="border-b border-white/5 py-28 md:py-40">
        <div className="mx-auto max-w-3xl px-6">
          <p
            className="font-serif italic text-sm mb-6"
            style={{ color: GOLD }}
          >
            {positioning.eyebrow}
          </p>
          <h2
            className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.01em]"
            style={{ color: IVORY }}
          >
            {positioning.title}
          </h2>
          <div className="mt-10 space-y-7 font-serif text-xl md:text-2xl leading-[1.45] text-neutral-300">
            {positioning.body.map((p, i) => (
              <p key={i} className={i === 0 ? "first-letter:font-serif first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:leading-none first-letter:text-[color:var(--color-gold)]" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── PROTOCOL ──────────────── */}
      <section
        id="protocol"
        className="border-b border-white/5 py-28 md:py-40"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p
              className="font-serif italic text-sm"
              style={{ color: GOLD }}
            >
              The methodology
            </p>
            <h2
              className="mt-4 font-serif text-4xl md:text-6xl tracking-[-0.01em]"
              style={{ color: IVORY }}
            >
              {protocol.name}
            </h2>
            <p className="mt-4 font-serif italic text-neutral-400">
              Four pillars, installed across ninety days.
            </p>
          </div>

          <ol className="mt-20 space-y-20">
            {protocol.pillars.map((p, idx) => (
              <li key={p.id}>
                <div className="grid gap-6 md:grid-cols-12 md:gap-12">
                  <div className="md:col-span-3">
                    <p
                      className="font-serif italic text-sm"
                      style={{ color: GOLD }}
                    >
                      Pillar {p.number}
                    </p>
                    <h3
                      className="mt-2 font-serif text-3xl md:text-4xl leading-tight tracking-[-0.01em]"
                      style={{ color: IVORY }}
                    >
                      {p.name.replace("The ", "")}
                    </h3>
                  </div>
                  <div className="md:col-span-9 md:border-l md:border-white/10 md:pl-12">
                    <p className="font-serif text-xl md:text-2xl leading-[1.5] text-neutral-300">
                      {p.oneLiner}
                    </p>
                  </div>
                </div>
                {idx < protocol.pillars.length - 1 && (
                  <div
                    className="mt-20 flex justify-center text-lg"
                    style={{ color: GOLD, opacity: 0.5 }}
                  >
                    ✦
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ──────────────── HOW IT WORKS (PHASES) ──────────────── */}
      <section className="border-b border-white/5 py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p
              className="font-serif italic text-sm"
              style={{ color: GOLD }}
            >
              How it works
            </p>
            <h2
              className="mt-4 font-serif text-4xl md:text-6xl tracking-[-0.01em]"
              style={{ color: IVORY }}
            >
              A ninety-day install, in four phases.
            </h2>
            <p className="mt-4 font-serif italic text-sm text-neutral-500">
              {phaseNote}
            </p>
          </div>

          <div className="mt-20 space-y-0">
            {phases.map((phase, i) => (
              <div
                key={phase.number}
                className="grid gap-8 md:grid-cols-12 md:gap-10 py-10 border-t border-white/10"
              >
                <div className="md:col-span-3">
                  <p
                    className="font-serif text-6xl md:text-7xl tracking-tight"
                    style={{ color: GOLD, opacity: 0.7 }}
                  >
                    {phase.number}
                  </p>
                  <p
                    className="mt-2 font-serif italic text-sm"
                    style={{ color: GOLD }}
                  >
                    {phase.duration}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <h3
                    className="font-serif text-3xl leading-tight"
                    style={{ color: IVORY }}
                  >
                    {phase.name}
                  </h3>
                  <p
                    className="mt-1 font-serif italic text-sm"
                    style={{ color: GOLD, opacity: 0.8 }}
                  >
                    {phase.protocol}
                  </p>
                </div>
                <ul className="md:col-span-5 space-y-3 font-serif text-lg leading-snug text-neutral-300">
                  {phase.outcomes.map((o, j) => (
                    <li key={j} className="flex gap-3">
                      <span style={{ color: GOLD }}>—</span>
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
      <section className="border-b border-white/5 py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p
              className="font-serif italic text-sm"
              style={{ color: GOLD }}
            >
              What we teach
            </p>
            <h2
              className="mt-4 font-serif text-4xl md:text-6xl tracking-[-0.01em]"
              style={{ color: IVORY }}
            >
              Every tool your team should be using.
            </h2>
          </div>

          <div className="mt-16 space-y-12">
            {toolsGroups.map((group) => (
              <div key={group.label}>
                <p
                  className="font-serif italic text-sm"
                  style={{ color: GOLD }}
                >
                  {group.label}
                </p>
                <div className="mt-5 grid gap-6 md:grid-cols-3 border-t border-white/10 pt-8">
                  {group.tools.map((tool) => (
                    <div key={tool.name}>
                      <h3
                        className="font-serif text-2xl leading-tight"
                        style={{ color: IVORY }}
                      >
                        {tool.name}
                      </h3>
                      <p className="mt-2 font-serif text-base text-neutral-400 leading-snug">
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
      <section className="border-b border-white/5 py-28 md:py-40">
        <div className="mx-auto grid max-w-5xl gap-16 px-6 md:grid-cols-2">
          <div>
            <p
              className="font-serif italic text-sm"
              style={{ color: GOLD }}
            >
              A fit
            </p>
            <h3
              className="mt-3 font-serif text-3xl md:text-4xl leading-tight"
              style={{ color: IVORY }}
            >
              {forWho.fit.title}
            </h3>
            <ul className="mt-8 space-y-4 font-serif text-lg leading-snug text-neutral-300">
              {forWho.fit.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: GOLD }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              className="font-serif italic text-sm"
              style={{ color: GOLD, opacity: 0.6 }}
            >
              Probably not
            </p>
            <h3
              className="mt-3 font-serif text-3xl md:text-4xl leading-tight text-neutral-500"
            >
              {forWho.notFit.title}
            </h3>
            <ul className="mt-8 space-y-4 font-serif text-lg leading-snug text-neutral-500">
              {forWho.notFit.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="opacity-50">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────── ABOUT SAM ──────────────── */}
      <section className="border-b border-white/5 py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-4">
              <div
                className="aspect-[4/5] flex items-center justify-center"
                style={{
                  backgroundColor: "#0d1220",
                  border: `1px solid ${GOLD}40`,
                  color: GOLD,
                }}
              >
                <span className="font-serif italic text-sm">[founder portrait]</span>
              </div>
            </div>
            <div className="md:col-span-8">
              <p
                className="font-serif italic text-sm"
                style={{ color: GOLD }}
              >
                From the founder
              </p>
              <div
                className="mt-6 space-y-6 font-serif text-xl md:text-2xl leading-[1.5]"
                style={{ color: IVORY }}
              >
                {founder.letter.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-10">
                <p
                  className="font-serif italic text-2xl"
                  style={{ color: GOLD }}
                >
                  — {founder.name}
                </p>
                <p className="mt-1 font-serif italic text-sm text-neutral-500">
                  {founder.title}, ex-{founder.logos.join(", ex-")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section className="border-b border-white/5 py-28 md:py-40">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p
              className="font-serif italic text-sm"
              style={{ color: GOLD }}
            >
              Further reading
            </p>
            <h2
              className="mt-3 font-serif text-4xl md:text-6xl tracking-[-0.01em]"
              style={{ color: IVORY }}
            >
              Questions that come up.
            </h2>
          </div>

          <div className="mt-16 space-y-6">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border-b border-white/10 py-6"
              >
                <summary
                  className="flex cursor-pointer items-start justify-between gap-6 font-serif text-xl md:text-2xl leading-tight list-none"
                  style={{ color: IVORY }}
                >
                  <span>{faq.q}</span>
                  <span
                    className="shrink-0 font-serif italic text-base transition group-open:rotate-45"
                    style={{ color: GOLD }}
                  >
                    +
                  </span>
                </summary>
                <p className="mt-5 font-serif text-lg leading-[1.5] text-neutral-300 pr-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── FINAL CTA ──────────────── */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p
            className="font-serif italic text-sm"
            style={{ color: GOLD }}
          >
            Next step
          </p>
          <h2
            className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] tracking-[-0.015em]"
            style={{ color: IVORY }}
          >
            Ready to install
            <br />
            <em className="italic" style={{ color: GOLD }}>
              the Protocol?
            </em>
          </h2>
          <p className="mt-8 font-serif text-xl text-neutral-300 max-w-xl mx-auto leading-snug">
            Thirty minutes. No pitch deck. We ask about your org; you ask us anything.
          </p>
          <div className="mt-12 flex justify-center">
            <Link
              href={hero.primary.href}
              className="group inline-flex items-center gap-3 border px-8 py-4 text-base tracking-wide transition hover:bg-[#c9a86a] hover:text-black"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              {hero.primary.label}
              <span>—→</span>
            </Link>
          </div>
        </div>
      </section>

      <FooterB />
    </main>
  );
}

function NavB() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-white/5 backdrop-blur"
      style={{ backgroundColor: `${PAGE_BG}dd` }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/b" className="flex items-center gap-3">
          <span
            className="font-serif text-xl italic"
            style={{ color: GOLD }}
          >
            Midnight AI
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-serif italic text-sm text-neutral-300">
          <Link href="#protocol" className="hover:text-white">
            The Protocol
          </Link>
          <Link href="#" className="hover:text-white">
            How it works
          </Link>
          <Link href="#" className="hover:text-white">
            FAQ
          </Link>
        </nav>
        <Link
          href={hero.primary.href}
          className="font-serif italic text-sm border px-4 py-2 hover:bg-[#c9a86a] hover:text-black transition"
          style={{ borderColor: GOLD, color: GOLD }}
        >
          Book a call
        </Link>
      </div>
    </header>
  );
}

function FooterB() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p
              className="font-serif italic text-sm"
              style={{ color: GOLD }}
            >
              {footer.newsletter.eyebrow}
            </p>
            <p
              className="mt-4 font-serif text-2xl md:text-3xl leading-snug max-w-md"
              style={{ color: IVORY }}
            >
              {footer.newsletter.blurb}
            </p>
            <form className="mt-8 flex max-w-md gap-3">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-transparent border-b border-white/20 px-1 py-2.5 font-serif text-lg placeholder:text-neutral-600 focus:border-[#c9a86a] focus:outline-none"
                style={{ color: IVORY }}
              />
              <button
                type="button"
                className="font-serif italic text-base border px-5 py-2 hover:bg-[#c9a86a] hover:text-black transition"
                style={{ borderColor: GOLD, color: GOLD }}
              >
                {footer.newsletter.cta}
              </button>
            </form>
          </div>
          <div className="md:col-span-6 md:border-l md:border-white/10 md:pl-12">
            <nav className="flex flex-wrap gap-x-8 gap-y-3 font-serif italic text-base text-neutral-400">
              <Link href="#" className="hover:text-white">The Protocol</Link>
              <Link href="#" className="hover:text-white">Phases</Link>
              <Link href="#" className="hover:text-white">FAQ</Link>
              <Link href={hero.primary.href} className="hover:text-white">
                Book a call
              </Link>
            </nav>
            <p className="mt-16 font-serif italic text-sm text-neutral-600">
              © {new Date().getFullYear()} {footer.company} · {footer.domain}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

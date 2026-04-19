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
  title: "A2 — Phosphor Terminal",
};

const PHOS = "#7dff6b"; // phosphor green
const PHOS_DIM = "#4ade80";
const AMBER = "#ffb454"; // secondary accent

export default function DirectionA2() {
  return (
    <main className="min-h-screen bg-[#020402] text-[#b3e8a8] font-mono selection:bg-[#7dff6b]/30 selection:text-black">
      <NavT />

      {/* subtle scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(125,255,107,0.4) 0, rgba(125,255,107,0.4) 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden
      />
      <div className="relative z-10">

      {/* ───────── HERO ───────── */}
      <section className="border-b border-[#1a3012]">
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <p className="text-xs" style={{ color: PHOS_DIM }}>
            midnight@protocol:~$ <span style={{ color: PHOS }}>whoami</span>
          </p>
          <p className="mt-2 text-sm text-[#7aa870]">
            → Midnight AI · 90-day transformation engagement
          </p>

          <pre
            className="mt-12 text-[10px] md:text-xs leading-[1.05] overflow-x-auto"
            style={{ color: PHOS }}
          >
{`  __  __ _     _       _     _       _      _    ___
 |  \\/  (_) __| |_ __ (_) __| |__  _| |_   / \\  |_ _|
 | |\\/| | |/ _\` | '_ \\| |/ _\` / _|| | __| / _ \\  | |
 | |  | | | (_| | | | | | (_| \\__ \\ | |_ / ___ \\ | |
 |_|  |_|_|\\__,_|_| |_|_|\\__,_|___/_|\\__/_/   \\_\\___|`}
          </pre>

          <h1
            className="mt-12 font-sans text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.025em] leading-[1.02]"
            style={{ color: "#eaffdf" }}
          >
            Your company, AI-native.
            <br />
            <span style={{ color: PHOS }}>In 90 days.</span>
          </h1>

          <p className="mt-8 max-w-2xl font-sans text-base md:text-lg leading-[1.55] text-[#9dc68f]">
            {hero.sub}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primary.href}
              className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-[#7dff6b] text-black hover:bg-[#a7ff9c] transition"
            >
              ▸ {hero.primary.label}
            </Link>
            <Link
              href={hero.secondary.href}
              className="inline-flex items-center gap-2 border px-5 py-3 text-sm transition hover:bg-[#0a1907]"
              style={{ borderColor: PHOS_DIM, color: PHOS_DIM }}
            >
              $ cat protocol.md
            </Link>
          </div>

          <p className="mt-14 text-xs" style={{ color: "#4a6c40" }}>
            ──────────────────────────────────────────────────
          </p>
          <p className="mt-4 text-xs">
            <span style={{ color: PHOS_DIM }}>midnight@protocol:~$</span>{" "}
            <span className="inline-block h-3.5 w-2 align-middle" style={{ backgroundColor: PHOS }} />
          </p>
        </div>
      </section>

      {/* ───────── BENCH LOGOS ───────── */}
      <section className="border-b border-[#1a3012] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs" style={{ color: PHOS_DIM }}>
            $ ls bench/
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {benchLogos.map((logo) => (
              <span key={logo} className="text-[#b3e8a8] hover:text-[#eaffdf] transition">
                <span style={{ color: "#4a6c40" }}>-rwx </span>
                {logo.toLowerCase().replace(/\s+/g, "-")}
              </span>
            ))}
            <span className="text-[#4a6c40]">... and more</span>
          </div>
          <p className="mt-4 text-xs text-[#7aa870]">
            {benchLabel}
          </p>
        </div>
      </section>

      {/* ───────── POSITIONING ───────── */}
      <section className="border-b border-[#1a3012] py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs" style={{ color: PHOS_DIM }}>
            $ cat problem.md
          </p>
          <h2
            className="mt-6 font-sans text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.08]"
            style={{ color: "#eaffdf" }}
          >
            {positioning.title}
          </h2>
          <div className="mt-8 space-y-5 font-sans text-base md:text-lg leading-[1.65] text-[#b3e8a8] max-w-3xl">
            {positioning.body.map((p, i) => (
              <p key={i}>
                <span style={{ color: PHOS_DIM }}>› </span>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PROTOCOL ───────── */}
      <section
        id="protocol"
        className="border-b border-[#1a3012] py-24 md:py-32"
      >
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs" style={{ color: PHOS_DIM }}>
            $ tree protocol/
          </p>
          <h2
            className="mt-4 font-sans text-3xl md:text-5xl font-semibold tracking-[-0.02em]"
            style={{ color: "#eaffdf" }}
          >
            {protocol.name}
          </h2>
          <p className="mt-3 text-xs text-[#7aa870]">
            // 4 pillars · 1:1 mapping to phases
          </p>

          <pre className="mt-10 text-xs md:text-sm leading-[1.7]" style={{ color: PHOS }}>
{`protocol/
├── 01_audit/        # diagnose readiness
├── 02_tooling/      # install the stack
├── 03_practice/     # operator-level fluency
└── 04_scale/        # embed and measure`}
          </pre>

          <ul className="mt-14 space-y-0 border-t border-[#1a3012]">
            {protocol.pillars.map((p) => (
              <li
                key={p.id}
                className="grid gap-6 border-b border-[#1a3012] py-8 md:grid-cols-12 md:gap-10 md:py-10 hover:bg-[#071205] transition"
              >
                <div className="md:col-span-1 text-xs" style={{ color: PHOS }}>
                  [{p.number}]
                </div>
                <div className="md:col-span-4">
                  <h3
                    className="font-sans text-xl md:text-2xl font-medium tracking-tight"
                    style={{ color: "#eaffdf" }}
                  >
                    {p.name}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-sans text-base text-[#b3e8a8] leading-[1.6]">
                    {p.oneLiner}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── PHASES ───────── */}
      <section className="border-b border-[#1a3012] py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs" style={{ color: PHOS_DIM }}>
            $ midnight run --dry
          </p>
          <h2
            className="mt-4 font-sans text-3xl md:text-5xl font-semibold tracking-[-0.02em]"
            style={{ color: "#eaffdf" }}
          >
            A 90-day install, in four phases.
          </h2>
          <p className="mt-3 text-xs text-[#7aa870]">// {phaseNote}</p>

          <div className="mt-12 overflow-hidden border border-[#1a3012]">
            <div className="grid grid-cols-4 border-b border-[#1a3012] bg-[#061105] text-xs" style={{ color: PHOS_DIM }}>
              <div className="p-3">PHASE</div>
              <div className="p-3">NAME</div>
              <div className="p-3">DURATION</div>
              <div className="p-3">PROTOCOL</div>
            </div>
            {phases.map((phase) => (
              <div
                key={phase.number}
                className="grid grid-cols-4 border-b border-[#1a3012] text-sm"
              >
                <div className="p-3" style={{ color: PHOS }}>
                  {phase.number}
                </div>
                <div className="p-3" style={{ color: "#eaffdf" }}>
                  {phase.name}
                </div>
                <div className="p-3 text-[#b3e8a8]">{phase.duration}</div>
                <div className="p-3 text-[#9dc68f]">{phase.protocol}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-8">
            {phases.map((phase) => (
              <div key={phase.number}>
                <p className="text-xs" style={{ color: PHOS_DIM }}>
                  $ cat phase/{phase.number}_{phase.name.toLowerCase()}.md
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[#b3e8a8] leading-[1.55]">
                  {phase.outcomes.map((o, j) => (
                    <li key={j}>
                      <span style={{ color: PHOS }}>+ </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHAT WE TEACH ───────── */}
      <section className="border-b border-[#1a3012] py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs" style={{ color: PHOS_DIM }}>
            $ ls stack/
          </p>
          <h2
            className="mt-4 font-sans text-3xl md:text-5xl font-semibold tracking-[-0.02em]"
            style={{ color: "#eaffdf" }}
          >
            Every tool your team should be using.
          </h2>

          <div className="mt-12 space-y-10">
            {toolsGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-6 border-t border-[#1a3012] pt-8 md:grid-cols-12"
              >
                <p className="md:col-span-3 text-xs" style={{ color: PHOS_DIM }}>
                  # {group.label}
                </p>
                <div className="md:col-span-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="border border-[#1a3012] p-4 hover:border-[#7dff6b]/40 transition"
                    >
                      <p className="font-sans text-base font-medium" style={{ color: "#eaffdf" }}>
                        {tool.name}
                      </p>
                      <p className="mt-1 font-sans text-xs text-[#9dc68f] leading-relaxed">
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
      <section className="border-b border-[#1a3012] py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
          <div>
            <p className="text-xs" style={{ color: PHOS }}>
              $ grep -e fit --color
            </p>
            <h3 className="mt-3 font-sans text-2xl font-semibold" style={{ color: "#eaffdf" }}>
              {forWho.fit.title}
            </h3>
            <ul className="mt-6 space-y-3 font-sans text-sm text-[#b3e8a8] leading-[1.6]">
              {forWho.fit.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: PHOS }}>[✓]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:border-l md:border-[#1a3012] md:pl-10">
            <p className="text-xs" style={{ color: AMBER }}>
              $ grep -v fit
            </p>
            <h3 className="mt-3 font-sans text-2xl font-semibold text-[#7aa870]">
              {forWho.notFit.title}
            </h3>
            <ul className="mt-6 space-y-3 font-sans text-sm text-[#7aa870] leading-[1.6]">
              {forWho.notFit.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: AMBER }}>[✗]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── ABOUT SAM ───────── */}
      <section className="border-b border-[#1a3012] py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <div
              className="aspect-square border flex items-center justify-center"
              style={{
                borderColor: PHOS_DIM,
                backgroundColor: "#061105",
                color: PHOS_DIM,
              }}
            >
              <span className="text-xs">[founder.jpg]</span>
            </div>
            <p className="mt-4 font-sans text-sm font-medium" style={{ color: "#eaffdf" }}>
              {founder.name}
            </p>
            <p className="text-xs text-[#7aa870]">{founder.title}</p>
            <p className="mt-1 text-[11px]" style={{ color: PHOS }}>
              ex-{founder.logos.join(" · ex-")}
            </p>
          </div>
          <div className="md:col-span-8 md:border-l md:border-[#1a3012] md:pl-10">
            <p className="text-xs" style={{ color: PHOS_DIM }}>
              $ cat founder.md
            </p>
            <div className="mt-6 space-y-5 font-sans text-lg text-[#b3e8a8] leading-[1.6]">
              {founder.letter.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="pt-2" style={{ color: PHOS }}>
                — {founder.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="border-b border-[#1a3012] py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs" style={{ color: PHOS_DIM }}>
            $ man midnight
          </p>
          <h2
            className="mt-4 font-sans text-3xl md:text-5xl font-semibold tracking-[-0.02em]"
            style={{ color: "#eaffdf" }}
          >
            Questions that come up.
          </h2>

          <div className="mt-12 border-y border-[#1a3012] divide-y divide-[#1a3012]">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                  <span className="font-sans text-base md:text-lg" style={{ color: "#eaffdf" }}>
                    <span style={{ color: PHOS }}>[{String(i + 1).padStart(2, "0")}]</span>{" "}
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 transition group-open:rotate-45"
                    style={{ color: PHOS }}
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 pr-10 font-sans text-sm md:text-base text-[#b3e8a8] leading-[1.6]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="py-24 md:py-40">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs" style={{ color: PHOS_DIM }}>
            $ midnight install --go
          </p>
          <h2
            className="mt-6 font-sans text-4xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05]"
            style={{ color: "#eaffdf" }}
          >
            Install
            <br />
            <span style={{ color: PHOS }}>the Protocol.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto font-sans text-base md:text-lg text-[#b3e8a8]">
            30 minutes. No pitch deck. We ask about your org; you ask us anything.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={hero.primary.href}
              className="inline-flex items-center gap-2 bg-[#7dff6b] px-6 py-3.5 text-sm font-medium text-black hover:bg-[#a7ff9c] transition"
            >
              ▸ {hero.primary.label}
            </Link>
          </div>
        </div>
      </section>

      <FooterT />
      </div>
    </main>
  );
}

function NavT() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-[#1a3012] backdrop-blur"
      style={{ backgroundColor: "#020402cc" }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/a2" className="flex items-center gap-2 text-sm">
          <span className="inline-block h-2 w-2" style={{ backgroundColor: PHOS }} />
          <span className="font-medium" style={{ color: "#eaffdf" }}>
            midnight@protocol
          </span>
        </Link>
        <nav
          className="hidden md:flex items-center gap-6 text-xs"
          style={{ color: "#9dc68f" }}
        >
          <Link href="#protocol" className="hover:text-white">protocol</Link>
          <Link href="#" className="hover:text-white">phases</Link>
          <Link href="#" className="hover:text-white">faq</Link>
        </nav>
        <Link
          href={hero.primary.href}
          className="text-xs bg-[#7dff6b] text-black px-3 py-1.5 hover:bg-[#a7ff9c] transition"
        >
          ▸ book call
        </Link>
      </div>
    </header>
  );
}

function FooterT() {
  return (
    <footer className="border-t border-[#1a3012]">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-xs" style={{ color: PHOS_DIM }}>
              $ echo "{footer.newsletter.eyebrow}"
            </p>
            <p
              className="mt-3 max-w-sm font-sans text-base leading-relaxed"
              style={{ color: "#b3e8a8" }}
            >
              {footer.newsletter.blurb}
            </p>
            <form className="mt-5 flex max-w-md gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 border bg-[#020402] px-3 py-2 font-sans text-sm focus:outline-none"
                style={{
                  borderColor: "#1a3012",
                  color: "#eaffdf",
                }}
              />
              <button
                type="button"
                className="bg-[#7dff6b] px-4 py-2 text-sm font-medium text-black hover:bg-[#a7ff9c] transition"
              >
                ▸ {footer.newsletter.cta}
              </button>
            </form>
          </div>
          <div className="md:col-span-6 md:border-l md:border-[#1a3012] md:pl-10 flex flex-col justify-between">
            <div className="flex flex-wrap gap-x-7 gap-y-2 text-xs text-[#9dc68f]">
              <Link href="#" className="hover:text-white">protocol</Link>
              <Link href="#" className="hover:text-white">phases</Link>
              <Link href="#" className="hover:text-white">faq</Link>
              <Link href={hero.primary.href} className="hover:text-white">book a call</Link>
            </div>
            <p className="mt-8 md:mt-0 pt-8 md:pt-0 text-[11px] text-[#4a6c40]">
              © {new Date().getFullYear()} {footer.company} · {footer.domain}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

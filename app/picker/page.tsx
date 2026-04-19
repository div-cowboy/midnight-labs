import Link from "next/link";

export const metadata = {
  title: "Direction picker — Midnight AI",
  robots: { index: false, follow: false },
};

const variations = [
  {
    slug: "a1",
    code: "A1",
    name: "Refined Linear",
    summary:
      "Cleaner riff on /a. Big sans headline, subtle dotted grid, metric strip instead of the fake terminal block. Inspired by Vercel/Linear at their most refined.",
    palette: ["#000000", "#0a0a0a", "#6aa6ff", "#ffffff"],
    typeSpec: "Inter display · Mono metadata",
    diff: "Less busy. Less mono. Drops terminal block.",
  },
  {
    slug: "a2",
    code: "A2",
    name: "Phosphor Terminal",
    summary:
      "Leans hard into the CLI identity. Phosphor green, scanline mood, ASCII art, terminal prompts as section headers, file-listing metaphors throughout.",
    palette: ["#020402", "#061105", "#7dff6b", "#ffb454"],
    typeSpec: "JetBrains Mono everywhere",
    diff: "Most terminal-authentic. Most opinionated.",
  },
  {
    slug: "a3",
    code: "A3",
    name: "Zero Chrome",
    summary:
      "Monochrome premium. No accent color. Massive typographic hero, huge whitespace, zero ornament. Ramp-esque restraint — for \"we don't need to prove anything\" energy.",
    palette: ["#000000", "#0a0a0a", "#a3a3a3", "#ffffff"],
    typeSpec: "Inter display · Mono labels only",
    diff: "Strips all ornament. Pure premium.",
  },
];

const prior = [
  { slug: "a", code: "A", name: "Original Linear (reference)" },
  { slug: "b", code: "B", name: "Nocturnal Editorial (deprioritized)" },
  { slug: "c", code: "C", name: "Industrial Night Shift (deprioritized)" },
];

export default function Picker() {
  return (
    <main className="min-h-screen bg-black text-neutral-100 font-sans">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <header className="mb-16 md:mb-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            trymidnightai.com · round 2 · three Linear variations
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Three variations of the Linear direction.
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-neutral-400 leading-relaxed">
            All three live inside the IDE/Linear genre you picked, but interpret it differently.
            Same copy, same anatomy, same nocturnal builder energy — different executions of
            what that looks like.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {variations.map((v) => (
            <Link
              key={v.slug}
              href={`/${v.slug}`}
              className="group relative flex flex-col justify-between rounded-lg border border-neutral-800 bg-neutral-950 p-6 transition hover:border-neutral-600 hover:bg-neutral-900"
            >
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {v.code}
                  </span>
                  <span className="font-mono text-xs text-neutral-600 group-hover:text-neutral-400">
                    /{v.slug} →
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold tracking-tight">{v.name}</h2>
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                  {v.summary}
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <div className="flex gap-1.5">
                  {v.palette.map((hex) => (
                    <span
                      key={hex}
                      className="h-6 w-6 rounded-sm border border-white/10"
                      style={{ backgroundColor: hex }}
                      aria-label={hex}
                    />
                  ))}
                </div>
                <dl className="space-y-1 font-mono text-[11px] text-neutral-500">
                  <div className="flex gap-2">
                    <dt className="w-10 text-neutral-600">TYPE</dt>
                    <dd>{v.typeSpec}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-10 text-neutral-600">DIFF</dt>
                    <dd>{v.diff}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-24 border-t border-neutral-900 pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600">
            Prior exploration
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-neutral-500">
            {prior.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="hover:text-white transition">
                  /{p.slug} — {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 border-t border-neutral-900 pt-6 font-mono text-xs text-neutral-600">
          <p>
            Stubs:{" "}
            <Link href="/book" className="underline hover:text-neutral-400">/book</Link>
            {" · "}
            <Link href="/thanks" className="underline hover:text-neutral-400">/thanks</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}

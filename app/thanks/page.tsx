import Link from "next/link";

export const metadata = {
  title: "Thanks — talk soon",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-black text-neutral-100 font-sans">
      <div className="mx-auto max-w-2xl px-6 py-24 md:py-40 text-center">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-white"
        >
          ← Midnight AI
        </Link>

        <div className="mt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400">
            Confirmed
          </p>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
            You're on the calendar.
          </h1>
          <p className="mt-6 text-base md:text-lg text-neutral-400 leading-relaxed max-w-lg mx-auto">
            Calendar invite is in your inbox. Before we talk, take a minute to think
            about what you'd want shipped in 90 days — we'll start there.
          </p>
        </div>

        <div className="mt-16 border-t border-neutral-900 pt-8 font-mono text-xs text-neutral-600">
          <Link href="/" className="hover:text-white">
            ← Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}

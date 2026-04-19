import Link from "next/link";

export const metadata = {
  title: "Book a discovery call",
  description: "30 minutes. No pitch deck. We ask about your org; you ask us anything.",
};

// Future: replace this whole page with a modal Calendly embed triggered from each
// direction's "Book a discovery call" CTA. Route exists as a fallback + for
// direct-link ad campaigns that can't trigger the modal.
export default function BookPage() {
  return (
    <main className="min-h-screen bg-black text-neutral-100 font-sans">
      <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-white"
        >
          ← Midnight AI
        </Link>

        <h1 className="mt-10 text-4xl md:text-5xl font-semibold tracking-tight">
          Book a discovery call.
        </h1>
        <p className="mt-6 text-base md:text-lg text-neutral-400 leading-relaxed">
          30 minutes. No pitch deck. We'll ask about your org, your current AI usage,
          and what you want shipped in 90 days. You ask us anything.
        </p>

        <div className="mt-12 rounded-md border border-neutral-900 bg-neutral-950 p-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            Scheduler placeholder
          </p>
          <p className="mt-4 text-neutral-400 max-w-md mx-auto">
            Calendly embed ships here once the integration phase kicks off.
            Until then, reach Sam at{" "}
            <a
              href="mailto:sam@trymidnightai.com"
              className="text-white underline underline-offset-4"
            >
              sam@trymidnightai.com
            </a>
            .
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

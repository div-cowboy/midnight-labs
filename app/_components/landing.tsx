"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  hero,
  benchLogos,
  benchLabel,
  math,
  tiers,
  phasesSection,
  phases,
  library,
  whyMidnight,
  finalCta,
  footer,
} from "../_content/homepage";
import { agents } from "../_content/agents";
import { AgentCard } from "./agent-card";

export function Landing() {
  return (
    <div className="min-h-screen bg-black text-neutral-50">
      <Navbar />
      <Hero />
      <MathSection />
      <Engagement />
      <Process />
      <Library />
      <WhyMidnight />
      <CTA />
    </div>
  );
}

/* ─────────────────────────────────────────── NAVBAR */

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-black/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white">
          <SparklesIcon className="w-5 h-5" />
          <span className="tracking-tight">Midnight AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[14px] text-neutral-400">
          <a href="#engagement" className="hover:text-white transition-colors">
            Process
          </a>
          <a href="#protocol" className="hover:text-white transition-colors">
            Protocol
          </a>
          <Link href="/agents" className="hover:text-white transition-colors">
            Agents
          </Link>
          <a href="#book" className="hover:text-white transition-colors">
            Book a call
          </a>
        </div>
        <Link
          href={hero.primary.href}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-[14px] hover:bg-white/90 transition-colors"
        >
          Book a call <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────── HERO */

function Hero() {
  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/8 text-[13px] text-neutral-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {hero.eyebrow}
          </div>
        </motion.div>

        <motion.h1
          className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.03em] text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Built by operators.
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Installed in your company.
          </span>
        </motion.h1>

        <motion.p
          className="text-[18px] text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href={hero.primary.href}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors"
          >
            {hero.primary.label} <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <a
            href={hero.secondary.href}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/8 text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
          >
            {hero.secondary.label}
          </a>
        </motion.div>

        <motion.div
          className="mt-20 pt-12 border-t border-white/8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-[13px] text-neutral-500 mb-6 uppercase tracking-widest">
            {benchLabel}
          </p>
          <div className="flex items-center justify-center gap-10 flex-wrap text-neutral-500/60">
            {benchLogos.map((name) => (
              <span key={name} className="text-[15px] tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── THE MATH */

function MathSection() {
  return (
    <section className="py-32 px-6 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] text-neutral-500 uppercase tracking-widest mb-4">
            {math.eyebrow}
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] text-white tracking-[-0.02em] mb-6">
            {math.headline}
          </h2>
          <p className="text-[17px] text-neutral-400 leading-relaxed">
            {math.body}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {math.stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              className="p-8 rounded-2xl border border-white/8 bg-neutral-950"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-[clamp(2rem,4vw,3rem)] text-white tracking-[-0.02em] leading-none mb-4 bg-gradient-to-br from-white via-white to-neutral-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-[14px] text-neutral-400 leading-relaxed">
                {stat.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── THE ENGAGEMENT (tiers) */

function Engagement() {
  return (
    <section
      id="engagement"
      className="py-32 px-6 border-t border-white/8 relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-purple-500/8 via-blue-500/4 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] text-neutral-500 uppercase tracking-widest mb-4">
            {tiers.eyebrow}
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] text-white tracking-[-0.02em] mb-6">
            {tiers.headline}
          </h2>
          <p className="text-[17px] text-neutral-400 leading-relaxed">
            {tiers.sub}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.tiers.map((tier, i) => {
            const featured = Boolean(tier.badge);
            return (
              <motion.div
                key={tier.id}
                className={`group relative p-8 rounded-2xl border bg-neutral-950 flex flex-col transition-all duration-300 ${
                  featured
                    ? "border-white/20 hover:border-white/30"
                    : "border-white/8 hover:border-white/15"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-[11px] uppercase tracking-widest text-white">
                    {tier.badge}
                  </div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    {tier.number}
                  </p>
                  <p className="text-[13px] text-neutral-400">
                    {tier.duration}
                  </p>
                </div>

                <h3 className="text-white text-[22px] tracking-tight mb-4">
                  {tier.name}
                </h3>

                <p className="text-[15px] text-neutral-400 leading-relaxed mb-6 flex-1">
                  {tier.description}
                </p>

                <div className="pt-6 border-t border-white/8">
                  <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-2">
                    Best for
                  </p>
                  <p className="text-[14px] text-neutral-300 leading-relaxed">
                    {tier.bestFor}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href={hero.primary.href}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors"
          >
            {tiers.footnote} <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <a
            href="#protocol"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/8 text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
          >
            Read the Protocol
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── PROCESS (phases, per-tier timings) */

const phaseIcons = [ScanIcon, ZapIcon, RocketIcon, ShieldIcon];

function Process() {
  return (
    <section id="protocol" className="py-32 px-6 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] text-neutral-500 uppercase tracking-widest mb-4">
            {phasesSection.eyebrow}
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] text-white tracking-[-0.02em]">
            {phasesSection.headline}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {phases.map((phase, i) => {
            const Icon = phaseIcons[i] ?? ScanIcon;
            return (
              <motion.div
                key={phase.number}
                className="group relative p-8 rounded-2xl border border-white/8 bg-neutral-950 hover:border-white/15 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Icon className="w-5 h-5 text-white/70" />
                  </div>
                  <span className="text-[13px] text-neutral-500 uppercase tracking-wider">
                    Phase {phase.number}
                  </span>
                </div>

                <h3 className="text-white text-[20px] tracking-tight mb-3">
                  {phase.name}
                </h3>

                <p className="text-neutral-400 text-[15px] leading-relaxed mb-6 flex-1">
                  {phase.description}
                </p>

                <div className="pt-5 border-t border-white/8 grid grid-cols-3 gap-3">
                  {phase.timings.map((t) => (
                    <div key={t.label}>
                      <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-1">
                        {t.label}
                      </p>
                      <p className="text-[13px] text-neutral-200">{t.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── LIBRARY (agent teaser) */

function Library() {
  const featured = agents.slice(0, 3);
  return (
    <section
      id="library"
      className="py-32 px-6 border-t border-white/8 relative overflow-hidden"
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-[13px] text-neutral-500 uppercase tracking-widest mb-4">
              {library.eyebrow}
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] text-white tracking-[-0.02em] max-w-2xl">
              {library.headline}
            </h2>
            <p className="mt-4 max-w-xl text-[16px] text-neutral-400 leading-relaxed">
              {library.body}
            </p>
          </div>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-[14px] text-neutral-300 hover:text-white hover:border-white/25 transition-colors self-start md:self-auto"
          >
            Browse all {agents.length} agents{" "}
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((agent, i) => (
            <motion.div
              key={agent.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AgentCard agent={agent} href={`/agents/${agent.slug}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── WHY MIDNIGHT */

function WhyMidnight() {
  return (
    <section className="py-32 px-6 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="max-w-3xl mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] text-neutral-500 uppercase tracking-widest mb-4">
            {whyMidnight.eyebrow}
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] text-white tracking-[-0.02em]">
            {whyMidnight.headline}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {whyMidnight.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-white text-[20px] tracking-tight mb-3">
                {pillar.title}
              </h3>
              <p className="text-[16px] text-neutral-400 leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── CTA + FOOTER */

function CTA() {
  return (
    <section
      id="book"
      className="py-32 px-6 border-t border-white/8 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-t from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="max-w-2xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[13px] text-neutral-500 uppercase tracking-widest mb-4">
          {finalCta.eyebrow}
        </p>
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] text-white tracking-[-0.02em] mb-6">
          {finalCta.headline}
        </h2>
        <p className="text-[17px] text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed">
          {finalCta.body}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={hero.primary.href}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors"
          >
            {hero.primary.label} <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <a
            href="#protocol"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/8 text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
          >
            {hero.secondary.label}
          </a>
        </div>

        <p className="text-[13px] text-neutral-500/70 mt-8">
          {finalCta.footnote}
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto mt-32 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-neutral-400">
          <SparklesIcon className="w-4 h-4" />
          <span className="text-[14px]">{footer.company}</span>
        </div>
        <p className="text-[13px] text-neutral-500/70">
          © {new Date().getFullYear()} {footer.domain}. All rights reserved.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── ICONS (inline SVG, matches lucide) */

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

function ArrowRightIcon({ className }: IconProps) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ScanIcon({ className }: IconProps) {
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
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 12h10" />
    </svg>
  );
}

function ZapIcon({ className }: IconProps) {
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
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function RocketIcon({ className }: IconProps) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

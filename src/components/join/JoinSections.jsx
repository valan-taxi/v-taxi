import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Phone,
} from "lucide-react";
import { BOOKING_OFFICE } from "../../data/landingData";
import { Link } from "../../lib/router";
import { useReveal } from "../../hooks/useReveal";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import Spotlight from "../Spotlight";
import SectionHeader from "../SectionHeader";

const scrollToApply = () =>
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });

/* ------------------------------------------------------------------ */
/*  Animated taxi + road                                                */
/* ------------------------------------------------------------------ */
function TaxiSvg() {
  return (
    <svg
      viewBox="0 0 132 56"
      className="h-full w-full drop-shadow-[0_6px_8px_rgba(0,0,0,0.35)]"
      aria-hidden="true"
    >
      {/* body */}
      <path
        d="M6 38 L8 30 Q10 25 16 24 L36 21 L47 9 Q49 7 53 7 L83 7 Q87 7 90 10 L101 22 L118 25 Q126 27 126 34 L126 40 Q126 42 124 42 L8 42 Q6 42 6 40 Z"
        fill="#fbbf24"
      />
      <path
        d="M6 36 H126 V40 Q126 42 124 42 H8 Q6 42 6 40 Z"
        fill="#d97706"
        opacity="0.55"
      />
      {/* windows */}
      <path d="M43 22 L52 11 H66 V22 Z" fill="#e0f2fe" />
      <path d="M70 22 V11 H83 Q85 11 87 13 L96 22 Z" fill="#e0f2fe" />
      <path d="M43 22 L52 11 H58 L50 22 Z" fill="#fff" opacity="0.45" />
      {/* roof sign */}
      <rect x="58" y="2" width="18" height="6" rx="2" fill="#0f172a" />
      <rect x="61" y="3.6" width="12" height="2.8" rx="1" fill="#fde68a" />
      {/* lights */}
      <rect x="117" y="29" width="8" height="5" rx="2" fill="#fff7d6" />
      <rect x="6" y="29" width="5" height="5" rx="2" fill="#ef4444" />
      {/* door line */}
      <path d="M69 23 V40" stroke="#b45309" strokeWidth="1" opacity="0.6" />
      {/* wheels */}
      {[34, 98].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="43" r="9" fill="#0f172a" />
          <g
            className="road-wheel"
            style={{ transformOrigin: `${cx}px 43px`, transformBox: "view-box" }}
          >
            <circle cx={cx} cy="43" r="4.6" fill="#cbd5e1" />
            <path
              d={`M${cx} 38.6 V47.4 M${cx - 4.4} 43 H${cx + 4.4}`}
              stroke="#64748b"
              strokeWidth="1.4"
            />
          </g>
        </g>
      ))}
    </svg>
  );
}

function RoadScene() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 overflow-hidden sm:h-24" aria-hidden="true">
      {/* car */}
      <div className="road-car absolute bottom-[14px] h-11 w-[104px] sm:bottom-[18px] sm:h-14 sm:w-[132px]">
        <div className="road-car-bob h-full w-full">
          <TaxiSvg />
        </div>
      </div>
      {/* tarmac */}
      <div className="absolute inset-x-0 bottom-0 h-[18px] bg-slate-900/70 sm:h-[22px]">
        <div className="road-dashes absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */
export function JoinHero({
  crumb,
  eyebrow,
  ghost,
  title,
  accent,
  text,
  chips,
  highlights,
  primaryLabel,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#8e0303] via-[#b3160c] to-[#d32014] pb-32 pt-14 text-white sm:pt-20 lg:pb-40 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/images/hero/hero-tamil-nadu-desktop.webp"
          alt=""
          className="h-full w-full scale-105 object-cover object-center opacity-25 mix-blend-luminosity"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8e0303]/90 via-[#b3160c]/85 to-[#d32014]/80" />
        <div className="bg-dots absolute inset-0 opacity-25" />
        <div className="bg-grid-dark absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000,transparent)]" />
        <div className="aurora -left-24 -top-32 h-[460px] w-[620px] bg-white/10" />
        <div
          className="aurora right-[-120px] top-10 h-[420px] w-[520px] bg-amber-400/25"
          style={{ animationDelay: "-8s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <span
        className="ghost-num on-dark right-2 top-10 hidden select-none opacity-60 md:block sm:right-6"
        style={{ WebkitTextStroke: "2px rgba(255,255,255,0.16)" }}
        aria-hidden="true"
      >
        {ghost}
      </span>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-7">
            {/* breadcrumb */}
            <Reveal variant="fade" y={10}>
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-1.5 text-xs font-semibold text-white/75">
                  <li>
                    <Link to="/" className="transition hover:text-white">
                      Home
                    </Link>
                  </li>
                  <ChevronRight className="h-3 w-3 text-white/50" />
                  <li aria-current="page" className="text-white">
                    {crumb}
                  </li>
                </ol>
              </nav>
            </Reveal>

            <Reveal variant="fade" y={12} delay={40}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-80" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
                </span>
                {eyebrow}
              </span>
            </Reveal>

            <Reveal variant="up" y={26} delay={100}>
              <h1 className="display-xl text-white drop-shadow">
                {title}
                <br />
                <span className="font-extrabold text-amber-300">{accent}</span>
              </h1>
            </Reveal>

            <Reveal variant="up" y={20} delay={170}>
              <p className="max-w-xl text-base font-medium leading-relaxed text-white/90 drop-shadow-sm sm:text-lg">
                {text}
              </p>
            </Reveal>

            <Reveal variant="up" y={18} delay={230}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {chips.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm"
                  >
                    <Icon className="h-4 w-4 text-amber-300" />
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal variant="up" y={20} delay={290}>
              <div className="flex flex-col items-stretch gap-3.5 pt-1 sm:flex-row sm:items-center">
                <Magnetic strength={0.35} className="w-full sm:w-auto">
                  <button
                    onClick={scrollToApply}
                    className="btn-shine flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-extrabold text-crimson-700 shadow-xl transition hover:bg-amber-50 active:scale-95 sm:w-auto"
                  >
                    {primaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Magnetic>
                <a
                  href={`tel:${BOOKING_OFFICE.phoneRaw}`}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <Phone className="h-4 w-4 text-amber-300" />
                  {BOOKING_OFFICE.phone}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Highlights card */}
          <Reveal variant="left" delay={200} className="hidden lg:col-span-5 lg:block">
            <div className="float-slow glass-dark relative rounded-[28px] p-7 shadow-2xl">
              <div className="absolute -right-3 -top-3 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-navy-900 shadow-lg">
                Now onboarding
              </div>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">
                What you get
              </p>
              <ul className="space-y-4">
                {highlights.map(({ icon: Icon, title: t, text: d }, i) => (
                  <li
                    key={t}
                    className="join-pop flex items-start gap-3.5"
                    style={{ animationDelay: `${500 + i * 140}ms` }}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-amber-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-white">
                        {t}
                      </span>
                      <span className="block text-xs leading-relaxed text-white/70">
                        {d}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <RoadScene />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Intro                                                               */
/* ------------------------------------------------------------------ */
export function IntroBlock({ eyebrow, title, accent, paragraphs, quote }) {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[900px] -translate-x-1/2 bg-radial-fade" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <SectionHeader
          align="left"
          eyebrow={eyebrow}
          title={title}
          accent={accent}
        />
        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <Reveal key={i} variant="up" y={18} delay={i * 90}>
              <p className="text-[15px] leading-relaxed text-slate-600">{p}</p>
            </Reveal>
          ))}
          {quote && (
            <Reveal variant="up" y={18} delay={paragraphs.length * 90}>
              <p className="rounded-2xl border-l-4 border-crimson-500 bg-crimson-50/60 px-5 py-4 text-sm font-semibold leading-relaxed text-crimson-800">
                {quote}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Benefits                                                            */
/* ------------------------------------------------------------------ */
export function BenefitGrid({ eyebrow, icon, title, accent, description, items }) {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={eyebrow}
          icon={icon}
          title={title}
          accent={accent}
          description={description}
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title: t, text }, idx) => (
            <Reveal
              key={t}
              variant="up"
              y={24}
              delay={(idx % 3) * 90 + Math.floor(idx / 3) * 60}
              className="h-full"
            >
              <Spotlight className="lift group h-full rounded-[24px] border border-slate-200 bg-white p-6 transition-all hover:border-crimson-300 hover:shadow-card-hover">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-crimson-100 bg-crimson-50 text-crimson-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-crimson-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-base font-bold leading-snug text-navy-900 transition-colors group-hover:text-crimson-600">
                  {t}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{text}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Steps                                                               */
/* ------------------------------------------------------------------ */
export function StepsTimeline({ eyebrow, icon, title, accent, description, steps }) {
  const [ref, visible] = useReveal();
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={eyebrow}
          icon={icon}
          title={title}
          accent={accent}
          description={description}
          className="mb-14"
        />

        <div ref={ref} className="relative">
          {/* connector (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-slate-200 lg:block">
            <div
              className="h-full origin-left bg-gradient-to-r from-crimson-500 to-amber-500 transition-transform duration-[1600ms] ease-out"
              style={{ transform: `scaleX(${visible ? 1 : 0})` }}
            />
          </div>

          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map(({ title: t, text, icon: Icon }, i) => (
              <Reveal as="li" key={t} variant="up" y={24} delay={i * 140} className="relative text-center">
                <div className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl v-gradient-crimson text-white shadow-glow-crimson ring-8 ring-white">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-[11px] font-extrabold text-white ring-2 ring-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-1.5 text-base font-bold text-navy-900">{t}</h3>
                <p className="mx-auto max-w-[16rem] text-sm leading-relaxed text-slate-600">
                  {text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Requirements                                                        */
/* ------------------------------------------------------------------ */
export function Requirements({ eyebrow, title, accent, description, items, note }) {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8">
        <div className="lg:col-span-2">
          <SectionHeader
            align="left"
            eyebrow={eyebrow}
            title={title}
            accent={accent}
            description={description}
          />
          {note && (
            <Reveal variant="up" y={16} delay={200}>
              <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
                {note}
              </p>
            </Reveal>
          )}
        </div>

        <ul className="grid grid-cols-1 gap-3.5 lg:col-span-3">
          {items.map(({ icon: Icon, title: t, text }, i) => (
            <Reveal as="li" key={t} variant="right" delay={i * 80}>
              <div className="lift flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 hover:border-crimson-300 hover:shadow-card-soft sm:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-crimson-50 text-crimson-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-navy-900">{t}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-600">
                    {text}
                  </span>
                </span>
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Apply section (form wrapper)                                        */
/* ------------------------------------------------------------------ */
export function ApplySection({ eyebrow, title, accent, description, children }) {
  return (
    <section
      id="apply"
      className="relative scroll-mt-24 overflow-hidden bg-white py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[900px] -translate-x-1/2 bg-radial-fade" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          description={description}
          className="mb-12"
        />
        <Reveal
          variant="up"
          y={30}
          className="ring-gradient overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card-soft"
        >
          {children}
        </Reveal>
        <Reveal variant="fade" delay={150}>
          <p className="mt-6 text-center text-xs text-slate-500">
            Prefer to talk? Call your nearest V TAXI office on{" "}
            <a
              href={`tel:${BOOKING_OFFICE.phoneRaw}`}
              className="font-bold text-crimson-600 hover:underline"
            >
              {BOOKING_OFFICE.phone}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */
export function FaqAccordion({ eyebrow, title, accent, items }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          className="mb-10"
        />
        <div className="space-y-3">
          {items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} variant="up" y={16} delay={i * 60}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-crimson-300 shadow-card-soft"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`join-faq-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span
                        className={`text-sm font-bold transition-colors ${
                          isOpen ? "text-crimson-600" : "text-navy-900"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-crimson-600" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`join-faq-${i}`}
                    role="region"
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Cross link                                                          */
/* ------------------------------------------------------------------ */
export function CrossLink({ title, text, to, label, icon: Icon }) {
  return (
    <section className="bg-white pb-20 pt-4 sm:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="up" y={24}>
          <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#180404] via-[#1f0606] to-[#120303] p-8 text-white shadow-2xl sm:p-10 md:flex-row">
            <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-crimson-600/25 blur-3xl" />
            <div className="relative flex items-center gap-5 text-center md:text-left">
              <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-300 sm:flex">
                <Icon className="h-7 w-7" />
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl">{title}</h3>
                <p className="mt-1.5 max-w-md text-xs text-slate-300 sm:text-sm">
                  {text}
                </p>
              </div>
            </div>
            <Magnetic strength={0.3} className="relative shrink-0">
              <Link
                to={to}
                className="btn-shine flex items-center gap-2 rounded-2xl v-gradient-crimson px-7 py-4 text-sm font-extrabold text-white shadow-glow-crimson transition hover:brightness-105 active:scale-95"
              >
                {label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

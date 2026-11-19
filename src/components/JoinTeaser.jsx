import React from "react";
import { ArrowRight, Handshake, UserRound } from "lucide-react";
import { Link } from "../lib/router";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";

const CARDS = [
  {
    to: "/partner",
    icon: Handshake,
    tag: "Fleet owners",
    title: "Become a Partner",
    text: "Own one cab or a whole fleet? Attach your vehicles to V TAXI and let our booking desk bring the trips to you.",
  },
  {
    to: "/driver",
    icon: UserRound,
    tag: "Chauffeurs",
    title: "Become a Driver",
    text: "No car? No problem. Join V TAXI as a chauffeur with training, guidance and a brand customers trust.",
  },
];

export default function JoinTeaser() {
  return (
    <section
      id="join-us"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Join the V TAXI family"
          icon={Handshake}
          title="Grow with us,"
          accent="whether you drive or own"
          description="We are building Tamil Nadu's most dependable taxi network and we want you on board."
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CARDS.map(({ to, icon: Icon, tag, title, text }, i) => (
            <Reveal key={to} variant="up" y={24} delay={i * 110} className="h-full">
              <Spotlight className="lift group h-full rounded-[24px] border border-slate-200 bg-white p-7 transition-all hover:border-crimson-300 hover:shadow-card-hover">
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-md border border-crimson-100 bg-crimson-50 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-crimson-700">
                    {tag}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-crimson-50 text-crimson-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-crimson-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <h3 className="mb-2 font-display text-xl text-navy-900">{title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">{text}</p>
                <Link
                  to={to}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-crimson-600 hover:text-crimson-700"
                >
                  Apply now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

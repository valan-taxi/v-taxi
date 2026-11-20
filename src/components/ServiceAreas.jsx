import React, { useMemo, useState } from "react";
import {
  MapPin,
  Phone,
  Search,
  ArrowRight,
  Building2,
  Store,
} from "lucide-react";
import {
  BOOKING_OFFICE,
  CORPORATE_OFFICE,
  BRANCH_OFFICES,
  ALL_OFFICES,
  officeAddress,
} from "../data/landingData";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

function CallButton({ className = "" }) {
  return (
    <a
      href={`tel:${BOOKING_OFFICE.phoneRaw}`}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl bg-crimson-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-crimson-700 ${className}`}
    >
      <Phone className="h-3.5 w-3.5" />
      <span className="font-mono">{BOOKING_OFFICE.phone}</span>
    </a>
  );
}

function BranchCard({ office, onOpenEnquiry }) {
  return (
    <div className="lift flex h-full flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-crimson-300 hover:bg-white hover:shadow-card-soft">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display text-base text-navy-900">
              {office.name}
            </h3>
            <span className="text-xs text-slate-500">{office.tamil}</span>
          </div>
          <span className="flex-shrink-0 rounded border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-amber-700">
            Branch
          </span>
        </div>
        <p className="flex items-start gap-1.5 text-xs leading-relaxed text-slate-600">
          <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-crimson-500" />
          <span>{officeAddress(office)}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <CallButton className="flex-1" />
        <button
          onClick={() => onOpenEnquiry({ pickupCity: office.name })}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 transition hover:border-crimson-600 hover:bg-crimson-600 hover:text-white"
        >
          Enquire
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function ServiceAreas({ onOpenEnquiry }) {
  const [query, setQuery] = useState("");

  const branches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BRANCH_OFFICES;
    return BRANCH_OFFICES.filter(
      (o) => o.name.toLowerCase().includes(q) || o.tamil.includes(q)
    );
  }, [query]);

  return (
    <section
      id="service-areas"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Offices"
          icon={MapPin}
          title="Serving every district of"
          accent="Tamil Nadu"
          description={`Corporate Office in Chennai and a Branch Office in each of the other ${BRANCH_OFFICES.length} districts. One common number reaches every office.`}
          className="mb-12"
        />

        {/* Corporate office */}
        <Reveal variant="up" y={24}>
          <div className="ring-gradient relative overflow-hidden rounded-[28px] bg-ink p-6 text-white shadow-2xl sm:p-9">
            <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#1f0606] to-ink" />
            <div className="bg-grid-dark absolute inset-0 opacity-50" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded bg-amber-400/10 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400 ring-1 ring-amber-400/30">
                  <Building2 className="h-3.5 w-3.5" />
                  Corporate Office
                </span>
                <h3 className="font-display text-3xl">
                  Chennai{" "}
                  <span className="font-sans text-lg font-normal text-slate-400">
                    ({CORPORATE_OFFICE.tamil})
                  </span>
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-slate-300">
                  {CORPORATE_OFFICE.description}
                </p>
                <p className="flex items-start gap-2 text-sm text-slate-300">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-crimson-400" />
                  <span>{officeAddress(CORPORATE_OFFICE)}</span>
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`tel:${BOOKING_OFFICE.phoneRaw}`}
                  className="btn-shine flex items-center justify-center gap-2 rounded-xl bg-crimson-600 px-6 py-3.5 font-mono text-base font-bold text-white shadow-glow-crimson transition hover:brightness-110"
                >
                  <Phone className="h-4 w-4" />
                  {BOOKING_OFFICE.phone}
                </a>
                <button
                  onClick={() =>
                    onOpenEnquiry({ pickupCity: CORPORATE_OFFICE.name })
                  }
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Enquire Chennai
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Branch offices */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-crimson-600">
              <Store className="h-3.5 w-3.5" />
              Branch Offices
            </span>
            <h3 className="mt-1 font-display text-2xl text-navy-900">
              {BRANCH_OFFICES.length} district branches
              <span className="ml-2 font-sans text-sm font-normal text-slate-500">
                · all on {BOOKING_OFFICE.phone}
              </span>
            </h3>
          </div>
          <label className="relative block w-full sm:w-72">
            <span className="sr-only">Search district</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your district"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-crimson-500 focus:ring-2 focus:ring-crimson-100"
            />
          </label>
        </div>

        {branches.length ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((office) => (
              <BranchCard
                key={office.id}
                office={office}
                onOpenEnquiry={onOpenEnquiry}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            No district matches “{query}”. Call {BOOKING_OFFICE.phone} and we
            will connect you to the right office.
          </p>
        )}

        <p className="pt-6 text-xs text-slate-500">
          {ALL_OFFICES.length} offices across Tamil Nadu. Travelling somewhere
          else? We also arrange customized multi-district itineraries.
        </p>
      </div>
    </section>
  );
}

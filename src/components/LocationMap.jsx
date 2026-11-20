import React from "react";
import { MapPin, Phone, Clock, Navigation, ExternalLink } from "lucide-react";
import {
  BOOKING_OFFICE,
  CORPORATE_OFFICE,
  officeAddress,
} from "../data/landingData";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function LocationMap() {
  return (
    <section className="py-20 sm:py-28 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Corporate Office"
          icon={MapPin}
          tone="slate"
          title="Chennai"
          accent="Corporate Office"
          description="Our Corporate Office coordinates every Branch Office across Tamil Nadu. Call the one common number to reach any office."
          className="mb-12"
        />

        {/* 2-Column Location & Map Card */}
        <Reveal variant="up" y={30} className="ring-gradient bg-slate-50 rounded-[28px] border border-slate-200 overflow-hidden shadow-card-soft grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 p-7 sm:p-9 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-crimson-600 bg-crimson-50 px-2.5 py-1 rounded">
                  CORPORATE OFFICE • CHENNAI
                </span>
                <h3 className="text-2xl font-black text-navy-900 mt-2">
                  V TAXI Corporate Office
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  The People's Choice • Chennai, Tamil Nadu
                </p>
              </div>

              {/* Contact Information Points */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-crimson-600 flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-900 block">
                      Corporate Office Address:
                    </span>
                    <span className="text-slate-600 leading-relaxed block">
                      {officeAddress(CORPORATE_OFFICE)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-crimson-600 flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-900 block">
                      Common Helpline (all offices):
                    </span>
                    <div className="flex flex-col gap-1 pt-0.5 font-mono">
                      <a
                        href={`tel:${BOOKING_OFFICE.phoneRaw}`}
                        className="text-crimson-700 font-bold hover:underline"
                      >
                        {BOOKING_OFFICE.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-emerald-600 flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-900 block">
                      Business Operating Hours:
                    </span>
                    <span className="text-slate-600">
                      {BOOKING_OFFICE.operatingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direction Action */}
            <div className="pt-6 border-t border-slate-200">
              <a
                href="https://www.google.com/maps/search/?api=1&query=V+TAXI+Chennai+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Get Directions to Chennai Office</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Viewport */}
          <div className="lg:col-span-7 bg-slate-200 min-h-[350px] relative flex items-center justify-center overflow-hidden">
            <iframe
              title="V TAXI Chennai Corporate Office Location Map"
              src="https://www.google.com/maps?q=Chennai,+Tamil+Nadu&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen=""
              loading="lazy"
              className="w-full h-full"
            ></iframe>

            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-[11px] font-bold text-navy-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Corporate Office</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

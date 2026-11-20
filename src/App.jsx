import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Marquee from "./components/Marquee";
import Hero from "./components/Hero";
import StatsBand from "./components/StatsBand";
import BrandIntro from "./components/BrandIntro";
import TaxiServices from "./components/TaxiServices";
import VehicleCategories from "./components/VehicleCategories";
import LocalOutstation from "./components/LocalOutstation";
import ServiceAreas from "./components/ServiceAreas";
import WhyChoose from "./components/WhyChoose";
import PreLaunchOffer from "./components/PreLaunchOffer";
import ComingSoonApp from "./components/ComingSoonApp";
import EnquiryForm from "./components/EnquiryForm";
import SocialConnection from "./components/SocialConnection";
import LocationMap from "./components/LocationMap";
import ContactQuickActions from "./components/ContactQuickActions";
import Footer from "./components/Footer";
import EnquiryModal from "./components/EnquiryModal";
import StickyMobileBar from "./components/StickyMobileBar";
import JoinTeaser from "./components/JoinTeaser";
import PartnerPage from "./pages/PartnerPage";
import DriverPage from "./pages/DriverPage";
import { useLocation } from "./lib/router";

const MARQUEE_ITEMS = [
  "Local City Rides",
  "Outstation Journeys",
  "Airport Transfers",
  "Railway Pickups",
  "Temple & Pilgrimage Tours",
  "Family Travel",
  "Corporate Travel",
  "Corporate Office Chennai",
  "Branch Offices in All Districts",
  "All Tamil Nadu",
];

const ROUTES = {
  "/partner": PartnerPage,
  "/become-a-partner": PartnerPage,
  "/driver": DriverPage,
  "/become-a-driver": DriverPage,
};

const SECTION_ROUTES = {
  "/services": "services",
  "/vehicles": "vehicles",
  "/service-areas": "service-areas",
  "/why-v-taxi": "why-v-taxi",
  "/launch-offers": "launch-offers",
  "/coming-soon": "coming-soon",
  "/contact": "contact",
};

function HomePage({ onOpenEnquiry, modalData }) {
  const handleOpenEnquiry = onOpenEnquiry;
  return (
    <>
      <Hero onOpenEnquiry={handleOpenEnquiry} />
      <StatsBand />

      {/* Keyword ribbon */}
      <div className="mt-16 sm:mt-20 bg-white border-y border-slate-200 py-4">
        <Marquee items={MARQUEE_ITEMS} className="max-w-7xl mx-auto px-4" />
      </div>

      <BrandIntro />
      <TaxiServices onOpenEnquiry={handleOpenEnquiry} />
      <VehicleCategories onOpenEnquiry={handleOpenEnquiry} />
      <LocalOutstation onOpenEnquiry={handleOpenEnquiry} />
      <ServiceAreas onOpenEnquiry={handleOpenEnquiry} />
      <WhyChoose />
      <PreLaunchOffer onOpenEnquiry={handleOpenEnquiry} />
      <JoinTeaser />
      <ComingSoonApp onOpenEnquiry={handleOpenEnquiry} />
      <EnquiryForm initialData={modalData} />
      <SocialConnection />
      <LocationMap />
      <ContactQuickActions onOpenEnquiry={handleOpenEnquiry} />
    </>
  );
}

export default function App() {
  const { path, hash } = useLocation();
  const Page = ROUTES[path];

  // Scroll handling on navigation: hash or section route target, otherwise top.
  const firstRender = useRef(true);
  useEffect(() => {
    const isFirst = firstRender.current;
    firstRender.current = false;
    const targetId = hash || SECTION_ROUTES[path];

    if (!targetId) {
      // Leave the browser's restored scroll position alone on a fresh load.
      if (!isFirst) window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    let tries = 0;
    let timer = 0;
    const attempt = () => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else if (tries++ < 12) timer = setTimeout(attempt, 60);
    };
    timer = setTimeout(attempt, 60);
    return () => clearTimeout(timer);
  }, [path, hash]);

  const [modalOpen, setModalOpen] = useState(
    () =>
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("enquiry") === "1"
  );
  const [modalData, setModalData] = useState(null);

  const handleOpenEnquiry = (data = null) => {
    setModalData(data);
    setModalOpen(true);
  };

  const handleCloseEnquiry = () => setModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-crimson-600 selection:text-white font-sans antialiased">
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollProgress />

      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      <main className="flex-grow">
        {Page ? (
          <Page key={path} />
        ) : (
          <HomePage onOpenEnquiry={handleOpenEnquiry} modalData={modalData} />
        )}
      </main>

      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <StickyMobileBar onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={handleCloseEnquiry}
        initialData={modalData}
      />
    </div>
  );
}

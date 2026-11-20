import React from "react";
import {
  BadgeCheck,
  CalendarCheck,
  Car,
  ClipboardCheck,
  Clock3,
  FileText,
  Handshake,
  Headset,
  MapPin,
  Phone,
  Route,
  Shirt,
  ShieldCheck,
  Smile,
  Sparkles,
  TrendingUp,
  UserRound,
  Wallet,
  Wrench,
} from "lucide-react";
import { ALL_OFFICES } from "../data/landingData";
import { usePageMeta } from "../hooks/usePageMeta";
import ApplicationForm, { v } from "../components/join/ApplicationForm";
import {
  ApplySection,
  BenefitGrid,
  CrossLink,
  FaqAccordion,
  IntroBlock,
  JoinHero,
  Requirements,
  StepsTimeline,
} from "../components/join/JoinSections";

const CITIES = [...ALL_OFFICES.map((a) => a.name), "Other Tamil Nadu City"];

const FIELDS = [
  {
    name: "name",
    label: "Your name",
    required: true,
    placeholder: "Anand Sundaram",
    autoComplete: "name",
    validate: v.name,
  },
  {
    name: "mobile",
    label: "Mobile number",
    required: true,
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    maxLength: 16,
    placeholder: "98400 00000",
    validate: v.mobile,
  },
  {
    name: "email",
    label: "Email address",
    required: true,
    type: "email",
    autoComplete: "email",
    placeholder: "anand@example.com",
    validate: v.email(true),
  },
  {
    name: "city",
    label: "Your district",
    required: true,
    type: "select",
    placeholder: "Select district",
    options: CITIES,
    validate: v.select("your district"),
  },
  {
    name: "cabs",
    label: "Number of cabs to attach",
    hint: "(optional)",
    inputMode: "numeric",
    digitsOnly: true,
    maxLength: 3,
    placeholder: "e.g. 5",
    validate: v.cabs,
  },
  {
    name: "vehicleType",
    label: "Vehicle category",
    hint: "(optional)",
    type: "select",
    placeholder: "Select category",
    options: ["Sedan", "7-Seater SUV", "Premium SUV", "Tempo Traveller", "Mixed fleet"],
    validate: () => "",
  },
];

const HERO_CHIPS = [
  { icon: Car, label: "Sedan · SUV · Traveller" },
  { icon: Clock3, label: "24/7 booking desk" },
  { icon: MapPin, label: "All Tamil Nadu districts" },
];

const HERO_HIGHLIGHTS = [
  {
    icon: CalendarCheck,
    title: "Trips coordinated for you",
    text: "Our booking office handles enquiries and allocation.",
  },
  {
    icon: BadgeCheck,
    title: "A brand customers trust",
    text: "Operate under the V TAXI name across Tamil Nadu.",
  },
  {
    icon: Handshake,
    title: "Clear partner terms",
    text: "Everything explained in writing before you start.",
  },
];

const BENEFITS = [
  {
    icon: Route,
    title: "Local & outstation demand",
    text: "City rides, airport and railway transfers, family trips, pilgrimage tours and corporate travel, all under one roof.",
  },
  {
    icon: Headset,
    title: "Bookings handled by our desk",
    text: "Enquiries, quotations and trip allocation are managed by the V TAXI booking office so you can focus on the road.",
  },
  {
    icon: Car,
    title: "Every vehicle category",
    text: "Sedans, 7-seater SUVs, premium SUVs and Tempo Travellers are all welcome in the fleet.",
  },
  {
    icon: Wallet,
    title: "Transparent terms",
    text: "Partner terms and the payout schedule are shared in writing during onboarding, with no surprises later.",
  },
  {
    icon: ShieldCheck,
    title: "Support when you need it",
    text: "A 24/7 helpline for you and your chauffeurs, on the road and off it.",
  },
  {
    icon: TrendingUp,
    title: "Room to grow",
    text: "Start with the cabs you have and add more vehicles and cities as V TAXI expands across Tamil Nadu.",
  },
];

const STEPS = [
  {
    icon: FileText,
    title: "Submit your application",
    text: "Fill in the short form below with your contact details and fleet size.",
  },
  {
    icon: Phone,
    title: "Quick verification call",
    text: "Our onboarding team calls you to understand your fleet and answer questions.",
  },
  {
    icon: ClipboardCheck,
    title: "Vehicle & document check",
    text: "We review your vehicles and papers to make sure they meet V TAXI standards.",
  },
  {
    icon: Handshake,
    title: "Onboard & start trips",
    text: "Sign the partner terms, join the fleet and begin receiving trips.",
  },
];

const REQUIREMENTS = [
  {
    icon: Sparkles,
    title: "Clean, well-maintained cabs",
    text: "Vehicles must be kept in excellent running and visual condition at all times.",
  },
  {
    icon: FileText,
    title: "Valid vehicle documents",
    text: "Registration, insurance and the permits applicable to commercial taxi operation.",
  },
  {
    icon: UserRound,
    title: "Professional driving experience",
    text: "Licensed, courteous chauffeurs who put passenger comfort and safety first.",
  },
  {
    icon: Shirt,
    title: "Dress and grooming standards",
    text: "Neat uniform and grooming for every chauffeur on a V TAXI duty.",
  },
  {
    icon: Smile,
    title: "Customer hospitality",
    text: "Polite behaviour and respectful service, following V TAXI's customer-care rules.",
  },
  {
    icon: Wrench,
    title: "Regular servicing",
    text: "Timely maintenance so every journey, short or long, is smooth and breakdown-free.",
  },
];

const FAQS = [
  {
    q: "Who can become a V TAXI partner?",
    a: "Anyone who owns one or more commercial taxis, from a single cab owner to a larger fleet operator, and can meet our vehicle, document and service standards.",
  },
  {
    q: "Is there a fee to submit the application?",
    a: "No. Submitting this form is free. Any commercial terms are explained by our onboarding team before you sign or commit to anything.",
  },
  {
    q: "Do I have to drive the cab myself?",
    a: "No. You can attach vehicles driven by your own chauffeurs. Every chauffeur must be licensed and follow V TAXI's conduct and grooming rules.",
  },
  {
    q: "Which cities are you onboarding in?",
    a: "We operate across all Tamil Nadu districts, with our Corporate Office in Chennai and a Branch Office in every other district. Choose your district and your nearest office will get in touch.",
  },
  {
    q: "What happens after I apply?",
    a: "Our team contacts you on the mobile number you provide, usually within a few working days, to verify details and explain the next steps.",
  },
];

export default function PartnerPage() {
  usePageMeta(
    "Become a Partner | Attach Your Fleet with V TAXI Tamil Nadu",
    "Own taxis? Join V TAXI as a fleet partner and serve local, outstation, airport and pilgrimage travellers across all districts of Tamil Nadu.",
    { path: "/partner" }
  );

  return (
    <>
      <JoinHero
        crumb="Become a Partner"
        eyebrow="Fleet partner programme · Tamil Nadu"
        ghost="PARTNER"
        title="Have a fleet?"
        accent="Join with us."
        text="Attach your cabs to V TAXI and help us deliver a world-class taxi experience to every customer across Tamil Nadu."
        chips={HERO_CHIPS}
        highlights={HERO_HIGHLIGHTS}
        primaryLabel="Apply as a partner"
      />

      <ApplySection
        eyebrow="Partner application"
        title="Submit your"
        accent="application"
        description="Tell us a little about you and your fleet. Our onboarding team will get in touch."
      >
        <ApplicationForm
          kind="partner"
          fields={FIELDS}
          submitLabel="Submit partner application"
          consentLabel="I agree to V TAXI's partner rules and privacy policy, and allow V TAXI or its representatives to contact me by phone, SMS, WhatsApp or email about this application."
          successTitle="Application received"
          successText="Thank you for your interest in partnering with V TAXI. Our onboarding team will review your details and contact you shortly."
          whatsappIntro="Hi V TAXI, I just applied as a fleet PARTNER on your website."
        />
      </ApplySection>

      <IntroBlock
        eyebrow="Partner with V TAXI"
        title="Join hands to deliver"
        accent="a world-class ride"
        paragraphs={[
          "V TAXI invites vehicle owners and fleet operators to join us in giving every customer a comfortable, dependable taxi experience, from everyday city rides to long outstation journeys.",
          "Partners are expected to meet our standards for customer satisfaction, offer a professional driving experience and keep every cab in excellent condition. Following V TAXI's rules on customer hospitality, behaviour, dress and grooming is mandatory.",
        ]}
      />

      <BenefitGrid
        eyebrow="Why partner with us"
        icon={BadgeCheck}
        title="Everything a fleet owner"
        accent="needs to grow"
        description="We bring the customers, the booking desk and the brand. You bring the vehicles and the standards."
        items={BENEFITS}
      />

      <StepsTimeline
        eyebrow="How it works"
        icon={Route}
        title="From application to"
        accent="first trip in four steps"
        description="A simple, transparent onboarding process."
        steps={STEPS}
      />

      <Requirements
        eyebrow="Our standards"
        title="What we expect"
        accent="from every partner"
        description="V TAXI is built on trust. These standards keep every journey consistent, whichever cab arrives."
        items={REQUIREMENTS}
        note="The exact document checklist is confirmed by our onboarding team during verification."
      />

      <FaqAccordion
        eyebrow="Partner FAQ"
        title="Questions,"
        accent="answered"
        items={FAQS}
      />

      <CrossLink
        icon={UserRound}
        title="Don't own a vehicle?"
        text="You can still be part of V TAXI. Join us as a chauffeur and drive with a brand people trust."
        to="/driver"
        label="Become a driver"
      />
    </>
  );
}

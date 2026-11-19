import React from "react";
import {
  BadgeCheck,
  CalendarCheck,
  Car,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  Handshake,
  Headset,
  IdCard,
  MapPin,
  Phone,
  Route,
  Shirt,
  Smartphone,
  Smile,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import { PRIMARY_SERVICE_AREAS } from "../data/landingData";
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

const CITIES = [...PRIMARY_SERVICE_AREAS.map((a) => a.name), "Other Tamil Nadu City"];

const FIELDS = [
  {
    name: "name",
    label: "Your name",
    required: true,
    placeholder: "Murugan Selvam",
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
    hint: "(optional)",
    type: "email",
    autoComplete: "email",
    placeholder: "murugan@example.com",
    validate: v.email(false),
  },
  {
    name: "city",
    label: "Your city",
    required: true,
    type: "select",
    placeholder: "Select city",
    options: CITIES,
    validate: v.select("your city"),
  },
  {
    name: "licence",
    label: "Driving licence number",
    required: true,
    upper: true,
    maxLength: 24,
    autoComplete: "off",
    placeholder: "TN01 20190001234",
    validate: v.licence,
  },
  {
    name: "experience",
    label: "Driving experience",
    hint: "(optional)",
    type: "select",
    placeholder: "Select experience",
    options: ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"],
    validate: () => "",
  },
];

const HERO_CHIPS = [
  { icon: GraduationCap, label: "Training & guidance" },
  { icon: Clock3, label: "24/7 support desk" },
  { icon: MapPin, label: "Chennai · Trichy · Madurai" },
];

const HERO_HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: "Training & guidance",
    text: "Learn the V TAXI way of serving customers.",
  },
  {
    icon: CalendarCheck,
    title: "Duties allocated for you",
    text: "Local, airport and outstation trips from our desk.",
  },
  {
    icon: BadgeCheck,
    title: "Respected as a chauffeur",
    text: "A professional role with a brand behind you.",
  },
];

const BENEFITS = [
  {
    icon: Car,
    title: "No vehicle needed",
    text: "You don't have to own a car to drive with us. Bring your skill and professionalism.",
  },
  {
    icon: GraduationCap,
    title: "Training & guidance",
    text: "We guide you on customer handling, route etiquette and what V TAXI customers expect.",
  },
  {
    icon: Route,
    title: "Varied duties",
    text: "City rides, airport and railway transfers, family trips and outstation journeys.",
  },
  {
    icon: Headset,
    title: "Always-on support",
    text: "Our 24/7 booking desk is a phone call away if you need help on a duty.",
  },
  {
    icon: Users,
    title: "A team that respects you",
    text: "Drivers are chauffeurs at V TAXI: trusted, presentable and valued members of the team.",
  },
  {
    icon: TrendingUp,
    title: "Grow your career",
    text: "Build a reputation with regular duties and move to premium and outstation work as we grow.",
  },
];

const STEPS = [
  {
    icon: FileText,
    title: "Submit your application",
    text: "Share your contact details and driving licence number in the form below.",
  },
  {
    icon: Phone,
    title: "Get a call from us",
    text: "Our team contacts you to understand your experience and answer your questions.",
  },
  {
    icon: ClipboardCheck,
    title: "Verification",
    text: "We verify your licence and documents to keep every V TAXI ride safe.",
  },
  {
    icon: GraduationCap,
    title: "Train & start driving",
    text: "Complete the orientation and begin receiving duties.",
  },
];

const REQUIREMENTS = [
  {
    icon: IdCard,
    title: "Valid driving licence",
    text: "A current licence with the authorisation required to drive a taxi.",
  },
  {
    icon: MapPin,
    title: "Good knowledge of local routes",
    text: "Comfortable navigating your city and the popular outstation routes.",
  },
  {
    icon: Smile,
    title: "Courteous behaviour",
    text: "Polite, patient and respectful with every passenger, family and senior citizen.",
  },
  {
    icon: Shirt,
    title: "Neat dress and grooming",
    text: "A clean, presentable appearance on every V TAXI duty.",
  },
  {
    icon: Clock3,
    title: "Punctuality",
    text: "On time for every pickup, every time. Reliability is our brand promise.",
  },
  {
    icon: Smartphone,
    title: "A working smartphone",
    text: "To stay in touch with the booking desk and receive trip details.",
  },
];

const FAQS = [
  {
    q: "Do I need my own car to drive with V TAXI?",
    a: "No. We welcome drivers who don't own a vehicle. If you do own a taxi, you can also apply as a fleet partner.",
  },
  {
    q: "What do I need to apply?",
    a: "Your name, mobile number, city and driving licence number. Email is optional. Our team will confirm the remaining documents during verification.",
  },
  {
    q: "Will I get training?",
    a: "Yes. Chauffeurs receive training and guidance so they can represent V TAXI and follow our customer-care rules confidently.",
  },
  {
    q: "Which cities can I drive in?",
    a: "We are currently preparing Chennai, Trichy, Thanjavur, Madurai and Rameswaram. If you are elsewhere in Tamil Nadu, choose 'Other Tamil Nadu City' and we will keep you informed.",
  },
  {
    q: "Is there a fee to apply?",
    a: "No. Submitting this application is free. Our team explains all terms before you start.",
  },
];

export default function DriverPage() {
  usePageMeta(
    "Become a Driver | Drive with V TAXI Tamil Nadu",
    "Don't own a car? Join V TAXI as a professional chauffeur. Receive training, guidance, and drive for a trusted brand across Chennai, Trichy, Thanjavur, Madurai and Rameswaram.",
    { path: "/driver" }
  );

  return (
    <>
      <JoinHero
        crumb="Become a Driver"
        eyebrow="Chauffeur opportunities · Tamil Nadu"
        ghost="DRIVER"
        title="Don't own a car?"
        accent="The door is open."
        text="Work as a V TAXI chauffeur. We provide training and guidance, and you bring the professionalism that makes every ride special."
        chips={HERO_CHIPS}
        highlights={HERO_HIGHLIGHTS}
        primaryLabel="Apply as a driver"
      />

      <IntroBlock
        eyebrow="Drive with V TAXI"
        title="A great opportunity to"
        accent="work as a chauffeur"
        paragraphs={[
          "V TAXI offers a respected opportunity to work as a chauffeur, with the backing of a growing brand and a booking desk that keeps your duties coming.",
          "You will receive training and guidance, and you will represent V TAXI to every customer. That means following our rules on conduct, punctuality, dress and grooming on every trip.",
        ]}
        quote="Don't have a car to drive? The door is open for you."
      />

      <BenefitGrid
        eyebrow="Why drive with us"
        icon={BadgeCheck}
        title="A professional career,"
        accent="without owning a car"
        description="Everything you need to start driving for a brand that customers trust."
        items={BENEFITS}
      />

      <StepsTimeline
        eyebrow="How it works"
        icon={Route}
        title="From application to"
        accent="first duty in four steps"
        description="A straightforward process with a real person on the other end of the phone."
        steps={STEPS}
      />

      <Requirements
        eyebrow="Chauffeur standards"
        title="What we look for"
        accent="in every chauffeur"
        description="As a V TAXI chauffeur you represent the brand. These are the basics we ask of every driver."
        items={REQUIREMENTS}
        note="The complete document list is confirmed by our team during verification."
      />

      <ApplySection
        eyebrow="Driver application"
        title="Submit your"
        accent="application"
        description="Share a few details and our team will call you about the next steps."
      >
        <ApplicationForm
          kind="driver"
          fields={FIELDS}
          submitLabel="Submit driver application"
          consentLabel="I agree to V TAXI's rules and privacy policy, and allow V TAXI or its representatives to contact me by phone, SMS, WhatsApp or email about this application."
          successTitle="Application received"
          successText="Thank you for applying to drive with V TAXI. Our team will review your details and call you shortly."
          whatsappIntro="Hi V TAXI, I just applied as a DRIVER on your website."
        />
      </ApplySection>

      <FaqAccordion
        eyebrow="Driver FAQ"
        title="Questions,"
        accent="answered"
        items={FAQS}
      />

      <CrossLink
        icon={Handshake}
        title="Own a vehicle or a fleet?"
        text="Attach your cabs to V TAXI and let our booking desk bring the trips to you."
        to="/partner"
        label="Become a partner"
      />
    </>
  );
}

// V TAXI Official Pre-Launch Data Specification

export const BOOKING_OFFICE = {
  // One common number for the Corporate Office and every Branch Office.
  phone: "07358 233550",
  phoneRaw: "07358233550",
  whatsapp: "917358233550",
  operatingHours: "24/7 Booking Helpline & Customer Assistance",
  centralOffice: "Corporate Office, Chennai, Tamil Nadu, India",
  tagline: "The People's Choice",
  brandMessage:
    "From everyday travel to memorable journeys, V TAXI connects people, cities and experiences across every district of Tamil Nadu.",
};

// Chennai is the Corporate Office. Add the street address in `street` once
// confirmed; it is shown on the site only when it is filled in.
export const CORPORATE_OFFICE = {
  id: "chennai",
  name: "Chennai",
  tamil: "சென்னை",
  type: "Corporate Office",
  street: "",
  description:
    "Corporate Office and statewide coordination. City rides, airport transfers (MAA), railway station pickups, and outstation departures.",
};

// Every other district is a Branch Office. [name, Tamil name]
const BRANCH_DISTRICTS = [
  ["Ariyalur", "அரியலூர்"],
  ["Chengalpattu", "செங்கல்பட்டு"],
  ["Coimbatore", "கோயம்புத்தூர்"],
  ["Cuddalore", "கடலூர்"],
  ["Dharmapuri", "தர்மபுரி"],
  ["Dindigul", "திண்டுக்கல்"],
  ["Erode", "ஈரோடு"],
  ["Kallakurichi", "கள்ளக்குறிச்சி"],
  ["Kancheepuram", "காஞ்சிபுரம்"],
  ["Kanniyakumari", "கன்னியாகுமரி"],
  ["Karur", "கரூர்"],
  ["Krishnagiri", "கிருஷ்ணகிரி"],
  ["Madurai", "மதுரை"],
  ["Mayiladuthurai", "மயிலாடுதுறை"],
  ["Nagapattinam", "நாகப்பட்டினம்"],
  ["Namakkal", "நாமக்கல்"],
  ["Nilgiris", "நீலகிரி"],
  ["Perambalur", "பெரம்பலூர்"],
  ["Pudukkottai", "புதுக்கோட்டை"],
  ["Ramanathapuram", "இராமநாதபுரம்"],
  ["Ranipet", "ராணிப்பேட்டை"],
  ["Salem", "சேலம்"],
  ["Sivagangai", "சிவகங்கை"],
  ["Tenkasi", "தென்காசி"],
  ["Thanjavur", "தஞ்சாவூர்"],
  ["Theni", "தேனி"],
  ["Thoothukudi", "தூத்துக்குடி"],
  ["Tiruchirappalli (Trichy)", "திருச்சிராப்பள்ளி"],
  ["Tirunelveli", "திருநெல்வேலி"],
  ["Tirupathur", "திருப்பத்தூர்"],
  ["Tiruppur", "திருப்பூர்"],
  ["Tiruvallur", "திருவள்ளூர்"],
  ["Tiruvannamalai", "திருவண்ணாமலை"],
  ["Tiruvarur", "திருவாரூர்"],
  ["Vellore", "வேலூர்"],
  ["Villupuram", "விழுப்புரம்"],
  ["Virudhunagar", "விருதுநகர்"],
];

export const BRANCH_OFFICES = BRANCH_DISTRICTS.map(([name, tamil]) => ({
  id: name.toLowerCase().replace(/\s*\(.*\)/, "").replace(/[^a-z]+/g, "-"),
  name,
  tamil,
  type: "Branch Office",
  street: "",
}));

// Corporate Office first, then every branch (38 districts in total).
export const ALL_OFFICES = [CORPORATE_OFFICE, ...BRANCH_OFFICES];
export const DISTRICT_NAMES = ALL_OFFICES.map((o) => o.name);

export const TAXI_SERVICES = [
  {
    id: "local",
    title: "Local Taxi Services",
    description:
      "Convenient transportation for city travel, shopping, appointments, business visits and everyday requirements.",
    icon: "Navigation",
  },
  {
    id: "outstation",
    title: "Outstation Taxi Services",
    description:
      "Comfortable rides for intercity journeys, family trips, business travel and long-distance travel.",
    icon: "Compass",
  },
  {
    id: "airport",
    title: "Airport Transfers",
    description:
      "Planned pickup and drop services for comfortable airport travel.",
    icon: "Plane",
  },
  {
    id: "railway",
    title: "Railway Station Transfers",
    description:
      "Reliable transportation to and from railway stations across our service cities.",
    icon: "Train",
  },
  {
    id: "family",
    title: "Family Travel",
    description:
      "Spacious vehicle options suitable for families, senior citizens and luggage.",
    icon: "Users",
  },
  {
    id: "business",
    title: "Business Travel",
    description:
      "Professional travel solutions for meetings, corporate requirements and official journeys.",
    icon: "Briefcase",
  },
  {
    id: "pilgrimage",
    title: "Pilgrimage and Temple Travel",
    description:
      "Comfortable transportation to temples and spiritual destinations across Tamil Nadu.",
    icon: "Heart",
  },
  {
    id: "tours",
    title: "Tour Packages",
    description:
      "Customised taxi arrangements for tourism, weekend trips and destination-based journeys.",
    icon: "Map",
  },
];

export const VEHICLE_CATEGORIES = [
  {
    id: "sedan",
    title: "5-Seater Sedan",
    badge: "CITY & AIRPORT TRAVEL",
    suitability:
      "Suitable for city travel, airport transfers, couples, small families and business journeys.",
    capacity: "4 Passengers + 1 Driver",
    luggage: "2-3 Medium Trolley Bags",
    examples: "Maruti Dzire • Toyota Etios • Hyundai Aura",
    highlights: [
      "Air Conditioned Cabin",
      "Comfortable Legroom",
      "Dedicated Boot Space",
      "Economical & Smooth",
    ],
  },
  {
    id: "suv",
    title: "7-Seater SUV",
    badge: "FAMILY & GROUP FAVORITE",
    suitability:
      "Ideal for family trips, group travel, long-distance journeys and additional luggage.",
    capacity: "6 Passengers + 1 Driver",
    luggage: "3-4 Bags + Split Third-Row",
    examples: "Maruti Ertiga • Kia Carens • Toyota Rumion",
    highlights: [
      "Spacious 3-Row Seating",
      "Rear AC Vents",
      "Easy Elder Ingress",
      "High Ground Clearance",
    ],
    isPopular: true,
  },
  {
    id: "premium-suv",
    title: "Premium SUV",
    badge: "EXECUTIVE LUXURY",
    suitability:
      "A premium travel option for customers seeking greater comfort, space and style.",
    capacity: "6-7 Passengers + 1 Chauffeur",
    luggage: "4-5 Large Suitcases",
    examples: "Toyota Innova Crysta • Innova Hycross",
    highlights: [
      "Plush Captain Seats",
      "Whisper-Quiet Cabin",
      "Orthopedic Comfort",
      "Superior Highway Stability",
    ],
  },
  {
    id: "tempo-traveller",
    title: "Tempo Traveller",
    badge: "COMING SOON",
    suitability:
      "A future travel option for larger families, group tours, corporate outings and pilgrimage journeys.",
    capacity: "12 - 17 Seater",
    luggage: "Dedicated Group Luggage Space",
    examples: "Force Urbania • Tempo Traveller Executive",
    highlights: [
      "Pushback Luxury Seating",
      "Individual AC Controls",
      "High Roof Walkway",
      "Group Tour Comfort",
    ],
    isComingSoon: true,
  },
];

export const LOCAL_SERVICES_LIST = [
  "Home pickup and drop",
  "Office travel and commute",
  "Shopping and medical appointments",
  "Airport and railway station transfers",
  "Hourly and daily customized travel requirements",
];

export const OUTSTATION_SERVICES_LIST = [
  "One-way intercity drops",
  "Round trips with waiting options",
  "Family tours and weekend getaways",
  "Corporate business journeys",
  "Temple and pilgrimage trips across Tamil Nadu",
  "Multi-city travel plans",
];

export const WHY_CHOOSE_POINTS = [
  {
    title: "Comfortable Vehicle Options",
    desc: "Clean, well-maintained vehicles prepared to keep your ride relaxed and fatigue-free.",
  },
  {
    title: "5-Seater and 7-Seater Availability",
    desc: "Choose the right capacity for couples, small families or full multi-generation groups.",
  },
  {
    title: "Local & Outstation Solutions",
    desc: "Single provider for city trips, airport drops, and long-distance Tamil Nadu travel.",
  },
  {
    title: "Easy Telephone Enquiry",
    desc: "Direct telephone access to our booking office without confusing steps or mandatory apps.",
  },
  {
    title: "Family-Friendly Travel",
    desc: "Paced driving, courteous support, and thoughtful comfort for seniors and children.",
  },
  {
    title: "Professional Customer Assistance",
    desc: "Personal coordination to understand your itinerary and match the appropriate vehicle.",
  },
  {
    title: "Transparent Trip Communication",
    desc: "Clear upfront communication about journey details without misleading terms.",
  },
  {
    title: "Service Across All Tamil Nadu Districts",
    desc: "Chennai Corporate Office with Branch Offices in every district of Tamil Nadu.",
  },
  {
    title: "Premium Travel Options",
    desc: "Dedicated Premium SUV choices for executive, corporate, and luxury travel needs.",
  },
  {
    title: "Upcoming Digital Booking Experience",
    desc: "Developing the modern V TAXI mobile app and website for effortless future bookings.",
  },
];

export const LAUNCH_OFFERS = [
  {
    title: "First-Ride Introductory Benefit",
    tag: "PRE-LAUNCH EXCLUSIVE",
    desc: "Special introductory incentive for customers who register their travel interest during our pre-launch window.",
  },
  {
    title: "Special Outstation Trip Advantage",
    tag: "FAMILY & TOURS",
    desc: "Priority rate confirmation for round trips and temple pilgrimages across Tamil Nadu.",
  },
  {
    title: "Priority Booking Access",
    tag: "EARLY ACCESS",
    desc: "Be the first to secure verified vehicle allocation during festival and holiday travel dates.",
  },
  {
    title: "Referral Launch Privileges",
    tag: "COMMUNITY BENEFIT",
    desc: "Special family referral benefits when your friends and relatives travel with V TAXI.",
  },
];

export const FAQS = [
  {
    q: "Which districts does V TAXI serve?",
    a: "V TAXI serves all districts of Tamil Nadu. Our Corporate Office is in Chennai, with a Branch Office in every other district, supporting both local and outstation requirements.",
  },
  {
    q: "What vehicle categories are available?",
    a: "Customers can enquire about 5-Seater Sedan, 7-Seater SUV and Premium SUV options, with Tempo Travellers coming in a future phase.",
  },
  {
    q: "Are local and outstation rides available?",
    a: "Yes. V TAXI plans to support both local city rides and outstation travel requirements based on vehicle and location availability.",
  },
  {
    q: "How can I make an enquiry?",
    a: "Customers can call our Corporate Office or any Branch Office on the one common number, 07358 233550, or submit the enquiry form on this page.",
  },
  {
    q: "Is the V TAXI app available?",
    a: "The V TAXI app and complete online booking platform are currently in active development and coming soon to Google Play and the App Store.",
  },
  {
    q: "Will Tempo Travellers be available?",
    a: "Tempo Traveller services are planned for larger family groups, corporate teams, and pilgrimage tours in a subsequent launch phase.",
  },
  {
    q: "Can I register for launch offers?",
    a: "Yes. Customers can register their interest through our pre-launch form to receive approved launch updates, early announcements, and introductory offers.",
  },
];

// Full postal-style address line for an office. The street part is included
// only once it has been filled in on the office record.
export const officeAddress = (office) =>
  [
    office.street,
    `V TAXI ${office.type}`,
    office.name,
    "Tamil Nadu, India",
  ]
    .filter(Boolean)
    .join(", ");

// Districts highlighted in compact lists (hero, footer).
export const FEATURED_DISTRICTS = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli (Trichy)",
  "Salem",
  "Tirunelveli",
];

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

const indexHtmlPath = path.join(distDir, "index.html");
if (!fs.existsSync(indexHtmlPath)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, "utf-8");

const PAGES = [
  {
    folder: "services",
    title: "Taxi Services in Tamil Nadu | Local & Outstation Cabs | V TAXI",
    description:
      "Explore V TAXI services across Tamil Nadu: Local city cabs, one-way & round-trip outstation rides, airport transfers (MAA, TRZ, IXM), and temple tour packages.",
    url: "https://vtaxi.co.in/services",
  },
  {
    folder: "vehicles",
    title: "Vehicle Categories | 5-Seater Sedan, 7-Seater SUV & Innova Crysta | V TAXI",
    description:
      "Choose the perfect vehicle for your journey: 5-Seater Sedans (Dzire, Etios), 7-Seater SUVs (Ertiga, Carens), Premium SUVs (Innova Crysta) and Tempo Travellers.",
    url: "https://vtaxi.co.in/vehicles",
  },
  {
    folder: "service-areas",
    title: "Offices Across Tamil Nadu | Chennai Corporate Office & All District Branches | V TAXI",
    description:
      "V TAXI operates across all Tamil Nadu districts: Corporate Office in Chennai and a Branch Office in every district, all reachable on 07358 233550, 24/7.",
    url: "https://vtaxi.co.in/service-areas",
  },
  {
    folder: "why-v-taxi",
    title: "Why Choose V TAXI | The People's Choice Across Tamil Nadu",
    description:
      "Discover why travellers choose V TAXI: clean comfortable vehicles, transparent pricing, 24/7 booking helpline, courteous chauffeurs and family-friendly travel.",
    url: "https://vtaxi.co.in/why-v-taxi",
  },
  {
    folder: "partner",
    title: "Become a Partner | Attach Your Fleet with V TAXI Tamil Nadu",
    description:
      "Own taxis? Join V TAXI as a fleet partner and serve local, outstation, airport and pilgrimage travellers across all districts of Tamil Nadu.",
    url: "https://vtaxi.co.in/partner",
  },
  {
    folder: "driver",
    title: "Become a Driver | Drive with V TAXI Tamil Nadu",
    description:
      "Don't own a car? Join V TAXI as a professional chauffeur. Receive training, guidance, and drive for a trusted brand across all districts of Tamil Nadu.",
    url: "https://vtaxi.co.in/driver",
  },
  {
    folder: "launch-offers",
    title: "Pre-Launch Offers & Early Access Benefits | V TAXI Tamil Nadu",
    description:
      "Register your interest during the V TAXI pre-launch window to receive introductory ride benefits, priority booking access, and special outstation travel rates.",
    url: "https://vtaxi.co.in/launch-offers",
  },
  {
    folder: "coming-soon",
    title: "V TAXI Mobile App Coming Soon | Google Play & App Store",
    description:
      "The modern V TAXI mobile application and digital booking experience is currently under development for seamless ride booking across Tamil Nadu.",
    url: "https://vtaxi.co.in/coming-soon",
  },
  {
    folder: "contact",
    title: "Contact Us & 24/7 Booking Helpline | V TAXI Tamil Nadu",
    description:
      "Get in touch with the V TAXI Corporate Office in Chennai or any district Branch Office. Call 07358 233550 for fast quotes, reservations, and customer assistance.",
    url: "https://vtaxi.co.in/contact",
  },
];

for (const page of PAGES) {
  let modified = baseHtml;

  // Title
  modified = modified.replace(
    /<title>.*?<\/title>/s,
    `<title>${page.title}</title>`
  );
  modified = modified.replace(
    /<meta\s+name="title"\s+content=".*?"\s*\/>/s,
    `<meta name="title" content="${page.title}" />`
  );

  // Description
  modified = modified.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/>/s,
    `<meta name="description" content="${page.description}" />`
  );

  // Canonical
  modified = modified.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/>/s,
    `<link rel="canonical" href="${page.url}" />`
  );

  // Alternate Hreflang
  modified = modified.replace(
    /<link\s+rel="alternate"\s+hreflang="en-IN"\s+href=".*?"\s*\/>/s,
    `<link rel="alternate" hreflang="en-IN" href="${page.url}" />`
  );
  modified = modified.replace(
    /<link\s+rel="alternate"\s+hreflang="ta-IN"\s+href=".*?"\s*\/>/s,
    `<link rel="alternate" hreflang="ta-IN" href="${page.url}" />`
  );
  modified = modified.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href=".*?"\s*\/>/s,
    `<link rel="alternate" hreflang="x-default" href="${page.url}" />`
  );

  // OG tags
  modified = modified.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/>/s,
    `<meta property="og:url" content="${page.url}" />`
  );
  modified = modified.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/>/s,
    `<meta property="og:title" content="${page.title}" />`
  );
  modified = modified.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/>/s,
    `<meta property="og:description" content="${page.description}" />`
  );

  // Twitter tags
  modified = modified.replace(
    /<meta\s+name="twitter:url"\s+content=".*?"\s*\/>/s,
    `<meta name="twitter:url" content="${page.url}" />`
  );
  modified = modified.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/s,
    `<meta name="twitter:title" content="${page.title}" />`
  );
  modified = modified.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/s,
    `<meta name="twitter:description" content="${page.description}" />`
  );

  const outDir = path.join(distDir, page.folder);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, "index.html");
  fs.writeFileSync(outPath, modified, "utf-8");
  console.log(`[SEO SSG] Successfully generated pre-rendered: ${outPath}`);
}

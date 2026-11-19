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
    folder: "partner",
    title: "Become a Partner | Attach Your Fleet with V TAXI Tamil Nadu",
    description:
      "Own taxis? Join V TAXI as a fleet partner and serve local, outstation, airport and pilgrimage travellers across Chennai, Trichy, Thanjavur, Madurai and Rameswaram.",
    url: "https://vtaxi.co.in/partner",
  },
  {
    folder: "driver",
    title: "Become a Driver | Drive with V TAXI Tamil Nadu",
    description:
      "Don't own a car? Join V TAXI as a professional chauffeur. Receive training, guidance, and drive for a trusted brand across Chennai, Trichy, Thanjavur, Madurai and Rameswaram.",
    url: "https://vtaxi.co.in/driver",
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

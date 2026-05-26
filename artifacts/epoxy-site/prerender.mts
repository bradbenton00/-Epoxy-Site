import { createElement as h } from "react";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToString } from "react-dom/server";
import { Router, Route, Switch } from "wouter";

function staticLocationHook(path: string) {
  return () => [path, () => {}] as [string, (to: string) => void];
}
import App from "./src/App";
import CityPage from "./src/pages/CityPage";
import { cities, type City } from "./src/data/cities";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "dist/public");
const templatePath = join(distDir, "index.html");

if (!existsSync(templatePath)) {
  console.error(`Prerender failed: ${templatePath} not found. Run vite build first.`);
  process.exit(1);
}

const template = readFileSync(templatePath, "utf-8");

type Route = {
  path: string;
  outDir: string;
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  extraHead?: string;
};

const SITE = "https://elizabethtownepoxyflooring.com";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cityJsonLd(city: City) {
  const obj = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE}/epoxy-flooring/${city.slug}#business`,
    name: `Elizabethtown Epoxy Flooring — ${city.name}, ${city.state}`,
    description: `Professional epoxy and polyaspartic floor coatings in ${city.name}, ${city.state}. Diamond-ground prep, commercial-grade materials, written warranty. Free estimates.`,
    url: `${SITE}/epoxy-flooring/${city.slug}`,
    telephone: "+1-502-286-9032",
    image: `${SITE}/gallery/garage-flake-gray.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      postalCode: city.zip,
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: city.name, address: { "@type": "PostalAddress", addressRegion: city.state, postalCode: city.zip } },
  };
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

const routes: Route[] = [
  {
    path: "/",
    outDir: distDir,
    title: "Kentucky Epoxy Flooring | Louisville, Elizabethtown & Central KY Floor Coatings",
    description:
      "Kentucky's premier epoxy floor coating specialists. Garage, basement, and commercial epoxy and polyaspartic floors throughout Louisville, Elizabethtown, and all of Central & Western Kentucky. Free estimates — (502) 286-9032.",
    canonical: SITE,
  },
  ...cities.map((city): Route => ({
    path: `/epoxy-flooring/${city.slug}`,
    outDir: join(distDir, "epoxy-flooring", city.slug),
    title: `Epoxy Flooring ${city.name}, ${city.state} | Garage Floors & Coatings`,
    description: `Professional epoxy and polyaspartic floor coatings in ${city.name}, ${city.state}. Diamond-ground prep, commercial-grade materials, written warranty. Free estimates — call (502) 286-9032.`,
    canonical: `${SITE}/epoxy-flooring/${city.slug}`,
    extraHead: cityJsonLd(city),
  })),
];

function renderRoute(path: string): string {
  return renderToString(
    h(
      Router,
      { hook: staticLocationHook(path), ssrPath: path },
      h(
        Switch,
        null,
        h(Route, { path: "/", component: App }),
        h(Route, { path: "/epoxy-flooring/:slug", component: CityPage }),
        h(Route, null, h(App)),
      ),
    ),
  );
}

function injectMeta(html: string, route: Route): string {
  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${route.canonical}" />`,
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${route.canonical}" />`,
  );
  if (route.extraHead) {
    out = out.replace(/<\/head>/, `${route.extraHead}\n  </head>`);
  }
  return out;
}

let count = 0;
for (const route of routes) {
  try {
    const body = renderRoute(route.path);
    let html = injectMeta(template, route);
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    mkdirSync(route.outDir, { recursive: true });
    const outPath = join(route.outDir, "index.html");
    writeFileSync(outPath, html, "utf-8");
    count++;
    console.log(`✓ Prerendered ${route.path} → ${outPath.replace(distDir, "dist/public")}`);
  } catch (err) {
    console.error(`✗ Failed to prerender ${route.path}:`, err);
    process.exit(1);
  }
}

console.log(`\nPrerendered ${count} routes.`);

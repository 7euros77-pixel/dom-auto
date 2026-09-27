import fs from "node:fs";
import { business, fullAddress, telHref, directionsUrl, hoursSummary, fmtTime } from "../data/business.mjs";
import { site } from "../data/site.mjs";
import { icon } from "./icons.mjs";

export const nbsp = (s) => s.replace(/ /g, "\u00a0");
export const phoneLabel = nbsp(business.phone);

// Logo : reprise typographique de l'enseigne « DOM.AUTO » (à remplacer par le fichier vectoriel officiel si disponible)
export const logo = (variant = "") => `<span class="logo ${variant}" aria-hidden="true">DOM.AUTO</span>`;

// Détecte automatiquement les vraies photos déposées dans assets/images/
// (ex. hero-dom-auto.jpg + variantes .webp / .avif). Sinon, placeholder SVG.
export const photo = ({ root, name, alt, placeholderLabel, eager = false, cls = "", width = 1200, height = 900 }) => {
  const base = `assets/images/${name}`;
  const has = (ext) => fs.existsSync(`${base}.${ext}`);
  const loading = eager ? `loading="eager" fetchpriority="high"` : `loading="lazy"`;
  if (has("jpg") || has("webp") || has("avif")) {
    const fallback = has("jpg") ? `${base}.jpg` : has("webp") ? `${base}.webp` : `${base}.avif`;
    return `<picture class="${cls}">
      ${has("avif") ? `<source srcset="${root}${base}.avif" type="image/avif">` : ""}
      ${has("webp") ? `<source srcset="${root}${base}.webp" type="image/webp">` : ""}
      <img src="${root}${fallback}" alt="${alt}" width="${width}" height="${height}" ${loading} decoding="async">
    </picture>`;
  }
  return `<div class="placeholder ${cls}" role="img" aria-label="Emplacement photo : ${placeholderLabel}">
    <span class="placeholder-label">${icon("car")}<span>Photo à venir : ${placeholderLabel}<small>${base}.jpg</small></span></span>
  </div>`;
};

const navItems = [
  { href: "", label: "Accueil", key: "home" },
  { href: "prestations/", label: "Prestations", key: "prestations" },
  { href: "garage/", label: "Le garage", key: "garage" },
  { href: "#avis", label: "Avis", key: "avis", home: true },
  { href: "contact/", label: "Contact", key: "contact" },
];

const navLinks = (root, current) =>
  navItems
    .map((n) => {
      const href = n.home ? `${root}${n.href}` : `${root}${n.href}`;
      const cur = n.key === current ? ` aria-current="page"` : "";
      return `<li><a href="${href || "./"}"${cur}>${n.label}</a></li>`;
    })
    .join("");

export const jsonLd = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${site.url}/#garage`,
    name: business.name,
    legalName: business.legalName,
    url: `${site.url}/`,
    logo: `${site.url}/assets/images/logo.svg`,
    image: `${site.url}/assets/images/og-dom-auto.png`,
    telephone: business.phoneInternational,
    foundingDate: "2010-04-16",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.coordinates.lat, longitude: business.coordinates.lng },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "12:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:00", closes: "18:30" },
    ],
    areaServed: ["Léognan", ...business.serviceArea].map((c) => ({ "@type": "City", name: c })),
    hasMap: directionsUrl,
  };
  if (business.email) data.email = business.email;
  const sameAs = [business.googleBusinessUrl, business.social.facebook, business.social.instagram].filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;
  // aggregateRating volontairement absent tant que les données Google ne sont pas vérifiées.
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
};

const hoursJson = JSON.stringify(business.openingHours.map((d) => ({ d: d.day, s: d.slots })));

export const layout = ({ root, path, title, description, current, body, noindex = false }) => `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add("js")</script>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${site.url}/${path}">
${noindex ? '<meta name="robots" content="noindex">' : ""}
<meta name="theme-color" content="#4a545d">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="${business.name}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${site.url}/${path}">
<meta property="og:image" content="${site.url}/assets/images/og-dom-auto.png">
<link rel="icon" href="${root}assets/images/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${root}assets/css/style.css">
${jsonLd()}
<script defer src="${root}assets/js/main.js"></script>
</head>
<body data-hours='${hoursJson}'>
<a class="skip-link" href="#contenu">Aller au contenu</a>
<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="header-logo" href="${root || "./"}" aria-label="${business.name}, accueil">${logo()}</a>
    <nav class="main-nav" id="menu" aria-label="Navigation principale" data-menu>
      <ul>${navLinks(root, current)}</ul>
      <div class="nav-mobile-extra">
        <a class="btn btn-primary btn-block" href="${root}rendez-vous/">${icon("calendar")}Prendre rendez-vous</a>
        <a class="btn btn-outline btn-block" href="${telHref}">${icon("phone")}${phoneLabel}</a>
        <p class="nav-mobile-hours">${hoursSummary.days} ${hoursSummary.text}<br>${fullAddress}</p>
      </div>
    </nav>
    <div class="header-actions">
      <a class="header-phone" href="${telHref}">${icon("phone")}<span>${phoneLabel}</span></a>
      <a class="btn btn-primary header-cta" href="${root}rendez-vous/">Prendre rendez-vous</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle>
        <span class="menu-open">${icon("menu")}</span><span class="menu-close">${icon("close")}</span>
        <span class="sr-only">Menu</span>
      </button>
    </div>
  </div>
</header>
<main id="contenu">
${body}
</main>
${footer(root)}
<div class="mobile-bar" aria-label="Contact rapide">
  <a class="mobile-bar-call" href="${telHref}">${icon("phone")}Appeler</a>
  <a class="mobile-bar-rdv" href="${root}rendez-vous/">${icon("calendar")}Rendez-vous</a>
</div>
</body>
</html>`;

const footer = (root) => `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a href="${root || "./"}" aria-label="${business.name}, accueil">${logo("logo-light")}</a>
      <p>Garage automobile à ${business.address.city} depuis ${business.foundingYear}. Entretien, mécanique et pneumatiques.</p>
    </div>
    <div>
      <h2 class="footer-title">Nous trouver</h2>
      <address>${business.name}<br>${business.address.street}<br>${business.address.postalCode} ${business.address.city}</address>
      <p><a class="footer-strong" href="${telHref}">${phoneLabel}</a></p>
      <p><a href="${directionsUrl}" target="_blank" rel="noopener">Itinéraire<span class="sr-only"> (ouvre Google Maps)</span></a></p>
    </div>
    <div>
      <h2 class="footer-title">Horaires</h2>
      <p>Du lundi au vendredi<br>${fmtTime("08:30")} – ${fmtTime("12:00")} / ${fmtTime("14:00")} – ${fmtTime("18:30")}</p>
      <p>Samedi et dimanche : fermé</p>
    </div>
    <div>
      <h2 class="footer-title">Liens</h2>
      <ul class="footer-links">
        <li><a href="${root}prestations/">Prestations</a></li>
        <li><a href="${root}garage/">Le garage</a></li>
        <li><a href="${root}contact/">Contact</a></li>
        <li><a href="${root}rendez-vous/">Prendre rendez-vous</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© ${business.name} ${new Date().getFullYear()}</p>
    <ul>
      <li><a href="${root}mentions-legales/">Mentions légales</a></li>
      <li><a href="${root}confidentialite/">Confidentialité</a></li>
    </ul>
  </div>
</footer>`;

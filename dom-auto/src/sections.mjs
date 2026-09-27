import { business, fullAddress, telHref, directionsUrl, hoursSummary, fmtTime } from "../data/business.mjs";
import { services } from "../data/services.mjs";
import { visibleReviews } from "../data/reviews.mjs";
import { site } from "../data/site.mjs";
import { icon } from "./icons.mjs";
import { phoneLabel } from "./layout.mjs";

export const arrowBtn = (label, href, cls = "btn-primary", extra = "") =>
  `<a class="btn ${cls}" href="${href}"${extra}>${label}<span class="btn-arrow">${icon("arrow")}</span></a>`;

export const phoneBtn = (cls = "btn-outline") =>
  `<a class="btn ${cls}" href="${telHref}">${icon("phone")}${phoneLabel}</a>`;

export const openStatus = () =>
  `<p class="open-status" data-open-status hidden><span class="open-dot"></span><span data-open-text></span></p>`;

export const hoursTable = () => `
<table class="hours-table" data-hours-table>
  <caption class="sr-only">Horaires d'ouverture de ${business.name}</caption>
  <tbody>
    ${business.openingHours
      .map(
        (d) => `<tr data-day="${d.day}"><th scope="row">${d.label}</th><td>${
          d.slots.length ? d.slots.map(([a, b]) => `${fmtTime(a)} – ${fmtTime(b)}`).join(" / ") : "Fermé"
        }</td></tr>`
      )
      .join("")}
  </tbody>
</table>`;

export const mapBlock = () => {
  const q = encodeURIComponent(`${business.name}, ${fullAddress}`);
  const src = `https://www.google.com/maps?q=${q}&z=16&hl=fr&output=embed`;
  return `
<div class="map" data-map data-src="${src}">
  <div class="map-facade">
    <div class="map-pin-badge">${icon("pin")}</div>
    <p><strong>${business.name}</strong><br>${fullAddress}</p>
    <div class="map-actions">
      <a class="btn btn-primary" href="${directionsUrl}" target="_blank" rel="noopener">${icon("nav")}Itinéraire<span class="sr-only"> (ouvre Google Maps)</span></a>
      <button class="btn btn-outline" type="button" data-map-load>${icon("map")}Afficher la carte</button>
    </div>
    <p class="map-note">La carte Google Maps se charge au clic, pour ne déposer aucun cookie sans votre accord.</p>
  </div>
</div>`;
};

export const serviceCards = (root, list = services) => `
<ul class="service-grid" role="list">
  ${list
    .map(
      (s) => `<li>
    <a class="service-card" href="${root}prestations/#${s.slug}">
      <span class="service-icon">${icon(s.icon)}</span>
      <span class="service-body">
        <span class="service-title">${s.title}</span>
        <span class="service-text">${s.short}</span>
      </span>
      <span class="round-arrow">${icon("arrow")}</span>
    </a>
  </li>`
    )
    .join("")}
</ul>`;

export const reviewsSection = (root) => {
  const list = visibleReviews(site.showDevReviews);
  const googleBtn = business.googleBusinessUrl
    ? arrowBtn("Voir les avis", business.googleBusinessUrl, "btn-outline", ' target="_blank" rel="noopener"')
    : "";
  const head = `
  <div class="section-head section-head-row">
    <div>
      <h2>Ce que disent nos clients</h2>
      <p class="lead">Quelques mots d'automobilistes passés au garage, extraits de leurs avis publiés en ligne.</p>
    </div>
    ${list.length > 1 ? `<div class="carousel-nav"><button class="icon-btn" type="button" data-carousel-prev aria-label="Avis précédent">${icon("chevronL")}</button><button class="icon-btn" type="button" data-carousel-next aria-label="Avis suivant">${icon("chevronR")}</button></div>` : ""}
  </div>`;
  if (!list.length) {
    return `
<section class="section section-surface" id="avis" aria-labelledby="avis-titre">
  <div class="container">
    <div class="review-empty">
      <span class="review-empty-icon">${icon("message")}</span>
      <div>
        <h2 id="avis-titre">Les automobilistes parlent de DOM AUTO</h2>
        <p>Vous êtes déjà passé au garage ? Votre avis aide d'autres automobilistes de ${business.address.city} et des environs à nous trouver.</p>
      </div>
      ${googleBtn ? `<div class="review-empty-actions">${googleBtn}</div>` : ""}
    </div>
  </div>
</section>`;
  }
  return `
<section class="section section-surface" id="avis" aria-labelledby="avis-titre">
  <div class="container">
    ${head.replace("<h2>", '<h2 id="avis-titre">')}
    <ul class="review-track" role="list" data-carousel tabindex="0" aria-label="Avis clients">
      ${list
        .map(
          (r) => `<li class="review-card${r.devSample ? " is-sample" : ""}">
        ${r.devSample ? '<span class="sample-badge">Exemple de développement, non publié</span>' : ""}
        ${r.rating === 5 ? `<p class="review-stars" aria-label="Note : 5 sur 5">${'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>'.repeat(5)}</p>` : `<span class="review-quote-mark" aria-hidden="true">“</span>`}
        <blockquote><p>${r.text}</p></blockquote>
        <p class="review-meta"><span class="review-avatar">${icon("user")}</span><span><strong>${r.author}</strong><br>${r.source}${r.date ? `, ${r.date}` : ""}</span></p>
      </li>`
        )
        .join("")}
    </ul>
    ${googleBtn ? `<div class="section-foot">${googleBtn}</div>` : ""}
  </div>
</section>`;
};

export const stepsSection = () => {
  const steps = [
    ["Contactez-nous", "Appelez le garage ou envoyez votre demande en ligne."],
    ["Expliquez-nous votre besoin", "Entretien à faire, panne, pneus ou réparation : décrivez ce que vous constatez."],
    ["Nous examinons votre véhicule", "L'équipe identifie l'intervention à prévoir et vous l'explique."],
    ["Vous validez l'intervention", "Les travaux sont réalisés une fois que vous avez donné votre accord."],
  ];
  return `
<section class="section" aria-labelledby="parcours-titre">
  <div class="container">
    <div class="section-head">
      <h2 id="parcours-titre">Comment ça se passe ?</h2>
    </div>
    <ol class="steps">
      ${steps.map(([t, d], i) => `<li class="step"><span class="step-num">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}
    </ol>
  </div>
</section>`;
};

export const zoneSection = () => `
<section class="section section-surface" aria-labelledby="zone-titre">
  <div class="container zone">
    <div>
      <h2 id="zone-titre">Un garage à Léognan, pour tout le sud de Bordeaux</h2>
      <p class="lead">Installé sur l'avenue de Bordeaux, DOM AUTO accueille les automobilistes de ${business.address.city} et des communes voisines qui cherchent un garage de proximité pour l'entretien et la réparation de leur voiture.</p>
      <p class="muted">Un seul garage, une seule adresse : ${fullAddress}.</p>
    </div>
    <ul class="chips" role="list" aria-label="Communes proches">
      <li class="chip chip-strong">${icon("pin")}${business.address.city}</li>
      ${business.serviceArea.map((c) => `<li class="chip">${c}</li>`).join("")}
    </ul>
  </div>
</section>`;

export const visitSection = (root, headingLevel = "h2", title = "Venir au garage") => `
<section class="section" id="acces" aria-labelledby="acces-titre">
  <div class="container visit">
    <div class="visit-info">
      <${headingLevel} id="acces-titre">${title}</${headingLevel}>
      ${openStatus()}
      <dl class="info-list">
        <div><dt>${icon("pin")}<span>Adresse</span></dt><dd>${business.name}<br>${business.address.street}<br>${business.address.postalCode} ${business.address.city}</dd></div>
        <div><dt>${icon("phone")}<span>Téléphone</span></dt><dd><a class="strong-link" href="${telHref}">${phoneLabel}</a></dd></div>
        <div><dt>${icon("clock")}<span>Horaires</span></dt><dd>${hoursTable()}</dd></div>
      </dl>
      <div class="btn-row">
        <a class="btn btn-primary" href="${telHref}">${icon("phone")}Appeler</a>
        <a class="btn btn-outline" href="${directionsUrl}" target="_blank" rel="noopener">${icon("nav")}Itinéraire<span class="sr-only"> (ouvre Google Maps)</span></a>
        <a class="btn btn-ghost" href="${root}rendez-vous/">${icon("calendar")}Prendre rendez-vous</a>
      </div>
    </div>
    ${mapBlock()}
  </div>
</section>`;

export const finalCta = (root) => `
<section class="cta-final" aria-labelledby="cta-final-titre">
  <div class="container cta-final-inner">
    <div>
      <h2 id="cta-final-titre">Besoin de faire vérifier votre voiture ?</h2>
      <p>${business.name} vous accueille au ${business.address.street.replace("Avenue", "avenue")} à ${business.address.city}, du lundi au vendredi.</p>
    </div>
    <div class="cta-final-actions">
      ${arrowBtn("Prendre rendez-vous", `${root}rendez-vous/`, "btn-primary")}
      ${phoneBtn("btn-outline-light")}
      <a class="text-link-light" href="${directionsUrl}" target="_blank" rel="noopener">${icon("nav")}Itinéraire<span class="sr-only"> (ouvre Google Maps)</span></a>
    </div>
  </div>
</section>`;

export const pageHero = ({ title, text, crumbs = [], root }) => `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="Fil d'Ariane"><ol><li><a href="${root}">Accueil</a></li>${crumbs.map((c) => `<li aria-current="page">${c}</li>`).join("")}</ol></nav>
    <h1>${title}</h1>
    ${text ? `<p class="lead">${text}</p>` : ""}
  </div>
</section>`;

export { hoursSummary, phoneLabel };

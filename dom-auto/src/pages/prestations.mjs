import { business } from "../../data/business.mjs";
import { services } from "../../data/services.mjs";
import { icon } from "../icons.mjs";
import { pageHero, arrowBtn, phoneBtn, finalCta, zoneSection } from "../sections.mjs";

export const prestations = {
  path: "prestations/",
  current: "prestations",
  title: "Entretien et réparation automobile à Léognan | DOM AUTO",
  description: `Révision, mécanique, pneus, freinage, diagnostic : les prestations atelier du garage DOM AUTO à Léognan. Demande de rendez-vous en ligne ou au ${business.phone}.`,
  body: (root) => `
${pageHero({ root, crumbs: ["Prestations"], title: "Entretien et réparation automobile à Léognan", text: "L'entretien courant, les réparations mécaniques et les pneumatiques de votre voiture, dans un seul garage au 17 avenue de Bordeaux." })}

<section class="section section-tight">
  <div class="container">
    <nav class="jump-nav" aria-label="Accès direct aux prestations">
      <ul role="list">${services.map((s) => `<li><a href="#${s.slug}">${s.title}</a></li>`).join("")}</ul>
    </nav>
  </div>
</section>

<section class="section section-flush-top">
  <div class="container service-details">
    ${services
      .map(
        (s) => `<article class="service-detail" id="${s.slug}" aria-labelledby="${s.slug}-titre">
      <span class="service-icon service-icon-lg">${icon(s.icon)}</span>
      <div class="service-detail-body">
        <h2 id="${s.slug}-titre">${s.title}</h2>
        <p>${s.long}</p>
        ${arrowBtn(s.slug === "pneumatiques" ? "Demander un devis pneus" : "Demander un rendez-vous", `${root}rendez-vous/?prestation=${s.slug}`, "btn-ghost btn-sm")}
      </div>
    </article>`
      )
      .join("")}
  </div>
</section>

<section class="band" aria-labelledby="band-titre">
  <div class="container band-inner">
    <div>
      <h2 id="band-titre">Vous ne savez pas quelle prestation choisir ?</h2>
      <p>Décrivez simplement ce que vous constatez : un bruit, un voyant, une vibration. On vous oriente.</p>
    </div>
    <div class="band-actions">
      ${arrowBtn("Décrire mon besoin", `${root}rendez-vous/`, "btn-primary btn-lg")}
      ${phoneBtn("btn-outline-light btn-lg")}
    </div>
  </div>
</section>

${zoneSection()}
${finalCta(root)}
`,
};

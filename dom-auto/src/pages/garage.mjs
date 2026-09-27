import { business, yearsInBusiness } from "../../data/business.mjs";
import { otherActivities } from "../../data/services.mjs";
import { icon } from "../icons.mjs";
import { photo, phoneLabel } from "../layout.mjs";
import { pageHero, visitSection, finalCta, arrowBtn } from "../sections.mjs";

export const garage = {
  path: "garage/",
  current: "garage",
  title: "Le garage DOM AUTO à Léognan depuis 2010",
  description: `DOM AUTO, garage automobile installé au 17 avenue de Bordeaux à Léognan depuis 2010. Entretien, mécanique, pneumatiques. Horaires, accès et téléphone : ${business.phone}.`,
  body: (root) => `
${pageHero({ root, crumbs: ["Le garage"], title: "Le garage DOM AUTO, à Léognan depuis 2010", text: `${yearsInBusiness} ans d'entretien et de réparation automobile au ${business.address.street.replace("Avenue", "avenue")}.` })}

<section class="section section-flush-top">
  <div class="container split">
    <div>
      <h2>Un garage de proximité</h2>
      <p>DOM AUTO a été créé en 2010 à ${business.address.city}. Le garage s'occupe de l'entretien et de la réparation des véhicules automobiles légers : révisions, mécanique générale, pneumatiques.</p>
      <p>Vous déposez votre voiture à deux pas de chez vous, vous parlez à l'équipe qui intervient dessus, et vous savez ce qui est prévu avant que les travaux commencent.</p>
      <h3 class="h-small">Le garage propose aussi</h3>
      <ul class="check-list" role="list">
        ${otherActivities.map((a) => `<li>${icon("check")}${a}</li>`).join("")}
      </ul>
      <p class="muted">Renseignez-vous par téléphone au <a href="tel:${business.phoneInternational}">${phoneLabel}</a> pour ces services.</p>
    </div>
    <div class="split-media">
      ${photo({ root, name: "garage-facade", alt: "La façade du garage DOM AUTO à Léognan", placeholderLabel: "façade du garage", cls: "rounded-photo" })}
    </div>
  </div>
</section>

<section class="section section-surface" aria-labelledby="photos-titre">
  <div class="container">
    <div class="section-head"><h2 id="photos-titre">L'atelier et l'équipe</h2></div>
    <div class="photo-grid">
      ${photo({ root, name: "garage-atelier", alt: "L'atelier DOM AUTO", placeholderLabel: "atelier", cls: "rounded-photo" })}
      ${photo({ root, name: "garage-equipe", alt: "L'équipe DOM AUTO", placeholderLabel: "équipe", cls: "rounded-photo" })}
      ${photo({ root, name: "garage-vehicule", alt: "Véhicule en intervention dans l'atelier DOM AUTO", placeholderLabel: "véhicule en atelier", cls: "rounded-photo" })}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="valeurs-titre">
  <div class="container">
    <div class="section-head"><h2 id="valeurs-titre">Notre façon de travailler</h2></div>
    <ul class="values" role="list">
      <li>${icon("message")}<h3>Expliquer avant d'intervenir</h3><p>On vous dit ce qu'on a constaté, ce qui est urgent et ce qui peut attendre.</p></li>
      <li>${icon("shield")}<h3>Travailler proprement</h3><p>Un travail soigné, sur votre voiture comme dans l'atelier.</p></li>
      <li>${icon("phone")}<h3>Rester joignable</h3><p>Une question sur votre voiture ? Un appel suffit, vous tombez sur le garage.</p></li>
    </ul>
    <div class="section-foot">${arrowBtn("Voir les prestations", `${root}prestations/`, "btn-ghost")}</div>
  </div>
</section>

${visitSection(root, "h2", "Informations pratiques")}
${finalCta(root)}
`,
};

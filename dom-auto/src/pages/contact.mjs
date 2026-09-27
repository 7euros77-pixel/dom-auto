import { business } from "../../data/business.mjs";
import { pageHero, visitSection, zoneSection } from "../sections.mjs";

export const contact = {
  path: "contact/",
  current: "contact",
  title: "Contact et accès | Garage DOM AUTO Léognan",
  description: `Garage DOM AUTO, 17 avenue de Bordeaux, 33850 Léognan. Téléphone : ${business.phone}. Ouvert du lundi au vendredi. Itinéraire et horaires.`,
  body: (root) => `
${pageHero({ root, crumbs: ["Contact"], title: "Contacter DOM AUTO" })}
<div class="contact-top">${visitSection(root, "h2", "Le garage, 17 avenue de Bordeaux")}</div>
${zoneSection()}
`,
};

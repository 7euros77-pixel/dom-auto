import { business, fullAddress, telHref } from "../../data/business.mjs";
import { site } from "../../data/site.mjs";
import { pageHero } from "../sections.mjs";
import { phoneLabel } from "../layout.mjs";

const todo = (v, label) => v || `<span class="todo-mark">[${label} à renseigner]</span>`;

export const mentions = {
  path: "mentions-legales/",
  current: "",
  title: "Mentions légales | DOM AUTO Léognan",
  description: "Mentions légales du site du garage DOM AUTO à Léognan.",
  body: (root) => `
${pageHero({ root, crumbs: ["Mentions légales"], title: "Mentions légales" })}
<section class="section section-flush-top">
  <div class="container prose">
    <h2>Éditeur du site</h2>
    <p>${business.legalName}, ${business.legal.form} au capital de ${business.legal.capital}<br>
    Nom commercial : ${business.name}<br>
    Siège : ${fullAddress}<br>
    SIREN : ${business.legal.siren}<br>
    SIRET : ${business.legal.siret}<br>
    ${business.legal.rcs}<br>
    Code APE : ${business.legal.ape}, ${business.legal.activity.toLowerCase()}<br>
    Téléphone : <a href="${telHref}">${phoneLabel}</a><br>
    Email : ${todo(business.email, "Email")}</p>

    <h2>Directeur de la publication</h2>
    <p>${todo(business.legal.publicationDirector, "Nom du directeur de la publication")}</p>

    <h2>Hébergement</h2>
    <p>${business.hosting.name}<br>${business.hosting.address}<br><a href="${business.hosting.website}" rel="noopener">${business.hosting.website.replace("https://", "")}</a></p>

    <h2>Propriété intellectuelle</h2>
    <p>Les textes, photographies et éléments graphiques de ce site sont la propriété de ${business.name}, sauf mention contraire. Toute reproduction sans autorisation est interdite.</p>

    <h2>Données personnelles</h2>
    <p>Le traitement des informations envoyées via le formulaire est décrit dans la <a href="${root}confidentialite/">politique de confidentialité</a>.</p>
  </div>
</section>`,
};

export const confidentialite = {
  path: "confidentialite/",
  current: "",
  title: "Politique de confidentialité | DOM AUTO Léognan",
  description: "Comment DOM AUTO utilise et protège les informations envoyées via le formulaire de contact.",
  body: (root) => `
${pageHero({ root, crumbs: ["Confidentialité"], title: "Politique de confidentialité" })}
<section class="section section-flush-top">
  <div class="container prose">
    <h2>Responsable du traitement</h2>
    <p>${business.legalName} (${business.name}), ${fullAddress}. Contact : ${todo(business.email, "Email RGPD")} ou par courrier à l'adresse du garage.</p>

    <h2>Données collectées</h2>
    <p>Via le formulaire de demande de rendez-vous ou de devis : nom, téléphone, email (facultatif), informations sur le véhicule (marque, modèle, immatriculation, kilométrage), type de prestation et message.</p>

    <h2>Finalité et base légale</h2>
    <p>Ces informations servent uniquement à répondre à votre demande et à organiser votre passage au garage. Le traitement repose sur votre consentement, donné en cochant la case du formulaire, et sur les mesures précontractuelles prises à votre demande.</p>

    <h2>Destinataires</h2>
    <p>Les données sont destinées à l'équipe ${business.name}. Elles transitent par un service technique d'envoi de formulaire : ${todo("", "Prestataire de réception du formulaire")}. Elles ne sont ni vendues ni utilisées à des fins publicitaires.</p>

    <h2>Durée de conservation</h2>
    <p>Les demandes qui n'aboutissent pas à une intervention sont conservées au maximum 3 ans après le dernier contact. Les données liées à une intervention réalisée sont conservées pendant la durée nécessaire à la gestion de la relation client et aux obligations légales.</p>

    <h2>Vos droits</h2>
    <p>Vous pouvez accéder à vos données, les rectifier, les effacer, limiter leur traitement, vous opposer à celui-ci ou retirer votre consentement à tout moment, en contactant ${business.name} aux coordonnées ci-dessus. Vous pouvez aussi adresser une réclamation à la CNIL (<a href="https://www.cnil.fr" rel="noopener">cnil.fr</a>).</p>

    <h2>Cookies et services tiers</h2>
    <p>Ce site n'utilise aucun cookie de mesure d'audience ni de publicité. Aucune bannière de consentement n'est donc nécessaire.</p>
    <p>La carte Google Maps n'est chargée que si vous cliquez sur « Afficher la carte » : Google peut alors déposer des cookies et collecter des données de navigation, selon sa propre politique de confidentialité. Le lien « Itinéraire » ouvre Google Maps dans un nouvel onglet. Les polices de caractères sont actuellement chargées depuis Google Fonts, ce qui transmet votre adresse IP à Google.</p>
  </div>
</section>`,
};

export const notFound = {
  path: "404.html",
  current: "",
  noindex: true,
  title: "Page introuvable | DOM AUTO Léognan",
  description: "Cette page n'existe pas ou a été déplacée.",
  body: (root) => `
<section class="section notfound">
  <div class="container">
    <p class="notfound-code">404</p>
    <h1>Cette page n'existe pas</h1>
    <p class="lead">Le lien est peut-être ancien. Voici où aller :</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="${root || "./"}">Retour à l'accueil</a>
      <a class="btn btn-outline" href="${root}prestations/">Nos prestations</a>
      <a class="btn btn-ghost" href="${telHref}">Appeler le ${phoneLabel}</a>
    </div>
  </div>
</section>`,
};

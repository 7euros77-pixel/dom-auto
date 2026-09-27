import { business, telHref, hoursSummary, yearsInBusiness } from "../../data/business.mjs";
import { icon } from "../icons.mjs";
import { photo, phoneLabel } from "../layout.mjs";
import { arrowBtn, phoneBtn, serviceCards, reviewsSection, stepsSection, zoneSection, visitSection, finalCta, openStatus } from "../sections.mjs";

export const home = {
  path: "",
  current: "home",
  title: "Garage DOM AUTO Léognan | Entretien, réparation & pneus",
  description: `DOM AUTO, garage automobile à Léognan : entretien, réparation mécanique et pneumatiques. Retrouvez-nous au 17 avenue de Bordeaux ou appelez le ${business.phone}.`,
  body: (root) => `
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-text">
      <p class="hero-place">${icon("pin")}Garage automobile à ${business.address.city}</p>
      <h1>Votre voiture entre de bonnes mains à Léognan.</h1>
      <p class="hero-lead">Entretien, réparation, mécanique et pneumatiques au 17 avenue de Bordeaux.</p>
      <div class="btn-row">
        ${arrowBtn("Prendre rendez-vous", `${root}rendez-vous/`, "btn-primary btn-lg")}
        <a class="btn btn-outline-light btn-lg" href="${telHref}">${icon("phone")}${phoneLabel}</a>
      </div>
      <p class="hero-hours">${icon("clock")}<span><strong>${hoursSummary.days}</strong> ${hoursSummary.text}</span></p>
    </div>
    <div class="hero-media">
      ${photo({ root, name: "hero-dom-auto", alt: "L'atelier DOM AUTO à Léognan", placeholderLabel: "atelier ou façade DOM AUTO", eager: true, cls: "hero-photo" })}
      <div class="hero-plate" aria-label="Informations pratiques">
        ${openStatus()}
        <p class="plate-name">${business.name}</p>
        <p class="plate-address">${business.address.street}<br>${business.address.postalCode} ${business.address.city}</p>
        <a class="plate-phone" href="${telHref}">${icon("phone")}${phoneLabel}</a>
      </div>
    </div>
  </div>
</section>

<section class="reassurance" aria-label="En bref">
  <ul class="container reassurance-list" role="list">
    <li>${icon("calendar")}<span><strong>Depuis 2010</strong>${yearsInBusiness} ans d'activité</span></li>
    <li>${icon("pin")}<span><strong>Garage à Léognan</strong>Avenue de Bordeaux</span></li>
    <li>${icon("wrench")}<span><strong>Entretien & réparation</strong>Mécanique générale</span></li>
    <li>${icon("tire")}<span><strong>Pneumatiques</strong>Montage et équilibrage</span></li>
  </ul>
</section>

<section class="section" id="prestations" aria-labelledby="prestations-titre">
  <div class="container">
    <div class="section-head section-head-row">
      <div>
        <h2 id="prestations-titre">Nos prestations atelier</h2>
        <p class="lead">Un bruit inhabituel, un voyant qui s'allume ou simplement l'entretien à prévoir ? Choisissez votre besoin, on s'occupe du reste.</p>
      </div>
      ${arrowBtn("Toutes les prestations", `${root}prestations/`, "btn-ghost")}
    </div>
    ${serviceCards(root)}
  </div>
</section>

<section class="band" aria-labelledby="band-titre">
  <div class="container band-inner">
    <div>
      <h2 id="band-titre">Besoin d'un entretien ou d'une réparation ?</h2>
      <p>Expliquez-nous votre besoin. L'équipe DOM AUTO vous recontacte pour organiser votre passage au garage.</p>
    </div>
    <div class="band-actions">
      ${arrowBtn("Demander un rendez-vous", `${root}rendez-vous/`, "btn-primary btn-lg")}
      ${phoneBtn("btn-outline-light btn-lg")}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="pourquoi-titre">
  <div class="container">
    <div class="section-head">
      <h2 id="pourquoi-titre">Pourquoi choisir DOM AUTO ?</h2>
    </div>
    <ol class="reasons">
      <li><span class="reason-num">01</span><h3>Un garage installé à Léognan depuis 2010</h3><p>DOM AUTO accompagne les automobilistes de Léognan et des environs pour l'entretien et la réparation de leurs véhicules.</p></li>
      <li><span class="reason-num">02</span><h3>Des conseils clairs</h3><p>Une équipe disponible pour expliquer les interventions nécessaires et vous aider à prendre la bonne décision pour votre véhicule.</p></li>
      <li><span class="reason-num">03</span><h3>Entretien, mécanique et pneus au même endroit</h3><p>Un interlocuteur local pour les principales opérations d'entretien et de réparation de votre voiture.</p></li>
    </ol>
  </div>
</section>

<section class="section section-surface" id="pneus" aria-labelledby="pneus-titre">
  <div class="container tires">
    <div class="tires-intro">
      <h2 id="pneus-titre">Vos pneus montés à Léognan</h2>
      <p class="lead">DOM AUTO est référencé comme centre de montage de pneumatiques. Remplacement, montage et équilibrage, avec des conseils adaptés à votre véhicule et à votre usage.</p>
      <ul class="vehicle-types" role="list" aria-label="Véhicules pris en charge">
        <li>${icon("car")}Voitures</li>
        <li>${icon("truck")}Utilitaires</li>
        <li>${icon("mountain")}4x4</li>
      </ul>
      ${arrowBtn("Demander un devis pneus", `${root}rendez-vous/?prestation=pneumatiques`, "btn-primary btn-lg")}
    </div>
    <div class="tires-side">
      <ul class="tire-services" role="list">
        <li>${icon("wrench")}<strong>Montage</strong><span>Pose de vos pneus neufs sur jante.</span></li>
        <li>${icon("disc")}<strong>Équilibrage</strong><span>Pour une conduite sans vibration.</span></li>
        <li>${icon("refresh")}<strong>Remplacement</strong><span>Pneus usés, abîmés ou saisonniers.</span></li>
        <li>${icon("message")}<strong>Conseils</strong><span>Le bon pneu pour votre usage.</span></li>
      </ul>
      <div class="tire-tip">
        <p class="tire-tip-title">Pour un devis rapide</p>
        <p>Notez la dimension inscrite sur le flanc de vos pneus, par exemple <strong>205/55 R16 91V</strong>. Le prix dépend de cette dimension et du modèle choisi.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="garage-titre">
  <div class="container split">
    <div class="split-media">
      ${photo({ root, name: "garage-facade", alt: "La façade du garage DOM AUTO, avenue de Bordeaux à Léognan", placeholderLabel: "façade du garage" , cls: "rounded-photo" })}
    </div>
    <div>
      <h2 id="garage-titre">Un garage automobile de proximité depuis 2010</h2>
      <p>DOM AUTO est installé au ${business.address.street.replace("Avenue", "avenue")} à ${business.address.city}. Le garage assure l'entretien et la réparation des véhicules automobiles légers : révisions, mécanique, pneumatiques.</p>
      <p>Ici, vous parlez directement à l'équipe qui s'occupe de votre voiture. Vous savez ce qui est prévu, pourquoi, et ce qui peut attendre.</p>
      <dl class="facts">
        <div><dt>Commune</dt><dd>${business.address.city} (${business.address.postalCode})</dd></div>
        <div><dt>Création</dt><dd>2010</dd></div>
        <div><dt>Activité</dt><dd>Véhicules légers</dd></div>
      </dl>
      ${arrowBtn("Découvrir le garage", `${root}garage/`, "btn-ghost")}
    </div>
  </div>
</section>

${reviewsSection(root)}
${stepsSection()}
${zoneSection()}
${visitSection(root)}
${finalCta(root)}
`,
};

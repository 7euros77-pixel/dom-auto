import { business, telHref, hoursSummary } from "../../data/business.mjs";
import { formServiceOptions } from "../../data/services.mjs";
import { site } from "../../data/site.mjs";
import { icon } from "../icons.mjs";
import { phoneLabel } from "../layout.mjs";
import { pageHero, openStatus } from "../sections.mjs";

const field = ({ id, label, type = "text", required = false, autocomplete = "", attrs = "", hint = "" }) => `
<div class="field">
  <label for="${id}">${label}${required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>
  <input id="${id}" name="${id}" type="${type}"${required ? " required" : ""}${autocomplete ? ` autocomplete="${autocomplete}"` : ""}${hint ? ` aria-describedby="${id}-hint"` : ""} ${attrs}>
  ${hint ? `<p class="field-hint" id="${id}-hint">${hint}</p>` : ""}
  <p class="field-error" id="${id}-error" hidden></p>
</div>`;

export const rendezVous = {
  path: "rendez-vous/",
  current: "rdv",
  title: "Prendre rendez-vous ou demander un devis | DOM AUTO Léognan",
  description: `Demandez un rendez-vous ou un devis au garage DOM AUTO à Léognan : entretien, réparation, pneus. L'équipe vous recontacte. Ou appelez le ${business.phone}.`,
  body: (root) => `
${pageHero({ root, crumbs: ["Rendez-vous"], title: "Prendre rendez-vous ou demander un devis", text: "Expliquez-nous votre besoin : l'équipe DOM AUTO vous recontacte pour organiser votre passage au garage." })}

<section class="section section-flush-top">
  <div class="container form-layout">
    <form class="form-card" data-form data-endpoint="${site.formEndpoint}" novalidate>
      <p class="form-intro">Les champs marqués <span class="req">*</span> sont obligatoires.</p>

      <fieldset>
        <legend>Vos coordonnées</legend>
        <div class="field-row">
          ${field({ id: "nom", label: "Nom", required: true, autocomplete: "name" })}
          ${field({ id: "telephone", label: "Téléphone", type: "tel", required: true, autocomplete: "tel", attrs: 'inputmode="tel"' })}
        </div>
        ${field({ id: "email", label: "Email", type: "email", autocomplete: "email", hint: "Facultatif, pour recevoir une réponse écrite." })}
      </fieldset>

      <fieldset>
        <legend>Votre véhicule</legend>
        <div class="field-row">
          ${field({ id: "marque", label: "Marque", attrs: 'placeholder="Ex. Peugeot"' })}
          ${field({ id: "modele", label: "Modèle", attrs: 'placeholder="Ex. 308"' })}
        </div>
        <div class="field-row">
          ${field({ id: "immatriculation", label: "Immatriculation", attrs: 'placeholder="AB-123-CD" autocapitalize="characters"' })}
          ${field({ id: "kilometrage", label: "Kilométrage", attrs: 'inputmode="numeric" placeholder="Ex. 85 000"' })}
        </div>
      </fieldset>

      <fieldset>
        <legend>Votre demande</legend>
        <div class="field">
          <label for="prestation">Type de prestation</label>
          <select id="prestation" name="prestation">
            <option value="">Choisir…</option>
            ${formServiceOptions.map((o) => `<option value="${o.value}">${o.label}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label for="message">Message <span class="req" aria-hidden="true">*</span></label>
          <textarea id="message" name="message" rows="5" required aria-describedby="message-hint" placeholder="Ex. voyant moteur allumé depuis hier, bruit au freinage, révision des 60 000 km, dimension des pneus…"></textarea>
          <p class="field-hint" id="message-hint">Décrivez ce que vous constatez et vos disponibilités.</p>
          <p class="field-error" id="message-error" hidden></p>
        </div>
      </fieldset>

      <div class="hp" aria-hidden="true"><label for="site_web">Ne pas remplir</label><input id="site_web" name="site_web" type="text" tabindex="-1" autocomplete="off"></div>

      <div class="field field-check">
        <input id="consentement" name="consentement" type="checkbox" required>
        <label for="consentement">J'accepte que DOM AUTO utilise ces informations afin de répondre à ma demande. <a href="${root}confidentialite/">En savoir plus</a></label>
        <p class="field-error" id="consentement-error" hidden></p>
      </div>

      <button class="btn btn-primary btn-lg btn-block" type="submit">Envoyer ma demande<span class="btn-arrow">${icon("arrow")}</span></button>
      <div class="form-status" data-form-status role="status" aria-live="polite" tabindex="-1"></div>
    </form>

    <aside class="form-aside" aria-label="Contact direct">
      <div class="aside-card aside-card-brand">
        <h2>Plus rapide par téléphone</h2>
        <a class="aside-phone" href="${telHref}">${icon("phone")}${phoneLabel}</a>
        ${openStatus()}
        <p>${hoursSummary.days}<br>${hoursSummary.text}</p>
      </div>
      <div class="aside-card">
        <h2>Après votre demande</h2>
        <ol class="mini-steps">
          <li>L'équipe lit votre message.</li>
          <li>Elle vous rappelle pour préciser le besoin et fixer un créneau.</li>
          <li>Vous déposez votre véhicule au garage.</li>
        </ol>
      </div>
    </aside>
  </div>
</section>
`,
};

# Informations à confirmer avant mise en production

Tout se modifie dans `data/` puis `node build.mjs`. Aucune donnée n'est à changer dans les pages.

## Identité et visuels
- [ ] Logo DOM.AUTO en fichier vectoriel (SVG/PDF) : le logo actuel est une reprise typographique de l'enseigne (`src/layout.mjs`, `assets/images/logo.svg`)
- [ ] Photos réelles de la façade → `assets/images/garage-facade.jpg`
- [ ] Photos de l'atelier → `assets/images/hero-dom-auto.jpg` et `assets/images/garage-atelier.jpg`
- [ ] Photos de l'équipe → `assets/images/garage-equipe.jpg`
- [ ] Photo véhicule en atelier → `assets/images/garage-vehicule.jpg`
- [ ] Remplacer l'image de partage `assets/images/og-dom-auto.png` (1200×630) par une vraie photo
- [ ] Auto-héberger la police Poppins (woff2) pour ne plus appeler Google Fonts (RGPD + performance)

> Les photos sont détectées automatiquement au build. Déposer idéalement 3 formats : `nom.avif`, `nom.webp`, `nom.jpg` (1600 px de large max).

## Contact et horaires
- [ ] Email officiel → `data/business.mjs` (`email`)
- [ ] Horaires : confirmer que la fermeture est bien à 18h30 du lundi au vendredi (plusieurs annuaires alimentés par Google affichent 18h)
- [ ] Nom de domaine définitif → `data/site.mjs` (`url`)
- [ ] Connecter le formulaire : URL du webhook n8n / Make / Formspree → `data/site.mjs` (`formEndpoint`)
- [ ] Tester un envoi réel du formulaire après connexion

## Avis
- [ ] URL Google Business Profile → `data/business.mjs` (`googleBusinessUrl`)
- [ ] Note Google actuelle
- [ ] Nombre d'avis Google
- [ ] 5 extraits d'avis intégrés (`data/reviews.mjs`) : obtenir si possible l'accord des auteurs ou les remplacer par des avis Google choisis par DOM AUTO
- [ ] Vérifier sur Google la note 5/5 des 3 avis marqués `rating: null`, puis passer `rating: 5` (étoiles affichées)
- [ ] Idéalement : remplacer les avis « Client DOM AUTO » par des avis Google signés (prénom + initiale)

## Prestations
- [ ] Faire valider la liste complète des prestations atelier par DOM AUTO (`data/services.mjs`)
- [ ] Diagnostic électronique confirmé ?
- [ ] Climatisation confirmée ?
- [ ] Freinage confirmé ?
- [ ] Distribution confirmée ?
- [ ] Embrayage confirmé ?
- [ ] Échappement confirmé ?
- [ ] Batterie confirmée ?
- [ ] Pré-contrôle technique confirmé ?
- [ ] Véhicules hybrides/électriques pris en charge ?
- [ ] Véhicule de courtoisie ?
- [ ] Conditions de prêt du véhicule de courtoisie
- [ ] Confirmer les facilités de paiement réellement proposées (rien n'est affiché sur le site à ce stade)
- [ ] Vente de véhicules toujours active ? (mentionnée sur la page Le garage)
- [ ] Location de véhicules toujours active ? (mentionnée sur la page Le garage)
- [ ] Vente de pièces et accessoires toujours active ? (mentionnée sur la page Le garage)

## Légal
- [ ] Forme juridique exacte : SARL ou EURL (`data/business.mjs`, `legal.form`)
- [ ] Adresse email RGPD
- [ ] Responsable de publication (`legal.publicationDirector`)
- [ ] Hébergeur final (GitHub Pages par défaut dans `hosting`)
- [ ] Prestataire de réception du formulaire, à nommer dans `src/pages/legal.mjs` (politique de confidentialité)
- [ ] Réseaux sociaux officiels (`social`)
- [ ] Relation actuelle avec DELKO à clarifier pour les mentions éventuelles

## Après mise en ligne
- [ ] Déclarer le sitemap dans Google Search Console
- [ ] Ajouter l'URL du site sur la fiche Google Business Profile
- [ ] Contrôle Lighthouse mobile et desktop sur l'URL finale

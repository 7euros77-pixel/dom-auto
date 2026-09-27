# Site DOM AUTO — Léognan

Site statique, sans framework ni dépendance. Généré par un script Node (`build.mjs`) à partir des données de `data/`.

## Arborescence
```
data/         business.mjs (coordonnées, horaires, légal) · services.mjs · reviews.mjs · site.mjs (domaine, formulaire)
src/          layout.mjs (header, footer, SEO, JSON-LD) · sections.mjs · icons.mjs · pages/
assets/       css/style.css (design system) · js/main.js · images/
docs/         site généré, prêt à publier (ne pas modifier à la main)
```

## Commandes
```
node build.mjs            # build de production → docs/
node build.mjs --preview  # idem + avis d'exemple visibles (ne jamais publier ce build)
python3 -m http.server -d docs 8000   # aperçu local sur http://localhost:8000
```
Node 18+ requis. Aucun `npm install`.

## Mise en ligne sur GitHub Pages
1. Créer un dépôt GitHub et y pousser le projet.
2. Settings → Pages → Source : branche `main`, dossier `/docs`.
3. Relier le nom de domaine (fichier `docs/CNAME` + DNS), puis renseigner `url` dans `data/site.mjs` et relancer le build.

La page 404 utilise des liens absolus : elle fonctionne correctement une fois le site servi à la racine d'un domaine.

## Formulaire
Le formulaire envoie un `POST` JSON vers `formEndpoint` (`data/site.mjs`) :
`nom, telephone, email, marque, modele, immatriculation, kilometrage, prestation, message, consentement, source, page, date`.
Compatible avec un webhook n8n ou Make, Formspree, ou l'API d'un CRM. Tant que `formEndpoint` est vide, le formulaire invite à appeler le garage.

## Ajouter une photo
Déposer `assets/images/<nom>.jpg` (+ `.webp` / `.avif` si possible), puis `node build.mjs`. Noms attendus : `hero-dom-auto`, `garage-facade`, `garage-atelier`, `garage-equipe`, `garage-vehicule`.

## Règles de contenu
Pas de note Google, d'avis, de tarif, de garantie ou de service non confirmés. Voir `TODO-DOM-AUTO.md`.

// AVIS CLIENTS — extraits d'avis publics (1 phrase maximum par avis).
// - rating: 5 uniquement si la note 5/5 est visible sur la source. null = note à vérifier sur Google.
// - validated: true = affiché en production. Accord des auteurs à obtenir si possible (voir TODO).
// - devSample: true = exemple de développement, jamais affiché en production.

export const reviews = [
  {
    validated: true, rating: 5, author: "Marie M.", source: "Vroomly", date: "juin 2023",
    url: "https://www.vroomly.com/garages/dom-auto-33850-bordeaux/",
    text: "De très bons conseils et un rapport qualité prix incroyable.",
  },
  {
    validated: true, rating: 5, author: "Melina", source: "Info-garage", date: "",
    url: "https://info-garage.fr/aquitaine-limousin-poitou-charentes/arrondissement-de-bordeaux/leognan/dom-auto/",
    text: "Super garage, très professionnel et très accueillant.",
  },
  {
    validated: true, rating: null, author: "Pierre T.", source: "Avis Google", date: "janvier 2026",
    url: "",
    text: "Accueil chaleureux, explications claires, devis et délais respectés, on se sent en confiance.",
  },
  {
    validated: true, rating: null, author: "Client DOM AUTO", source: "Avis en ligne", date: "",
    url: "",
    text: "J'ai enfin trouvé mon garagiste de confiance.",
  },
  {
    validated: true, rating: null, author: "Client DOM AUTO", source: "Avis en ligne", date: "",
    url: "",
    text: "Du personnel compétent et à l'écoute du client pour trouver la meilleure solution.",
  },
];

export const visibleReviews = (showDev) =>
  reviews.filter((r) => r.validated || (showDev && r.devSample));

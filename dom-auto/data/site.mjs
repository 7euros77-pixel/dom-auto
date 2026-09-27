export const site = {
  // Nom de domaine définitif (canonical, sitemap, JSON-LD). À renseigner.
  url: "https://domaine-a-definir.fr",
  lang: "fr",
  // Réception du formulaire : webhook n8n, Make, Formspree, CRM…
  // Le formulaire envoie un POST JSON à cette URL. Vide = formulaire non connecté.
  formEndpoint: "",
  // Affiche les avis d'exemple : uniquement avec `node build.mjs --preview`
  showDevReviews: process.argv.includes("--preview"),
};

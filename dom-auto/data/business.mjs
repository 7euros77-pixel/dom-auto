// Source unique des informations DOM AUTO.
// Aucune page ne doit contenir l'adresse, le téléphone ou les horaires en dur.

export const business = {
  name: "DOM AUTO",
  legalName: "DOM.AUTO",
  phone: "05 57 12 00 12",
  phoneInternational: "+33557120012",
  email: "", // À renseigner avant mise en production
  foundingYear: 2010,
  address: {
    street: "17 Avenue de Bordeaux",
    postalCode: "33850",
    city: "Léognan",
    department: "Gironde",
    region: "Nouvelle-Aquitaine",
    country: "France",
    countryCode: "FR",
  },
  coordinates: { lat: 44.7360764, lng: -0.597563 },
  legal: {
    form: "SARL", // À confirmer (SARL ou EURL selon les bases consultées)
    siren: "521 804 559",
    siret: "521 804 559 00016",
    rcs: "521 804 559 RCS Bordeaux",
    ape: "45.20A",
    activity: "Entretien et réparation de véhicules automobiles légers",
    capital: "7 500 €",
    creationDate: "16 avril 2010",
    manager: "Cédric Domalain",
    publicationDirector: "", // À renseigner avant mise en production
  },
  hosting: {
    // Hébergeur final à confirmer. Valeurs par défaut si publication sur GitHub Pages.
    name: "GitHub, Inc.",
    address: "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis",
    website: "https://pages.github.com",
  },
  // day: 1 = lundi … 7 = dimanche
  openingHours: [
    { day: 1, label: "Lundi", slots: [["08:30", "12:00"], ["14:00", "18:30"]] },
    { day: 2, label: "Mardi", slots: [["08:30", "12:00"], ["14:00", "18:30"]] },
    { day: 3, label: "Mercredi", slots: [["08:30", "12:00"], ["14:00", "18:30"]] },
    { day: 4, label: "Jeudi", slots: [["08:30", "12:00"], ["14:00", "18:30"]] },
    { day: 5, label: "Vendredi", slots: [["08:30", "12:00"], ["14:00", "18:30"]] },
    { day: 6, label: "Samedi", slots: [] },
    { day: 7, label: "Dimanche", slots: [] },
  ],
  googleBusinessUrl: "", // URL de la fiche Google, à renseigner
  social: { facebook: "", instagram: "" }, // À renseigner si comptes officiels
  serviceArea: [
    "Gradignan", "Villenave-d'Ornon", "Cadaujac", "Martillac",
    "La Brède", "Canéjan", "Cestas", "Pessac", "Bordeaux Sud",
  ],
};

export const fullAddress = `${business.address.street}, ${business.address.postalCode} ${business.address.city}`;
export const telHref = `tel:${business.phoneInternational}`;
export const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(`${business.name} ${business.address.street} ${business.address.postalCode} ${business.address.city}`);
export const yearsInBusiness = new Date().getFullYear() - business.foundingYear;

// "08:30" -> "8h30", "12:00" -> "12h"
export const fmtTime = (t) => {
  const [h, m] = t.split(":");
  return `${Number(h)}h${m === "00" ? "" : m}`;
};

export const hoursSummary = { days: "Lun. – Ven.", text: "8h30 – 12h / 14h – 18h30" };

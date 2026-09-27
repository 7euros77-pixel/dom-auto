// confirmed: true  = activité identifiée dans les sources publiques.
// confirmed: false = catégorie courante à faire valider par DOM AUTO (voir TODO-DOM-AUTO.md).

export const services = [
  { slug: "entretien", icon: "wrench", confirmed: true, title: "Entretien & révision",
    short: "Vidange, filtres, niveaux et points de contrôle selon le carnet de votre véhicule.",
    long: "La révision suit les préconisations du constructeur : vidange, remplacement des filtres, contrôle des niveaux, des éclairages et des pièces d'usure. On vous indique ce qui a été fait et ce qui sera à prévoir aux prochaines échéances." },
  { slug: "mecanique", icon: "cog", confirmed: true, title: "Mécanique",
    short: "Bruit inhabituel, perte de puissance, fuite : on cherche la cause et on vous l'explique.",
    long: "Un comportement qui change, un bruit qui apparaît, une fuite sous la voiture ? L'atelier recherche l'origine du problème, vous explique la réparation à prévoir et vous la fait valider avant d'intervenir." },
  { slug: "pneumatiques", icon: "tire", confirmed: true, title: "Pneumatiques",
    short: "Montage, équilibrage et remplacement pour voitures, utilitaires et 4x4.",
    long: "Remplacement, montage et équilibrage des pneus de votre voiture, de votre utilitaire ou de votre 4x4. Le prix dépend de la dimension et du modèle choisi : demandez un devis avec les références inscrites sur le flanc de vos pneus." },
  { slug: "freinage", icon: "disc", confirmed: false, title: "Freinage",
    short: "Plaquettes, disques, liquide de frein : les pièces qui comptent pour votre sécurité.",
    long: "Bruit au freinage, pédale plus molle ou voyant allumé : ce sont des signes à ne pas laisser traîner. Contrôle et remplacement des plaquettes, des disques et du liquide de frein." },
  { slug: "diagnostic", icon: "gauge", confirmed: false, title: "Diagnostic",
    short: "Un voyant au tableau de bord ? Lecture des codes défaut et recherche de l'origine.",
    long: "Un voyant s'allume ou la voiture passe en mode dégradé ? La lecture des codes défaut donne une piste, que l'atelier vérifie ensuite sur le véhicule pour identifier la bonne intervention." },
  { slug: "batterie", icon: "battery", confirmed: false, title: "Batterie",
    short: "Contrôle de la charge et remplacement quand la batterie ne tient plus.",
    long: "Démarrages difficiles, surtout les matins froids ? Un test de la batterie et du circuit de charge permet de savoir s'il faut la remplacer ou chercher ailleurs." },
  { slug: "distribution", icon: "refresh", confirmed: false, title: "Distribution",
    short: "Remplacement du kit de distribution aux échéances prévues par le constructeur.",
    long: "La courroie de distribution se remplace à un kilométrage ou à un âge précis. Donnez-nous le modèle et le kilométrage de votre véhicule, on vous dit où vous en êtes." },
  { slug: "embrayage", icon: "sliders", confirmed: false, title: "Embrayage",
    short: "Patinage, pédale dure, vitesses qui accrochent : contrôle et remplacement.",
    long: "Un embrayage qui patine ou des vitesses qui passent mal méritent un contrôle. Selon l'usure, l'atelier vous propose le remplacement du kit d'embrayage." },
  { slug: "climatisation", icon: "snowflake", confirmed: false, title: "Climatisation",
    short: "Contrôle du circuit et recharge pour retrouver une clim efficace.",
    long: "Une climatisation qui refroidit moins bien a souvent besoin d'une recharge, parfois d'une réparation du circuit. Contrôle, recharge et remplacement des éléments défectueux." },
  { slug: "echappement", icon: "wind", confirmed: false, title: "Échappement",
    short: "Bruit, fuite ou pièce endommagée sur la ligne d'échappement.",
    long: "Un bruit sourd ou métallique sous la voiture vient souvent de l'échappement. Contrôle de la ligne et remplacement des pièces endommagées." },
  { slug: "controle-technique", icon: "clipboard", confirmed: false, title: "Préparation contrôle technique",
    short: "Vérification avant le passage, réparations en cas de contre-visite.",
    long: "Avant le contrôle technique, l'atelier vérifie les principaux points contrôlés. En cas de contre-visite, apportez le procès-verbal : on s'occupe des réparations demandées." },
  { slug: "autres", icon: "plus", confirmed: true, title: "Autres réparations",
    short: "Une autre intervention en tête ? Décrivez votre besoin, on vous dit ce qu'on peut faire.",
    long: "Toutes les réparations ne rentrent pas dans une case. Appelez le garage ou décrivez votre besoin dans le formulaire : on vous répond sur ce qu'il est possible de faire." },
];

export const formServiceOptions = [
  { value: "entretien", label: "Entretien / révision" },
  { value: "mecanique", label: "Réparation / mécanique" },
  { value: "pneumatiques", label: "Pneumatiques" },
  { value: "diagnostic", label: "Diagnostic" },
  { value: "freinage", label: "Freinage" },
  { value: "batterie", label: "Batterie" },
  { value: "autre", label: "Autre" },
];

// Autres activités identifiées publiquement : à confirmer avant mise en avant
export const otherActivities = [
  "Vente de pièces détachées et d'accessoires",
  "Vente de véhicules neufs et d'occasion",
  "Location de véhicules",
];

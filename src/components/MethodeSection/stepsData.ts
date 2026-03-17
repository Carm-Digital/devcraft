/**
 * Données des 7 étapes "Comment ça marche" / "Notre méthode".
 * Chaque étape : numéro, titre, description, shortDesc (aperçu accueil), icône (path SVG Heroicons).
 */
export const METHODE_STEPS = [
  {
    num: 1,
    title: "Prise de contact",
    shortDesc: "Vous nous expliquez votre projet et le type de site souhaité.",
    desc: "Le client nous explique son projet, son activité et le type de site qu’il souhaite créer. Cette étape nous permet de comprendre ses besoins et de l’orienter vers la meilleure solution.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    num: 2,
    title: "Analyse du projet",
    shortDesc: "Structure, pages, fonctionnalités et design adaptés à votre activité.",
    desc: "Nous analysons le projet pour déterminer la structure du site, le nombre de pages, les fonctionnalités nécessaires et le design adapté à l’activité du client.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    num: 3,
    title: "Récupération des contenus",
    shortDesc: "Logo, textes, photos, coordonnées et préférences de style.",
    desc: "Pour créer un site, nous avons besoin de certains éléments : logo, textes, photos ou visuels, informations de contact et préférences de style. Nous vous indiquons précisément ce qu’il nous faut.",
    icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  },
  {
    num: 4,
    title: "Validation du projet",
    shortDesc: "Structure, fonctionnalités, style et délais validés ensemble.",
    desc: "Nous validons avec le client la structure du site, les fonctionnalités, le style visuel et les délais de création. Cette étape permet de cadrer clairement le projet avant tout développement.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    num: 5,
    title: "Lancement du projet",
    shortDesc: "Acompte éventuel pour confirmer et réserver le démarrage.",
    desc: "Selon le type de projet, un acompte peut être demandé. Cet acompte permet de confirmer le lancement, de réserver le temps de développement et de démarrer la création du site.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    num: 6,
    title: "Création du site",
    shortDesc: "Design pro, structure optimisée, expérience fluide, responsive.",
    desc: "Nous concevons le site avec un design professionnel, une structure optimisée, une expérience utilisateur fluide et un rendu responsive (mobile et ordinateur).",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4m0 0h12",
  },
  {
    num: 7,
    title: "Ajustements et mise en ligne",
    shortDesc: "Derniers réglages, validation avec vous, mise en ligne.",
    desc: "Une fois le site prêt, nous faisons les derniers ajustements, nous validons le résultat avec le client, puis nous mettons le site en ligne. Vous êtes accompagné jusqu’à la livraison.",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  },
];

export const PAYMENT_STEPS = [
  "Validation du projet",
  "Versement d’un acompte de démarrage",
  "Création du site",
  "Paiement du solde à la livraison",
];

/**
 * Délais de réalisation proposés au client avec suppléments optionnels.
 */

export type DeliveryDelayId = "standard" | "prioritaire" | "express" | "urgence";

export interface DeliveryDelayOption {
  id: DeliveryDelayId;
  name: string;
  daysLabel: string;
  /** Supplément en euros (0 = inclus) */
  supplementEur: number;
  /** Libellé affiché pour le supplément (ex. "inclus", "+80 €") */
  supplementLabel: string;
}

export const DELIVERY_DELAYS: DeliveryDelayOption[] = [
  {
    id: "standard",
    name: "Standard",
    daysLabel: "10 à 14 jours",
    supplementEur: 0,
    supplementLabel: "inclus",
  },
  {
    id: "prioritaire",
    name: "Prioritaire",
    daysLabel: "7 jours",
    supplementEur: 80,
    supplementLabel: "+80 €",
  },
  {
    id: "express",
    name: "Express",
    daysLabel: "5 jours",
    supplementEur: 150,
    supplementLabel: "+150 €",
  },
  {
    id: "urgence",
    name: "Urgence",
    daysLabel: "3 jours",
    supplementEur: 250,
    supplementLabel: "+250 €",
  },
];

export const DELIVERY_DELAY_NOTE =
  "Le délai commence après réception de tous les éléments nécessaires au projet (textes, photos, informations).";

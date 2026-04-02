/**
 * Types pour le formulaire de qualification et le tunnel de conversion.
 * Prêt pour une future connexion backend / Stripe.
 */

export type TypeSite = "vitrine" | "complet" | "abonnement" | "";

export interface QualificationFormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  typeSite: TypeSite;
  /** Délai de réalisation : standard (défaut), prioritaire, express, urgence */
  delai: string;
  description: string;
  hasLogo: string;
  hasTextes: string;
  hasPhotos: string;
  styleSouhaite: string;
  commentConnu: string;
  acceptationRGPD: boolean;
}

export const QUALIFICATION_FORM_DEFAULT: QualificationFormData = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  entreprise: "",
  typeSite: "",
  delai: "standard",
  description: "",
  hasLogo: "",
  hasTextes: "",
  hasPhotos: "",
  styleSouhaite: "",
  commentConnu: "",
  acceptationRGPD: false,
};

/** Erreurs de validation par champ */
export type QualificationFormErrors = Partial<Record<keyof QualificationFormData, string>>;

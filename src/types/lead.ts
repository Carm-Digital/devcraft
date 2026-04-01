export type LeadKind = "exchange" | "qualification";

export type ExchangeFormData = {
  nom: string;
  telephone: string;
  email: string;
  creneau: string;
  message: string;
};

export type LeadPayload = {
  kind: LeadKind;
  // exchange
  nom?: string;
  telephone?: string;
  email?: string;
  creneau?: string;
  message?: string;
  // qualification
  prenom?: string;
  entreprise?: string;
  typeSite?: string;
  budget?: string;
  delai?: string;
  description?: string;
  hasLogo?: string;
  hasTextes?: string;
  hasPhotos?: string;
  styleSouhaite?: string;
  commentConnu?: string;
  acceptationRGPD?: boolean;
  // metadata
  source?: string;
};


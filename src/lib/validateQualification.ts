import type { QualificationFormData, QualificationFormErrors } from "@/types/qualification";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQualificationForm(data: QualificationFormData): QualificationFormErrors {
  const err: QualificationFormErrors = {};
  if (!data.prenom.trim()) err.prenom = "Le prénom est requis.";
  if (!data.nom.trim()) err.nom = "Le nom est requis.";
  if (!data.email.trim()) err.email = "L’email est requis.";
  else if (!EMAIL_REGEX.test(data.email)) err.email = "Adresse email invalide.";
  if (!data.telephone.trim()) err.telephone = "Le téléphone est requis.";
  if (!data.typeSite) err.typeSite = "Veuillez choisir un type de site.";
  if (!data.budget.trim()) err.budget = "Veuillez indiquer une fourchette de budget.";
  if (!data.description.trim()) err.description = "Une description du projet est requise.";
  if (!data.acceptationRGPD) err.acceptationRGPD = "Vous devez accepter l’utilisation de vos données pour traiter votre demande.";
  return err;
}

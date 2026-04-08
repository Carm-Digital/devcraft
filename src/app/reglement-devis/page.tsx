import type { Metadata } from "next";
import { kv } from "@vercel/kv";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import { OFFER_IDS, getDepositConfig } from "@/config/deposits";
import type { OfferId } from "@/types/payment";
import PaymentSummaryCard from "@/components/features/reglement-devis/PaymentSummaryCard";
import ValidateLaunchButton from "@/components/features/reglement-devis/ValidateLaunchButton";
import ClientIdAccessForm from "@/components/features/reglement-devis/ClientIdAccessForm";
import DemandeCheckoutButton from "@/components/features/reglement-devis/DemandeCheckoutButton";
import { isStripeConfigured } from "@/lib/stripe/config";
import { isKvStorageEnabled } from "@/lib/siteContent";
import { TYPE_SITE_LABEL } from "@/config/typeSiteLabels";

export const metadata: Metadata = {
  title: "Règlement devis — DevCraft",
  description:
    "Accédez à votre espace de règlement et procédez au paiement sécurisé de votre acompte ou solde.",
};

const STATUT_LABELS: Record<string, string> = {
  en_attente: "En attente de paiement",
  acompte_regle: "Acompte réglé",
  solde_regle: "Projet entièrement réglé",
};

type DemandeRecord = {
  clientId?: string;
  prenom?: string;
  nom?: string;
  email?: string;
  typeSite?: string;
  acompte?: number;
  solde?: number;
  statut?: string;
};

function parseDemande(raw: unknown): DemandeRecord | null {
  if (raw == null) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as DemandeRecord;
    } catch {
      return null;
    }
  }
  if (typeof raw === "object") return raw as DemandeRecord;
  return null;
}

async function loadDemande(id: string): Promise<DemandeRecord | null> {
  if (!isKvStorageEnabled()) return null;
  try {
    const raw = await kv.get<string | Record<string, unknown>>(`demande:${id}`);
    return parseDemande(raw);
  } catch {
    return null;
  }
}

function formatEuro(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

function displayTypeSite(raw: string | undefined) {
  const t = String(raw ?? "").trim();
  if (!t) return "—";
  return TYPE_SITE_LABEL[t] ?? t;
}

function hasAcompteDefini(d: DemandeRecord): boolean {
  return typeof d.acompte === "number" && !Number.isNaN(d.acompte) && d.acompte > 0;
}

interface PageProps {
  searchParams: Promise<{ id?: string; offer?: string }>;
}

async function DemandeIdContent({ id }: { id: string }) {
  if (!isKvStorageEnabled()) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 text-center text-slate-300 shadow-sm">
        <p>Le service de suivi des demandes est momentanément indisponible. Merci de réessayer plus tard ou de nous contacter.</p>
        <CTA href="/contact" variant="primary" className="mt-4">
          Nous contacter
        </CTA>
      </div>
    );
  }

  const demande = await loadDemande(id);

  if (!demande) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-8 text-center shadow-sm">
        <p className="text-lg font-medium text-white">Aucune demande ne correspond à cet identifiant.</p>
        <p className="mt-2 text-slate-300">Vérifiez la saisie ou contactez-nous si le problème persiste.</p>
      </div>
    );
  }

  if (!hasAcompteDefini(demande)) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-8 text-center shadow-sm">
        <p className="text-lg text-slate-200">
          Votre devis est en cours de préparation. Nous vous recontactons rapidement.
        </p>
      </div>
    );
  }

  const clientId = String(demande.clientId ?? id);
  const prenom = String(demande.prenom ?? "");
  const nom = String(demande.nom ?? "");
  const statut = demande.statut ?? "en_attente";
  const acompte = demande.acompte ?? 0;
  const solde = typeof demande.solde === "number" && !Number.isNaN(demande.solde) ? demande.solde : 0;
  const stripeReady = isStripeConfigured();

  if (statut === "solde_regle") {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-[#0d0f14] p-8 text-center shadow-lg">
        <p className="text-xl font-semibold text-emerald-300">Projet entièrement réglé</p>
        <p className="mt-2 text-slate-300">Merci pour votre confiance. Nous restons à votre disposition pour la suite du projet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 shadow-xl sm:p-8">
        <p className="font-mono text-xl font-bold tracking-wide text-[#00D4FF] sm:text-2xl">{clientId}</p>
        <div className="mt-6 grid gap-4 text-slate-200 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Client</p>
            <p className="mt-1 text-lg font-medium text-white">
              {[prenom, nom].filter(Boolean).join(" ") || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Type de site</p>
            <p className="mt-1 text-lg font-medium text-white">{displayTypeSite(demande.typeSite)}</p>
          </div>
          {statut === "en_attente" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Montant de l’acompte à régler</p>
              <p className="mt-1 text-lg font-medium text-[#00D4FF]">{formatEuro(acompte)}</p>
            </div>
          )}
          {statut === "acompte_regle" && (
            <>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Acompte</p>
                <p className="mt-1 text-lg font-medium text-emerald-300">Réglé ({formatEuro(acompte)})</p>
              </div>
              {solde > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Solde restant</p>
                  <p className="mt-1 text-lg font-medium text-[#00D4FF]">{formatEuro(solde)}</p>
                </div>
              )}
            </>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Statut</p>
            <p className="mt-1 text-lg font-medium text-white">{STATUT_LABELS[statut] ?? statut}</p>
          </div>
        </div>
      </div>

      {statut === "en_attente" && (
        <div className="flex flex-col items-center gap-4">
          {stripeReady ? (
            <>
              <DemandeCheckoutButton clientId={clientId} kind="acompte" label="Régler l’acompte" variant="primary" />
              <p className="text-center text-sm text-slate-500">
                Vous serez redirigé vers notre partenaire de paiement sécurisé.
              </p>
            </>
          ) : (
            <div className="text-center">
              <p className="text-slate-300">
                Le paiement en ligne sera bientôt disponible. En attendant, nous vous enverrons un lien de paiement après validation du devis.
              </p>
              <CTA href="/formulaire" variant="primary" className="mt-4">
                Nous contacter pour finaliser
              </CTA>
            </div>
          )}
        </div>
      )}

      {statut === "acompte_regle" && (
        <div className="space-y-6">
          <p className="text-center text-lg font-semibold text-white">Acompte déjà réglé</p>
          {solde > 0 ? (
            <div className="flex flex-col items-center gap-4">
              {stripeReady ? (
                <>
                  <DemandeCheckoutButton clientId={clientId} kind="solde" label="Régler le solde" variant="primary" />
                  <p className="text-center text-sm text-slate-500">
                    Paiement sécurisé par carte bancaire.
                  </p>
                </>
              ) : (
                <p className="text-center text-sm text-slate-300">
                  Paiement en ligne indisponible pour le moment — contactez-nous pour le solde.
                </p>
              )}
            </div>
          ) : (
            <p className="text-center text-slate-300">Aucun solde restant à régler.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default async function ReglementDevisPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const idParam = params.id?.trim();
  const offerParam = params.offer?.toLowerCase();
  const offerId: OfferId | null =
    offerParam && OFFER_IDS.includes(offerParam as OfferId) ? (offerParam as OfferId) : null;

  const stripeReady = isStripeConfigured();

  if (idParam) {
    return (
      <>
        <PageHero
          eyebrow="Règlement"
          title="Votre projet"
          description="Consultez le récapitulatif de votre demande et procédez au règlement sécurisé lorsque votre devis est prêt."
        />
        <Section>
          <div className="mx-auto max-w-2xl">
            <DemandeIdContent id={idParam} />
          </div>
        </Section>
        <Section
          title="Pas encore de devis ?"
          subtitle="Décrivez votre projet, on revient vers vous rapidement."
          className="bg-[#F5F4F0]"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <CTA href="/formulaire" variant="primary">
              Décrire mon projet
            </CTA>
            <CTA href="/contact" variant="outline">
              Nous contacter
            </CTA>
          </div>
        </Section>
      </>
    );
  }

  if (offerId) {
    return (
      <>
        <PageHero
          eyebrow="Validation"
          title="Validation du projet"
          description="Votre projet a bien été étudié. Cette étape permet de confirmer le lancement et de réserver la création de votre site."
          secondaryDescription="Le paiement demandé correspond à un acompte de démarrage. La suite du projet sera organisée avec vous selon les éléments validés ensemble."
        />

        <Section className="bg-[#F5F4F0]">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 rounded-xl border border-[#00D4FF]/20 bg-[#00D4FF]/10 p-4 text-center">
              <p className="text-sm text-slate-700">
                Nous vous accompagnons ensuite dans la récupération des contenus, visuels et éléments nécessaires. Chaque projet étant conçu sur mesure, cette validation intervient après échange et cadrage initial.
              </p>
            </div>

            <PaymentSummaryCard
              config={getDepositConfig(offerId)}
              showAmount={getDepositConfig(offerId).amountCents != null}
            />

            <div className="mt-8 flex flex-col items-center gap-6">
              {getDepositConfig(offerId).amountCents != null && stripeReady ? (
                <>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <ValidateLaunchButton offerId={offerId} label="Valider le lancement" variant="primary" />
                    <ValidateLaunchButton offerId={offerId} label="Payer l’acompte" variant="secondary" />
                  </div>
                  <p className="text-center text-sm text-slate-500">
                    Vous serez redirigé vers notre partenaire de paiement sécurisé.
                  </p>
                </>
              ) : getDepositConfig(offerId).amountCents != null && !stripeReady ? (
                <div className="text-center">
                  <p className="text-slate-300">
                    Le paiement en ligne sera bientôt disponible. En attendant, nous vous enverrons un lien de paiement après validation du devis.
                  </p>
                  <CTA href="/formulaire" variant="primary" className="mt-4">
                    Nous contacter pour finaliser
                  </CTA>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-slate-300">
                    Pour un projet personnalisé, l’acompte est défini dans le devis que nous vous avons adressé. Nous vous enverrons un lien de paiement dédié.
                  </p>
                  <CTA href="/contact" variant="primary" className="mt-4">
                    Reprendre contact
                  </CTA>
                </div>
              )}
            </div>
          </div>
        </Section>

        <Section
          title="Pas encore de devis ?"
          subtitle="Décrivez votre projet, on revient vers vous rapidement."
        >
          <div className="flex flex-wrap justify-center gap-4">
            <CTA href="/formulaire" variant="primary">
              Décrire mon projet
            </CTA>
            <CTA href="/contact" variant="outline">
              Nous contacter
            </CTA>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Règlement"
        title="Accéder à votre espace"
        description="Saisissez l’identifiant client reçu par email après votre demande de devis."
      />
      <Section>
        <ClientIdAccessForm />
      </Section>
      <Section
        title="Pas encore de devis ?"
        subtitle="Décrivez votre projet, on revient vers vous rapidement."
        className="bg-[#F5F4F0]"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <CTA href="/formulaire" variant="primary">
            Décrire mon projet
          </CTA>
          <CTA href="/contact" variant="outline">
            Nous contacter
          </CTA>
        </div>
      </Section>
    </>
  );
}

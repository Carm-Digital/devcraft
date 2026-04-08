import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Conditions générales de vente | DevCraft",
  description: "Conditions générales de vente des prestations DevCraft.",
};

export default function CGVPage() {
  return (
    <>
      <PageHero
        eyebrow="Légal"
        title="Conditions générales de vente"
        description="Modalités applicables aux prestations de création de sites web proposées par DevCraft."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-slate-700">
          <p className="italic text-[#00D4FF]">[À compléter : SIRET, adresse]</p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl first:mt-0">Objet</h2>
          <p>
            Les présentes conditions générales de vente encadrent les prestations de{" "}
            <strong className="text-[#0d0f14]">création de sites web sur mesure</strong> réalisées par DevCraft pour ses
            clients professionnels et particuliers.
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Devis</h2>
          <p>
            Tout projet fait l’objet d’un <strong className="text-[#0d0f14]">devis préalable</strong>, établi sur la base
            des besoins exprimés. L’acceptation d’un devis vaut commande ; la simple demande d’information ou l’émission
            d’un devis reste <strong className="text-[#0d0f14]">sans engagement</strong> tant qu’il n’a pas été validé par
            le client selon les modalités indiquées sur le devis.
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Paiement</h2>
          <p>
            Un <strong className="text-[#0d0f14]">acompte</strong> peut être demandé au démarrage des travaux ; le montant
            et les modalités sont précisés dans le devis. Le <strong className="text-[#0d0f14]">solde</strong> est réglé à la
            livraison du site ou selon l’échéancier convenu dans le devis.
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Droit de rétractation</h2>
          <p>
            Pour les <strong className="text-[#0d0f14]">particuliers</strong>, le droit légal de rétractation de{" "}
            <strong className="text-[#0d0f14]">14 jours</strong> peut s’appliquer lorsque la réglementation applicable le
            prévoit, sous réserve des exceptions prévues par la loi, notamment lorsque l’exécution de la prestation a
            commencé <strong className="text-[#0d0f14]">avec votre accord exprès</strong> avant la fin du délai de
            rétractation.
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Propriété du livrable</h2>
          <p>
            Le site livré devient la <strong className="text-[#0d0f14]">propriété du client</strong> après{" "}
            <strong className="text-[#0d0f14]">paiement intégral</strong> des sommes dues au titre de la prestation, dans
            les conditions définies au devis (éléments propriétaires, licences tierces, etc.).
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Responsabilité</h2>
          <p>
            DevCraft ne saurait être tenu responsable des contenus (textes, images, informations légales, etc.) fournis
            par le client ou intégrés sur sa demande. Le client garantit disposer des droits nécessaires sur les éléments
            transmis.
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Litiges</h2>
          <p>
            Le droit <strong className="text-[#0d0f14]">français</strong> est applicable. En cas de litige, les tribunaux
            compétents sont ceux du ressort de{" "}
            <span className="italic text-[#00D4FF]">[À compléter : ville]</span>, sous réserve des règles d’ordre public
            applicables.
          </p>
        </div>
      </Section>
    </>
  );
}

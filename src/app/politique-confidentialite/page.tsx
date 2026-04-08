import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Politique de confidentialité | DevCraft",
  description: "Politique de confidentialité et protection des données personnelles — DevCraft.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Légal"
        title="Politique de confidentialité"
        description="Comment nous collectons, utilisons et protégeons vos données personnelles, conformément au RGPD."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-slate-700">
          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl first:mt-0">
            Responsable du traitement
          </h2>
          <p>
            Le responsable du traitement des données est <strong className="text-[#0d0f14]">DevCraft</strong>. Pour toute
            question relative à vos données :{" "}
            <a
              href="mailto:devcraft.store@gmail.com"
              className="font-medium text-[#00D4FF] underline-offset-2 hover:underline"
            >
              devcraft.store@gmail.com
            </a>
            .
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Données collectées</h2>
          <p>
            Nous collectons notamment : nom, prénom, adresse e-mail et numéro de téléphone lorsque vous nous les
            communiquez via nos formulaires de contact ou de demande de devis, ainsi que toute information complémentaire
            que vous choisissez de joindre à votre message.
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Finalités</h2>
          <p>
            Ces données sont utilisées pour répondre à vos demandes d’information, étudier votre projet, vous recontacter
            dans le cadre d’un devis ou d’un échange commercial, et assurer le suivi de votre demande.
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Base légale</h2>
          <p>
            Le traitement repose notamment sur notre intérêt légitime à répondre aux sollicitations professionnelles, et
            sur votre consentement explicite lorsque celui-ci est recueilli via une case à cocher (par exemple pour
            l’acceptation de cette politique ou des conditions associées au formulaire).
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Durée de conservation</h2>
          <p>
            Les données issues des formulaires sont conservées au maximum <strong className="text-[#0d0f14]">un an</strong>{" "}
            à compter du dernier échange, sauf obligation légale contraire ou nécessité liée à la relation contractuelle.
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Destinataires et sous-traitants</h2>
          <p>
            Vos données peuvent être transmises à nos prestataires techniques dans la stricte mesure nécessaire à la
            prestation : <strong className="text-[#0d0f14]">Resend</strong> pour l’envoi des e-mails,{" "}
            <strong className="text-[#0d0f14]">Vercel KV</strong> pour le stockage lorsque cette fonctionnalité est activée,
            et <strong className="text-[#0d0f14]">Stripe</strong> pour le traitement des paiements lorsque vous passe par
            un parcours de paiement. Ces acteurs traitent les données conformément à leurs propres engagements et aux
            exigences du RGPD.
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Vos droits</h2>
          <p>
            Conformément au règlement européen sur la protection des données, vous disposez d’un droit d’accès, de
            rectification, d’effacement, de limitation du traitement, de portabilité et d’opposition dans les conditions
            prévues par la loi. Pour exercer ces droits, écrivez-nous à{" "}
            <a
              href="mailto:devcraft.store@gmail.com"
              className="font-medium text-[#00D4FF] underline-offset-2 hover:underline"
            >
              devcraft.store@gmail.com
            </a>
            .
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Réclamation</h2>
          <p>
            Vous pouvez introduire une réclamation auprès de la CNIL sur{" "}
            <a
              href="https://www.cnil.fr"
              className="font-medium text-[#00D4FF] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              cnil.fr
            </a>
            .
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Cookies</h2>
          <p>
            Lorsque vous utilisez un parcours de paiement, <strong className="text-[#0d0f14]">Stripe</strong> peut déposer
            des cookies techniques nécessaires au bon fonctionnement et à la sécurité du paiement. Vous pouvez paramétrer
            votre navigateur pour refuser certains cookies, dans la mesure permise par les fonctionnalités du site.
          </p>
        </div>
      </Section>
    </>
  );
}

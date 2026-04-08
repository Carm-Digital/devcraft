import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Mentions légales | DevCraft",
  description: "Mentions légales du site DevCraft, agence web.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Légal"
        title="Mentions légales"
        description="Informations relatives à l’éditeur du site, à l’hébergement et aux droits de propriété intellectuelle."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-slate-700">
          <p>
            <strong className="text-[#0d0f14]">Éditeur du site :</strong> DevCraft —{" "}
            <span className="italic text-[#00D4FF]">[À compléter : Nom Prénom ou Raison sociale]</span>,{" "}
            <span className="italic text-[#00D4FF]">[Adresse]</span>, SIRET{" "}
            <span className="italic text-[#00D4FF]">[À compléter]</span>.
          </p>

          <p>
            <strong className="text-[#0d0f14]">Email :</strong>{" "}
            <a
              href="mailto:devcraft.store@gmail.com"
              className="font-medium text-[#00D4FF] underline-offset-2 hover:underline"
            >
              devcraft.store@gmail.com
            </a>
          </p>

          <p>
            <strong className="text-[#0d0f14]">Directeur de la publication :</strong>{" "}
            <span className="italic text-[#00D4FF]">[À compléter]</span>
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Hébergement</h2>
          <p>
            Le site est hébergé par <strong className="text-[#0d0f14]">Vercel Inc.</strong>, 340 Pine Street, Suite 701,
            San Francisco, CA 94104, USA —{" "}
            <a
              href="https://vercel.com"
              className="font-medium text-[#00D4FF] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              vercel.com
            </a>
            .
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus présents sur ce site (textes, visuels, structure, éléments graphiques, marque DevCraft,
            etc.) est la propriété de DevCraft ou fait l’objet d’une autorisation d’utilisation. Toute reproduction,
            représentation, modification ou exploitation non autorisée est interdite.
          </p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold text-[#0d0f14] sm:text-2xl">Limitation de responsabilité</h2>
          <p>
            DevCraft s’efforce d’assurer l’exactitude et la mise à jour des informations publiées sur ce site. Malgré tout
            le soin apporté, des erreurs ou omissions peuvent subsister : l’éditeur ne saurait être tenu responsable des
            conséquences liées à une interprétation ou une utilisation des informations. Les liens externes sont fournis
            à titre informatif ; leur contenu relève de la responsabilité de leurs éditeurs respectifs.
          </p>
        </div>
      </Section>
    </>
  );
}

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Section from "@/components/Section";
import QualificationForm from "@/components/QualificationForm";
import CTA from "@/components/CTA";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const qualificationHref =
    source === "demander-mon-projet"
      ? "/qualification?source=demander-mon-projet#formulaire"
      : "/qualification#formulaire";

  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0e1a] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Contact
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Chaque projet est différent. Pour démarrer, nous avons besoin d’échanger avec vous afin de comprendre précisément vos besoins, le contenu à intégrer, les visuels, les fonctionnalités attendues et le rendu souhaité.
          </p>
          <p className="mt-4 text-slate-400">
            Choisissez l’offre qui correspond à votre besoin, remplissez le formulaire ci-dessous ou écrivez-nous à contact@devcraft.fr. Nous vous recontactons sous 24–48 h ouvrées pour valider les détails avant lancement.
          </p>
        </div>
      </section>

      <Section id="contact" className="bg-[#f8fafc]">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-slate-600 text-center sm:text-left">
            Plus votre demande est précise, plus nous pourrons vous proposer une solution adaptée.
          </p>
          <div className="mb-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            <CTA href={qualificationHref} variant="primary">
              Demander un devis
            </CTA>
            <CTA href={qualificationHref} variant="secondary">
              Parler de mon projet
            </CTA>
            <CTA href={qualificationHref} variant="outline">
              Lancer mon projet
            </CTA>
          </div>
          <Suspense fallback={<div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center text-slate-500">Chargement du formulaire…</div>}>
            <QualificationForm mode="contact" />
          </Suspense>
        </div>
      </Section>
    </>
  );
}

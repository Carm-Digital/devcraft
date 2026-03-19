import type { Metadata } from "next";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import ProcessSteps from "@/components/ProcessSteps";
import ExchangeForm from "@/components/ExchangeForm";
import Image from "next/image";
import { OFFERS } from "@/lib/offers";
import RealizationPreviewModalButton from "@/components/RealizationPreviewModalButton";
import HomeProofStats from "@/components/HomeProofStats";

export const metadata: Metadata = {
  title: "Création de site web professionnel en Île-de-France | DevCraft",
  description:
    "DevCraft crée votre site web professionnel en moins de 7 jours. Vitrine, e-commerce, sur mesure. Devis gratuit sous 24h.",
};

export default function Home() {
  return (
    <>
      {/* Hero — bleu nuit, doré, impact premium */}
      <section className="relative min-h-[85vh] overflow-hidden bg-[#0a0e1a] px-4 pt-20 pb-28 sm:px-6 sm:pt-28 sm:pb-36 lg:px-8">
        {/* Dégradé + bleu électrique très subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050815] via-[#0d1324] to-[#050815]" />
        <div className="hero-gradient-animated absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.16),transparent)]" />
        {/* Transition courbe vers la section suivante */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#f8fafc] rounded-t-[3rem] sm:rounded-t-[4rem]" />
        {/* Glow discret doré */}
        <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="animate-fade-up font-display text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/90 sm:text-sm">
            DevCraft · Agence web
          </p>
          <div className="relative inline-block">
            <div className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-full bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_60%)] blur-3xl" />
            <h1 className="animate-fade-up animate-delay-1 font-display mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Un design sur mesure{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                qui convertit
              </span>
            </h1>
          </div>
          <p className="animate-fade-up animate-delay-2 mt-6 text-xl text-slate-300 sm:text-2xl">
            Votre site livré en moins de 7 jours. Design sur mesure, optimisé mobile, prêt à convertir.
          </p>
          <p className="animate-fade-up animate-delay-3 mx-auto mt-4 max-w-2xl text-lg text-slate-300/90">
            Nous créons des sites qui mettent en avant votre activité, génèrent des prises de contact et soutiennent vos ventes au quotidien.
          </p>
          <div className="animate-fade-up animate-delay-4 mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <CTA href="/qualification" variant="primary" className="hero-cta-animated">
                Recevoir mon devis gratuit
              </CTA>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-[#0a0e1a]/30 px-4 py-2 text-xs font-semibold text-amber-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Places limitées cette semaine
              </span>
            </div>
            <CTA href="#realisations" variant="outline" dark className="hero-cta-animated">
              Voir nos réalisations
            </CTA>
            <CTA href="#echange" variant="outline" dark className="hero-cta-animated">
              Parler de mon besoin
            </CTA>
          </div>
          <div className="animate-fade-up animate-delay-5 mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
                ✓
              </span>
              Livraison en 7 jours
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
                ✓
              </span>
              +10 clients satisfaits
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
                ✓
              </span>
              Paiement après validation
            </span>
          </div>
        </div>
      </section>

      {/* Nos offres — section pricing sous la hero */}
      <Section
        id="offres"
        title="Nos offres"
        subtitle="Des solutions adaptées à tous les budgets"
        dark
      >
        <div className="grid gap-6 md:grid-cols-3">
          {/* Offre 1 : Site vitrine */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-lg sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">{OFFERS.vitrine.label}</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">{OFFERS.vitrine.tagline}</h3>
            <p className="mt-4 font-display text-3xl font-bold text-amber-300">{OFFERS.vitrine.price}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-200">
              {OFFERS.vitrine.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="mt-6">
              <CTA href="/qualification?offer=vitrine#formulaire" variant="primary" dark className="w-full">
                Choisir cette offre
              </CTA>
            </div>
            <p className="mt-4 text-sm text-slate-300/90">Devis gratuit · Sans engagement</p>
          </div>

          {/* Offre 2 : Site complet (mise en avant) */}
          <div className="relative flex flex-col rounded-2xl border border-amber-400/80 bg-gradient-to-b from-amber-500/25 via-amber-500/10 to-transparent p-6 shadow-md ring-2 ring-amber-300/60 transition hover:-translate-y-1.5 hover:shadow-xl sm:p-7">
            <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-amber-400 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#0a0e1a] shadow-md">
              {OFFERS.complet.badge?.text ?? "Plus choisie"}
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300 truncate">{OFFERS.complet.label}</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">{OFFERS.complet.tagline}</h3>
            <p className="mt-4 font-display text-3xl font-bold text-amber-50">{OFFERS.complet.price}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-100">
              {OFFERS.complet.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="mt-6">
              <CTA href="/qualification?offer=complet#formulaire" variant="primary" dark className="w-full">
                Choisir cette offre
              </CTA>
            </div>
            <p className="mt-4 text-sm text-slate-200/90">Devis gratuit · Sans engagement</p>
          </div>

          {/* Offre 3 : Site avec abonnement */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-lg sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">{OFFERS.abonnement.label}</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">{OFFERS.abonnement.tagline}</h3>
            <p className="mt-4 font-display text-3xl font-bold text-amber-300">{OFFERS.abonnement.price}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-200">
              {OFFERS.abonnement.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="mt-6">
              <CTA href="/qualification?offer=abonnement#formulaire" variant="secondary" dark className="w-full">
                Choisir cette offre
              </CTA>
            </div>
            <p className="mt-4 text-sm text-slate-300/90">Devis gratuit · Sans engagement</p>
          </div>
        </div>
      </Section>

      {/* Bandeau devis gratuit */}
      <section className="border-y border-amber-200/70 bg-amber-50/80 py-4">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-4 text-center text-sm sm:px-6 lg:px-8">
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Devis gratuit — Sans engagement
          </span>
          <p className="text-slate-800">
            Expliquez-nous votre projet, nous revenons vers vous en moins de 24&nbsp;h avec une première estimation.
          </p>
        </div>
      </section>

      {/* Pourquoi choisir DevCraft */}
      <Section
        id="pourquoi"
        title="Pourquoi choisir DevCraft"
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Un design pensé pour votre secteur, pas un template",
              desc: "Restaurant, coach, artisan, consultant — chaque site est adapté à votre activité",
              icon: "M9.75 17L9 20l-1 1 4-1 4 1-1-1-.75-3M8 4h8l-1 5H9L8 4z",
            },
            {
              title: "Votre site en ligne en moins de 7 jours",
              desc: "Pour les sites vitrines et landing pages, nous respectons ce délai",
              icon: "M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Un seul interlocuteur du début à la fin",
              desc: "Pas de passage entre plusieurs équipes — vous échangez directement avec le créateur",
              icon: "M18 14a3 3 0 11-6 0 3 3 0 016 0zm-9-4a3 3 0 11-6 0 3 3 0 016 0zm0 9a5 5 0 00-8 0m17.5-2.5A4.5 4.5 0 0015 21m0-14a3 3 0 110-6 3 3 0 010 6z",
            },
            {
              title: "Conçu pour générer des prises de contact",
              desc: "Structure, textes et boutons pensés pour que vos visiteurs passent à l'action",
              icon: "M9 2h6a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2zm0 14h6",
            },
            {
              title: "Prix transparent, sans surprise",
              desc: "Tarifs affichés, devis clair, acompte uniquement après validation",
              icon: "M7 4h10a2 2 0 0 1 2 2v14l-2-1-2 1-2-1-2 1-2-1-2 1V6a2 2 0 0 1 2-2z",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg sm:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-[#0a0e1a]">{item.title}</h3>
              <p className="mt-2 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <CTA href="/#contact" variant="secondary">
            Parler de mon projet
          </CTA>
        </div>
      </Section>

      {/* Nos services */}
      <Section
        id="services"
        title="Nos services"
        subtitle="Quatre types d'offres pour générer plus de visibilité, de demandes et de ventes."
        dark
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { title: "Site vitrine", desc: "Présentez votre activité, votre entreprise ou votre commerce avec clarté et professionnalisme.", href: "/services#vitrine" },
            { title: "Site complet", desc: "Plus de pages, une structure riche et des fonctionnalités avancées pour une présence en ligne solide.", href: "/services#complet" },
            { title: "Site avec abonnement", desc: "Espace membre, accès récurrent, formules mensuelles : pour les projets qui évoluent avec vos utilisateurs.", href: "/services#abonnement" },
            { title: "Site personnalisé", desc: "Projet 100 % sur mesure : design et fonctionnalités pensés pour vos besoins spécifiques.", href: "/services#personnalise" },
          ].map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/30 hover:bg-white/10"
            >
              <h3 className="font-display text-lg font-semibold text-white group-hover:text-amber-300">{item.title}</h3>
              <p className="mt-2 flex-1 text-slate-300">{item.desc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-amber-400">
                Discuter de ce projet
                <svg className="ml-1 h-4 w-4 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CTA href="/services" variant="primary" dark>
            Voir toutes nos offres
          </CTA>
          <CTA href="/qualification" variant="secondary" dark>
            Demander un devis
          </CTA>
        </div>
      </Section>

      {/* Comment ça marche */}
      <ProcessSteps />

      {/* Réalisations */}
      <Section
        id="realisations"
        title="Nos réalisations"
        subtitle="Exemples de sites que nous pouvons créer pour nos clients"
        className="bg-white"
      >
        <div className="mx-auto mb-6 max-w-3xl text-center text-sm text-slate-600">
          Quelques projets types pour illustrer le style de sites que nous réalisons. Chaque site est ensuite adapté à votre activité, votre identité visuelle et vos objectifs.
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Site restaurant moderne",
              type: "Site restaurant",
              desc: "Site pour restaurant avec menu en ligne, réservation et design appétissant.",
              image: "/restaurant.jpg",
              ideal: "Idéal pour restaurants",
            },
            {
              name: "Site coach sportif",
              type: "Site coach sportif",
              desc: "Site pour coach avec prise de rendez-vous et présentation des services.",
              image: "/coach.jpg",
              ideal: "Idéal pour coachs",
            },
            {
              name: "Site artisan professionnel",
              type: "Site artisan",
              desc: "Site pour artisan avec contact rapide et génération de clients.",
              image: "/artisan.jpg",
              ideal: "Idéal pour artisans",
            },
          ].map((project) => (
            <article
              key={project.name}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative border-b border-slate-200 bg-slate-900">
                <div className="mx-auto max-w-full px-4 py-3">
                  {/* Barre de navigation browser */}
                  <div className="mb-2 flex items-center justify-between text-slate-500">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-600" />
                      <span className="h-2 w-2 rounded-full bg-slate-600" />
                      <span className="h-2 w-2 rounded-full bg-slate-600" />
                    </div>
                    <div className="mx-3 h-4 flex-1 rounded-full bg-slate-800/80" />
                    <div className="h-4 w-10 rounded-full bg-slate-800/80" />
                  </div>

                  {/* Image site web */}
                  <div className="overflow-hidden rounded-xl border border-slate-800/60 bg-slate-900">
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={640}
                      height={400}
                      className="h-40 w-full object-cover transition duration-300 ease-out group-hover:scale-[1.03] sm:h-44 lg:h-48"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
                  {project.type}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#0a0e1a]">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {project.desc}
                </p>
                <p className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <span className="text-emerald-600">✔</span>
                  {project.ideal}
                </p>
                <RealizationPreviewModalButton imageSrc={project.image} imageAlt={project.name} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Badges confiance */}
      <section className="border-y border-slate-200/80 bg-[#f8fafc] py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-500">Ce qui compte pour nous</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-8 text-slate-600">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Projet sur mesure</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Échange avant devis</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Accompagnement humain</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Sites responsive</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Livraison soignée</span>
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <div className="border-b border-slate-200/80 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-[#0a0e1a]">Restaurant</span>
          <span className="text-sm text-slate-400">·</span>
          <span className="text-sm font-semibold text-[#0a0e1a]">Coach</span>
          <span className="text-sm text-slate-400">·</span>
          <span className="text-sm font-semibold text-[#0a0e1a]">Artisan</span>
          <span className="text-sm text-slate-400">·</span>
          <span className="text-sm font-semibold text-[#0a0e1a]">Consultant</span>
          <span className="text-sm text-slate-400">·</span>
          <span className="text-sm font-semibold text-[#0a0e1a]">E-commerce</span>
        </div>
      </div>

      {/* Avis clients & preuves sociales */}
      <Section
        id="avis"
        title="Ils nous font confiance"
        subtitle="Quelques retours de clients qui utilisent leur site DevCraft au quotidien."
        className="bg-white"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              initial: "K",
              name: "Karim",
              cityLine: "Restaurant, Paris 15e",
              text: "Très satisfait du site, j’ai beaucoup plus de clients depuis. Travail rapide et professionnel.",
            },
            {
              initial: "S",
              name: "Sarah",
              cityLine: "Coach sportif, Lyon",
              text: "Le site est moderne et m’aide à trouver de nouveaux clients chaque semaine.",
            },
            {
              initial: "D",
              name: "David",
              cityLine: "Artisan, Bordeaux",
              text: "Simple, efficace, j’ai des demandes tous les jours grâce au site.",
            },
          ].map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-1 text-amber-500" aria-hidden>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <blockquote className="mt-3 flex-1 text-slate-700">
                « {t.text} »
              </blockquote>
              <figcaption className="mt-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                      t.initial === "K"
                        ? "border-amber-200 bg-amber-50 text-amber-600"
                        : t.initial === "S"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                          : "border-indigo-200 bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    <span className="font-display font-semibold">{t.initial}</span>
                  </div>
                  <div className="min-w-0">
                    <cite className="font-display not-italic font-semibold text-[#0a0e1a]">{t.name}</cite>
                    <p className="mt-0.5 truncate text-sm text-slate-600">{t.cityLine}</p>
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <HomeProofStats />

        <p className="mt-6 text-center text-sm text-slate-600">
          Nous accompagnons chaque client de A à Z pour créer un site efficace et rentable.
        </p>
      </Section>

      {/* FAQ (aperçu) */}
      <Section
        id="faq"
        title="Questions fréquentes"
        subtitle="Quelques réponses pour avancer sereinement."
      >
        <div className="mx-auto max-w-2xl space-y-4">
          {[
            {
              q: "Combien de temps prend la création d'un site ?",
              a: "Un site livré en moins de 7 jours selon l’offre choisie et la disponibilité de vos contenus. Nous validons le planning lors de votre demande.",
            },
            {
              q: "Combien coûte un site web ?",
              a: "Les tarifs sont clairs : site vitrine (300 €), site complet (900 €), site avec abonnement (1 300 €). Pour un projet sur mesure, on vous propose un devis après échange.",
            },
            {
              q: "Le site est-il responsive ?",
              a: "Oui. Tous nos sites sont pensés pour s’afficher correctement sur ordinateur, tablette et mobile, avec une expérience utilisateur optimisée.",
            },
          ].map((faq) => (
            <details key={faq.q} className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-amber-100">
              <summary className="cursor-pointer font-display font-medium text-[#0a0e1a]">{faq.q}</summary>
              <p className="mt-2 text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CTA href="/faq" variant="outline">
            Voir toute la FAQ
          </CTA>
          <CTA href="/qualification" variant="primary">
            Discuter de mon besoin
          </CTA>
        </div>
      </Section>

      {/* Réserver un échange */}
      <Section
        id="echange"
        title="Réserver un échange"
        subtitle="Un appel ou une visio de quelques minutes pour voir si DevCraft est le bon partenaire pour votre projet."
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-slate-600">
            Formulaire court, pas de spam. Indiquez simplement vos coordonnées et un créneau qui vous convient, nous vous recontactons rapidement.
          </p>
          <ExchangeForm />
        </div>
      </Section>

      {/* Contact CTA */}
      <Section
        id="contact"
        title="Prêt à lancer votre projet ?"
        subtitle="Chaque projet est différent. Contactez-nous pour échanger sur vos besoins, vos contenus et le rendu souhaité. Nous vous répondrons pour définir ensemble la meilleure approche."
        dark
      >
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <CTA href="/qualification" variant="primary" dark>
            Demander un devis
          </CTA>
          <CTA href="/#contact" variant="secondary" dark>
            Parler de mon projet
          </CTA>
          <CTA href="/qualification" variant="outline" dark>
            Être recontacté
          </CTA>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Réponse sous 24–48 h ouvrées. Aucun engagement avant échange et devis.
        </p>
      </Section>
    </>
  );
}

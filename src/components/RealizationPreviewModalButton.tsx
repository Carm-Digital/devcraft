"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  imageSrc: string;
  imageAlt: string;
};

export default function RealizationPreviewModalButton({ imageSrc, imageAlt }: Props) {
  const [open, setOpen] = useState(false);

  const mailCta = useMemo(() => {
    // CTA fixe demandé : redirection vers /qualification
    return "/qualification";
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
      >
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
        Aperçu démo
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3">
              <p className="text-sm font-semibold text-[#0a0e1a]">Aperçu démo</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Fermer
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={1200}
                  height={800}
                  className="h-auto w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600">
                  Je veux un site similaire — on adapte le design à votre activité.
                </p>
                <Link
                  href={mailCta}
                  className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-[#0a0e1a] shadow-sm transition hover:bg-amber-400"
                  onClick={() => setOpen(false)}
                >
                  Je veux un site similaire
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


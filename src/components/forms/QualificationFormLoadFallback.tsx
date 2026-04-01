"use client";

import { useEffect, useState } from "react";

export default function QualificationFormLoadFallback() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const root = document.getElementById("qualification-form-root");
      // Si le conteneur n'existe pas, c'est que le formulaire ne s'est jamais rendu.
      if (!root) setShow(true);
    }, 4000);

    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-left text-slate-700">
      <p className="mb-3 font-medium text-slate-800">
        Le formulaire ne se charge pas ? Écrivez-nous directement :
      </p>
      <a
        href="mailto:devcraft.store@gmail.com"
        className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-[#0a0e1a] shadow-sm transition hover:bg-amber-400"
      >
        Écrire un email
      </a>
    </div>
  );
}


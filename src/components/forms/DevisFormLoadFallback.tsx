"use client";

import { useEffect, useState } from "react";

export default function DevisFormLoadFallback() {
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
    <div className="mt-6 rounded-2xl border border-[#00D4FF]/20 bg-[#00D4FF]/5 p-6 text-left text-slate-700">
      <p className="mb-3 font-medium text-slate-800">
        Le formulaire ne se charge pas ? Écrivez-nous directement :
      </p>
      <a
        href="mailto:devcraft.store@gmail.com"
        className="inline-flex items-center justify-center rounded-xl bg-[#00D4FF] px-5 py-2.5 text-sm font-semibold text-[#0d0f14] shadow-sm transition hover:bg-[#00D4FF]"
      >
        Écrire un email
      </a>
    </div>
  );
}

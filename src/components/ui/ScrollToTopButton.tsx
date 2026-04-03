"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 left-5 z-[60] flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/95 text-[#0d0f14] shadow-sm backdrop-blur transition hover:bg-white"
      aria-label="Remonter en haut"
    >
      ↑
    </button>
  );
}


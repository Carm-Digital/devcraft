"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedTargets = {
  deliveredInTime: number; // 100% (0..100)
  satisfaction: number; // 100% (0..100)
  days: number; // 7 jours (0..7)
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(Boolean(mq.matches));
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

export default function HomeProofStats() {
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);

  const targets = useMemo<AnimatedTargets>(
    () => ({
      deliveredInTime: 100,
      satisfaction: 100,
      days: 7,
    }),
    [],
  );

  const [deliveredInTime, setDeliveredInTime] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (started) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    if (reducedMotion) {
      // Lint: éviter setState synchrones dans l'effet.
      requestAnimationFrame(() => {
        setDeliveredInTime(targets.deliveredInTime);
        setSatisfaction(targets.satisfaction);
        setDays(targets.days);
      });
      return;
    }

    const duration = 1100; // ms
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easing (easeOutCubic)
      const eased = 1 - Math.pow(1 - t, 3);

      setDeliveredInTime(Math.round(targets.deliveredInTime * eased));
      setSatisfaction(Math.round(targets.satisfaction * eased));
      setDays(Math.round(targets.days * eased));

      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [reducedMotion, started, targets]);

  return (
    <div ref={wrapRef} className="mt-10 grid gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm sm:grid-cols-3 sm:text-left">
      <div className="space-y-1">
        <p className="font-display text-2xl font-semibold text-[#0a0e1a]">{deliveredInTime}%</p>
        <p className="text-sm text-slate-600">des sites livrés dans les délais</p>
      </div>
      <div className="space-y-1">
        <p className="font-display text-2xl font-semibold text-[#0a0e1a]">{satisfaction}%</p>
        <p className="text-sm text-slate-600">
          de clients satisfaits (sur 10+ projets)
        </p>
      </div>
      <div className="space-y-1">
        <p className="font-display text-2xl font-semibold text-[#0a0e1a]">
          {days} jours
        </p>
        <p className="text-sm text-slate-600">délai moyen site vitrine</p>
      </div>
    </div>
  );
}


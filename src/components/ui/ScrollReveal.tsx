"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number; // délai en ms (0, 100, 200, 300...)
  direction?: "up" | "left" | "right" | "none";
};

const HIDDEN: Record<NonNullable<ScrollRevealProps["direction"]>, string> = {
  up: "opacity-0 translate-y-6",
  left: "opacity-0 -translate-x-6",
  right: "opacity-0 translate-x-6",
  none: "opacity-0",
};

const VISIBLE: Record<NonNullable<ScrollRevealProps["direction"]>, string> = {
  up: "opacity-100 translate-x-0 translate-y-0",
  left: "opacity-100 translate-x-0 translate-y-0",
  right: "opacity-100 translate-x-0 translate-y-0",
  none: "opacity-100",
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dir = direction ?? "up";

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[600ms] ease-out ${
        visible ? VISIBLE[dir] : HIDDEN[dir]
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

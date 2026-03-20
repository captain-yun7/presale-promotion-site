"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal(revealClass = "haven-reveal") {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveals = el.querySelectorAll(`.${revealClass}`);
    if (!reveals.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [revealClass]);

  return ref;
}

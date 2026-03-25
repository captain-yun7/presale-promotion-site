"use client";

import { useState, useEffect } from "react";
import type { ThemeConfig } from "@/lib/types/project";

interface Props {
  theme: ThemeConfig;
  remainingUnits: number;
  message?: string;
  ctaTargetId: string;
}

export default function UrgencyBanner({ theme, remainingUnits, message, ctaTargetId }: Props) {
  const p = theme.prefix;
  const [dismissed, setDismissed] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = () => {
    const el = document.getElementById(ctaTargetId);
    if (el) {
      const offset = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(`--${p}-nav-h`) || "80"
      );
      window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
    }
  };

  if (dismissed) return null;

  return (
    <div className={`${p}-urgency-banner ${pulse ? "pulse" : ""}`}>
      <div className={`${p}-urgency-inner`}>
        <div className={`${p}-urgency-badge`}>
          <span className={`${p}-urgency-dot`} />
          마감임박
        </div>
        <span className={`${p}-urgency-text`}>
          {message || `선착순 ${remainingUnits}세대 특별분양 진행 중`}
          <strong> — 잔여 {remainingUnits}세대</strong>
        </span>
        <button className={`${p}-urgency-cta`} onClick={scrollToSection}>
          지금 신청하기
        </button>
        <button className={`${p}-urgency-close`} onClick={() => setDismissed(true)} aria-label="닫기">
          &times;
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useCallback } from "react";
import type { HeroConfig, ThemeConfig } from "@/lib/types/project";

interface Props {
  config: HeroConfig;
  theme: ThemeConfig;
}

export default function PremiumHero({ config, theme }: Props) {
  const p = theme.prefix;
  const heroVisualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth <= 1024) return;
    const onScroll = () => {
      const el = heroVisualRef.current;
      if (el && window.scrollY < window.innerHeight) {
        el.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(`--${p}-nav-h`) || "80"
      );
      window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
    }
  }, [p]);

  return (
    <section className={`${p}-hero`} id={`${p}-hero`}>
      <div className={`${p}-hero-bg`}>
        <div className={`${p}-hero-pattern`} />
      </div>
      <div className={`${p}-hero-visual`} ref={heroVisualRef}>
        <div className={`${p}-hero-visual-overlay`} />
        {config.backgroundImage ? (
          <div
            className={`${p}-hero-visual-inner`}
            style={{
              backgroundImage: `url(${config.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <div className={`${p}-hero-visual-inner`}>
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.15 }}>
              <rect x="30" y="40" width="60" height="120" rx="2" stroke="var(--haven-gold, #B8926A)" strokeWidth="1" />
              <rect x="110" y="20" width="60" height="140" rx="2" stroke="var(--haven-gold, #B8926A)" strokeWidth="1" />
              <line x1="0" y1="160" x2="200" y2="160" stroke="var(--haven-gold, #B8926A)" strokeWidth=".5" />
              <circle cx="60" cy="30" r="15" stroke="var(--haven-gold, #B8926A)" strokeWidth=".5" />
            </svg>
          </div>
        )}
      </div>

      <div className={`${p}-hero-content`}>
        <div className={`${p}-hero-label`}>{config.label}</div>
        <h1
          className={`${p}-hero-title`}
          dangerouslySetInnerHTML={{ __html: config.title }}
        />
        <p
          className={`${p}-hero-sub`}
          dangerouslySetInnerHTML={{ __html: config.subtitle }}
        />
        <div className={`${p}-hero-actions`}>
          <button
            className={`${p}-btn ${p}-btn-primary ${p}-btn-arrow`}
            onClick={() => scrollToSection(config.primaryCta.targetId)}
          >
            {config.primaryCta.label}
          </button>
          {config.secondaryCta && (
            <button
              className={`${p}-btn ${p}-btn-outline ${p}-btn-arrow`}
              onClick={() => scrollToSection(config.secondaryCta!.targetId)}
            >
              {config.secondaryCta.label}
            </button>
          )}
        </div>
      </div>

      <div className={`${p}-hero-scroll`}>
        <div className={`${p}-hero-scroll-line`} />
        Scroll
      </div>
    </section>
  );
}

"use client";

import { useCallback } from "react";
import type { CTAConfig, ThemeConfig } from "@/lib/types/project";

interface Props {
  config: CTAConfig;
  phone: string;
  theme: ThemeConfig;
}

export default function PremiumCTA({ config, phone, theme }: Props) {
  const p = theme.prefix;

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
    <section className={`${p}-cta`}>
      <div className={`${p}-cta-content ${p}-reveal`}>
        <div className={`${p}-section-label`}>{config.label}</div>
        <h2
          className={`${p}-section-title`}
          dangerouslySetInnerHTML={{ __html: config.title }}
        />
        <p className={`${p}-section-desc`}>{config.description}</p>
        <div className={`${p}-cta-actions`}>
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
        <div className={`${p}-cta-tel`}>
          <small>Consultation</small>
          {phone}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback } from "react";
import type { FooterConfig, ThemeConfig } from "@/lib/types/project";

interface Props {
  config: FooterConfig;
  theme: ThemeConfig;
}

export default function PremiumFooter({ config, theme }: Props) {
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
    <footer className={`${p}-footer`}>
      <div className={`${p}-footer-inner`}>
        <div className={`${p}-footer-top`}>
          <div className={`${p}-footer-brand`}>
            <span className={`${p}-logo`}>
              {config.brand} {config.brandSub && <em>{config.brandSub}</em>}
            </span>
            <p dangerouslySetInnerHTML={{ __html: config.info }} />
          </div>
          {config.columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button onClick={() => scrollToSection(link.targetId)}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`${p}-footer-bottom`}>
          <div className={`${p}-footer-legal`}>
            <span>서비스 이용약관</span>
            <span>개인정보처리방침</span>
          </div>
          <div className={`${p}-footer-copy`}>{config.copyright}</div>
        </div>
      </div>
    </footer>
  );
}

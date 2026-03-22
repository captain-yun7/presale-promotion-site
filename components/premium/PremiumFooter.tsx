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
          <p className={`${p}-footer-company-line`}>
            Jpex Studio | 대표: 윤지수 | 사업자등록번호: 560-45-01327 | 문의: 1666-0952
          </p>
          <p className={`${p}-footer-disclaimer`}>
            ※ 본 홍보물은 소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있으며, 사업계획승인 변경 및 신고 등에 따라 변경될 수 있습니다.
            자세한 내용은 분양 카탈로그 및 분양계약서를 참조하시기 바랍니다.
          </p>
          <p className={`${p}-footer-copy`}>© Jpex Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

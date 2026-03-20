"use client";

import Image from "next/image";
import type { OverviewConfig, ThemeConfig } from "@/lib/types/project";

interface Props {
  config: OverviewConfig;
  theme: ThemeConfig;
}

export default function PremiumOverview({ config, theme }: Props) {
  const p = theme.prefix;
  const images = config.images || [];

  return (
    <section className={`${p}-overview`} id={`${p}-overview`}>
      <div className={`${p}-overview-grid`}>
        <div className={`${p}-overview-left ${p}-reveal`}>
          <div className={`${p}-section-label`}>Overview</div>
          <h2
            className={`${p}-section-title`}
            dangerouslySetInnerHTML={{ __html: config.title }}
          />
          <p className={`${p}-section-desc`}>{config.description}</p>

          <div className={`${p}-overview-info`}>
            {config.infoItems.map((item, i) => (
              <div
                key={item.label}
                className={`${p}-overview-info-item ${p}-reveal ${p}-reveal-delay-${i + 1}`}
              >
                <div className={`${p}-overview-info-label`}>{item.label}</div>
                <div className={`${p}-overview-info-value`}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${p}-overview-right`}>
          {images.length > 0 ? (
            images.map((img, i) => (
              <div
                key={i}
                className={`${p}-overview-img ${p}-reveal ${i > 0 ? `${p}-reveal-delay-${i + 1}` : ""}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--haven-r, 8px)" }}
                />
              </div>
            ))
          ) : (
            <>
              <div className={`${p}-overview-img ${p}-reveal`}>
                <div className={`${p}-overview-img-placeholder`}>
                  <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                    <rect x="4" y="8" width="18" height="32" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="26" y="4" width="18" height="36" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="0" y1="40" x2="48" y2="40" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  투시도 이미지
                </div>
              </div>
              <div className={`${p}-overview-img ${p}-reveal ${p}-reveal-delay-2`}>
                <div className={`${p}-overview-img-placeholder`}>
                  <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                    <path d="M4 40 L24 8 L44 40 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="36" cy="12" r="4" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  조감도 이미지
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

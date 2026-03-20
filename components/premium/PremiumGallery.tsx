"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import type { GalleryConfig, ThemeConfig } from "@/lib/types/project";

interface Props {
  config: GalleryConfig;
  theme: ThemeConfig;
}

export default function PremiumGallery({ config, theme }: Props) {
  const p = theme.prefix;
  const [tab, setTab] = useState("all");
  const sliderRef = useRef<HTMLDivElement>(null);

  const filtered = tab === "all"
    ? config.items
    : config.items.filter((item) => item.category === tab);

  const scrollGallery = useCallback((dir: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slide = slider.querySelector(`.${p}-gallery-slide`) as HTMLElement;
    const w = slide ? slide.offsetWidth + 20 : 300;
    slider.scrollBy({ left: dir * w, behavior: "smooth" });
  }, [p]);

  return (
    <section className={`${p}-gallery`} id={`${p}-gallery`}>
      <div className={`${p}-gallery-header ${p}-reveal`}>
        <div className={`${p}-section-label`}>Gallery</div>
        <h2
          className={`${p}-section-title`}
          dangerouslySetInnerHTML={{ __html: config.title }}
        />
        <p className={`${p}-section-desc`}>{config.description}</p>
      </div>

      <div className={`${p}-gallery-tabs ${p}-reveal`}>
        {config.tabs.map((t) => (
          <button
            key={t}
            className={`${p}-gallery-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className={`${p}-gallery-slider`} ref={sliderRef}>
        {filtered.map((item, i) => (
          <div key={`${item.category}-${i}`} className={`${p}-gallery-slide`}>
            {item.image ? (
              <Image
                src={item.image}
                alt={item.label}
                width={600}
                height={400}
                className={`${p}-gallery-slide-img`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div className={`${p}-gallery-slide-placeholder`}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="12" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="20" cy="24" r="4" stroke="currentColor" />
                  <path d="M8 36 L20 28 L32 34 L40 28" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {item.label}
              </div>
            )}
            <div className={`${p}-gallery-slide-caption`}>{item.caption}</div>
          </div>
        ))}
      </div>

      <div className={`${p}-gallery-nav`}>
        <button onClick={() => scrollGallery(-1)} aria-label="이전">←</button>
        <button onClick={() => scrollGallery(1)} aria-label="다음">→</button>
      </div>
    </section>
  );
}

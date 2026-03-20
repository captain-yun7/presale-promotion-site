"use client";

import type { ServiceItem, ThemeConfig } from "@/lib/types/project";

interface Props {
  services: ServiceItem[];
  title: string;
  description: string;
  theme: ThemeConfig;
}

export default function PremiumServices({ services, title, description, theme }: Props) {
  const p = theme.prefix;

  return (
    <section className={`${p}-premium`} id={`${p}-premium`}>
      <div className={`${p}-premium-header ${p}-reveal`}>
        <div className={`${p}-section-label`} style={{ justifyContent: "center" }}>
          <span style={{ width: 24, height: 1, background: `var(--${p}-gold)`, display: "inline-block" }} />
          Premium Services
          <span style={{ width: 24, height: 1, background: `var(--${p}-gold)`, display: "inline-block" }} />
        </div>
        <h2
          className={`${p}-section-title`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className={`${p}-section-desc`} style={{ maxWidth: 520, margin: "16px auto 0" }}>
          {description}
        </p>
      </div>

      <div className={`${p}-premium-grid`}>
        {services.map((s, i) => (
          <div
            key={s.num}
            className={`${p}-premium-card ${p}-reveal ${i > 0 ? `${p}-reveal-delay-${i}` : ""}`}
          >
            <div
              className={`${p}-premium-icon`}
              dangerouslySetInnerHTML={s.icon.startsWith("<") ? { __html: s.icon } : undefined}
            >
              {s.icon.startsWith("<") ? undefined : s.icon}
            </div>
            <div className={`${p}-premium-num`}>{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

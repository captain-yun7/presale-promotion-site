"use client";

import type { LocationConfig, ThemeConfig } from "@/lib/types/project";

interface Props {
  config: LocationConfig;
  theme: ThemeConfig;
}

export default function PremiumLocation({ config, theme }: Props) {
  const p = theme.prefix;
  const query = encodeURIComponent(config.address);

  return (
    <section className={`${p}-location`} id={`${p}-location`}>
      <div className={`${p}-location-inner`}>
        <div className={`${p}-location-header ${p}-reveal`}>
          <div className={`${p}-section-label`}>Location</div>
          <h2
            className={`${p}-section-title`}
            dangerouslySetInnerHTML={{ __html: config.title }}
          />
        </div>

        <div className={`${p}-location-content`}>
          <div className={`${p}-location-map ${p}-reveal`}>
            <iframe
              src={`https://map.kakao.com/?q=${query}`}
              style={{ width: "100%", height: "100%", minHeight: 300, border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className={`${p}-location-info ${p}-reveal ${p}-reveal-delay-1`}>
            <h3>{config.address}</h3>

            <div className={`${p}-location-detail`}>
              {config.details.map((d) => (
                <div key={d.label} className={`${p}-location-detail-item`}>
                  <div className={`${p}-location-detail-icon`}>{d.icon}</div>
                  <div>
                    <div className={`${p}-location-detail-label`}>{d.label}</div>
                    <div className={`${p}-location-detail-value`}>{d.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {config.infra && (
              <div className={`${p}-location-infra`}>
                {config.infra.map((item, i) => (
                  <div
                    key={item.label}
                    className={`${p}-location-infra-item ${p}-reveal ${p}-reveal-delay-${i}`}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

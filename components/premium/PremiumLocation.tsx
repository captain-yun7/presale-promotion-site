"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import type { LocationConfig, ThemeConfig } from "@/lib/types/project";

interface Props {
  config: LocationConfig;
  theme: ThemeConfig;
}

export default function PremiumLocation({ config, theme }: Props) {
  const p = theme.prefix;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  const initMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const naver = (window as unknown as Record<string, unknown>).naver as {
      maps: {
        Map: new (el: HTMLElement, opts: Record<string, unknown>) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (opts: Record<string, unknown>) => unknown;
      };
    } | undefined;
    if (!naver?.maps) return;

    const center = new naver.maps.LatLng(config.coords.lat, config.coords.lng);
    const map = new naver.maps.Map(mapRef.current, {
      center,
      zoom: 16,
      zoomControl: true,
    });
    new naver.maps.Marker({ position: center, map });
    mapInstanceRef.current = map;
  };

  useEffect(() => {
    // 이미 스크립트가 로드되어 있으면 바로 초기화
    const naver = (window as unknown as Record<string, unknown>).naver as Record<string, unknown> | undefined;
    if (naver?.maps) {
      initMap();
    }
  });

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={initMap}
      />
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
              <div
                ref={mapRef}
                style={{ width: "100%", height: "100%", minHeight: 300 }}
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
    </>
  );
}

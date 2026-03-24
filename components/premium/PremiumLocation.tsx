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
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    const createMap = (location: naver.maps.LatLng) => {
      if (!mapRef.current) return;

      const map = new window.naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });
      mapInstanceRef.current = map;

      new window.naver.maps.Marker({
        position: location,
        map,
      });
    };

    const initMap = () => {
      if (!mapRef.current || !window.naver) return;

      if (window.naver.maps.Service) {
        window.naver.maps.Service.geocode(
          { query: config.address },
          (status: naver.maps.Service.Status, response: naver.maps.Service.GeocodeResponse) => {
            if (status === window.naver.maps.Service.Status.OK && response.v2.addresses.length > 0) {
              const result = response.v2.addresses[0];
              const location = new window.naver.maps.LatLng(
                parseFloat(result.y),
                parseFloat(result.x)
              );
              createMap(location);
            } else {
              const location = new window.naver.maps.LatLng(config.coords.lat, config.coords.lng);
              createMap(location);
            }
          }
        );
      } else {
        const location = new window.naver.maps.LatLng(config.coords.lat, config.coords.lng);
        createMap(location);
      }
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const checkNaverMaps = setInterval(() => {
        if (window.naver && window.naver.maps) {
          clearInterval(checkNaverMaps);
          initMap();
        }
      }, 100);
      setTimeout(() => clearInterval(checkNaverMaps), 10000);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [config.address, config.coords.lat, config.coords.lng]);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        strategy="afterInteractive"
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
                style={{ width: "100%", height: "100%", minHeight: 300, backgroundColor: "#e5e5e5" }}
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

"use client";

import { useState } from "react";
import type { FloorPlanConfig, ThemeConfig } from "@/lib/types/project";

interface Props {
  config: FloorPlanConfig;
  theme: ThemeConfig;
}

export default function PremiumFloorPlan({ config, theme }: Props) {
  const p = theme.prefix;
  const keys = Object.keys(config.units);
  const [tab, setTab] = useState(keys[0]);
  const fp = config.units[tab];

  return (
    <section className={`${p}-floorplan`} id={`${p}-floorplan`}>
      <div className={`${p}-floorplan-inner`}>
        <div className={`${p}-floorplan-header ${p}-reveal`}>
          <div className={`${p}-section-label`} style={{ justifyContent: "center" }}>
            <span style={{ width: 24, height: 1, background: `var(--${p}-gold)`, display: "inline-block" }} />
            Unit Plan
            <span style={{ width: 24, height: 1, background: `var(--${p}-gold)`, display: "inline-block" }} />
          </div>
          <h2 className={`${p}-section-title`} dangerouslySetInnerHTML={{ __html: config.title }} />
        </div>

        <div className={`${p}-floorplan-tabs ${p}-reveal`}>
          {keys.map((key) => (
            <button
              key={key}
              className={`${p}-floorplan-tab ${tab === key ? "active" : ""}`}
              onClick={() => setTab(key)}
            >
              {key.replace(/(\d+)/, "$1㎡ ")}
            </button>
          ))}
        </div>

        <div className={`${p}-floorplan-content`}>
          <div className={`${p}-floorplan-visual ${p}-reveal`}>
            <div className={`${p}-floorplan-visual-placeholder`}>
              <svg viewBox="0 0 200 200" fill="none" style={{ width: 160, opacity: 0.15 }}>
                <rect x="10" y="10" width="180" height="180" stroke="#B8926A" strokeWidth="1" />
                <rect x="10" y="10" width="90" height="90" stroke="#B8926A" strokeWidth=".5" />
                <rect x="100" y="10" width="90" height="60" stroke="#B8926A" strokeWidth=".5" />
                <rect x="10" y="100" width="60" height="90" stroke="#B8926A" strokeWidth=".5" />
                <rect x="100" y="70" width="90" height="60" stroke="#B8926A" strokeWidth=".5" />
                <rect x="70" y="100" width="30" height="90" stroke="#B8926A" strokeWidth=".5" />
                <rect x="100" y="130" width="90" height="60" stroke="#B8926A" strokeWidth=".5" />
                <text x="55" y="55" textAnchor="middle" fill="#B8926A" fontSize="8" fontFamily="Montserrat">거실</text>
                <text x="145" y="45" textAnchor="middle" fill="#B8926A" fontSize="7" fontFamily="Montserrat">침실1</text>
                <text x="40" y="150" textAnchor="middle" fill="#B8926A" fontSize="7" fontFamily="Montserrat">침실2</text>
                <text x="145" y="105" textAnchor="middle" fill="#B8926A" fontSize="7" fontFamily="Montserrat">주방</text>
                <text x="85" y="150" textAnchor="middle" fill="#B8926A" fontSize="6" fontFamily="Montserrat">욕실</text>
                <text x="145" y="165" textAnchor="middle" fill="#B8926A" fontSize="7" fontFamily="Montserrat">침실3</text>
              </svg>
              <span style={{ color: `var(--${p}-text-light)`, fontSize: 12, marginTop: 16 }}>
                평면도 이미지
              </span>
            </div>
          </div>

          <div className={`${p}-floorplan-info ${p}-reveal ${p}-reveal-delay-1`}>
            <div className="type-label">{fp.typeLabel}</div>
            <h3>{fp.title}</h3>

            <div className={`${p}-floorplan-spec`}>
              {[
                { label: "전용면적", value: fp.area },
                { label: "공급면적", value: fp.supply },
                { label: "방 / 욕실", value: fp.rooms },
                { label: "Bay 구조", value: fp.bay },
                { label: "향", value: fp.dir },
              ].map((row) => (
                <div key={row.label} className={`${p}-floorplan-spec-row`}>
                  <span className={`${p}-floorplan-spec-label`}>{row.label}</span>
                  <span className={`${p}-floorplan-spec-value`}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className={`${p}-floorplan-features`}>
              {fp.features.map((f) => (
                <span key={f} className={`${p}-floorplan-feature`}>{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

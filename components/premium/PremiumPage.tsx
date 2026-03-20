"use client";

import { useScrollReveal } from "./hooks/useScrollReveal";
import PremiumHeader from "./PremiumHeader";
import PremiumHero from "./PremiumHero";
import PremiumOverview from "./PremiumOverview";
import PremiumServices from "./PremiumServices";
import PremiumLocation from "./PremiumLocation";
import PremiumGallery from "./PremiumGallery";
import PremiumStats from "./PremiumStats";
import PremiumFloorPlan from "./PremiumFloorPlan";
import PremiumCTA from "./PremiumCTA";
import PremiumContact from "./PremiumContact";
import PremiumFooter from "./PremiumFooter";
import type { ProjectConfig } from "@/lib/types/project";

interface Props {
  config: ProjectConfig;
}

export default function PremiumPage({ config }: Props) {
  const { meta, theme, nav, hero, overview, contact, footer } = config;
  const p = theme.prefix;
  const revealRef = useScrollReveal(`${p}-reveal`);

  return (
    <div className={`${p}-page`} ref={revealRef}>
      <PremiumHeader
        brand={footer.brand}
        brandSub={footer.brandSub}
        phone={meta.phone}
        nav={nav}
        ctaLabel={hero.primaryCta.label}
        ctaTargetId={`${p}-contact`}
        theme={theme}
      />

      <PremiumHero config={hero} theme={theme} />
      <PremiumOverview config={overview} theme={theme} />

      {config.services && (
        <PremiumServices
          services={config.services}
          title={`<strong>${config.services.length}대 프리미엄</strong> 라이프 서비스`}
          description="입주민의 건강과 편의를 위한 차별화된 서비스를 제공합니다."
          theme={theme}
        />
      )}

      {config.location && (
        <PremiumLocation config={config.location} theme={theme} />
      )}

      {config.gallery && (
        <PremiumGallery config={config.gallery} theme={theme} />
      )}

      {config.stats && (
        <PremiumStats stats={config.stats} theme={theme} />
      )}

      {config.floorPlan && (
        <PremiumFloorPlan config={config.floorPlan} theme={theme} />
      )}

      {config.cta && (
        <PremiumCTA config={config.cta} phone={meta.phone} theme={theme} />
      )}

      <PremiumContact config={contact} meta={meta} theme={theme} />
      <PremiumFooter config={config.footer} theme={theme} />
    </div>
  );
}

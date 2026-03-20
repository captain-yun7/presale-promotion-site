"use client";

import { useCounter } from "./hooks/useCounter";
import type { StatItem, ThemeConfig } from "@/lib/types/project";

function StatItemComponent({ target, suffix, label, prefix }: StatItem & { prefix: string }) {
  const { ref, value } = useCounter(target);
  return (
    <div className={`${prefix}-stat-item`} ref={ref}>
      <div className={`${prefix}-stat-number`}>
        <span>{value.toLocaleString()}</span>
      </div>
      <div className={`${prefix}-stat-suffix`}>{suffix}</div>
      <div className={`${prefix}-stat-label`}>{label}</div>
    </div>
  );
}

interface Props {
  stats: StatItem[];
  theme: ThemeConfig;
}

export default function PremiumStats({ stats, theme }: Props) {
  const p = theme.prefix;

  return (
    <section className={`${p}-stats`}>
      <div className={`${p}-stats-grid`}>
        {stats.map((s) => (
          <StatItemComponent key={s.label} {...s} prefix={p} />
        ))}
      </div>
    </section>
  );
}

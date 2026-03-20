import { ReactNode } from "react";
import { Metadata } from "next";
import "../../styles/themes/premium-cream.css";

export const metadata: Metadata = {
  title: "여의도 더로드캐슬 — 대방역 2분 초역세권 신축 특별분양 | 선착순 6세대",
  description:
    "대방역 도보 2분 더블역세권, 7년전 분양가 신축 2룸 소형아파트. 2026년 준공완료 즉시입주. LG풀옵션, 대출70%~, 실거주의무 없음. 선착순 6세대 특별분양.",
  openGraph: {
    title: "여의도 더로드캐슬 — 선착순 6세대 특별분양",
    description:
      "대방역 도보 2분, 여의도 생활권 신축 소형아파트. 7년전 분양가, 즉시 입주 가능.",
  },
};

export default function YeouidoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}

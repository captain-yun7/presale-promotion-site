import { ReactNode } from "react";
import { Metadata } from "next";
import "../../styles/themes/premium-cream.css";

export const metadata: Metadata = {
  title: "HAVEN RÉSIDENCE — 새로운 삶의 기준 | 서울 노원구 프리미엄 레지던스",
  description:
    "서울 노원구 49층 768세대 프리미엄 웰니스 레지던스. 6·7호선 태릉입구역 도보 8분, 5대 프리미엄 라이프 서비스 제공.",
  openGraph: {
    title: "HAVEN RÉSIDENCE — 새로운 삶의 기준",
    description:
      "서울 노원구 49층 768세대 프리미엄 웰니스 레지던스. 관심고객 등록 진행 중.",
  },
};

export default function HavenLayout({ children }: { children: ReactNode }) {
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

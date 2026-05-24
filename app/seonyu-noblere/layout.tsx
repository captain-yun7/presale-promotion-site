import { ReactNode } from "react";
import { Metadata } from "next";
import "../../styles/themes/premium-cream.css";

export const metadata: Metadata = {
  title: "선유노블레르 — 선유도역 5분 한강 조망 신축 오피스텔 | 9호선 초역세권",
  description:
    "선유도역 도보 5분, 9호선 초역세권 신축 오피스텔. 양화한강공원·선유도공원 도보 15분. 지상 9층, 2개동 46실. 전용 49㎡ 투룸 단일면적. 양평동6가 2-1번지.",
  openGraph: {
    title: "선유노블레르 — 선유도역 초역세권 신축 오피스텔",
    description:
      "9호선 선유도역 도보 5분, 당산역 환승 3분, 여의도역 환승 5분. 한강생활권 신축 투룸 오피스텔.",
  },
};

export default function SeonyuLayout({ children }: { children: ReactNode }) {
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

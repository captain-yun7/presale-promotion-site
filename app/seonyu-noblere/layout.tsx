import { ReactNode } from "react";
import { Metadata } from "next";
import "../../styles/themes/premium-cream.css";

export const metadata: Metadata = {
  title: "선유노블레르 쓰리룸 — 선유도역 5분 9호선 초역세권 선착순 특별분양",
  description:
    "선유도역 도보 5분 9호선 초역세권 신축 쓰리룸 오피스텔. 전용 49㎡ 단일 평형 46실. 빌트인 풀옵션 무상 제공. 인근 시세 대비 안전마진 분양가. 양평동6가 2-1번지.",
  openGraph: {
    title: "선유노블레르 쓰리룸 — 선착순 특별분양",
    description:
      "9호선 선유도역 5분 · 빌트인 풀옵션 · 한강생활권 · 안전마진 분양가",
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

import type { Metadata } from "next";
import SeonyuClient from "./SeonyuClient";

export const metadata: Metadata = {
  title: "선유노블레르 쓰리룸 | 선유도역 5분 9호선 초역세권 선착순 특별분양",
  description:
    "9호선 선유도역 도보 5분 초역세권 신축 쓰리룸 오피스텔. 전용 49㎡ 단일 평형 46실, 빌트인 풀옵션 무상. 인근 시세 6.5~8.9억 대비 안전마진 분양가. 선착순 특별분양.",
  openGraph: {
    title: "선유노블레르 쓰리룸 | 9호선 선유도역 초역세권 선착순 특별분양",
    description: "선유도역 도보 5분 한강생활권 신축 쓰리룸 46실 · 빌트인 풀옵션 · 안전마진 분양가",
    images: ["/images/seonyu-noblere/exterior/aerial-river.jpg"],
  },
};

export default function SeonyuNoblerePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "선유노블레르 오피스텔",
    description:
      "선유도역 도보 5분, 한강 조망 신축 투룸 오피스텔. 9호선 초역세권 입지.",
    url: "https://smilebunyang.com/seonyu-noblere",
    telephone: "1666-0952",
    address: {
      "@type": "PostalAddress",
      streetAddress: "서울특별시 영등포구 양평동6가 2-1번지",
      addressCountry: "KR",
    },
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SeonyuClient />
    </>
  );
}

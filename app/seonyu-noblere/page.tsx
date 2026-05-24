import type { Metadata } from "next";
import SeonyuClient from "./SeonyuClient";

export const metadata: Metadata = {
  title: "선유노블레르 | 선유도역 5분 9호선 초역세권 신축 오피스텔",
  description:
    "9호선 선유도역 도보 5분, 양화한강공원·선유도공원 도보권 한강생활권. 지상 9층·2개동·46실 신축 투룸 오피스텔. 당산역·여의도역 환승 빠름.",
  openGraph: {
    title: "선유노블레르 | 9호선 선유도역 초역세권 신축 오피스텔",
    description: "선유도역 도보 5분, 한강생활권 신축 투룸 46실",
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

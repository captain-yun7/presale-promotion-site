import type { Metadata } from "next";
import YeouidoClient from "./YeouidoClient";

export const metadata: Metadata = {
  title: "여의도 더로드캐슬 | 대방역 도보 2분 · 선착순 특별분양",
  description:
    "대방역 1호선·신림선 더블역세권 도보 2분. 7년전 분양가, 즉시입주 가능한 신축 2룸 아파트. LG 풀옵션 무상, 선착순 특별분양 진행 중.",
  openGraph: {
    title: "여의도 더로드캐슬 | 선착순 특별분양",
    description: "대방역 도보 2분, 7년전 분양가, LG 풀옵션 무상",
    images: ["/images/yeouido-the-road-castle/exterior/aerial-01.png"],
  },
};

export default function YeouidoTheRoadCastlePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "여의도 더로드캐슬",
    description: "대방역 도보 2분, 여의도 생활권 신축 소형아파트. 선착순 특별분양.",
    url: "https://smilebunyang.com/yeouido-the-road-castle",
    telephone: "1666-0952",
    address: {
      "@type": "PostalAddress",
      streetAddress: "서울시 영등포구 신길동 449-11",
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
      <YeouidoClient />
    </>
  );
}

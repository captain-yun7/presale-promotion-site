import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "염창역 더채움 분양 홈페이지",
  description: "목동 염창역 더채움 분양. 9호선 급행 초역세권 투룸 가격에 쓰리룸! ☎1666-0952",
};

export default function Home() {
  // 구조화된 데이터 (JSON-LD) - 부동산 SEO 최적화
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "염창역 더채움 - 9호선 급행 초역세권 쓰리룸 아파텔",
    "description": "목동 염창역 더채움 분양. 9호선 급행 초역세권 투룸 가격에 쓰리룸! ☎1666-0952",
    "url": "https://smilebunyang.com/yeomchang-thechaeum",
    "telephone": "1666-0952",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "강서구 염창동 262-5",
      "addressLocality": "서울시",
      "addressRegion": "강서구",
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.5487",
      "longitude": "126.8752"
    },
    "image": "https://smilebunyang.com/images/yeomchang-thechaeum-exterior-view.jpg",
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": "서울특별시"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "9호선 급행 초역세권",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "한강벨트라인",
        "value": true
      },
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "스마일분양 홈",
        "item": "https://smilebunyang.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "염창역 더채움",
        "item": "https://smilebunyang.com/yeomchang-thechaeum"
      }
    ]
  };

  return (
    <>
      {/* 구조화된 데이터 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Header />
      <main>
        {/* Hero Section - 풀스크린 슬라이드 + 상담폼 */}
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}

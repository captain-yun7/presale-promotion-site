import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import Gallery from "@/components/Gallery";
import ComplexInfo from "@/components/ComplexInfo";
import Location from "@/components/Location";
import QnA from "@/components/QnA";
import UnitTypes from "@/components/UnitTypes";
import Showroom from "@/components/Showroom";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Metadata } from "next";
// import SocialProofToast from "@/components/SocialProofToast";

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
        {/* 1. Hero Section - 몰입형 풀스크린 비디오 */}
        <HeroSection />

        {/* 2. Value Proposition - 3초 설득 */}
        <ValueProposition />

        {/* 3. Gallery - 갤러리 */}
        <Gallery />

        {/* 4. Complex Info - 단지 정보 */}
        <ComplexInfo />

        {/* 5. Location Intelligence - 입지 분석 (카카오맵, 출퇴근 시뮬레이터) */}
        <Location />

        {/* 6. QnA - 자주 묻는 질문 */}
        <QnA />

        {/* 7. Unit Types - 평형별 안내 */}
        <UnitTypes />

        {/* 8. Showroom - 홍보관 오시는 길 */}
        <Showroom />

        {/* 9. Contact - 빠른 상담 신청 */}
        <Contact />
      </main>
      <Footer />

      {/* Floating CTA - Sticky (카카오톡, 상담 예약) */}
      <FloatingCTA />

      {/* Social Proof Toast - 왼쪽 하단 팝업 */}
      {/* <SocialProofToast /> */}
    </>
  );
}

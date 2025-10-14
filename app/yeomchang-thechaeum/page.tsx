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
import SocialProofToast from "@/components/SocialProofToast";

export default function Home() {
  return (
    <>
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
      <SocialProofToast />
    </>
  );
}

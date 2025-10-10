import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import ComplexInfo from "@/components/ComplexInfo";
import Location from "@/components/Location";
import SocialProofHub from "@/components/SocialProofHub";
import UnitTypes from "@/components/UnitTypes";
import Schedule from "@/components/Schedule";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* 1. Hero Section - 몰입형 풀스크린 비디오 */}
        <HeroSection />

        {/* 2. Value Proposition - 3초 설득 */}
        <ValueProposition />

        {/* 3. Complex Info - 단지 정보 */}
        <ComplexInfo />

        {/* 4. Location Intelligence - 입지 분석 (카카오맵, 출퇴근 시뮬레이터) */}
        <Location />

        {/* 5. Social Proof Hub - 신뢰 구축 (히트맵, Q&A, 타임라인) */}
        <SocialProofHub />

        {/* 6. Unit Types - 평형별 안내 */}
        <UnitTypes />

        {/* 7. Schedule - 분양 일정 */}
        <Schedule />
      </main>
      <Footer />

      {/* Floating CTA - Sticky (카카오톡, 상담 예약) */}
      <FloatingCTA />
    </>
  );
}

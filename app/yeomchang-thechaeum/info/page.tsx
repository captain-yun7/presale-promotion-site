import Header from "@/components/Header";
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

export const metadata: Metadata = {
  title: "염창역 더채움 상세정보 | 분양 홈페이지",
  description: "염창역 더채움 상세 정보 - 입지, 평형, 갤러리, 단지정보, 홍보관 안내",
};

export default function InfoPage() {
  return (
    <>
      <Header forceScrolled />
      <main className="pt-20">
        {/* Value Proposition - 핵심 가치 */}
        <ValueProposition />

        {/* Location - 입지 분석 */}
        <Location />

        {/* Unit Types - 평형별 안내 */}
        <UnitTypes />

        {/* Gallery - 갤러리 */}
        <Gallery />

        {/* Complex Info - 단지 정보 */}
        <ComplexInfo />

        {/* QnA - 자주 묻는 질문 */}
        <QnA />

        {/* Showroom - 홍보관 오시는 길 */}
        <Showroom />

        {/* Contact - 빠른 상담 신청 */}
        <Contact />
      </main>
      <Footer />

      {/* Floating CTA */}
      <FloatingCTA />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "사업개요 | 염창역 더채움",
  description: "염창역 더채움 사업개요 - 9호선 급행 초역세권 프리미엄 오피스텔 분양 안내",
};

export default function OverviewPage() {
  return (
    <>
      <Header forceScrolled />
      <main className="pt-20">
        {/* 사업개요 섹션 */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            {/* Section Title */}
            <div className="text-center mb-16">
              <p className="text-luxury-gold text-lg mb-3 font-medium tracking-wide">
                PROJECT OVERVIEW
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                사업개요
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                염창역 더채움의 주요 사업 정보를 확인하세요
              </p>
            </div>

            {/* 사업개요 이미지 */}
            <div className="mb-16 max-w-6xl mx-auto">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-luxury-gold/20">
                <Image
                  src="/ref_data/사업개요.png"
                  alt="염창역 더채움 사업개요"
                  fill
                  className="object-contain bg-white"
                  priority
                  quality={100}
                />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <a
                href="tel:1666-0952"
                className="inline-flex items-center gap-3 bg-luxury-gold text-luxury-charcoal px-8 py-4 rounded-full font-bold text-lg hover:bg-luxury-gold/90 transition-all shadow-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                1666-0952 상담문의
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
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

            {/* 개요 카드 그리드 */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* 사업명 */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-luxury-gold transition-colors">
                <h3 className="text-luxury-gold text-sm font-bold mb-2 tracking-wide">
                  사업명
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  염창역 더채움
                </p>
                <p className="text-gray-600">
                  The Chaeum Yeomchang Station
                </p>
              </div>

              {/* 위치 */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-luxury-gold transition-colors">
                <h3 className="text-luxury-gold text-sm font-bold mb-2 tracking-wide">
                  위치
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  서울시 강서구 염창동
                </p>
                <p className="text-gray-600">
                  262-5번지 일원
                </p>
              </div>

              {/* 규모 */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-luxury-gold transition-colors">
                <h3 className="text-luxury-gold text-sm font-bold mb-2 tracking-wide">
                  규모
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  지하 4층 ~ 지상 28층
                </p>
                <p className="text-gray-600">
                  총 287세대
                </p>
              </div>

              {/* 주차 */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-luxury-gold transition-colors">
                <h3 className="text-luxury-gold text-sm font-bold mb-2 tracking-wide">
                  주차
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  총 287대
                </p>
                <p className="text-gray-600">
                  세대당 1대 (100%)
                </p>
              </div>

              {/* 용도 */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-luxury-gold transition-colors">
                <h3 className="text-luxury-gold text-sm font-bold mb-2 tracking-wide">
                  용도
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  오피스텔
                </p>
                <p className="text-gray-600">
                  업무시설 (준주거지역)
                </p>
              </div>

              {/* 입주 */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-luxury-gold transition-colors">
                <h3 className="text-luxury-gold text-sm font-bold mb-2 tracking-wide">
                  입주 예정
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  2026년 12월
                </p>
                <p className="text-gray-600">
                  (예정)
                </p>
              </div>
            </div>

            {/* 주요 특징 */}
            <div className="mt-16 bg-gradient-to-br from-luxury-gold/10 to-primary/5 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
                프로젝트 핵심 포인트
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-bold text-luxury-gold mb-3">
                    🚇
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    9호선 급행 초역세권
                  </h3>
                  <p className="text-gray-600 text-sm">
                    염창역 도보 5분<br />
                    여의도 2정거장, 강남 20분
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-bold text-luxury-gold mb-3">
                    💰
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    투룸 가격에 쓰리룸
                  </h3>
                  <p className="text-gray-600 text-sm">
                    특별 할인 분양가<br />
                    합리적인 가격의 넓은 평수
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-bold text-luxury-gold mb-3">
                    ✅
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    4無 규제 혜택
                  </h3>
                  <p className="text-gray-600 text-sm">
                    주택수·대출·자금조달·실거주<br />
                    4가지 규제 완전 FREE
                  </p>
                </div>
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

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "입지환경 | 염창역 더채움",
  description: "염창역 더채움 입지환경 - 9호선 급행 초역세권, 한강 5분 거리",
};

export default function LocationPage() {
  return (
    <>
      <Header forceScrolled />
      <main className="pt-20">
        {/* 입지환경 섹션 */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            {/* Section Title */}
            <div className="text-center mb-16">
              <p className="text-luxury-gold text-lg mb-3 font-medium tracking-wide">
                LOCATION ENVIRONMENT
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                입지환경
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                염창역 더채움의 프리미엄 입지를 확인하세요
              </p>
            </div>

            {/* 입지환경 이미지 */}
            <div className="mb-20 max-w-6xl mx-auto">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-luxury-gold/20">
                <Image
                  src="/ref_data/입지환경.png"
                  alt="염창역 더채움 입지환경"
                  fill
                  className="object-contain bg-white"
                  priority
                  quality={100}
                />
              </div>
            </div>

            {/* 입지분석 이미지 */}
            <div className="mb-20 max-w-6xl mx-auto">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-luxury-gold/20">
                <Image
                  src="/입지분석.png"
                  alt="염창역 더채움 입지분석"
                  fill
                  className="object-contain bg-white"
                  quality={100}
                />
              </div>
            </div>

            {/* 입지분석2 이미지 */}
            <div className="mb-20 max-w-6xl mx-auto">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-luxury-gold/20">
                <Image
                  src="/입지분석2.png"
                  alt="염창역 더채움 교통 및 주거환경"
                  fill
                  className="object-contain bg-white"
                  quality={100}
                />
              </div>
            </div>

            {/* 입지분석3 이미지 */}
            <div className="mb-20 max-w-6xl mx-auto">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-luxury-gold/20">
                <Image
                  src="/입지분석3.png"
                  alt="염창역 더채움 업무지구 분석"
                  fill
                  className="object-contain bg-white"
                  quality={100}
                />
              </div>
            </div>

            {/* 항공조감도 이미지 */}
            <div className="mb-16 max-w-6xl mx-auto">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-luxury-gold/20">
                <Image
                  src="/항공조감도.png"
                  alt="염창역 더채움 항공조감도"
                  fill
                  className="object-contain bg-white"
                  quality={100}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

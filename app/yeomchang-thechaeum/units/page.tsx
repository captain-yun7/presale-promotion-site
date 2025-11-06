import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "세대정보 | 염창역 더채움",
  description: "염창역 더채움 세대정보 - 평형별 안내 및 실내 갤러리",
};

export default function UnitsPage() {
  return (
    <>
      <Header forceScrolled />
      <main className="pt-20">
        {/* 세대정보 섹션 */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            {/* Section Title */}
            <div className="text-center mb-16">
              <p className="text-luxury-gold text-lg mb-3 font-medium tracking-wide">
                UNIT INFORMATION
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                세대정보
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                염창역 더채움의 평면도와 특화설계를 확인하세요
              </p>
            </div>

            {/* 평면도 이미지 */}
            <div className="mb-16 max-w-6xl mx-auto">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-luxury-gold/20">
                <Image
                  src="/평면도.png"
                  alt="염창역 더채움 평면도"
                  fill
                  className="object-contain bg-white"
                  priority
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

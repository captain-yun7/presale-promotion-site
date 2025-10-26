import Header from "@/components/Header";
import UnitTypes from "@/components/UnitTypes";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
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
        <UnitTypes disableAnimation={true} />
        <Gallery disableAnimation={true} />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

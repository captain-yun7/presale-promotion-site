import Header from "@/components/Header";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
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
        <Location disableAnimation={true} />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

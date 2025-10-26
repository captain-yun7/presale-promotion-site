import Header from "@/components/Header";
import Showroom from "@/components/Showroom";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오시는길 | 염창역 더채움",
  description: "염창역 더채움 홍보관 오시는 길 - 서울시 강서구 염창동 262-5",
};

export default function ShowroomPage() {
  return (
    <>
      <Header forceScrolled />
      <main className="pt-20">
        <Showroom />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

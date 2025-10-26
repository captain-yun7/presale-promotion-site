import Header from "@/components/Header";
import Contact from "@/components/Contact";
import QnA from "@/components/QnA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "빠른상담 | 염창역 더채움",
  description: "염창역 더채움 상담 신청 - 전문 상담사가 빠르게 연락드립니다",
};

export default function ContactPage() {
  return (
    <>
      <Header forceScrolled />
      <main className="pt-20">
        <Contact />
        <QnA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

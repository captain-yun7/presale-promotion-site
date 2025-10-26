import Header from "@/components/Header";
import QnA from "@/components/QnA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | 염창역 더채움",
  description: "염창역 더채움 자주 묻는 질문 - 분양 관련 궁금증을 해결해드립니다",
};

export default function FaqPage() {
  return (
    <>
      <Header forceScrolled />
      <main className="pt-20">
        <QnA disableAnimation={true} />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ComplexInfo from "@/components/ComplexInfo";
import UnitTypes from "@/components/UnitTypes";
import Location from "@/components/Location";
import Schedule from "@/components/Schedule";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ComplexInfo />
        <UnitTypes />
        <Location />
        <Schedule />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

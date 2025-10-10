"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "프리미엄 라이프스타일의 시작",
    subtitle: "당신만을 위한 특별한 공간",
    description: "최상의 입지와 최고의 품격을 갖춘 프리미엄 레지던스",
    image: "/images/hero-1.jpg",
  },
  {
    id: 2,
    title: "완벽한 교통 인프라",
    subtitle: "도심 속 편리함",
    description: "역세권의 프리미엄, 출퇴근이 즐거워지는 공간",
    image: "/images/hero-2.jpg",
  },
  {
    id: 3,
    title: "최첨단 설계와 디자인",
    subtitle: "미래를 담은 주거공간",
    description: "스마트한 생활을 위한 최신 시스템",
    image: "/images/hero-3.jpg",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />
          <div className="relative w-full h-full bg-gradient-to-r from-primary to-accent">
            {/* Placeholder for actual images */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20">
              {slide.title}
            </div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div
              key={currentSlide}
              className="animate-fadeIn"
            >
              <p className="text-secondary text-lg md:text-xl mb-4 font-medium">
                {slides[currentSlide].subtitle}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToContact}
                  className="bg-secondary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-accent transition-all transform hover:scale-105"
                >
                  상담 신청하기
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("complex-info");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all"
                >
                  자세히 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-secondary w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce hidden md:block">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}

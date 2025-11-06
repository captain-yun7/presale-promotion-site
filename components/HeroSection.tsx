"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getStoredUTMParams } from "@/lib/utm-tracking";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    privacyAgree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 슬라이드 데이터 (JSX 포함)
  const slides = [
    {
      image: "/images/yeomchang-thechaeum-view.jpg",
      tag: "🔥 지금 아니면 못삽니다",
      title: "투룸값 쓰리룸",
      subtitle: (
        <>
          염창역 도보 3분 · 여의도 출근 7분
          <br />
          <span className="text-luxury-gold font-bold text-2xl">1억대 쓰리룸</span> 회사보유분 긴급매물
          <br />
          이 가격 다시 없습니다
        </>
      ),
    },
    {
      image: "/images/yeomchang-thechaeum-unit-interior-02.jpg",
      tag: "⚡ 실평수 19평 아파트급 구조",
      title: "3룸 + 2욕실",
      subtitle: (
        <>
          침실3 · 욕실2 · 발코니 · 창고
          <br />
          <span className="text-luxury-gold font-bold">삼성 비스포크 풀옵션</span> 가전 포함
          <br />
          입주하자마자 살 수 있습니다
        </>
      ),
    },
    {
      image: "/images/yeomchang-thechaeum-exterior-view.jpg",
      tag: "🚇 서울 중심 올림픽대로 5분",
      title: "여의도 2정거장",
      subtitle: (
        <>
          여의도 <span className="text-luxury-gold font-bold">7분</span> · 강남 <span className="text-luxury-gold font-bold">15분</span> · 홍대 <span className="text-luxury-gold font-bold">10분</span>
          <br />
          9호선 급행역 도보3분 초역세권
          <br />
          영천시장 바로옆 생활인프라 완벽
        </>
      ),
    },
    {
      image: "/images/yeomchang-thechaeum-unit-interior-01.jpg",
      tag: "💰 대출규제 완전 FREE",
      title: "주택수 안잡혀요",
      subtitle: (
        <>
          오피스텔이라 <span className="text-luxury-gold font-bold">주택수 제외</span>
          <br />
          <span className="text-luxury-gold font-bold">DSR · LTV 규제 無</span>
          <br />
          다주택자도 투자 가능합니다
        </>
      ),
    },
  ];

  // 자동 슬라이드 (8초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("이름과 전화번호를 입력해주세요.");
      return;
    }

    if (!formData.privacyAgree) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const utmParams = getStoredUTMParams();
      const source = utmParams?.utm_source || 'website';

      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          source: source,
          project: '염창역더채움',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '상담 신청에 실패했습니다.');
      }

      if (!data.data || data.data.length === 0) {
        throw new Error('상담 신청이 정상 처리되지 않았습니다.');
      }

      alert(`${formData.name}님의 상담 신청이 접수되었습니다.\n담당자가 빠른 시일 내에 연락드리겠습니다.`);
      setFormData({
        name: "",
        phone: "",
        message: "",
        privacyAgree: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '상담 신청 중 오류가 발생했습니다.';
      alert(`❌ ${errorMessage}\n\n긴급한 경우 1666-0952로 전화주세요.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
    <section className="relative h-screen lg:h-screen overflow-hidden">
      {/* 슬라이드 배경 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority={currentSlide === 0}
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 lg:from-black/70 lg:via-black/50 lg:to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* 메인 컨텐츠 */}
      <div className="relative z-20 h-full flex items-center pt-20 lg:pt-0">
        <div className="container-custom w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">

            {/* 왼쪽: 슬라이드 카피 */}
            <div className="lg:pr-8 pb-[380px] lg:pb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.p className="text-base md:text-lg lg:text-xl mb-3 lg:mb-4 font-bold tracking-wide text-luxury-gold">
                    {slides[currentSlide].tag}
                  </motion.p>

                  <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                    {slides[currentSlide].title.split(' ').map((word, i) => (
                      <span key={i}>
                        {word.includes('더채움') || word.includes('15분') ? (
                          <span className="text-luxury-gold">{word}</span>
                        ) : (
                          word
                        )}
                        {i < slides[currentSlide].title.split(' ').length - 1 && ' '}
                      </span>
                    ))}
                  </motion.h1>

                  <motion.div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 lg:mb-8 leading-relaxed font-medium">
                    {slides[currentSlide].subtitle}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* 슬라이드 인디케이터 */}
              <div className="flex gap-2 mt-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-luxury-gold w-12'
                        : 'bg-white/30 w-8 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 오른쪽: 상담 신청 폼 (데스크톱만) */}
            <div className="hidden lg:block">
              <motion.div
                id="consultation-form"
                className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-luxury-gold/30"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-luxury-charcoal mb-2">
                  무료 상담 신청
                </h3>
                <p className="text-sm text-gray-600 mb-5">
                  분양가 확인 · 방문 일정 예약 · 1:1 전문 상담
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="이름을 입력해주세요"
                      required
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-base"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="전화번호 (숫자만 입력)"
                      required
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-base"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="문의내용"
                      rows={3}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-base resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3 py-2">
                    <input
                      type="checkbox"
                      id="privacyAgree"
                      name="privacyAgree"
                      checked={formData.privacyAgree}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-luxury-gold border-gray-300 rounded focus:ring-luxury-gold"
                    />
                    <label htmlFor="privacyAgree" className="text-sm text-gray-700 leading-relaxed">
                      개인정보 수집 및 이용에 동의합니다
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 rounded-xl transition-all font-bold text-lg shadow-lg ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                        : 'bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold/90 hover:shadow-xl transform hover:scale-[1.02]'
                    }`}
                  >
                    {isSubmitting ? '처리 중...' : '무료 상담 신청하기'}
                  </button>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <a
                      href="tel:1666-0952"
                      className="py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      전화상담
                    </a>
                    <a
                      href="https://open.kakao.com/o/sXGXbTXh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-4 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] rounded-xl transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2 1-.6 3.7-.7 4.2 0 0 0 .3.2.4.1.1.3.1.4 0 .7-.5 4.2-2.8 4.9-3.3.5.1 1 .1 1.5.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
                      </svg>
                      카톡상담
                    </a>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>


      {/* 모바일: 하단 상담 폼 (섹션 내부) */}
      <div className="lg:hidden absolute bottom-4 left-0 right-0 z-50 px-4">
        <div className="bg-white rounded-2xl p-5 shadow-2xl border-2 border-luxury-gold">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              무료 상담 신청
            </h3>
            <p className="text-xs text-gray-700">
              분양가 확인 · 방문 예약 · 전문 상담
            </p>
          </div>
          <div className="bg-gray-800 px-3 py-2 rounded-lg">
            <Image
              src="/thechaeum-logo.png"
              alt="염창역 더채움"
              width={100}
              height={28}
              className="h-7 w-auto flex-shrink-0"
              priority
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5 mt-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름"
            required
            className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-sm text-gray-900"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="전화번호 (숫자만)"
            required
            className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-sm text-gray-900"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="문의내용"
            rows={2}
            className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-sm resize-none text-gray-900"
          />
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="privacyAgreeMobile"
              name="privacyAgree"
              checked={formData.privacyAgree}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-luxury-gold border-gray-300 rounded"
            />
            <label htmlFor="privacyAgreeMobile" className="text-xs text-gray-700">
              개인정보 수집 및 이용 동의
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg ${
              isSubmitting
                ? 'bg-gray-400 text-gray-200'
                : 'bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold/90'
            }`}
          >
            {isSubmitting ? '처리 중...' : '무료 상담 신청하기'}
          </button>
        </form>
      </div>
    </div>
    </section>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStoredUTMParams } from "@/lib/utm-tracking";

export default function Header({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(forceScrolled);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    privacyAgree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (!formData.privacyAgree) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // UTM 파라미터에서 유입 경로 가져오기
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

      alert(`${formData.name}님의 상담 신청이 접수되었습니다.\n담당자가 빠른 시일 내에 연락드리겠습니다.`);
      setFormData({
        name: "",
        phone: "",
        message: "",
        privacyAgree: false,
      });
      setIsConsultOpen(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.';
      alert(errorMessage);
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

  useEffect(() => {
    if (forceScrolled) return; // forceScrolled가 true면 스크롤 이벤트 무시

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceScrolled]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/yeomchang-thechaeum" className="flex items-center cursor-pointer">
            <div className={`${isScrolled ? 'bg-primary-600 px-2 py-1 md:px-4 md:py-2 rounded-lg' : ''}`}>
              <Image
                src="/thechaeum-logo.png"
                alt="염창역 더채움"
                width={216}
                height={60}
                className="h-8 md:h-14 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-16">
            <Link
              href="/yeomchang-thechaeum/overview"
              className={`font-semibold text-base lg:text-lg transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              사업개요
            </Link>
            <Link
              href="/yeomchang-thechaeum/location"
              className={`font-semibold text-base lg:text-lg transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              입지환경
            </Link>
            <Link
              href="/yeomchang-thechaeum/units"
              className={`font-semibold text-base lg:text-lg transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              세대정보
            </Link>
            <Link
              href="/yeomchang-thechaeum/showroom"
              className={`font-semibold text-base lg:text-lg transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              오시는길
            </Link>
            <Link
              href="/yeomchang-thechaeum/contact"
              className={`font-semibold text-base lg:text-lg transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              FAQ
            </Link>

            <div className="flex items-center gap-3 ml-16">
              <a
                href="tel:1666-0952"
                className="bg-luxury-gold text-luxury-charcoal px-4 py-2 lg:px-6 lg:py-3 rounded-full font-bold text-sm lg:text-base hover:bg-luxury-gold/90 transition-all shadow-lg flex items-center gap-2"
              >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span className="hidden lg:inline">1666-0952</span>
              <span className="lg:hidden">전화</span>
            </a>
            </div>
          </nav>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="tel:1666-0952"
              className="bg-luxury-gold text-luxury-charcoal px-4 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-luxury-gold/90 transition-all shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>1666-0952</span>
            </a>
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-6 h-0.5 transition-colors ${
                    isScrolled ? "bg-primary" : "bg-white"
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 transition-colors ${
                    isScrolled ? "bg-primary" : "bg-white"
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 transition-colors ${
                    isScrolled ? "bg-primary" : "bg-white"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg rounded-lg p-3 mb-3">
            <Link
              href="/yeomchang-thechaeum/overview"
              className="block w-full text-left py-2.5 px-2 text-gray-700 hover:text-primary font-semibold text-base active:bg-gray-50 rounded"
            >
              사업개요
            </Link>
            <Link
              href="/yeomchang-thechaeum/location"
              className="block w-full text-left py-2.5 px-2 text-gray-700 hover:text-primary font-semibold text-base active:bg-gray-50 rounded"
            >
              입지환경
            </Link>
            <Link
              href="/yeomchang-thechaeum/units"
              className="block w-full text-left py-2.5 px-2 text-gray-700 hover:text-primary font-semibold text-base active:bg-gray-50 rounded"
            >
              세대정보
            </Link>
            <Link
              href="/yeomchang-thechaeum/showroom"
              className="block w-full text-left py-2.5 px-2 text-gray-700 hover:text-primary font-semibold text-base active:bg-gray-50 rounded"
            >
              오시는길
            </Link>
            <Link
              href="/yeomchang-thechaeum/contact"
              className="block w-full text-left py-2.5 px-2 text-gray-700 hover:text-primary font-semibold text-base active:bg-gray-50 rounded"
            >
              FAQ
            </Link>
            <a
              href="tel:1666-0952"
              className="block w-full text-center mt-2 bg-luxury-gold text-luxury-charcoal px-4 py-3 rounded-full font-bold text-base hover:bg-luxury-gold/90 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              1666-0952
            </a>
          </nav>
        )}
      </div>

      {/* 상담 신청 모달 (모바일/데스크탑 공용) */}
      {isConsultOpen && (
        <div className="fixed right-0 top-[60px] md:top-[80px] w-full md:w-80 bg-white md:rounded-bl-2xl shadow-2xl p-4 md:p-6 z-50 max-h-[calc(100vh-60px)] md:max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-luxury-charcoal">
              빠른 상담 신청
            </h3>
            <button
              onClick={() => setIsConsultOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-sm"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="전화번호 (숫자만 입력)"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-sm"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="문의내용을 입력해주세요 (선택사항)"
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-sm resize-none"
            />

            <div className="flex items-start gap-2 py-2">
              <input
                type="checkbox"
                id="headerPrivacyAgree"
                name="privacyAgree"
                checked={formData.privacyAgree}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-luxury-gold border-gray-300 rounded focus:ring-luxury-gold"
              />
              <label htmlFor="headerPrivacyAgree" className="text-xs text-gray-700">
                개인정보 수집 및 이용에 동의합니다
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl transition-colors font-bold text-sm ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                  : 'bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold/90 shadow-lg'
              }`}
            >
              {isSubmitting ? '처리 중...' : '상담 신청하기'}
            </button>
          </form>

          <div className="mt-4 space-y-2">
            <a
              href="https://open.kakao.com/o/sXGXbTXh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] rounded-xl transition-colors font-bold text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2 1-.6 3.7-.7 4.2 0 0 0 .3.2.4.1.1.3.1.4 0 .7-.5 4.2-2.8 4.9-3.3.5.1 1 .1 1.5.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
              </svg>
              <span>카카오톡 상담</span>
            </a>
            <a
              href="tel:1666-0952"
              className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-bold text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>전화상담 1666-0952</span>
            </a>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            개인정보는 상담 목적으로만 사용되며<br />
            안전하게 보관됩니다
          </p>
        </div>
      )}
    </header>
  );
}

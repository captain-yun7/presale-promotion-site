"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
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
      alert(`${formData.name}님의 상담 신청이 접수되었습니다.\n담당자가 빠른 시일 내에 연락드리겠습니다.`);
      setFormData({
        name: "",
        phone: "",
        privacyAgree: false,
      });
      setIsConsultOpen(false);
    } catch {
      alert('상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="flex items-center">
            <div className={`${isScrolled ? 'bg-luxury-charcoal px-4 py-2 rounded-lg' : ''}`}>
              <Image
                src="/thechaeum-logo.png"
                alt="염창역 더채움"
                width={216}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("complex-info")}
              className={`font-semibold text-2xl transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              단지정보
            </button>
            <button
              onClick={() => scrollToSection("unit-types")}
              className={`font-semibold text-2xl transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              세대정보
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className={`font-semibold text-2xl transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              입지환경
            </button>
            <button
              onClick={() => scrollToSection("schedule")}
              className={`font-semibold text-2xl transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-primary"
                  : "text-white hover:text-secondary"
              }`}
            >
              분양안내
            </button>
            <a
              href="tel:1611-1000"
              className="bg-luxury-gold text-luxury-charcoal px-7 py-4 rounded-full font-black text-2xl hover:bg-luxury-gold/90 transition-all shadow-lg flex items-center gap-2"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>1611-1000</span>
            </a>
            <div className="relative">
              <style jsx>{`
                @keyframes pulse-glow {
                  0%, 100% {
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                    transform: scale(1);
                  }
                  50% {
                    box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
                    transform: scale(1.05);
                  }
                }
                .consult-button {
                  animation: pulse-glow 3s ease-in-out infinite;
                }
              `}</style>
              <button
                onClick={() => setIsConsultOpen(!isConsultOpen)}
                className="consult-button bg-primary-600 text-white px-7 py-4 rounded-full font-black text-2xl hover:bg-primary-700 transition-all shadow-lg"
              >
                무료상담신청
              </button>

              {isConsultOpen && (
                <div className="fixed right-0 top-[80px] w-80 bg-white rounded-bl-2xl shadow-2xl p-6 z-50 max-h-[calc(100vh-80px)] overflow-y-auto">
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
                      href="tel:1588-0000"
                      className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-bold text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <span>전화상담 1588-0000</span>
                    </a>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                    개인정보는 상담 목적으로만 사용되며<br />
                    안전하게 보관됩니다
                  </p>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-2">
              <span
                className={`block w-8 h-0.5 transition-colors ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 transition-colors ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 transition-colors ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg rounded-lg p-4 mb-4">
            <button
              onClick={() => scrollToSection("complex-info")}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary font-semibold text-2xl"
            >
              단지정보
            </button>
            <button
              onClick={() => scrollToSection("unit-types")}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary font-semibold text-2xl"
            >
              세대정보
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary font-semibold text-2xl"
            >
              입지환경
            </button>
            <button
              onClick={() => scrollToSection("schedule")}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary font-semibold text-2xl"
            >
              분양안내
            </button>
            <a
              href="tel:1611-1000"
              className="block w-full text-center mt-3 bg-luxury-gold text-luxury-charcoal px-7 py-4 rounded-full font-bold text-2xl hover:bg-luxury-gold/90 flex items-center justify-center gap-2"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              1611-1000
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

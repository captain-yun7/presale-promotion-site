"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { getStoredUTMParams } from "@/lib/utm-tracking";

export default function Contact() {
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
      console.log('[Contact Form] 상담 신청 시작:', { name: formData.name, phone: formData.phone });

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
          source: source,
          project: '염창역더채움',
        }),
      });

      console.log('[Contact Form] API 응답 상태:', response.status, response.statusText);

      const data = await response.json();
      console.log('[Contact Form] API 응답 데이터:', data);

      if (!response.ok) {
        console.error('[Contact Form] ❌ API 요청 실패:', data);
        throw new Error(data.error || '상담 신청에 실패했습니다.');
      }

      // 성공 시에도 실제 데이터가 있는지 확인
      if (!data.data || data.data.length === 0) {
        console.error('[Contact Form] ⚠️ API는 성공했지만 데이터가 비어있음');
        throw new Error('상담 신청이 정상 처리되지 않았습니다. 관리자에게 문의해주세요.');
      }

      console.log('[Contact Form] ✅ 상담 신청 성공');
      alert(`${formData.name}님의 상담 신청이 접수되었습니다.\n\n스마일분양 담당자가 빠른 시일 내에 연락드리겠습니다.`);
      setFormData({
        name: "",
        phone: "",
        privacyAgree: false,
      });
    } catch (error) {
      console.error('[Contact Form] ❌ 상담 신청 중 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.';
      alert(`❌ ${errorMessage}\n\n긴급한 경우 1666-0952로 전화주세요.`);
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

  const handleKakaoContact = () => {
    window.open('https://open.kakao.com/o/s1Cc83Wh', '_blank');
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 via-luxury-cream to-gray-50 relative overflow-hidden">
      {/* 장식 요소 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-luxury-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-luxury-gold/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-luxury-gold text-lg mb-3 font-medium tracking-wide">
            CONTACT
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            빠른 상담 신청
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            지금 상담 신청하시면 전문 상담사가 빠르게 연락드립니다
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-luxury-gold/20 hover:border-luxury-gold/40 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력해주세요"
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-base"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  전화번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="전화번호를 입력해주세요 (숫자만)"
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-base"
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
                  <span className="block text-xs text-gray-500 mt-1">
                    수집된 정보는 상담 목적으로만 사용되며 안전하게 보관됩니다
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl transition-all font-bold text-lg ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold/90 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? '처리 중...' : '상담 신청하기'}
              </button>
            </form>

            <div className="mt-8 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">또는</span>
                </div>
              </div>

              <button
                onClick={handleKakaoContact}
                className="w-full py-4 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] rounded-xl transition-all font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2 1-.6 3.7-.7 4.2 0 0 0 .3.2.4.1.1.3.1.4 0 .7-.5 4.2-2.8 4.9-3.3.5.1 1 .1 1.5.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
                </svg>
                <span>카카오톡 오픈채팅 상담</span>
              </button>

              <a
                href="tel:1666-0952"
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-bold text-lg flex items-center justify-center gap-3 shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>전화 상담 1666-0952</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

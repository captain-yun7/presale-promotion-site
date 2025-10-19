"use client";

import { useState } from "react";
import { trackEvent } from "./Analytics";
import { getStoredUTMParams } from "@/lib/utm-tracking";

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
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
      console.log('[Floating CTA] 상담 신청 시작:', { name: formData.name, phone: formData.phone });

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

      console.log('[Floating CTA] API 응답 상태:', response.status, response.statusText);

      const data = await response.json();
      console.log('[Floating CTA] API 응답 데이터:', data);

      if (!response.ok) {
        console.error('[Floating CTA] ❌ API 요청 실패:', data);
        throw new Error(data.error || '상담 신청에 실패했습니다.');
      }

      // 성공 시에도 실제 데이터가 있는지 확인
      if (!data.data || data.data.length === 0) {
        console.error('[Floating CTA] ⚠️ API는 성공했지만 데이터가 비어있음');
        throw new Error('상담 신청이 정상 처리되지 않았습니다. 관리자에게 문의해주세요.');
      }

      console.log('[Floating CTA] ✅ 상담 신청 성공');
      alert(`${formData.name}님의 상담 신청이 접수되었습니다.\n담당자가 빠른 시일 내에 연락드리겠습니다.`);

      // Track consultation event
      trackEvent.consultation("플로팅폼");

      // 폼 초기화
      setFormData({
        name: "",
        phone: "",
        message: "",
        privacyAgree: false,
      });
      setIsOpen(false);
    } catch (error) {
      console.error('[Floating CTA] ❌ 상담 신청 중 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.';
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

  const handlePhoneCall = () => {
    trackEvent.phoneClick();
    window.location.href = "tel:1666-0952";
  };

  const openKakaoTalk = () => {
    window.open("https://open.kakao.com/o/sXGXbTXh", "_blank");
  };

  return (
    <>
      {/* 데스크톱 버전 - 우측 하단 고정 */}
      <div className="hidden md:flex fixed bottom-8 right-8 z-[1000] flex-col gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-luxury-gold text-luxury-charcoal px-6 py-4 rounded-full font-black text-base shadow-2xl hover:bg-luxury-gold/90 transition-all flex items-center gap-2 animate-pulse"
        >
          🔥 무료상담신청
        </button>
        <button
          onClick={openKakaoTalk}
          className="bg-[#FEE500] text-[#3C1E1E] px-6 py-4 rounded-full font-bold text-base shadow-xl hover:bg-[#FAE100] transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3c-4.97 0-9 3.14-9 7s4.03 7 9 7c.83 0 1.64-.09 2.42-.27l3.58 2.14v-3.2c1.78-1.45 3-3.5 3-5.67 0-3.86-4.03-7-9-7zm-3 9.5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm3 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm3 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
          </svg>
          카톡상담
        </button>
        <button
          onClick={handlePhoneCall}
          className="bg-primary-600 text-white px-6 py-4 rounded-full font-bold text-base shadow-xl hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          전화상담
        </button>
      </div>

      {/* 데스크톱 상담 모달 */}
      {isOpen && (
        <div className="hidden md:block fixed inset-0 bg-black/50 z-[1001] flex items-center justify-center" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-luxury-charcoal">
                빠른 상담 신청
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="문의내용을 입력해주세요 (선택사항)"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-start gap-2 py-2">
                <input
                  type="checkbox"
                  id="desktopPrivacyAgree"
                  name="privacyAgree"
                  checked={formData.privacyAgree}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-luxury-gold border-gray-300 rounded focus:ring-luxury-gold"
                />
                <label htmlFor="desktopPrivacyAgree" className="text-sm text-gray-700">
                  개인정보 수집 및 이용에 동의합니다
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl transition-colors font-bold ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold/90'
                }`}
              >
                {isSubmitting ? '처리 중...' : '상담 신청하기'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 모바일 버전 - 하단 고정 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[1000]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-luxury-gold text-luxury-charcoal py-5 text-xl font-black shadow-2xl hover:bg-luxury-gold/90 transition-all"
        >
          무료상담신청 {isOpen ? '▼' : '▲'}
        </button>
        <div
          className={`
            bg-white shadow-2xl transition-all duration-300 ease-in-out overflow-hidden
            ${isOpen ? 'h-[500px]' : 'h-0'}
          `}
        >
          <div className="p-6 h-full overflow-y-auto">
            <h3 className="text-lg font-bold text-luxury-charcoal mb-4">
              빠른 상담 신청
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-sm"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="문의내용을 입력해주세요 (선택사항)"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none transition-colors text-sm resize-none"
                />
              </div>

              <div className="flex items-start gap-2 py-2">
                <input
                  type="checkbox"
                  id="mobilePrivacyAgree"
                  name="privacyAgree"
                  checked={formData.privacyAgree}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-luxury-gold border-gray-300 rounded focus:ring-luxury-gold"
                />
                <label htmlFor="mobilePrivacyAgree" className="text-xs text-gray-700">
                  개인정보 수집 및 이용에 동의합니다
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl transition-colors font-bold text-sm ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold/90'
                }`}
              >
                {isSubmitting ? '처리 중...' : '상담 신청하기'}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handlePhoneCall}
                  className="py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-bold text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  전화상담
                </button>
                <button
                  type="button"
                  onClick={openKakaoTalk}
                  className="py-3 bg-[#FEE500] text-[#3C1E1E] rounded-xl hover:bg-[#FAE100] transition-colors font-bold text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 3.14-9 7s4.03 7 9 7c.83 0 1.64-.09 2.42-.27l3.58 2.14v-3.2c1.78-1.45 3-3.5 3-5.67 0-3.86-4.03-7-9-7zm-3 9.5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm3 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm3 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
                  </svg>
                  카톡상담
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}

"use client";

import { useState } from "react";

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
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
      // TODO: Supabase 연동
      alert(`${formData.name}님의 상담 신청이 접수되었습니다.\n담당자가 빠른 시일 내에 연락드리겠습니다.`);

      // 폼 초기화
      setFormData({
        name: "",
        phone: "",
        privacyAgree: false,
      });
      setIsOpen(false);
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

  const handlePhoneCall = () => {
    window.location.href = "tel:1588-0000";
  };

  const openKakaoTalk = () => {
    window.open("https://pf.kakao.com/_your_channel_id", "_blank");
  };

  return (
    <>
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
            ${isOpen ? 'h-[380px]' : 'h-0'}
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

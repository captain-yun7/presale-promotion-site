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
                  className="py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-bold text-sm"
                >
                  📞 전화상담
                </button>
                <button
                  type="button"
                  onClick={openKakaoTalk}
                  className="py-3 bg-[#FEE500] text-[#3C1E1E] rounded-xl hover:bg-[#FAE100] transition-colors font-bold text-sm"
                >
                  💬 카톡상담
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 데스크탑 버전 - 오른쪽 고정 */}
      <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-[1000]">
        <div className="flex items-center relative">
          {/* 클릭 유도 화살표 애니메이션 */}
          {!isOpen && (
            <div className="absolute -left-24 top-1/2 -translate-y-1/2 z-10">
              <svg
                className="w-24 h-20 animate-bounce"
                viewBox="0 0 120 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 꼬불꼬불한 화살표 몸통 */}
                <path
                  d="M 10 40 Q 30 20, 50 35 T 90 40 L 105 40"
                  stroke="#d4af37"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* 화살촉 */}
                <path
                  d="M 105 40 L 95 33 M 105 40 L 95 47"
                  stroke="#d4af37"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-luxury-gold text-luxury-charcoal font-black
              transition-all duration-300 shadow-2xl hover:bg-luxury-gold/90
              rounded-l-2xl relative"
            style={{
              writingMode: 'vertical-rl',
              fontSize: '1.5rem',
              fontWeight: '900',
              whiteSpace: 'nowrap',
              lineHeight: '1',
              padding: '15px 18px',
              height: 'auto'
            }}
          >
            무료상담신청
          </button>

          <div
            className={`
              bg-white shadow-2xl transition-all duration-300 ease-in-out overflow-hidden
              ${isOpen ? 'w-[280px] opacity-100' : 'w-0 opacity-0'}
            `}
          >
            <div className="p-6 w-[280px]">
              <h3 className="text-xl font-bold text-luxury-charcoal mb-4">
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
                    id="desktopPrivacyAgree"
                    name="privacyAgree"
                    checked={formData.privacyAgree}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-luxury-gold border-gray-300 rounded focus:ring-luxury-gold"
                  />
                  <label htmlFor="desktopPrivacyAgree" className="text-xs text-gray-700">
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

              {/* 추가 상담 버튼 */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={handlePhoneCall}
                  className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-bold text-sm flex items-center justify-center gap-2"
                >
                  <span>📞</span>
                  <span>전화상담 1588-0000</span>
                </button>
                <button
                  onClick={openKakaoTalk}
                  className="w-full py-3 bg-[#FEE500] text-[#3C1E1E] rounded-xl hover:bg-[#FAE100] transition-colors font-bold text-sm flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  <span>카카오톡 상담</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                개인정보는 상담 목적으로만 사용되며<br />
                안전하게 보관됩니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

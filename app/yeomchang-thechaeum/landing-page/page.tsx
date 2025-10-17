"use client";

import { useState } from "react";
import Image from "next/image";

export default function LandingPage() {
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
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          source: 'landing-page',
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
        privacyAgree: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '상담 신청 중 오류가 발생했습니다.';
      alert(`${errorMessage}\n\n긴급한 경우 1666-0952로 전화주세요.`);
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

  return (
    <div className="min-h-screen bg-[#f3f3f3]">

      {/* 상단 알림 */}
      <div className="bg-[#ff1c19] text-white py-3 px-4 text-center text-sm font-medium">
        선착순 6세대 특별분양 · 조기마감 예정
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-[480px] mx-auto bg-white min-h-screen">

        {/* Hero */}
        <div className="bg-gradient-to-b from-[#ffe8dd] to-white px-5 pt-8 pb-10">
          <div className="text-center mb-8">
            <div className="inline-block bg-white px-4 py-1.5 rounded-full text-xs font-bold text-[#707070] mb-4 shadow-sm">
              염창역 도보 3분
            </div>
            <h1 className="text-[32px] leading-tight font-black text-black mb-3">
              투룸값에<br/>쓰리룸 산다
            </h1>
            <p className="text-xl text-[#707070] font-medium">
              염창역 더채움
            </p>
          </div>

          {/* 특징 카드 */}
          <div className="space-y-3 mb-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f39e41] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-black mb-0.5">9호선 급행역</div>
                  <div className="text-sm text-[#707070]">도보 3분 초역세권</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2e81ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-black mb-0.5">신혼특례대출</div>
                  <div className="text-sm text-[#707070]">최대 5억 / 1.6%</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-black mb-0.5">한강공원</div>
                  <div className="text-sm text-[#707070]">도보 5분 프리미엄</div>
                </div>
              </div>
            </div>
          </div>

          {/* 모바일 전화 버튼 */}
          <a
            href="tel:1666-0952"
            className="block w-full bg-[#2e81ff] text-white py-4 rounded-full text-center font-bold shadow-lg"
          >
            전화 상담하기 · 1666-0952
          </a>
        </div>

        {/* 이미지 섹션 */}
        <div className="px-5 py-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-black mb-2">실제 유닛 내부</h2>
            <p className="text-sm text-[#707070]">이런 공간에서 생활하게 됩니다</p>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/yeomchang-thechaeum-unit-interior-01.jpg"
                alt="거실"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                '/images/yeomchang-thechaeum-unit-interior-02.jpg',
                '/images/yeomchang-thechaeum-unit-interior-03.jpg',
                '/images/yeomchang-thechaeum-unit-interior-04.jpg',
              ].map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={src}
                    alt={`실내 ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 상담 신청 폼 */}
        <div className="px-5 pb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-black mb-1">
                무료 상담 신청
              </h2>
              <p className="text-sm text-[#707070]">
                특별 분양가 안내 및 대출 컨설팅
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름"
                  required
                  className="w-full px-4 py-3.5 bg-[#f3f3f3] border-0 rounded-xl text-black placeholder:text-[#989898] focus:outline-none focus:ring-2 focus:ring-[#f39e41]"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="연락처"
                  required
                  className="w-full px-4 py-3.5 bg-[#f3f3f3] border-0 rounded-xl text-black placeholder:text-[#989898] focus:outline-none focus:ring-2 focus:ring-[#f39e41]"
                />
              </div>

              <div className="flex items-start gap-2 pt-2 px-1">
                <input
                  type="checkbox"
                  id="privacyAgree"
                  name="privacyAgree"
                  checked={formData.privacyAgree}
                  onChange={handleChange}
                  required
                  className="mt-0.5 w-4 h-4 text-[#f39e41] border-gray-300 rounded"
                />
                <label htmlFor="privacyAgree" className="text-[10px] text-[#707070] leading-relaxed">
                  개인정보 수집 및 이용에 동의합니다
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-full font-bold text-white shadow-lg transition-all ${
                  isSubmitting
                    ? 'bg-[#989898] cursor-not-allowed'
                    : 'bg-[#f39e41] active:scale-95'
                }`}
              >
                {isSubmitting ? '처리 중...' : '상담 신청하기'}
              </button>
            </form>

            {/* 추가 버튼 */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="https://open.kakao.com/o/s1Cc83Wh"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 bg-[#FEE500] text-[#3C1E1E] rounded-full text-center font-bold text-sm"
              >
                카카오톡
              </a>
              <a
                href="tel:1666-0952"
                className="py-3 bg-[#f3f3f3] text-black rounded-full text-center font-bold text-sm"
              >
                전화상담
              </a>
            </div>
          </div>
        </div>

        {/* 정보 섹션 */}
        <div className="bg-[#ffe8dd] px-5 py-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-xs text-[#707070] mb-1">위치</div>
              <div className="font-bold text-black text-sm">염창역 도보 3분</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-xs text-[#707070] mb-1">규모</div>
              <div className="font-bold text-black text-sm">지하5층~지상18층</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-xs text-[#707070] mb-1">세대수</div>
              <div className="font-bold text-black text-sm">총 330세대</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-xs text-[#707070] mb-1">타입</div>
              <div className="font-bold text-black text-sm">59㎡~84㎡</div>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="py-6 text-center">
          <a
            href="/yeomchang-thechaeum"
            className="text-sm text-[#707070] font-medium"
          >
            더 자세한 정보 보기 →
          </a>
        </div>
      </div>
    </div>
  );
}

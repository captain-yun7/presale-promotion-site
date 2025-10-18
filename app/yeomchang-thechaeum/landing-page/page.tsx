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
    <div className="min-h-screen bg-white">

      {/* 메인 컨텐츠 */}
      <div className="max-w-[480px] mx-auto bg-white min-h-screen">

        {/* Hero Section - 대형 배경 이미지 */}
        <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/yeomchang-thechaeum-unit-interior-01.jpg"
              alt="염창역 더채움"
              fill
              className="object-cover"
              priority
            />
            {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* 컨텐츠 */}
          <div className="relative z-10 text-center text-white">
            {/* 로고 */}
            <div className="flex justify-center mb-12">
              <div className="relative w-[185px] h-16">
                <Image
                  src="/thechaeum-logo.png"
                  alt="염창역 더채움"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* 메인 타이틀 */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              염창역 더채움
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-12 text-white/90 px-4">
              염창역 도보 3분 · 한강공원 5분 거리의 프리미엄 아파트<br/>
              신혼부부 실거주에 최적화된 공간, 투룸 가격으로 쓰리룸의 넓은 공간을 누리세요
            </p>

            {/* CTA 버튼 */}
            <a
              href="tel:1666-0952"
              className="inline-block w-full max-w-md bg-[#f39e41] text-white py-5 px-8 text-lg font-bold hover:bg-[#e38d35] transition-all shadow-2xl rounded-sm"
            >
              무료 상담 신청하기
            </a>

            {/* 하단 작은 안내 문구 */}
            <p className="text-xs text-white/70 mt-6">
              * 상기 CG 및 일러스트, 이미지는 실제와 차이가 있습니다.
            </p>
          </div>
        </div>

        {/* OVERVIEW 섹션 */}
        <div className="bg-white px-6 py-16">
          <div className="mb-12">
            <h2 className="text-[#f39e41] text-sm font-bold mb-4 uppercase tracking-wider">OVERVIEW</h2>

            {/* 대지위치 */}
            <div className="mb-10">
              <h3 className="text-base text-[#707070] mb-3 font-medium">대지위치</h3>
              <p className="text-lg font-bold text-black">
                서울특별시 강서구 염창동 240-10
              </p>
            </div>

            {/* 건축규모 */}
            <div className="mb-10">
              <h3 className="text-base text-[#707070] mb-3 font-medium">건축규모</h3>
              <p className="text-lg font-bold text-black">
                지하5층, 지상18층 4개동
              </p>
            </div>

            {/* 세대안내 */}
            <div className="mb-10">
              <h3 className="text-base text-[#707070] mb-3 font-medium">세대안내</h3>
              <p className="text-lg font-bold text-black mb-2">
                총 330세대
              </p>
              <p className="text-sm text-[#707070]">
                총 330세대, 59A-84세대/59B-112세대/84A-84세대/84B-50세대
              </p>
            </div>

            {/* 시공예정사 */}
            <div className="mb-10">
              <h3 className="text-base text-[#707070] mb-3 font-medium">시공예정사</h3>
              <p className="text-lg font-bold text-black">
                (주)더채움건설
              </p>
            </div>
          </div>
        </div>

        {/* 플로팅 상담 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#f39e41] shadow-2xl max-w-[480px] mx-auto">
          <div className="flex items-center justify-center gap-2 py-4 px-6">
            <a
              href="tel:1666-0952"
              className="flex-1 bg-white text-[#f39e41] py-4 text-center font-bold text-base hover:bg-gray-100 transition-colors"
            >
              📞 전화 상담
            </a>
            <a
              href="https://open.kakao.com/o/s1Cc83Wh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#FEE500] text-[#3C1E1E] py-4 text-center font-bold text-base hover:bg-[#fdd700] transition-colors"
            >
              💬 카톡 상담
            </a>
          </div>
        </div>

        {/* 상담 신청 폼 */}
        <div className="px-6 py-16 bg-gray-50 mb-20">
          <div className="bg-white p-8 shadow-lg border border-gray-200">
            <div className="text-center mb-8">
              <div className="inline-block bg-[#f39e41] text-white px-4 py-1 text-xs font-bold mb-4 uppercase tracking-wider">
                관심고객등록
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">
                특별 분양가 안내
              </h2>
              <p className="text-sm text-[#707070]">
                상담 신청 시 최저가로 안내해드립니다
              </p>
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
                  className="w-full px-5 py-4 bg-white border-2 border-gray-300 text-black placeholder:text-[#989898] focus:outline-none focus:border-[#f39e41] transition-all"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="연락처 (- 없이 입력)"
                  required
                  className="w-full px-5 py-4 bg-white border-2 border-gray-300 text-black placeholder:text-[#989898] focus:outline-none focus:border-[#f39e41] transition-all"
                />
              </div>

              <div className="flex items-start gap-3 pt-2 px-1">
                <input
                  type="checkbox"
                  id="privacyAgree"
                  name="privacyAgree"
                  checked={formData.privacyAgree}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 text-[#f39e41] border-gray-300"
                />
                <label htmlFor="privacyAgree" className="text-xs text-[#707070] leading-relaxed">
                  개인정보 수집 및 이용에 동의합니다 (필수)
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 font-bold text-white text-lg shadow-lg transition-all ${
                  isSubmitting
                    ? 'bg-[#989898] cursor-not-allowed'
                    : 'bg-[#f39e41] hover:bg-[#e38d35]'
                }`}
              >
                {isSubmitting ? '처리 중...' : '무료 상담 신청하기'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

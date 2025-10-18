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
    <div className="min-h-screen bg-gray-100">

      {/* 메인 컨텐츠 */}
      <div className="w-full max-w-md mx-auto bg-white min-h-screen">

        {/* Hero Section - 대형 배경 이미지 */}
        <div className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 py-16">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-white to-[#f39e41] bg-clip-text text-transparent">
              염창역 더채움
            </h1>

            <div className="mb-12 px-4">
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                <span className="font-bold text-white">9호선 급행</span> 염창역 도보 3분 · <span className="font-bold text-white">한강</span> 5분 거리
              </p>
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                <span className="font-bold text-white">신혼부부</span> 실거주에 최적화된 공간
              </p>
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                <span className="font-bold text-white">투룸 가격</span>으로 <span className="font-bold text-white">쓰리룸</span>의 넓은 공간을 누리세요
              </p>
            </div>

            {/* CTA 버튼 */}
            <a
              href="tel:1666-0952"
              className="inline-block w-full max-w-md bg-[#f39e41] text-white py-5 px-8 text-lg font-bold hover:bg-[#e38d35] transition-all shadow-2xl rounded-sm"
            >
              무료 상담 신청하기
            </a>
          </div>
        </div>

        {/* OVERVIEW 섹션 */}
        <div className="bg-white px-6 py-16 pb-6">
          <div className="mb-12">
            <h2 className="text-[#f39e41] text-sm font-bold mb-4 uppercase tracking-wider">OVERVIEW</h2>

            {/* 대지위치 */}
            <div className="mb-10">
              <h3 className="text-base text-[#707070] mb-3 font-medium">대지위치</h3>
              <div className="border-t border-black mb-3"></div>
              <p className="text-lg font-bold text-black">
                서울특별시 강서구 염창동262-5
              </p>
            </div>

            {/* 건축규모 */}
            <div className="mb-10">
              <h3 className="text-base text-[#707070] mb-3 font-medium">건축규모</h3>
              <div className="border-t border-black mb-3"></div>
              <p className="text-lg font-bold text-black">
                지하1층, 지상20층 / 54.15m
              </p>
            </div>

            {/* 타입안내 */}
            <div className="mb-10">
              <h3 className="text-base text-[#707070] mb-3 font-medium">타입안내</h3>
              <div className="border-t border-black mb-3"></div>
              <p className="text-lg font-bold text-black mb-2">
                총 38세대
              </p>
              <p className="text-sm text-[#707070]">
                61㎡A / 61㎡B / 61㎡C / 61㎡D
              </p>
            </div>

            {/* 문의전화 */}
            <div className="mb-10">
              <h3 className="text-base text-[#707070] mb-3 font-medium">문의전화</h3>
              <div className="border-t border-black mb-3"></div>
              <a href="tel:1666-0952" className="text-lg font-bold text-[#f39e41] hover:text-[#e38d35] transition-colors">
                1666-0952
              </a>
            </div>
          </div>
        </div>

        {/* 이런 분께 추천드려요 섹션 */}
        <div className="relative px-6 py-16 overflow-hidden">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/yeomchang-thechaeum-unit-interior-02.jpg"
              alt="배경"
              fill
              className="object-cover"
            />
            {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <p className="text-sm text-white/70 mb-2">신혼집 자체로 준비된 최적 공간</p>
              <h2 className="text-2xl font-bold text-white mb-2">이런 분께 추천드려요</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-white/30 p-6 text-center bg-black/20 backdrop-blur-sm">
                {/* 지하철 아이콘 SVG */}
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm6 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1-7h-5V6h5v4z"/>
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2 text-base">9호선 급행</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  강남 · 여의도<br/>
                  빠른 출퇴근
                </p>
              </div>

              <div className="border border-white/30 p-6 text-center bg-black/20 backdrop-blur-sm">
                {/* 위치/맵 핀 아이콘 SVG */}
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2 text-base">한강 5분</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  자연과 함께<br/>
                  힐링 라이프
                </p>
              </div>

              <div className="border border-white/30 p-6 text-center bg-black/20 backdrop-blur-sm">
                {/* 하트/커플 아이콘 SVG */}
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2 text-base">신혼부부</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  첫 집 마련<br/>
                  실거주 최적
                </p>
              </div>

              <div className="border border-white/30 p-6 text-center bg-black/20 backdrop-blur-sm">
                {/* 집/건물 아이콘 SVG */}
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2 text-base">가성비</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  투룸 가격<br/>
                  쓰리룸 공간
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 플로팅 상담 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#f39e41] shadow-2xl max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 py-4 px-6">
            <a
              href="tel:1666-0952"
              className="flex-1 bg-white text-[#f39e41] py-4 text-center font-bold text-base hover:bg-gray-100 transition-colors"
            >
              📞 1666-0952
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

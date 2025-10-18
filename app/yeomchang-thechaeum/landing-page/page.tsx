"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    privacyAgree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);

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

  // 네이버 지도 초기화
  useEffect(() => {
    const initMap = () => {
      if (!window.naver || !window.naver.maps) {
        setTimeout(initMap, 100);
        return;
      }

      try {
        const projectLocation = { lat: 37.5480, lng: 126.8755 };

        const mapOptions = {
          center: new window.naver.maps.LatLng(projectLocation.lat, projectLocation.lng),
          zoom: 16,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
        };

        const map = new window.naver.maps.Map('landing-map', mapOptions);
        mapRef.current = map;

        // 마커 추가
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(projectLocation.lat, projectLocation.lng),
          map: map,
          title: "염창역 더채움",
          icon: {
            content: `
              <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <div style="
                  background: white;
                  color: #f39e41;
                  padding: 6px 12px;
                  border-radius: 8px;
                  font-weight: bold;
                  font-size: 13px;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                  white-space: nowrap;
                  border: 2px solid #f39e41;
                ">
                  염창역 더채움
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#f39e41" stroke="white" stroke-width="2"/>
                  <circle cx="12" cy="9" r="2.5" fill="white"/>
                </svg>
              </div>
            `,
            anchor: new window.naver.maps.Point(16, 48),
          },
        });

        setIsMapLoaded(true);
      } catch (error) {
        console.error('네이버맵 초기화 실패:', error);
      }
    };

    initMap();
  }, []);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
      />

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
                <span className="font-bold text-white">9호선 급행</span> 염창역 도보 3분
              </p>
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                <span className="font-bold text-white">한강공원</span> 5분 거리
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
              className="inline-block w-full max-w-md bg-[#f39e41] text-white py-5 px-8 text-lg font-bold hover:bg-[#e38d35] transition-all shadow-2xl rounded-tl-[2rem] rounded-br-[2rem]"
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
              <p className="text-lg font-bold text-black">
                스마일분양 / <a href="tel:1666-0952" className="text-[#f39e41] hover:text-[#e38d35] transition-colors">1666-0952</a>
              </p>
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
        <div className="px-6 py-8 bg-gray-50 mb-10">
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

        {/* 홍보관 오시는 길 */}
        <div className="bg-white px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-2">홍보관 오시는 길</h2>
            <p className="text-sm text-[#707070]">방문 상담을 원하시면 언제든지 찾아오세요</p>
          </div>

          <div className="mb-6 space-y-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#f39e41] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-black mb-1 text-sm">주소</h3>
                <p className="text-sm text-[#707070]">서울특별시 강서구 염창동262-5</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#f39e41] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-black mb-1 text-sm">운영시간</h3>
                <p className="text-sm text-[#707070]">평일·주말 09:00 - 20:00</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#f39e41] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <div>
                <h3 className="font-bold text-black mb-1 text-sm">대중교통</h3>
                <p className="text-sm text-[#707070]">9호선 염창역 1번 출구 도보 3분</p>
              </div>
            </div>
          </div>

          <div className="relative bg-gray-200 rounded-lg overflow-hidden" style={{ height: '250px' }}>
            <div id="landing-map" className="w-full h-full" />

            {!isMapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f39e41] mx-auto mb-2"></div>
                  <p className="text-sm text-[#707070]">지도를 불러오는 중...</p>
                </div>
              </div>
            )}

            {isMapLoaded && (
              <a
                href="https://map.naver.com/p/search/서울특별시%20강서구%20염창동262-5"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-white px-3 py-2 rounded-lg shadow-lg text-xs font-medium text-[#f39e41] hover:bg-gray-50 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                길찾기
              </a>
            )}
          </div>
        </div>

        {/* 푸터 */}
        <footer className="bg-[#2c2c2c] px-6 py-8 mb-20 text-center">
          <div className="mb-4">
            <h3 className="text-white font-bold text-base mb-2">염창역 더채움</h3>
            <p className="text-white/60 text-xs mb-1">서울특별시 강서구 염창동262-5</p>
            <p className="text-white/60 text-xs">스마일분양 / 문의: 1666-0952</p>
          </div>

          <div className="border-t border-white/20 pt-4 mt-4">
            <p className="text-white/40 text-xs">
              © 2025 스마일분양 / 염창역 더채움
            </p>
          </div>
        </footer>
        </div>
      </div>
    </>
  );
}

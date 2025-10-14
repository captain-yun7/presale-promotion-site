"use client";

import { motion } from "framer-motion";

export default function Showroom() {
  return (
    <section id="showroom" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* 홍보관 오시는 길 약도 */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-charcoal mb-3 md:mb-4">
              홍보관 오시는 길
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-2">
              서울시 영등포구 선유로54길14, 1층
            </p>
            <p className="text-luxury-gold font-bold text-sm md:text-base">
              당산역 2호선 1번 출구 / 9호선 13번 출구 도보 2분
            </p>
          </div>

          {/* 약도 이미지 */}
          <div className="max-w-4xl mx-auto mb-6 md:mb-8">
            <div className="relative border-2 border-gray-200 rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
              <img
                id="showroom-map"
                src="/showroom-map.png"
                alt="홍보관 오시는 길 약도"
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="flex items-center justify-center h-96 text-gray-500"><p class="text-center">약도 이미지를 준비중입니다.<br/>네이버 지도를 참고해주세요.</p></div>';
                  }
                }}
              />
            </div>
          </div>

          {/* 공유 및 다운로드 버튼 */}
          <div className="flex justify-center gap-3 md:gap-4 flex-wrap px-4 mb-8 md:mb-12">
            <button
              onClick={() => {
                const img = document.getElementById('showroom-map') as HTMLImageElement;
                if (!img || !img.src) return;

                fetch(img.src)
                  .then(res => res.blob())
                  .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = '염창역더채움_홍보관_오시는길.png';
                    a.click();
                    URL.revokeObjectURL(url);
                  })
                  .catch(() => {
                    alert('이미지 다운로드에 실패했습니다.');
                  });
              }}
              className="bg-luxury-gold hover:bg-opacity-90 text-luxury-charcoal px-5 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base transition-all shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[180px]"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="whitespace-nowrap">이미지 다운로드</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: '염창역 더채움 홍보관 오시는 길',
                    text: '서울시 영등포구 선유로54길14, 1층\n당산역 2호선 1번 출구 / 9호선 13번 출구 도보 2분',
                    url: window.location.href
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('링크가 복사되었습니다!');
                }
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base transition-all shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[180px]"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="whitespace-nowrap">공유하기</span>
            </button>
          </div>

          {/* 추가 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-0">
            <div className="bg-gray-50 p-5 md:p-6 rounded-xl md:rounded-2xl">
              <h4 className="text-base md:text-lg font-bold text-luxury-charcoal mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                지하철 이용
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                <li>• 2호선 당산역 1번 출구 도보 2분</li>
                <li>• 9호선 당산역 13번 출구 도보 2분</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-5 md:p-6 rounded-xl md:rounded-2xl">
              <h4 className="text-base md:text-lg font-bold text-luxury-charcoal mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
                주차 안내
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                <li>• 건물 내 주차 가능</li>
                <li>• 주차 공간 한정적 (대중교통 이용 권장)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

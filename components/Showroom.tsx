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
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">
              홍보관 오시는 길
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-2">
              서울특별시 강서구 염창동 262-5
            </p>
            <p className="text-luxury-gold font-bold text-sm md:text-base">
              염창역 도보 4분
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
            <a
              href="tel:1666-0952"
              className="bg-luxury-gold hover:bg-opacity-90 text-luxury-charcoal px-5 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base transition-all shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[180px]"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span className="whitespace-nowrap">1666-0952</span>
            </a>

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
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base transition-all shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[180px]"
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
                    text: '서울특별시 강서구 염창동 262-5\n염창역 도보 3분',
                    url: window.location.href
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('링크가 복사되었습니다!');
                }
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base transition-all shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[180px]"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="whitespace-nowrap">공유하기</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComplexInfo({ disableAnimation = false }: { disableAnimation?: boolean }) {
  const [showAll, setShowAll] = useState(false);
  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          <path d="M4 12h16M12 2v20"/>
        </svg>
      ),
      title: "9호선 급행 초역세권",
      description: (
        <>
          염창역 도보 3분,<br />
          한강벨트라인 황금노선 접근성
        </>
      ),
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
      ),
      title: "전 세대 먹방 없이 시원한 뷰",
      description: (
        <>
          막힘없는 전호실 일조량 GOOD,<br />
          탁 트인 조망
        </>
      ),
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
        </svg>
      ),
      title: "의료 인프라 대한민국 2위",
      description: (
        <>
          인근 대학병원 3개,<br />
          의료시설 밀집 지역
        </>
      ),
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
        </svg>
      ),
      title: "제2의 목동 학군",
      description: (
        <>
          목동에 뒤쳐지지 않는<br />
          우수한 교육 환경
        </>
      ),
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: (
        <>
          삼성 비스포크 +<br />
          현대 리바트 풀옵션
        </>
      ),
      description: (
        <>
          프리미엄 가전·가구 완비,<br />
          입주 즉시 생활 가능
        </>
      ),
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm7 16h-2v-6H7v6H5v-8.5l7-6.3 7 6.3V19z"/>
        </svg>
      ),
      title: "염창&가양 개발 호재",
      description: (
        <>
          사업비 4조 규모 업무시설 착공<br />
          (코엑스 약 2배 규모)
        </>
      ),
    },
  ];

  const complexData = [
    {
      label: "위치",
      value: (
        <>
          서울특별시<br /> 강서구 염창동
        </>
      )
    },
    {
      label: "브랜드",
      value: (
        <>
          더채움<br /> (4번째 성공 신화)
        </>
      )
    },
    {
      label: "타입",
      value: "쓰리룸 아파텔"
    },
    { label: "주차", value: "1:1 주차 가능" },
  ];

  return (
    <section id="complex-info" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-16 px-4">
          <p className="text-secondary text-xs md:text-base mb-2 md:mb-3 font-medium">Complex Information</p>
          <h2 className="text-xl sm:text-2xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
            단지 정보
          </h2>
          <p className="text-gray-600 text-xs md:text-base max-w-2xl mx-auto">
            프리미엄 라이프스타일을 위한 완벽한 주거 환경을 제공합니다
          </p>
        </div>

        {/* Complex Overview */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12 mx-4 md:mx-0">
          {complexData.map((item, index) => (
            <div key={index} className="relative w-full pb-[100%]">
              <div className="absolute inset-0 bg-primary-600 rounded-full shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300 p-2 md:p-6">
                <div className="flex flex-col items-center">
                  <div className="bg-luxury-gold text-luxury-charcoal px-2 py-1 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-base mb-2 md:mb-3 shadow-lg">
                    {item.label}
                  </div>
                  <div className="w-8 md:w-12 h-px bg-white/40 mb-2 md:mb-3"></div>
                  <div className="h-10 md:h-20 flex items-start justify-center">
                    <p className="text-white font-bold text-xs md:text-2xl leading-tight text-center px-1 md:px-2">{item.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Timeline */}
        <div className="relative px-4 md:px-0 max-w-5xl mx-auto">
          {/* Mobile View */}
          <div className="lg:hidden">
            <div className="space-y-4">
              {/* 처음 3개 항목 - 항상 표시 */}
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={disableAnimation ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-luxury-gold rounded-2xl p-4 md:p-6 shadow-lg"
                >
                  <h3 className="text-base md:text-xl font-bold text-primary-600 leading-snug md:leading-tight mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed font-semibold">
                    {feature.description}
                  </p>
                </motion.div>
              ))}

              {/* 나머지 3개 항목 - 토글 */}
              <AnimatePresence>
                {showAll && features.slice(3).map((feature, index) => (
                  <motion.div
                    key={index + 3}
                    initial={disableAnimation ? {} : { opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-luxury-gold rounded-2xl p-4 md:p-6 shadow-lg overflow-hidden"
                  >
                    <h3 className="text-base md:text-xl font-bold text-primary-600 leading-snug md:leading-tight mb-2 md:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed font-semibold">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* 더보기 버튼 */}
            <div className="flex justify-center mt-6">
              <motion.button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-6 py-3 border-2 border-luxury-gold text-luxury-charcoal font-bold rounded-full hover:bg-luxury-gold transition-all shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm md:text-base">
                  {showAll ? "접기" : "더 많은 특징 보기"}
                </span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
            </div>
          </div>

          {/* Desktop Timeline View */}
          <div className="hidden lg:block relative py-20">
            {/* Center Timeline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary-600 transform -translate-x-1/2"></div>

            <div className="-space-y-4">
              {features.map((feature, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div key={index} className="relative flex items-center">
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 top-1/2 w-5 h-5 bg-luxury-gold border-4 border-primary-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg"></div>

                    {/* Branch Line */}
                    <div className={`absolute top-1/2 ${isLeft ? 'right-1/2 left-0' : 'left-1/2 right-0'} h-0.5 bg-primary-600 transform -translate-y-1/2`}></div>

                    {/* Card */}
                    <div className={`${isLeft ? 'ml-0 mr-auto pr-12' : 'ml-auto mr-0 pl-12'} w-[360px]`}>
                      <div className="bg-luxury-gold rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 relative z-10">
                        <h3 className="text-2xl font-bold text-primary-600 leading-tight mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-base text-gray-700 leading-relaxed font-semibold">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function ValueProposition({ disableAnimation = false }: { disableAnimation?: boolean }) {
  const valuePoints = [
    {
      title: "9호선 급행 초역세권",
      description: (
        <>
          한강벨트라인 황금노선,<br /> 마곡·여의도·강남 30분 생활권
        </>
      ),
      icon: (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          <path d="M4 12h16M12 2v20"/>
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      stats: "급행역",
      detail: "출퇴근 시간 단축",
    },
    {
      title: (
        <>
          역세권·초품아·숲세권<br className="sm:hidden" /> 트리플 입지
        </>
      ),
      description: (
        <>
          전 세대 먹방 없이 시원한 뷰,<br /> 염창&가양 개발 호재 (4조 규모)
        </>
      ),
      icon: (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L4 7v9c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-8-5zm0 2.18l6 3.5v7.32c0 4.51-3.08 8.72-6 9.82-2.92-1.1-6-5.31-6-9.82V7.68l6-3.5zM12 6c-1.66 0-3 1.34-3 3 0 2 3 5 3 5s3-3 3-5c0-1.66-1.34-3-3-3z"/>
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-500",
      stats: "트리플",
      detail: "프리미엄 입지",
    },
    {
      title: "투룸 가격에 쓰리룸!",
      description: (
        <>
          파격 할인으로 안전마진 확실,<br /> 실거주·투자 모두 최적
        </>
      ),
      icon: (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      stats: "안전마진 확실",
      detail: "가성비 최고",
    },
  ];

  return (
    <section id="value-proposition" className="section-padding bg-luxury-cream">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={disableAnimation ? {} : { opacity: 0, y: 30 }}
          whileInView={disableAnimation ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-luxury-gold text-sm md:text-base mb-2 md:mb-3 font-medium tracking-wide">
            3 REASONS TO CHOOSE
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-3 md:mb-6">
            더채움을 선택하는 이유
          </h2>
          <p className="text-gray-600 text-sm md:text-base px-4 max-w-2xl mx-auto">
            염창역 더채움이 선택받는 핵심 차별점
          </p>
        </motion.div>

        {/* Value Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16 px-4 md:px-0">
          {valuePoints.map((point, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={disableAnimation ? {} : { opacity: 0, y: 50 }}
              whileInView={disableAnimation ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="bg-primary-600 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Number Badge */}
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-luxury-gold font-bold text-lg md:text-xl">{index + 1}</span>
                </div>

                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${point.gradient} opacity-0 group-hover:opacity-10 rounded-2xl md:rounded-3xl transition-opacity duration-500`}
                />

                {/* Title */}
                <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4 leading-tight">
                  {point.title}
                </h3>

                {/* Description */}
                <p className="text-white/90 text-sm md:text-base mb-4 md:mb-6 leading-relaxed flex-grow">
                  {point.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/48 mt-auto">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-luxury-gold mb-1">
                      {point.stats}
                    </p>
                    <p className="text-xs md:text-sm text-white/70">{point.detail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

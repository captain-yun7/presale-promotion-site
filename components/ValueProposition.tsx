"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ValueProposition() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);

  useEffect(() => {
    // Simulate real-time visitor count
    const targetVisitors = 2847;
    const targetReservations = 342;

    const visitorInterval = setInterval(() => {
      setVisitorCount((prev) => {
        if (prev < targetVisitors) {
          return prev + Math.floor(Math.random() * 50) + 20;
        }
        clearInterval(visitorInterval);
        return targetVisitors;
      });
    }, 50);

    const reservationInterval = setInterval(() => {
      setReservationCount((prev) => {
        if (prev < targetReservations) {
          return prev + Math.floor(Math.random() * 5) + 2;
        }
        clearInterval(reservationInterval);
        return targetReservations;
      });
    }, 100);

    return () => {
      clearInterval(visitorInterval);
      clearInterval(reservationInterval);
    };
  }, []);

  const valuePoints = [
    {
      title: "더블역세권의 프리미엄",
      description: "2·9호선 염창역 도보 3분, 서울 전역 30분대 접근",
      icon: "🚇",
      gradient: "from-blue-500 to-cyan-500",
      stats: "2개 노선",
      detail: "출퇴근 시간 단축",
    },
    {
      title: "한강 라이프 스타일",
      description: "한강공원 10분, 프리미엄 수변 생활권",
      icon: "🌊",
      gradient: "from-emerald-500 to-teal-500",
      stats: "도보 10분",
      detail: "한강 조망권",
    },
    {
      title: "완벽한 생활 인프라",
      description: "대형마트·백화점·문화시설 5분 거리",
      icon: "🏢",
      gradient: "from-purple-500 to-pink-500",
      stats: "반경 500m",
      detail: "생활 편의시설",
    },
  ];

  return (
    <section id="value-proposition" className="section-padding bg-luxury-cream">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-luxury-gold text-lg mb-3 font-medium tracking-wide">
            3 REASONS TO CHOOSE
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-luxury-charcoal mb-6">
            3초 안에 설득되는 이유
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            염창역 더채움이 선택받는 핵심 차별점
          </p>
        </motion.div>

        {/* Value Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {valuePoints.map((point, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${point.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  className="text-7xl mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {point.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-luxury-charcoal mb-4">
                  {point.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {point.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div>
                    <p className="text-3xl font-bold text-luxury-gold mb-1">
                      {point.stats}
                    </p>
                    <p className="text-sm text-gray-500">{point.detail}</p>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg
                      className="w-8 h-8 text-luxury-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Section */}
        <motion.div
          className="bg-gradient-to-br from-luxury-charcoal via-gray-800 to-luxury-charcoal rounded-3xl p-12 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              실시간 관심도
            </h3>
            <p className="text-gray-300 text-lg">
              지금 이 순간에도 많은 분들이 염창역 더채움에 주목하고 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visitor Count */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-6xl mb-4">👥</div>
              <p className="text-gray-300 text-lg mb-3">누적 방문자</p>
              <motion.p
                className="text-5xl md:text-6xl font-bold text-luxury-gold mb-2"
                key={visitorCount}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {visitorCount.toLocaleString()}
              </motion.p>
              <p className="text-sm text-gray-400">명</p>
            </motion.div>

            {/* Reservation Count */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-300 text-lg mb-3">상담 예약</p>
              <motion.p
                className="text-5xl md:text-6xl font-bold text-luxury-gold mb-2"
                key={reservationCount}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {reservationCount.toLocaleString()}
              </motion.p>
              <p className="text-sm text-gray-400">건</p>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {[
              { icon: "⭐", text: "고객 만족도 98%" },
              { icon: "🏆", text: "2025 올해의 분양" },
              { icon: "✅", text: "투명한 분양 절차" },
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-white font-semibold">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

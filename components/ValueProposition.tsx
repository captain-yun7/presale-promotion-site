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
      title: "9호선 급행 초역세권",
      description: "한강벨트라인 황금노선, 마곡·여의도·강남 30분 생활권",
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
      title: "역세권·초품아·숲세권 트리플 입지",
      description: "전 세대 먹방 없이 시원한 뷰, 염창&가양 개발 호재 (4조 규모)",
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
      description: "파격 할인으로 안전마진 2억, 실거주·투자 모두 최적",
      icon: (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      stats: "2억 마진",
      detail: "가성비 최고",
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
            더채움을 선택하는 이유
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
                  className="text-luxury-gold mb-6"
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
              <div className="text-luxury-gold mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
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
              <div className="text-luxury-gold mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
                </svg>
              </div>
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
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ),
                text: "더채움 브랜드 4번째 성공 신화"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  </svg>
                ),
                text: "1:1 주차 가능"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                ),
                text: "실거주·투자 모두 OK"
              },
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-luxury-gold">{badge.icon}</span>
                <span className="text-white font-semibold">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

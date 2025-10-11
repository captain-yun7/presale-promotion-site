"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const qnaData = [
  {
    id: 1,
    question: "주택수·대출규제·자금조달 제한이 정말 없나요?",
    answer: "네, 맞습니다. 염창역 더채움은 아파텔로 분류되어 주택수에 포함되지 않으며, 대출규제, 자금조달 증빙, 실거주의무 모두 해당되지 않습니다. 실거주자와 투자자 모두에게 열린 기회입니다.",
    author: "김**",
    date: "2025-10-09",
    category: "분양",
  },
  {
    id: 2,
    question: "투룸 가격에 쓰리룸이라는데 실제 가격 차이가 얼마나 나나요?",
    answer: "파격 할인이 적용되어 인근 투룸 시세 대비 쓰리룸을 분양받으실 수 있으며, 안전마진은 약 2억 정도로 예상됩니다. 자세한 분양가는 상담을 통해 안내드립니다.",
    author: "이**",
    date: "2025-10-08",
    category: "분양",
  },
  {
    id: 3,
    question: "실거주 목적인데 투자 목적 분양도 가능한가요?",
    answer: "네, 가능합니다. 실거주의무가 없어 실거주자와 투자자 모두 분양받으실 수 있습니다. 실거주 후 전월세 전환도 자유롭습니다.",
    author: "박**",
    date: "2025-10-07",
    category: "분양",
  },
  {
    id: 4,
    question: "삼성 비스포크와 현대 리바트가 기본 포함인가요?",
    answer: "네, 삼성 비스포크 가전 풀옵션(냉장고, 김치냉장고, 식기세척기 등)과 현대 리바트 가구가 기본 제공됩니다. 입주 즉시 생활 가능한 프리미엄 옵션입니다.",
    author: "최**",
    date: "2025-10-06",
    category: "시설",
  },
  {
    id: 5,
    question: "주차는 몇 대까지 가능한가요?",
    answer: "세대당 1:1 주차가 가능합니다. 별도 추가 비용 없이 1대의 주차 공간이 보장됩니다.",
    author: "정**",
    date: "2025-10-05",
    category: "시설",
  },
  {
    id: 6,
    question: "염창&가양 개발 호재가 정말 코엑스 2배 규모인가요?",
    answer: "네, 사업비 약 4조 규모의 업무시설이 착공 시작되었으며, 이는 코엑스의 약 2배 규모입니다. 마곡, 여의도, 마포, DMC 수요 흡수와 함께 지역 가치 상승이 기대됩니다.",
    author: "강**",
    date: "2025-10-04",
    category: "입주",
  },
];

const timeline = [
  { date: "2025.10.15", event: "사전 홍보관 오픈", status: "upcoming" },
  { date: "2025.11.01", event: "모델하우스 오픈", status: "upcoming" },
  { date: "2025.11.15", event: "분양 공고", status: "scheduled" },
  { date: "2025.11.25", event: "청약 접수", status: "scheduled" },
  { date: "2025.12.05", event: "당첨자 발표", status: "scheduled" },
  { date: "2026.01.15", event: "계약 체결", status: "scheduled" },
];

export default function SocialProofHub() {
  const [selectedQna, setSelectedQna] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = ["전체", "분양", "입주", "시설"];

  const filteredQna =
    selectedCategory === "전체"
      ? qnaData
      : qnaData.filter((item) => item.category === selectedCategory);

  return (
    <section id="social-proof" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-luxury-gold text-lg mb-3 font-medium tracking-wide">
            SOCIAL PROOF HUB
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-luxury-charcoal mb-6">
            신뢰 구축
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            실시간 관심도와 고객 문의사항을 확인하세요
          </p>
        </motion.div>

        {/* Q&A Section */}
        <motion.div
          className="bg-white rounded-3xl p-12 shadow-xl mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-luxury-charcoal mb-4">
              자주 묻는 질문
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              고객님들이 가장 궁금해하시는 내용입니다
            </p>

            {/* Category Filter */}
            <div className="flex justify-center gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-luxury-gold text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredQna.map((item, index) => (
              <motion.div
                key={item.id}
                className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-luxury-gold transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() =>
                    setSelectedQna(selectedQna === item.id ? null : item.id)
                  }
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-luxury-cream transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-luxury-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Q
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.author} · {item.date}
                      </span>
                      <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-luxury-charcoal">
                      {item.question}
                    </h4>
                  </div>
                  <motion.svg
                    className="w-6 h-6 text-luxury-gold ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: selectedQna === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: selectedQna === item.id ? "auto" : 0,
                    opacity: selectedQna === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-luxury-cream border-t-2 border-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0">
                        A
                      </span>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="bg-gradient-to-br from-luxury-charcoal via-gray-800 to-luxury-charcoal rounded-3xl p-12 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              분양 일정
            </h3>
            <p className="text-gray-300 text-lg">
              염창역 더채움의 주요 일정을 확인하세요
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-luxury-gold/30 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col md:flex-row items-center gap-8"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Left Side (Desktop) */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left md:order-2"
                    }`}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 inline-block">
                      <p className="text-luxury-gold font-bold text-2xl mb-2">
                        {item.date}
                      </p>
                      <p className="text-white text-lg font-semibold">{item.event}</p>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-luxury-gold flex items-center justify-center shadow-2xl"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-2xl">
                        {item.status === "upcoming" ? "📍" : "📅"}
                      </span>
                    </motion.div>
                  </div>

                  {/* Right Side (Desktop) */}
                  <div className="flex-1 md:order-1" />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-gray-300 text-sm mb-4">
              * 상기 일정은 내부 사정에 따라 변경될 수 있습니다
            </p>
            <button className="bg-luxury-gold hover:bg-white text-luxury-charcoal px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              상담 예약하기
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const interestData = [
  { area: "영등포", value: 320 },
  { area: "강서구", value: 450 },
  { area: "양천구", value: 280 },
  { area: "구로구", value: 190 },
  { area: "강남구", value: 240 },
  { area: "마포구", value: 210 },
];

const qnaData = [
  {
    id: 1,
    question: "분양가는 어떻게 되나요?",
    answer: "분양가는 평형별로 상이하며, 상담을 통해 자세한 안내가 가능합니다. 1588-XXXX로 문의 주시면 친절히 안내드리겠습니다.",
    author: "김**",
    date: "2025-10-08",
    category: "분양",
  },
  {
    id: 2,
    question: "입주 시기는 언제인가요?",
    answer: "입주 예정일은 2026년 12월입니다. 정확한 일정은 추후 공지될 예정입니다.",
    author: "이**",
    date: "2025-10-07",
    category: "입주",
  },
  {
    id: 3,
    question: "주차는 몇 대까지 가능한가요?",
    answer: "세대당 1.5대 주차 가능하며, 방문자 주차공간도 별도로 마련되어 있습니다.",
    author: "박**",
    date: "2025-10-06",
    category: "시설",
  },
  {
    id: 4,
    question: "커뮤니티 시설은 어떤 것이 있나요?",
    answer: "피트니스센터, 골프연습장, 독서실, 키즈카페, 게스트하우스 등 다양한 커뮤니티 시설이 갖춰져 있습니다.",
    author: "최**",
    date: "2025-10-05",
    category: "시설",
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

        {/* Interest Heatmap */}
        <motion.div
          className="bg-white rounded-3xl p-12 shadow-xl mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-luxury-charcoal mb-4">
              지역별 실시간 관심도
            </h3>
            <p className="text-gray-600 text-lg">
              어느 지역에서 가장 많은 관심을 보이고 있을까요?
            </p>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={interestData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="area"
                stroke="#6b7280"
                style={{ fontSize: "14px", fontWeight: "600" }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: "14px", fontWeight: "600" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "2px solid #d4af37",
                  borderRadius: "12px",
                  padding: "12px",
                }}
                labelStyle={{ fontWeight: "bold", color: "#2c2c2c" }}
              />
              <Bar dataKey="value" fill="#d4af37" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {interestData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-luxury-cream rounded-xl p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-gray-600 mb-1">{item.area}</p>
                <p className="text-2xl font-bold text-luxury-gold">{item.value}명</p>
              </motion.div>
            ))}
          </div>
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

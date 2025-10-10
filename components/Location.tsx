"use client";

import { useState } from "react";

const categories = [
  {
    id: "transportation",
    name: "교통",
    icon: "🚇",
    items: [
      { name: "○○역 (2호선)", distance: "도보 3분" },
      { name: "○○역 (9호선)", distance: "도보 5분" },
      { name: "강남역", distance: "지하철 10분" },
      { name: "버스정류장", distance: "도보 1분" },
    ],
  },
  {
    id: "education",
    name: "교육",
    icon: "🏫",
    items: [
      { name: "○○초등학교", distance: "도보 5분" },
      { name: "○○중학교", distance: "도보 7분" },
      { name: "○○고등학교", distance: "도보 10분" },
      { name: "○○영어학원가", distance: "차량 5분" },
    ],
  },
  {
    id: "shopping",
    name: "쇼핑",
    icon: "🛍️",
    items: [
      { name: "롯데백화점", distance: "도보 5분" },
      { name: "현대백화점", distance: "차량 5분" },
      { name: "코엑스몰", distance: "지하철 15분" },
      { name: "○○마트", distance: "도보 3분" },
    ],
  },
  {
    id: "park",
    name: "공원/문화",
    icon: "🌳",
    items: [
      { name: "○○공원", distance: "도보 3분" },
      { name: "한강공원", distance: "차량 10분" },
      { name: "○○도서관", distance: "도보 7분" },
      { name: "○○문화센터", distance: "도보 5분" },
    ],
  },
];

export default function Location() {
  const [selectedCategory, setSelectedCategory] = useState("transportation");

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  return (
    <section id="location" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-secondary text-lg mb-3 font-medium">Location & Amenities</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            입지 환경
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            완벽한 교통망과 생활 인프라가 갖춰진 프리미엄 입지
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="relative aspect-video bg-gradient-to-br from-green-100 to-blue-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📍</div>
                <p className="text-2xl font-bold text-primary mb-2">
                  서울특별시 강남구 테헤란로
                </p>
                <p className="text-gray-600">
                  (카카오맵 API 연동 예정 위치)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Location Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCategory?.items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-primary">{item.name}</h3>
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-secondary font-bold text-lg">{item.distance}</p>
            </div>
          ))}
        </div>

        {/* Transportation Highlight */}
        <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                역세권 프리미엄
              </h3>
              <p className="text-lg text-gray-100">
                2개 노선 이용 가능한 더블역세권, 서울 전역으로의 빠른 이동
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl mb-3">🚇</div>
                <p className="font-bold text-xl mb-2">2호선 도보 3분</p>
                <p className="text-gray-100 text-sm">강남순환선 이용</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">🚌</div>
                <p className="font-bold text-xl mb-2">광역버스 직통</p>
                <p className="text-gray-100 text-sm">경기/인천 접근 용이</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">🛣️</div>
                <p className="font-bold text-xl mb-2">간선도로 인접</p>
                <p className="text-gray-100 text-sm">차량 이동 최적화</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

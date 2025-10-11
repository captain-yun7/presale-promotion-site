"use client";

import { useState } from "react";
import Image from "next/image";

const unitTypes = [
  {
    id: 1,
    type: "59A",
    area: "59㎡",
    pyeong: "17평형",
    rooms: "2",
    bathrooms: "1",
    features: ["남향 배치", "3Bay 구조", "알파룸"],
    images: [
      "/images/unit-59a-1.jpg",
      "/images/unit-59a-2.jpg",
      "/images/unit-59a-3.jpg",
    ],
  },
  {
    id: 2,
    type: "84A",
    area: "84㎡",
    pyeong: "25평형",
    rooms: "3",
    bathrooms: "2",
    features: ["남동향 배치", "4Bay 구조", "드레스룸", "팬트리"],
    images: [
      "/images/unit-84a-1.jpg",
      "/images/unit-84a-2.jpg",
      "/images/unit-84a-3.jpg",
    ],
  },
  {
    id: 3,
    type: "114A",
    area: "114㎡",
    pyeong: "34평형",
    rooms: "4",
    bathrooms: "2",
    features: ["남향 배치", "5Bay 구조", "대형 거실", "드레스룸", "팬트리"],
    images: [
      "/images/unit-114a-1.jpg",
      "/images/unit-114a-2.jpg",
      "/images/unit-114a-3.jpg",
    ],
  },
];

export default function UnitTypes() {
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section id="unit-types" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-luxury-gold text-lg mb-3 font-medium">투룸값에 쓰리룸 산다!</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            세대 정보
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            파격 할인으로 안전마진 2억, 실거주와 투자 모두 최적의 쓰리룸 아파텔
          </p>
        </div>

        {/* Unit Type Tabs */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          {unitTypes.map((unit, index) => (
            <button
              key={unit.id}
              onClick={() => {
                setSelectedUnit(index);
                setSelectedImage(0);
              }}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${
                selectedUnit === index
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {unit.type} ({unit.pyeong})
            </button>
          ))}
        </div>

        {/* Unit Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xl font-bold">
                평면도 {unitTypes[selectedUnit].type}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {unitTypes[selectedUnit].images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-video bg-gray-200 rounded-lg overflow-hidden ${
                    selectedImage === index
                      ? "ring-4 ring-secondary"
                      : "hover:opacity-80"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                    뷰 {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Unit Information */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-primary mb-6">
                {unitTypes[selectedUnit].type}형
              </h3>

              {/* Specifications */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">공급면적</span>
                  <span className="font-bold text-primary text-xl">
                    {unitTypes[selectedUnit].area}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">평형</span>
                  <span className="font-bold text-primary text-xl">
                    {unitTypes[selectedUnit].pyeong}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">방 구성</span>
                  <span className="font-bold text-primary text-xl">
                    {unitTypes[selectedUnit].rooms}Room / {unitTypes[selectedUnit].bathrooms}Bath
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4 text-primary">주요 특징</h4>
                <ul className="space-y-3">
                  {unitTypes[selectedUnit].features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-secondary mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-secondary text-white px-6 py-3 rounded-full font-bold hover:bg-accent transition-all">
                  평면도 다운로드
                </button>
                <button className="flex-1 border-2 border-primary text-primary px-6 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all">
                  상담 신청
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-6 bg-luxury-cream rounded-xl border-2 border-luxury-gold">
              <p className="text-sm font-semibold text-luxury-charcoal mb-2">
                💰 투룸 가격에 쓰리룸 특가!
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                ✅ 삼성 비스포크 가전 풀옵션<br />
                ✅ 현대 리바트 가구 포함<br />
                ✅ 1:1 주차 가능<br />
                ✅ 전 호실 일조량 GOOD (막힘없는 뷰)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

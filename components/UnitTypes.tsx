"use client";

import { useState } from "react";
import Image from "next/image";

const unitTypes = [
  {
    id: 1,
    type: "61A",
    area: "전용 46.07㎡",
    supply: "공급 58.32㎡",
    pyeong: "17.64평",
    floorPlan: "/ref_data/평면도A.png",
    specs: {
      exclusive: "46.07㎡ (13.94평)",
      common: "12.25㎡ (3.71평)",
      service: "4.31㎡ (1.30평)",
      other: "62.63㎡ (18.95평)",
      ratio: "73.56%"
    },
    features: [
      "3ROOM+욕실+발코니+창고대",
      "공간활용 특화 공간 분리 구조",
      "3구 하이브리드, 경비실전화, 현관비밀번호, ADT캡스, 세대기가, 세대비상벨, 3in 1 전화망 에어컨, HAZZS칫솔꽂이, 신발세탁기",
      "비스포크 알림 냉장고, 3in 1 전화망 에어컨, 에어드레서"
    ]
  },
  {
    id: 2,
    type: "61B",
    area: "전용 46.21㎡",
    supply: "공급 58.47㎡",
    pyeong: "17.69평",
    floorPlan: "/ref_data/평면도B.png",
    specs: {
      exclusive: "46.21㎡ (13.98평)",
      common: "12.26㎡ (3.05평)",
      service: "4.32㎡ (1.31평)",
      other: "62.79㎡ (18.99평)",
      ratio: "73.59%"
    },
    features: [
      "3ROOM+욕실+발코니+창고대",
      "공간활용 특화 공간 분리 구조",
      "3구 하이브리드, 경비실전화, 현관비밀번호, ADT캡스, 세대기가, 세대비상벨, 3in 1 전화망 에어컨, HAZZS칫솔꽂이, 신발세탁기",
      "비스포크 알림 냉장고, 3in 1 전화망 에어컨, 에어드레서"
    ]
  },
  {
    id: 3,
    type: "61C",
    area: "전용 61.87㎡",
    supply: "공급 77.84㎡",
    pyeong: "23.56평",
    floorPlan: "/ref_data/평면도C.png",
    specs: {
      exclusive: "61.87㎡ (18.72평)",
      common: "15.97㎡ (4.83평)",
      service: "5.78㎡ (1.75평)",
      other: "83.62㎡ (25.30평)",
      ratio: "73.99%"
    },
    features: [
      "3ROOM+욕실+발코니+창고대",
      "공간활용 특화 공간 분리 구조",
      "3구 하이브리드, 경비실전화, 현관비밀번호, ADT캡스, 세대기가, 세대비상벨, 3in 1 전화망 에어컨, HAZZS칫솔꽂이, 신발세탁기",
      "비스포크 알림 냉장고, 3in 1 전화망 에어컨, 에어드레서"
    ]
  },
  {
    id: 4,
    type: "61D",
    area: "전용 62.01㎡",
    supply: "공급 78.00㎡",
    pyeong: "23.56평",
    floorPlan: "/ref_data/평면도D.png",
    specs: {
      exclusive: "62.01㎡ (18.76평)",
      common: "15.99㎡ (4.84평)",
      service: "5.79㎡ (1.75평)",
      other: "83.79㎡ (25.35평)",
      ratio: "74.01%"
    },
    features: [
      "3ROOM+욕실+발코니+창고대",
      "공간활용 특화 공간 분리 구조",
      "3구 하이브리드, 경비실전화, 현관비밀번호, ADT캡스, 세대기가, 세대비상벨, 3in 1 전화망 에어컨, HAZZS칫솔꽂이, 신발세탁기",
      "비스포크 알림 냉장고, 3in 1 전화망 에어컨, 에어드레서"
    ]
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
          {/* Floor Plan Image */}
          <div>
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden border-2 border-gray-200">
              <Image
                src={unitTypes[selectedUnit].floorPlan}
                alt={`${unitTypes[selectedUnit].type}형 평면도`}
                fill
                className="object-contain p-4"
              />
            </div>
          </div>

          {/* Unit Information */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-primary mb-6">
                {unitTypes[selectedUnit].type}형
              </h3>

              {/* Specifications */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">전용면적</span>
                  <span className="font-bold text-primary text-lg">
                    {unitTypes[selectedUnit].specs.exclusive}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">공용면적</span>
                  <span className="font-bold text-primary text-lg">
                    {unitTypes[selectedUnit].specs.common}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">공급면적</span>
                  <span className="font-bold text-primary text-lg">
                    {unitTypes[selectedUnit].supply}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">기타면적</span>
                  <span className="font-bold text-primary text-lg">
                    {unitTypes[selectedUnit].specs.service}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">계약면적</span>
                  <span className="font-bold text-primary text-lg">
                    {unitTypes[selectedUnit].specs.other}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">전용률</span>
                  <span className="font-bold text-primary text-lg">
                    {unitTypes[selectedUnit].specs.ratio}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-primary">주요 특징</h4>
                <ul className="space-y-3">
                  {unitTypes[selectedUnit].features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <svg
                        className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

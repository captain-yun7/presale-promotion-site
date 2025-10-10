"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const categories = [
  {
    id: "transportation",
    name: "교통",
    icon: "🚇",
    items: [
      { name: "염창역 (2호선)", distance: "도보 3분", coords: { lat: 37.5477, lng: 126.8747 } },
      { name: "염창역 (9호선)", distance: "도보 3분", coords: { lat: 37.5477, lng: 126.8747 } },
      { name: "신목동역", distance: "도보 8분", coords: { lat: 37.5467, lng: 126.8800 } },
      { name: "당산역", distance: "지하철 5분", coords: { lat: 37.5347, lng: 126.9025 } },
    ],
  },
  {
    id: "education",
    name: "교육",
    icon: "🏫",
    items: [
      { name: "강서초등학교", distance: "도보 5분", coords: { lat: 37.5490, lng: 126.8720 } },
      { name: "영등포중학교", distance: "도보 7분", coords: { lat: 37.5470, lng: 126.8780 } },
      { name: "영등포고등학교", distance: "도보 10분", coords: { lat: 37.5450, lng: 126.8820 } },
      { name: "목동학원가", distance: "차량 5분", coords: { lat: 37.5300, lng: 126.8750 } },
    ],
  },
  {
    id: "shopping",
    name: "쇼핑",
    icon: "🛍️",
    items: [
      { name: "이마트 염창점", distance: "도보 5분", coords: { lat: 37.5485, lng: 126.8730 } },
      { name: "홈플러스", distance: "차량 5분", coords: { lat: 37.5420, lng: 126.8690 } },
      { name: "현대백화점", distance: "차량 10분", coords: { lat: 37.5260, lng: 126.8660 } },
      { name: "목동 로데오거리", distance: "차량 7분", coords: { lat: 37.5280, lng: 126.8750 } },
    ],
  },
  {
    id: "park",
    name: "공원/문화",
    icon: "🌳",
    items: [
      { name: "염창근린공원", distance: "도보 3분", coords: { lat: 37.5495, lng: 126.8760 } },
      { name: "한강공원", distance: "도보 10분", coords: { lat: 37.5520, lng: 126.8800 } },
      { name: "영등포도서관", distance: "도보 7분", coords: { lat: 37.5465, lng: 126.8770 } },
      { name: "영등포문화센터", distance: "도보 5분", coords: { lat: 37.5475, lng: 126.8755 } },
    ],
  },
];

const commuteDestinations = [
  { name: "여의도", time: 12, icon: "🏢" },
  { name: "강남", time: 25, icon: "🏙️" },
  { name: "신촌/홍대", time: 15, icon: "🎨" },
  { name: "서울역", time: 20, icon: "🚄" },
  { name: "판교", time: 35, icon: "💼" },
  { name: "김포공항", time: 18, icon: "✈️" },
];

export default function Location() {
  const [selectedCategory, setSelectedCategory] = useState("transportation");
  const [selectedDestination, setSelectedDestination] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  // 염창역 위치 (중심점)
  const centerPosition = { lat: 37.5477, lng: 126.8747 };

  useEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = () => {
      if (typeof window === "undefined" || !(window as any).naver) {
        setTimeout(initializeMap, 100);
        return;
      }

      const naver = (window as any).naver;

      // 지도 초기화
      const mapOptions = {
        center: new naver.maps.LatLng(centerPosition.lat, centerPosition.lng),
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      const map = new naver.maps.Map(mapRef.current, mapOptions);
      naverMapRef.current = map;

      // 메인 마커 (염창역 더채움)
      new naver.maps.Marker({
        position: new naver.maps.LatLng(centerPosition.lat, centerPosition.lng),
        map: map,
        title: "염창역 더채움",
        icon: {
          content: `<div style="
            background: #d4af37;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            white-space: nowrap;
          ">🏢 염창역 더채움</div>`,
          anchor: new naver.maps.Point(60, 30),
        },
      });
    };

    initializeMap();
  }, []);

  // 카테고리별 마커 업데이트
  useEffect(() => {
    if (!naverMapRef.current || !currentCategory) return;

    const naver = (window as any).naver;
    if (!naver) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 새 마커 생성
    currentCategory.items.forEach((item) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(item.coords.lat, item.coords.lng),
        map: naverMapRef.current,
        title: item.name,
      });

      // 정보창
      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding: 10px; font-size: 12px;">
          <strong>${item.name}</strong><br/>
          <span style="color: #d4af37;">${item.distance}</span>
        </div>`,
      });

      naver.maps.Event.addListener(marker, "click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(naverMapRef.current, marker);
        }
      });

      markersRef.current.push(marker);
    });
  }, [selectedCategory, currentCategory]);

  return (
    <section id="location" className="section-padding bg-white">
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
            LOCATION INTELLIGENCE
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-luxury-charcoal mb-6">
            입지 분석
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            완벽한 교통망과 생활 인프라가 갖춰진 프리미엄 입지
          </p>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-video">
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

            {/* Map Overlay Info */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl max-w-sm z-10">
              <h3 className="text-2xl font-bold text-luxury-charcoal mb-2">
                염창역 더채움
              </h3>
              <p className="text-gray-600 mb-4">서울특별시 강서구 염창동</p>
              <div className="flex items-center gap-2 text-luxury-gold font-semibold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>2·9호선 더블역세권</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex justify-center mb-12 flex-wrap gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-4 rounded-full font-bold transition-all flex items-center gap-3 text-lg ${
                selectedCategory === category.id
                  ? "bg-luxury-gold text-white shadow-xl scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Location Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {currentCategory?.items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-luxury-cream rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-xl text-luxury-charcoal group-hover:text-luxury-gold transition-colors">
                  {item.name}
                </h3>
                <svg
                  className="w-6 h-6 text-luxury-gold"
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
              <p className="text-luxury-gold font-bold text-2xl">{item.distance}</p>
            </motion.div>
          ))}
        </div>

        {/* Commute Simulator */}
        <motion.div
          className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-12 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
              출퇴근 시뮬레이터
            </h3>
            <p className="text-gray-200 text-lg">
              주요 업무지구까지 얼마나 걸릴까요?
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {commuteDestinations.map((dest, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedDestination(index)}
                className={`p-6 rounded-2xl font-bold transition-all ${
                  selectedDestination === index
                    ? "bg-luxury-gold text-luxury-charcoal shadow-xl"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-4xl mb-3">{dest.icon}</div>
                <div className="text-sm mb-2">{dest.name}</div>
                <div className="text-2xl font-bold">{dest.time}분</div>
              </motion.button>
            ))}
          </div>

          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
            key={selectedDestination}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white text-2xl mb-4">
              <span className="text-luxury-gold font-bold text-4xl">
                {commuteDestinations[selectedDestination].name}
              </span>
              까지
            </p>
            <p className="text-white text-lg mb-2">평균 소요 시간</p>
            <p className="text-luxury-gold text-7xl font-bold mb-4">
              {commuteDestinations[selectedDestination].time}
              <span className="text-4xl">분</span>
            </p>
            <p className="text-gray-200">지하철 환승 1회 이내</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

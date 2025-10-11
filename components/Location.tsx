"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Script from "next/script";

const categories = [
  {
    id: "all",
    name: "전체",
    icon: "📍",
    color: "#d4af37", // 골드
    items: [], // 전체 카테고리는 모든 항목을 합침
  },
  {
    id: "transportation",
    name: "교통",
    icon: "🚇",
    color: "#3B82F6", // 파랑
    items: [
      { name: "염창역 (2·9호선)", distance: "도보 3분", coords: { lat: 37.5477, lng: 126.8747 } },
      { name: "신목동역 (5호선)", distance: "도보 8분", coords: { lat: 37.5244, lng: 126.8755 } },
      { name: "양천향교역 (9호선)", distance: "도보 5분", coords: { lat: 37.5517, lng: 126.8661 } },
      { name: "선유도역 (9호선)", distance: "차량 5분", coords: { lat: 37.5348, lng: 126.8934 } },
    ],
  },
  {
    id: "education",
    name: "교육",
    icon: "🏫",
    color: "#10B981", // 초록
    items: [
      { name: "염강초등학교", distance: "도보 5분", coords: { lat: 37.5502, lng: 126.8705 } },
      { name: "신강초등학교", distance: "도보 7분", coords: { lat: 37.5518, lng: 126.8782 } },
      { name: "영등포여자고등학교", distance: "도보 6분", coords: { lat: 37.5439, lng: 126.8748 } },
      { name: "강서고등학교", distance: "도보 8분", coords: { lat: 37.5523, lng: 126.8664 } },
    ],
  },
  {
    id: "medical",
    name: "병원/의료",
    icon: "🏥",
    color: "#EF4444", // 빨강
    items: [
      { name: "이대목동병원", distance: "차량 5분", coords: { lat: 37.5265, lng: 126.8746 } },
      { name: "강서미즈메디병원", distance: "차량 3분", coords: { lat: 37.5410, lng: 126.8492 } },
      { name: "염창서울의원", distance: "도보 3분", coords: { lat: 37.5485, lng: 126.8738 } },
      { name: "연세본안과", distance: "도보 2분", coords: { lat: 37.5481, lng: 126.8751 } },
    ],
  },
  {
    id: "shopping",
    name: "쇼핑",
    icon: "🛍️",
    color: "#F59E0B", // 주황
    items: [
      { name: "홈플러스 목동점", distance: "차량 5분", coords: { lat: 37.5284, lng: 126.8750 } },
      { name: "이마트 목동점", distance: "차량 6분", coords: { lat: 37.5267, lng: 126.8679 } },
      { name: "롯데백화점 영등포점", distance: "차량 10분", coords: { lat: 37.5173, lng: 126.9075 } },
      { name: "목동 로데오거리", distance: "차량 7분", coords: { lat: 37.5280, lng: 126.8750 } },
    ],
  },
  {
    id: "park",
    name: "공원/문화",
    icon: "🌳",
    color: "#22C55E", // 연두
    items: [
      { name: "염창근린공원", distance: "도보 3분", coords: { lat: 37.5495, lng: 126.8760 } },
      { name: "안양천 자전거길", distance: "도보 5분", coords: { lat: 37.5523, lng: 126.8698 } },
      { name: "목동중앙공원", distance: "차량 5분", coords: { lat: 37.5263, lng: 126.8643 } },
      { name: "한강공원", distance: "도보 10분", coords: { lat: 37.5520, lng: 126.8800 } },
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapLoadError, setMapLoadError] = useState(false);

  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  // 전체 카테고리일 경우 모든 항목 합치기
  const allItems = categories
    .filter(cat => cat.id !== 'all')
    .flatMap(cat => cat.items.map(item => ({ ...item, categoryColor: cat.color, categoryIcon: cat.icon })));

  // 염창역 위치 (중심점)
  const centerPosition = { lat: 37.5477, lng: 126.8747 };

  // 지도 초기화
  const initializeMap = useCallback(() => {
    if (!window.naver || !window.naver.maps) {
      console.error('네이버맵이 로드되지 않았습니다.');
      setTimeout(initializeMap, 100);
      return;
    }

    try {
      const mapOptions = {
        center: new window.naver.maps.LatLng(centerPosition.lat, centerPosition.lng),
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
      };

      const map = new window.naver.maps.Map('naver-map', mapOptions);
      mapRef.current = map;

      // 메인 마커 (염창역 더채움) - 펄스 애니메이션 포함
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(centerPosition.lat, centerPosition.lng),
        map: map,
        title: "염창역 더채움",
        icon: {
          content: `
            <style>
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
              }
              .main-marker {
                animation: pulse 2s ease-in-out infinite;
              }
            </style>
            <div class="main-marker" style="
              background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
              color: white;
              padding: 12px 20px;
              border-radius: 25px;
              font-weight: 900;
              font-size: 16px;
              box-shadow: 0 8px 16px rgba(212,175,55,0.4), 0 0 0 3px rgba(212,175,55,0.2);
              white-space: nowrap;
              border: 2px solid white;
              position: relative;
            ">
              <span style="font-size: 20px; margin-right: 6px;">🏢</span>
              <span style="text-shadow: 0 2px 4px rgba(0,0,0,0.2);">염창역 더채움</span>
              <div style="
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid #d4af37;
                filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
              "></div>
            </div>
          `,
          anchor: new window.naver.maps.Point(85, 50),
        },
      });

      setIsMapLoaded(true);
    } catch (error) {
      console.error('네이버맵 초기화 실패:', error);
      setMapLoadError(true);
    }
  }, []);

  // 카테고리별 마커 업데이트
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || !currentCategory) return;

    const naver = window.naver;
    if (!naver) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 전체 카테고리일 경우 모든 항목 표시, 아니면 선택된 카테고리만
    const itemsToShow = selectedCategory === 'all' ? allItems : currentCategory.items;

    // 새 마커 생성 (카테고리별 색상 적용)
    itemsToShow.forEach((item: any) => {
      const categoryColor = selectedCategory === 'all' ? item.categoryColor : (currentCategory.color || '#d4af37');
      const categoryIcon = selectedCategory === 'all' ? item.categoryIcon : currentCategory.icon;

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(item.coords.lat, item.coords.lng),
        map: mapRef.current,
        title: item.name,
        icon: {
          content: `
            <div style="
              background: ${categoryColor};
              color: white;
              width: 36px;
              height: 36px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
              border: 3px solid white;
              cursor: pointer;
              transition: transform 0.2s;
            " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
              ${categoryIcon}
            </div>
          `,
          anchor: new naver.maps.Point(18, 18),
        },
      });

      // 정보창
      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding: 12px; font-size: 13px; min-width: 150px;">
          <strong style="color: ${categoryColor}; font-size: 15px;">${item.name}</strong><br/>
          <span style="color: #666; font-weight: 600; margin-top: 4px; display: inline-block;">${item.distance}</span>
        </div>`,
        borderWidth: 2,
        borderColor: categoryColor,
      });

      naver.maps.Event.addListener(marker, "click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(mapRef.current, marker);
        }
      });

      markersRef.current.push(marker);
    });
  }, [selectedCategory, currentCategory, isMapLoaded, allItems]);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={initializeMap}
        onError={() => setMapLoadError(true)}
      />
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

          {/* Category Tabs - 지도 위로 이동 */}
          <motion.div
            className="flex justify-center mb-8 flex-wrap gap-4"
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

          {/* Interactive Map */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-video">
              <div id="naver-map" style={{ width: "100%", height: "100%" }} className="rounded-lg" />

              {/* Loading State */}
              {!isMapLoaded && !mapLoadError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-gold mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">지도를 불러오는 중...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {mapLoadError && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                  <div className="text-center text-red-600">
                    <p className="text-sm mb-1">지도를 불러올 수 없습니다</p>
                    <p className="text-xs text-red-500">네이버맵 API 키를 확인해주세요</p>
                  </div>
                </div>
              )}

              {/* Map Overlay Info */}
              {isMapLoaded && (
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
              )}

              {/* Zoom Controls */}
              {isMapLoaded && (
                <div className="absolute top-6 right-6 bg-white rounded-lg shadow-md p-2 space-y-1 z-10">
                  <button
                    onClick={() => {
                      if (mapRef.current) {
                        mapRef.current.setZoom(mapRef.current.getZoom() + 1);
                      }
                    }}
                    className="block w-8 h-8 text-lg bg-white border border-gray-300 rounded hover:bg-gray-50"
                    title="확대"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      if (mapRef.current) {
                        mapRef.current.setZoom(mapRef.current.getZoom() - 1);
                      }
                    }}
                    className="block w-8 h-8 text-lg bg-white border border-gray-300 rounded hover:bg-gray-50"
                    title="축소"
                  >
                    -
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {(selectedCategory === 'all' ? allItems : currentCategory?.items || []).map((item: any, index: number) => (
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
    </>
  );
}

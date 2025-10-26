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
      { name: "염창역 (9호선 급행)", distance: "도보 3분", coords: { lat: 37.5477, lng: 126.8747 } },
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
  {
    name: "여의도",
    time: 7,
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
      </svg>
    )
  },
  {
    name: "강남",
    time: 17,
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
      </svg>
    )
  },
  {
    name: "신촌/홍대",
    time: 15,
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
      </svg>
    )
  },
  {
    name: "서울역",
    time: 20,
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 15.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V5c0-3.5-3.58-4-8-4s-8 .5-8 4v10.5zm8 1.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7H6V5h12v5z"/>
      </svg>
    )
  },
  {
    name: "판교",
    time: 35,
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"/>
      </svg>
    )
  },
  {
    name: "김포공항",
    time: 18,
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>
    )
  },
];

export default function Location({ disableAnimation = false }: { disableAnimation?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapLoadError, setMapLoadError] = useState(false);
  const [isMiniMapOpen, setIsMiniMapOpen] = useState(false);

  const mapRef = useRef<any>(null);
  const miniMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  // 전체 카테고리일 경우 모든 항목 합치기
  const allItems = categories
    .filter(cat => cat.id !== 'all')
    .flatMap(cat => cat.items.map(item => ({ ...item, categoryColor: cat.color, categoryIcon: cat.icon })));

  // 실제 분양 위치 - 서울시 강서구 염창동 262-5
  const projectLocation = { lat: 37.5487, lng: 126.8752 };

  // 지도 초기화
  const initializeMap = useCallback(() => {
    if (!window.naver || !window.naver.maps) {
      console.error('네이버맵이 로드되지 않았습니다.');
      setTimeout(initializeMap, 100);
      return;
    }

    try {
      // 지도 중심 좌표 - 염창역 더채움 중심
      // 모바일에서는 줌 레벨을 한 단계 축소 (11), 데스크탑은 12 유지
      const isMobile = window.innerWidth < 768;
      const zoomLevel = isMobile ? 11 : 12;

      const mapOptions = {
        center: new window.naver.maps.LatLng(projectLocation.lat, projectLocation.lng),
        zoom: zoomLevel,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
        minZoom: zoomLevel,
        maxZoom: zoomLevel,
        scrollWheel: false,
        disableDoubleClickZoom: true,
        draggable: false,
        pinchZoom: false,
        disableKineticPan: true,
      };

      const map = new window.naver.maps.Map('naver-map', mapOptions);
      mapRef.current = map;

      // 실제 분양 위치 마커 - 동그란 원 (빨간색)
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(projectLocation.lat, projectLocation.lng),
        map: map,
        title: "염창역 더채움 (분양위치)",
        icon: {
          content: `
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="
                background: #EF4444;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-weight: 700;
                font-size: 13px;
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                margin-bottom: 8px;
              ">
                염창역 더채움
              </div>
              <div style="
                position: relative;
                width: 35px;
                height: 50px;
              ">
                <svg width="35" height="50" viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 0C11.2 0 0 11.2 0 25C0 43.75 25 70 25 70C25 70 50 43.75 50 25C50 11.2 38.8 0 25 0Z" fill="#DC2626"/>
                  <circle cx="25" cy="25" r="12" fill="white"/>
                </svg>
              </div>
            </div>
          `,
          anchor: new window.naver.maps.Point(60, 80),
        },
      });

      // 주요 입지 원형 표시 (입지환경.png 기준)
      const majorLocations = [
        {
          name: '마곡나루역',
          sub: '일반산업단지',
          lat: 37.5580,
          lng: 126.8250,
          radius: 1200,
          color: '#64B5F6'
        },
        {
          name: '여의도',
          sub: '금융/방송가',
          lat: 37.5219,
          lng: 126.9245,
          radius: 1500,
          color: '#9C27B0'
        },
        {
          name: '목동',
          sub: '주거/학군지',
          lat: 37.5263,
          lng: 126.8643,
          radius: 1000,
          color: '#81C784'
        },
        {
          name: '합정/홍대/연남',
          sub: '상업/문화지구',
          lat: 37.5490,
          lng: 126.9140,
          radius: 1200,
          color: '#FFB74D'
        },
        {
          name: '가산디지털단지',
          sub: 'IT첨단산업',
          lat: 37.4815,
          lng: 126.8827,
          radius: 1300,
          color: '#4DB6AC'
        },
        {
          name: '상암DMC',
          sub: '디지털미디어시티',
          lat: 37.5792,
          lng: 126.8897,
          radius: 1000,
          color: '#BA68C8'
        },
      ];

      majorLocations.forEach(location => {
        new window.naver.maps.Circle({
          map: map,
          center: new window.naver.maps.LatLng(location.lat, location.lng),
          radius: location.radius,
          fillColor: location.color,
          fillOpacity: 0.15,
          strokeColor: location.color,
          strokeOpacity: 0.6,
          strokeWeight: 2,
        });

        // 지역 이름 텍스트 (원 중심에 표시)
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(location.lat, location.lng),
          map: map,
          title: location.name,
          icon: {
            content: `
              <div style="
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                color: ${location.color};
                font-weight: bold;
                font-size: 14px;
                text-align: center;
                text-shadow: 0 0 4px white, 0 0 4px white, 0 0 4px white, 0 0 4px white;
                pointer-events: none;
                line-height: 1.3;
                white-space: nowrap;
              ">
                <div>${location.name}</div>
                <div style="font-size: 11px; font-weight: normal; margin-top: 2px;">${location.sub}</div>
              </div>
            `,
            anchor: new window.naver.maps.Point(0, 0),
          },
        });
      });

      setIsMapLoaded(true);
    } catch (error) {
      console.error('네이버맵 초기화 실패:', error);
      setMapLoadError(true);
    }
  }, []);

  // 카테고리별 마커는 표시하지 않음 (분양위치만 표시)

  // 미니맵 초기화
  const initializeMiniMap = useCallback(() => {
    if (!window.naver || !window.naver.maps || !isMapLoaded) return;

    try {
      // 분양 위치를 중심으로 미니맵 표시
      const centerLat = projectLocation.lat;
      const centerLng = projectLocation.lng;

      const miniMapOptions = {
        center: new window.naver.maps.LatLng(centerLat, centerLng),
        zoom: 13,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
        draggable: true,
        scrollWheel: true,
      };

      const miniMap = new window.naver.maps.Map('mini-map', miniMapOptions);
      miniMapRef.current = miniMap;

      // 미니맵에 분양 위치 마커 (텍스트 포함)
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(projectLocation.lat, projectLocation.lng),
        map: miniMap,
        title: "염창역 더채움 (분양위치)",
        icon: {
          content: `
            <div style="
              background: linear-gradient(135deg, #2c2c2c 0%, #3d3d3d 100%);
              color: #d4af37;
              padding: 8px 14px;
              border-radius: 20px;
              font-weight: 900;
              font-size: 13px;
              box-shadow: 0 6px 12px rgba(44,44,44,0.5);
              white-space: nowrap;
              border: 2px solid #d4af37;
              position: relative;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#d4af37" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span style="text-shadow: 0 1px 2px rgba(0,0,0,0.3);">분양위치</span>
              <div style="
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid #2c2c2c;
              "></div>
            </div>
          `,
          anchor: new window.naver.maps.Point(55, 35),
        },
      });
    } catch (error) {
      console.error('미니맵 초기화 실패:', error);
    }
  }, [isMapLoaded, projectLocation.lat, projectLocation.lng]);

  // 미니맵이 열릴 때 초기화
  useEffect(() => {
    if (isMiniMapOpen) {
      // 기존 미니맵이 있으면 제거
      if (miniMapRef.current) {
        miniMapRef.current.destroy();
        miniMapRef.current = null;
      }
      // DOM이 완전히 렌더링된 후 초기화
      const timer = setTimeout(() => {
        initializeMiniMap();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isMiniMapOpen, initializeMiniMap]);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={initializeMap}
        onError={() => setMapLoadError(true)}
      />

      {/* Sticky 미니맵 - 임시 주석 처리 */}
      {/* <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={disableAnimation ? false : { opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!isMiniMapOpen && (
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={disableAnimation ? false : { opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-bold text-luxury-charcoal bg-white px-3 py-1 rounded-full shadow-md">
              오시는 길
            </span>
            <motion.button
              onClick={() => setIsMiniMapOpen(true)}
              className="bg-luxury-gold text-white p-4 rounded-full shadow-2xl hover:bg-opacity-90 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}

        {isMiniMapOpen && (
          <motion.div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={disableAnimation ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-luxury-gold text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🗺️</span>
                <span className="font-bold text-sm">오시는 길</span>
              </div>
              <button
                onClick={() => setIsMiniMapOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div id="mini-map" style={{ width: "320px", height: "240px" }} />
            <div className="p-3 bg-gray-50 text-xs text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="#d4af37" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span className="font-semibold">염창역 더채움</span>
              </div>
              <div className="text-[10px]">서울시 강서구 염창동 262-5</div>
            </div>
          </motion.div>
        )}
      </motion.div> */}

      <section id="location" className="section-padding bg-white">
        <div className="container-custom">
          {/* Section Title */}
          <motion.div
            className="text-center mb-10 md:mb-16 px-4"
            initial={disableAnimation ? false : { opacity: 0, y: 30 }}
            whileInView={disableAnimation ? false : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-luxury-gold text-sm md:text-base mb-2 md:mb-3 font-medium tracking-wide">
              LOCATION INTELLIGENCE
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-3 md:mb-6">
              입지 분석
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              완벽한 교통망과 생활 인프라가 갖춰진 프리미엄 입지
            </p>
          </motion.div>

          {/* Interactive Map */}
          <motion.div
            className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden mb-12 md:mb-16"
            initial={disableAnimation ? false : { opacity: 0, y: 50 }}
            whileInView={disableAnimation ? false : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square md:aspect-video">
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


            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

import type { ProjectConfig } from "@/lib/types/project";

const config: ProjectConfig = {
  meta: {
    name: "HAVEN RÉSIDENCE",
    slug: "haven-residence",
    description: "서울 노원구 49층 768세대 프리미엄 웰니스 레지던스",
    phone: "1800-7890",
    address: "서울시 노원구 화랑로45길 145",
    url: "https://smilebunyang.com/haven-residence",
    developer: "HAVEN 개발㈜",
    priceRange: "$$$",
  },

  theme: {
    cssFile: "themes/premium-cream.css",
    prefix: "haven",
    fonts: [
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@400;500;600;700&display=swap",
    ],
  },

  nav: [
    { id: "haven-hero", label: "Home" },
    { id: "haven-overview", label: "Overview" },
    { id: "haven-premium", label: "Services" },
    { id: "haven-gallery", label: "Gallery" },
    { id: "haven-contact", label: "Contact" },
  ],

  hero: {
    label: "Premium Residence",
    title: '당신이 꿈꾸던<br /><em>새로운 삶</em>의<br /><strong>기준이 됩니다</strong>',
    subtitle: '서울 노원의 새로운 랜드마크.<br />지상 49층, 768세대의 프리미엄 웰니스 레지던스.',
    primaryCta: { label: "관심고객 등록", targetId: "haven-contact" },
    secondaryCta: { label: "브랜드 스토리", targetId: "haven-overview" },
  },

  overview: {
    title: '도심 속<br /><strong>프리미엄 주거</strong>의<br />새로운 정의',
    description: "HAVEN RÉSIDENCE는 단순한 주거 공간을 넘어, 건강하고 여유로운 라이프스타일을 제안합니다. 세대와 세대가 만나고, 일상이 특별해지는 곳.",
    infoItems: [
      { label: "Location", value: "서울시 노원구" },
      { label: "Scale", value: "지하4층~지상49층" },
      { label: "Units", value: "총 768세대" },
      { label: "Area", value: "70·73·80㎡" },
    ],
  },

  services: [
    { icon: "🏥", num: "01", title: "Medical", desc: "서울 주요 대학병원 연계 건강검진 및 24시간 헬스케어 프로그램" },
    { icon: "🏋️", num: "02", title: "Community", desc: "피트니스, 골프, 사우나 등 호텔급 커뮤니티 시설 운영" },
    { icon: "🛎️", num: "03", title: "Concierge", desc: "클리닝, 세탁, 식사 케이터링 등 맞춤형 생활 편의 서비스" },
    { icon: "⭐", num: "04", title: "Membership", desc: "제휴 호텔, 리조트, 골프장 우선 예약 및 특별 할인 혜택" },
    { icon: "📱", num: "05", title: "Smart Living", desc: "IoT 홈 시스템, 무인택배, 스마트 주차 등 첨단 주거 서비스" },
  ],

  stats: [
    { target: 49, suffix: "층", label: "Building Height" },
    { target: 768, suffix: "세대", label: "Total Units" },
    { target: 5, suffix: "대 서비스", label: "Premium Services" },
    { target: 8, suffix: "분", label: "Station Walk" },
  ],

  location: {
    title: '<strong>도심의 중심</strong>에서 누리는 자연',
    address: "서울시 노원구 화랑로45길",
    coords: { lat: 37.6216, lng: 127.0774 },
    details: [
      { icon: "🚇", label: "Subway", value: "6·7호선 태릉입구역 도보 8분" },
      { icon: "🏫", label: "Education", value: "서울과학기술대, 육군사관학교 인접" },
      { icon: "🌳", label: "Nature", value: "태릉·강릉 숲세권, 불암산 조망" },
      { icon: "🏥", label: "Medical", value: "을지대병원, 노원을지대병원 인근" },
    ],
    infra: [
      { label: "Education", value: "초·중·고 도보 10분" },
      { label: "Shopping", value: "이마트·롯데백화점 인근" },
      { label: "Hospital", value: "대학병원 차량 10분" },
      { label: "Highway", value: "동부간선·북부간선 연결" },
    ],
  },

  gallery: {
    title: '<strong>공간</strong>을 미리 만나다',
    description: "투시도와 조감도로 미리 만나보는 HAVEN RÉSIDENCE의 프리미엄 공간.",
    tabs: ["all", "exterior", "interior", "community"],
    items: [
      { category: "exterior", label: "외부 투시도 01", caption: "주간 전경 투시도 — 49층 스카이라인" },
      { category: "exterior", label: "외부 투시도 02", caption: "야간 조명 투시도 — 파사드 라이팅" },
      { category: "interior", label: "실내 투시도 01", caption: "거실 — 풀 윈도우 자연채광 설계" },
      { category: "interior", label: "실내 투시도 02", caption: "주방 — 프리미엄 빌트인 시스템" },
      { category: "community", label: "커뮤니티 01", caption: "피트니스 센터 — 호텔급 운동 시설" },
      { category: "community", label: "커뮤니티 02", caption: "스카이 라운지 — 49층 프리미엄 조망" },
    ],
  },

  floorPlan: {
    title: "<strong>세대 안내</strong>",
    units: {
      "70A": {
        title: "70㎡ · 3Bay 남향",
        typeLabel: "TYPE A",
        area: "70.98㎡",
        supply: "110.42㎡",
        rooms: "3실 / 2실",
        bay: "3Bay 판상형",
        dir: "남향",
        features: ["알파룸", "팬트리", "드레스룸", "넓은 발코니", "시스템 에어컨"],
      },
      "73B": {
        title: "73㎡ · 3Bay 남동향",
        typeLabel: "TYPE B",
        area: "73.12㎡",
        supply: "113.87㎡",
        rooms: "3실 / 2실",
        bay: "3Bay 판상형",
        dir: "남동향",
        features: ["알파룸", "대형 팬트리", "드레스룸", "확장형 발코니", "시스템 에어컨", "현관 중문"],
      },
      "80C": {
        title: "80㎡ · 4Bay 남향",
        typeLabel: "TYPE C",
        area: "80.25㎡",
        supply: "125.60㎡",
        rooms: "4실 / 2실",
        bay: "4Bay 판상형",
        dir: "남향",
        features: ["서재", "대형 팬트리", "워크인 드레스룸", "확장형 발코니", "시스템 에어컨", "현관 중문", "빌트인 가전"],
      },
    },
  },

  cta: {
    label: "VIP Lounge",
    title: "<strong>모델하우스</strong><br />방문 예약",
    description: "HAVEN RÉSIDENCE의 프리미엄 공간을 직접 경험해보세요. VIP 라운지에서 1:1 상담을 진행합니다.",
    primaryCta: { label: "방문 예약하기", targetId: "haven-contact" },
    secondaryCta: { label: "관심고객 등록", targetId: "haven-contact" },
  },

  contact: {
    formTitle: "<strong>관심고객</strong> 등록",
    unitOptions: [
      { value: "70A", label: "70㎡ A타입" },
      { value: "73B", label: "73㎡ B타입" },
      { value: "80C", label: "80㎡ C타입" },
    ],
    faqItems: [
      { q: "분양가는 어느 정도인가요?", a: "HAVEN RÉSIDENCE의 분양가는 타입별로 상이하며, 정확한 금액은 관심고객 등록 후 개별 안내해드립니다. VIP 라운지에서 자세한 상담을 받으실 수 있습니다." },
      { q: "입주 예정일은 언제인가요?", a: "2027년 하반기 입주를 목표로 하고 있으며, 공사 진행 상황에 따라 변동될 수 있습니다. 정확한 일정은 추후 공지됩니다." },
      { q: "프리미엄 서비스는 별도 비용이 발생하나요?", a: "기본 커뮤니티 시설은 관리비에 포함되며, 컨시어지, 멤버십 등 일부 프리미엄 서비스는 선택적으로 이용 가능합니다." },
      { q: "모델하우스 방문은 어떻게 예약하나요?", a: "전화(1800-7890) 또는 본 페이지의 관심고객 등록을 통해 예약하실 수 있습니다. VIP 라운지에서 1:1 맞춤 상담을 진행합니다." },
      { q: "주차는 몇 대까지 가능한가요?", a: "세대당 1.3대 이상의 주차 공간을 확보하고 있으며, 지하 주차장에 전기차 충전 시설도 완비되어 있습니다." },
    ],
    sidebarCards: [
      { title: "Consultation", content: "전문 상담사가 1:1 맞춤 상담을<br />진행해드립니다.<br /><span class=\"tel\">1800-7890</span>" },
      { title: "VIP Lounge", content: "서울시 노원구 화랑로45길<br />운영시간: 10:00 - 18:00" },
      { title: "Project Site", content: "서울시 노원구 화랑로45길 145<br />(공릉동 일원)" },
      { title: "Email", content: "vip@haven-residence.kr" },
    ],
  },

  footer: {
    brand: "HAVEN",
    brandSub: "Résidence",
    info: "서울시 노원구 화랑로45길 145 일원<br />시행·시공 HAVEN 개발㈜<br />대표전화 1800-7890",
    columns: [
      {
        title: "Brand",
        links: [
          { label: "브랜드 스토리", targetId: "haven-overview" },
          { label: "건축 설계", targetId: "haven-overview" },
          { label: "조경 설계", targetId: "haven-overview" },
        ],
      },
      {
        title: "Information",
        links: [
          { label: "세대 안내", targetId: "haven-floorplan" },
          { label: "갤러리", targetId: "haven-gallery" },
          { label: "오시는 길", targetId: "haven-location" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "관심고객 등록", targetId: "haven-contact" },
          { label: "방문 예약", targetId: "haven-contact" },
          { label: "문의하기", targetId: "haven-contact" },
        ],
      },
    ],
    copyright: "© 2026 HAVEN RÉSIDENCE. All rights reserved.",
  },
};

export default config;

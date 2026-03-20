import type { ProjectConfig } from "@/lib/types/project";

const config: ProjectConfig = {
  meta: {
    name: "여의도 더로드캐슬",
    slug: "yeouido-the-road-castle",
    description: "대방역 도보 2분, 여의도 생활권 신축 오피스텔. 7년전 분양가, 즉시 입주 가능. 선착순 6세대 특별분양.",
    phone: "1666-0952",
    address: "서울시 영등포구 대방동",
    url: "https://smilebunyang.com/yeouido-the-road-castle",
    developer: "더로드캐슬",
    priceRange: "$$",
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
    { id: "haven-premium", label: "특장점" },
    { id: "haven-gallery", label: "Gallery" },
    { id: "haven-contact", label: "Contact" },
  ],

  hero: {
    label: "Special Presale",
    title: '여의도 생활권<br /><em>더로드캐슬</em><br /><strong>선착순 6세대</strong>',
    subtitle: '대방역 도보 2분 더블역세권.<br />7년전 분양가로 만나는 신축 2룸, 즉시 입주 가능.',
    primaryCta: { label: "특별분양 상담신청", targetId: "haven-contact" },
    secondaryCta: { label: "매물 상세보기", targetId: "haven-overview" },
    backgroundImage: "/images/yeouido-the-road-castle/exterior/aerial-01.png",
  },

  overview: {
    title: '서울 중심<br /><strong>초역세권 신축</strong><br />7년전 분양가',
    description: "대방역 1호선·신림선 더블역세권 도보 2분. 2026년 1월 준공 완료, 즉시 입주 가능한 신축 오피스텔입니다. 토지거래허가 제외, 청약통장 없이 누구나 매입 가능합니다.",
    infoItems: [
      { label: "Location", value: "대방역 도보 2분" },
      { label: "Status", value: "준공완료 · 즉시입주" },
      { label: "Type", value: "신축 2룸 오피스텔" },
      { label: "Finance", value: "대출 70%~ 가능" },
    ],
    images: [
      { src: "/images/yeouido-the-road-castle/exterior/aerial-02.png", alt: "여의도 더로드캐슬 주간 전경 조감도" },
      { src: "/images/yeouido-the-road-castle/exterior/aerial-01.png", alt: "여의도 더로드캐슬 야간 전경 조감도" },
    ],
  },

  services: [
    {
      icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="22" width="24" height="4" rx="1"/><line x1="8" y1="22" x2="8" y2="10"/><line x1="24" y1="22" x2="24" y2="10"/><line x1="8" y1="10" x2="24" y2="10"/><circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none"/><circle cx="20" cy="16" r="1.5" fill="currentColor" stroke="none"/><line x1="16" y1="10" x2="16" y2="6"/><line x1="13" y1="6" x2="19" y2="6"/></svg>',
      num: "01", title: "더블역세권", desc: "대방역 1호선·신림선 도보 2분, 5·7·9호선 도보권 멀티역세권",
    },
    {
      icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="8" width="10" height="18" rx="1"/><rect x="16" y="4" width="10" height="22" rx="1"/><line x1="9" y1="12" x2="13" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/><line x1="9" y1="20" x2="13" y2="20"/><line x1="19" y1="8" x2="23" y2="8"/><line x1="19" y1="12" x2="23" y2="12"/><line x1="19" y1="16" x2="23" y2="16"/><line x1="19" y1="20" x2="23" y2="20"/><line x1="4" y1="26" x2="28" y2="26"/></svg>',
      num: "02", title: "직주근접", desc: "여의도·영등포·구로 등 서울 주요 업무지구 20분대 접근",
    },
    {
      icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="11"/><text x="16" y="20" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor" stroke="none" font-family="sans-serif">₩</text></svg>',
      num: "03", title: "7년전 분양가", desc: "서울 중심가 초역세권에서 만나는 파격적인 신축 분양가",
    },
    {
      icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4L4 14h4v12h16V14h4L16 4z"/><rect x="13" y="20" width="6" height="6"/></svg>',
      num: "04", title: "LG 풀옵션", desc: "고품격 LG가전 무상 풀옵션 제공, 입주 즉시 생활 가능",
    },
    {
      icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,24 10,18 16,20 22,12 28,8"/><polyline points="22,8 28,8 28,14"/><line x1="4" y1="28" x2="28" y2="28"/></svg>',
      num: "05", title: "투자가치", desc: "실거주의무 없음, 임대수요 확실한 입지로 수익률 우수",
    },
  ],

  stats: [
    { target: 2, suffix: "분", label: "대방역 도보" },
    { target: 6, suffix: "세대", label: "선착순 잔여" },
    { target: 70, suffix: "%~", label: "대출 가능" },
    { target: 20, suffix: "분", label: "업무지구 접근" },
  ],

  location: {
    title: '<strong>대방역 2분</strong> 여의도 생활권',
    address: "서울시 영등포구 대방동",
    coords: { lat: 37.4985, lng: 126.9264 },
    details: [
      { icon: "🚇", label: "지하철", value: "대방역 1호선·신림선 도보 2분 (더블역세권)" },
      { icon: "🚌", label: "교통", value: "5·7·9호선 도보권, 서울 주요 업무지구 20분대" },
      { icon: "🛍️", label: "상권", value: "더현대서울, 타임스퀘어, 신세계·롯데백화점, 이마트" },
      { icon: "🌊", label: "생활권", value: "여의도가 바로 집앞! 한강공원 접근 용이" },
    ],
    infra: [
      { label: "여의도", value: "생활권 도보·차량 10분" },
      { label: "영등포", value: "타임스퀘어 인근" },
      { label: "구로디지털", value: "차량 15분" },
      { label: "강남", value: "지하철 30분대" },
    ],
  },

  gallery: {
    title: '<strong>실제 공간</strong>을 확인하세요',
    description: "준공 완료된 실제 모델하우스 사진과 건물 조감도입니다.",
    tabs: ["all", "interior", "exterior"],
    items: [
      { category: "interior", label: "거실 전경", caption: "밝은 자연채광의 거실 공간", image: "/images/yeouido-the-road-castle/interior/living-01.png" },
      { category: "interior", label: "거실 인테리어", caption: "모던한 인테리어 — 소파 & 조명", image: "/images/yeouido-the-road-castle/interior/living-02.png" },
      { category: "interior", label: "주방", caption: "LG 풀옵션 — 빌트인 주방 시스템", image: "/images/yeouido-the-road-castle/interior/kitchen-01.png" },
      { category: "interior", label: "주방 상세", caption: "프리미엄 싱크대 & 인덕션", image: "/images/yeouido-the-road-castle/interior/kitchen-02.png" },
      { category: "interior", label: "침실", caption: "넓은 채광의 프라이빗 침실", image: "/images/yeouido-the-road-castle/interior/bedroom-01.png" },
      { category: "interior", label: "침실 상세", caption: "간접조명 헤드보드 침실", image: "/images/yeouido-the-road-castle/interior/bedroom-03.png" },
      { category: "interior", label: "욕실", caption: "레인샤워 & 세면대 — 호텔급 욕실", image: "/images/yeouido-the-road-castle/interior/bathroom-01.png" },
      { category: "interior", label: "욕실 상세", caption: "유리 파티션 건식 분리 욕실", image: "/images/yeouido-the-road-castle/interior/bathroom-02.png" },
      { category: "exterior", label: "조감도 01", caption: "야간 전경 — 여의도 스카이라인과 함께", image: "/images/yeouido-the-road-castle/exterior/aerial-01.png" },
      { category: "exterior", label: "조감도 02", caption: "주간 전경 — 대방역 초역세권 입지", image: "/images/yeouido-the-road-castle/exterior/aerial-02.png" },
    ],
  },

  cta: {
    label: "Special Offer",
    title: "<strong>선착순 6세대</strong><br />특별분양 진행 중",
    description: "방문 예약 시 유리한 조건 우선 안내. 지금 문의주셔야 좋은 층·호실 선택이 가능합니다.",
    primaryCta: { label: "특별분양 상담신청", targetId: "haven-contact" },
    secondaryCta: { label: "전화 상담하기", targetId: "haven-contact" },
  },

  contact: {
    formTitle: "<strong>특별분양</strong> 상담신청",
    faqItems: [
      { q: "분양가는 어느 정도인가요?", a: "7년전 분양가 수준으로, 서울 중심가 초역세권 신축 2룸 기준 매우 경쟁력 있는 가격입니다. 정확한 금액은 상담 시 안내드립니다." },
      { q: "대출은 얼마나 가능한가요?", a: "대출 70% 이상 가능하며, 실거주의무가 없어 투자 목적으로도 유리합니다. 세부 조건은 상담 시 맞춤 안내해드립니다." },
      { q: "청약통장이 필요한가요?", a: "청약통장이 필요 없습니다. 토지거래허가 제외 지역이며, 누구나 자유롭게 매입 가능합니다." },
      { q: "즉시 입주가 가능한가요?", a: "네, 2026년 1월 준공 완료되어 즉시 입주 가능합니다. 잔금 납부 후 바로 입주하실 수 있습니다." },
      { q: "어떤 옵션이 포함되어 있나요?", a: "LG가전 무상 풀옵션(냉장고, 세탁기, 에어컨, 인덕션 등)이 제공되며, 별도 가전 구입 없이 바로 생활 가능합니다." },
    ],
    sidebarCards: [
      { title: "Consultation", content: '전문 상담사가 1:1 맞춤 상담을<br />진행해드립니다.<span class="tel">1666-0952</span>' },
      { title: "방문 안내", content: "방문 예약 시 유리한 조건 우선 안내<br />운영시간: 10:00 - 18:00" },
      { title: "주요 혜택", content: "✅ 청약통장 불필요<br />✅ 실거주의무 없음<br />✅ 대출 70%~ 가능<br />✅ LG 풀옵션 무상" },
      { title: "대표문의", content: "☎ 1666-0952" },
    ],
  },

  footer: {
    brand: "여의도",
    brandSub: "더로드캐슬",
    info: "서울시 영등포구 대방동<br />대표전화 1666-0952",
    columns: [
      {
        title: "Information",
        links: [
          { label: "프로젝트 소개", targetId: "haven-overview" },
          { label: "특장점", targetId: "haven-premium" },
          { label: "오시는 길", targetId: "haven-location" },
        ],
      },
      {
        title: "Gallery",
        links: [
          { label: "실내 사진", targetId: "haven-gallery" },
          { label: "조감도", targetId: "haven-gallery" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "상담 신청", targetId: "haven-contact" },
          { label: "전화 문의", targetId: "haven-contact" },
        ],
      },
    ],
    copyright: "© 2026 여의도 더로드캐슬. All rights reserved.",
  },
};

export default config;

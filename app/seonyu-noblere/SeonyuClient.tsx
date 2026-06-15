"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "./simple.css";

const PHONE = "1666-0952";
const BASE = "/images/seonyu-noblere";

/* ── 히어로 슬라이드 ── */
const HERO_SLIDES = [
  `${BASE}/exterior/aerial-river.jpg`,
  `${BASE}/exterior/aerial-river-2.jpg`,
  `${BASE}/exterior/building-front.jpg`,
  `${BASE}/exterior/building-side.jpg`,
  `${BASE}/exterior/top-view.jpg`,
];

/* ── 평면 ── */
const FLOOR_PLANS = [
  {
    type: "A TYPE",
    sub: "전용 49.01㎡ · 26실",
    image: `${BASE}/floorplan/plan-A.jpg`,
  },
  {
    type: "B TYPE",
    sub: "전용 49.01㎡ · 13실",
    image: `${BASE}/floorplan/plan-B.jpg`,
  },
];

const ISO_PLANS = [
  {
    type: "A TYPE  3D",
    sub: "거실·주방 중심형 쓰리룸",
    image: `${BASE}/floorplan-iso/iso-A.jpg`,
  },
  {
    type: "B TYPE  3D",
    sub: "코너형 쓰리룸 구조",
    image: `${BASE}/floorplan-iso/iso-B.jpg`,
  },
];

/* ── 갤러리 ── */
const GALLERY = [
  { src: `${BASE}/interior/living-room.jpg`, label: "Living 01 · 거실 채광" },
  { src: `${BASE}/interior/living-01.jpg`, label: "Living 02 · 거실 전경" },
  { src: `${BASE}/interior/kitchen-04.jpg`, label: "Kitchen 01 · 아일랜드" },
  { src: `${BASE}/interior/kitchen-01.jpg`, label: "Kitchen 02 · L자 그레이톤" },
  { src: `${BASE}/interior/kitchen-06.jpg`, label: "Kitchen 03 · 인덕션" },
  { src: `${BASE}/interior/bedroom-01.jpg`, label: "Bedroom 01 · 드레스룸" },
  { src: `${BASE}/interior/bedroom-room.jpg`, label: "Bedroom 02 · 안방" },
  { src: `${BASE}/interior/bathroom-03.jpg`, label: "Bathroom 01 · 레인샤워" },
  { src: `${BASE}/interior/bathroom-01.jpg`, label: "Bathroom 02 · 건식 분리" },
  { src: `${BASE}/interior/closet-01.jpg`, label: "Entry · 현관 수납" },
];

/* ── 인근 기업 ── */
const COMPANIES = [
  { name: "세종앤까뮤스퀘어", addr: "양평동6가 4-2", info: "2019.05 준공 · B5~12층 · 209실 · 종사자 1,463명" },
  { name: "투웨니퍼스트", addr: "양평동5가 43", info: "2020.10 준공 · B3~18층 · 183실 · 종사자 1,281명" },
  { name: "아이에스비즈타워 2차", addr: "양평동4가 80", info: "2014.11 준공 · B3~15층 · 238실 · 종사자 1,666명" },
  { name: "코오롱 디지털타워", addr: "양평동5가 106-1", info: "2012.03 준공 · B5~14층 · 216실 · 종사자 1,512명" },
  { name: "아이에스비즈타워 1차", addr: "양평동5가 1-1", info: "2013.05 준공 · B2~26층 · 210실 · 종사자 1,470명" },
  { name: "우림라이온스밸리 A·B동", addr: "양평동4가 80", info: "2009.08 준공 · 205실 · 종사자 1,435명" },
];

/* ============================================
   Inline Line Icons (1.4 stroke, 24px viewport)
   ============================================ */
const Icon = {
  Phone: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Subway: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="5" y="3" width="14" height="14" rx="3"/>
      <line x1="9" y1="20" x2="7" y2="22"/>
      <line x1="15" y1="20" x2="17" y2="22"/>
      <circle cx="9" cy="13" r="1"/>
      <circle cx="15" cy="13" r="1"/>
      <line x1="5" y1="9" x2="19" y2="9"/>
    </svg>
  ),
  Car: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M5 17h14M5 17l-2-5 3-5h12l3 5-2 5M5 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2M16 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2"/>
      <circle cx="7.5" cy="13.5" r="0.5"/>
      <circle cx="16.5" cy="13.5" r="0.5"/>
    </svg>
  ),
  Water: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 3s-6 7-6 12a6 6 0 0 0 12 0c0-5-6-12-6-12z"/>
    </svg>
  ),
  Hospital: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="6" width="16" height="14"/>
      <line x1="12" y1="10" x2="12" y2="16"/>
      <line x1="9" y1="13" x2="15" y2="13"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  ),
  Shop: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 8h16l-1.5 11.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9z"/>
      <path d="M8 8V5a4 4 0 0 1 8 0v3"/>
    </svg>
  ),
  School: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 9l9-5 9 5-9 5z"/>
      <path d="M7 11v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4"/>
    </svg>
  ),
  Pin: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Train: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="4" width="16" height="14" rx="2"/>
      <path d="M4 11h16M9 4v17M15 4v17"/>
    </svg>
  ),
  Bldg: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="5" width="18" height="16"/>
      <line x1="9" y1="9" x2="9" y2="9.01"/>
      <line x1="15" y1="9" x2="15" y2="9.01"/>
      <line x1="9" y1="13" x2="9" y2="13.01"/>
      <line x1="15" y1="13" x2="15" y2="13.01"/>
      <line x1="9" y1="17" x2="9" y2="17.01"/>
      <line x1="15" y1="17" x2="15" y2="17.01"/>
      <path d="M3 5l9-3 9 3"/>
    </svg>
  ),
  Coin: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9 9.5C9 8 10.3 7 12 7s3 1 3 2.5S13.7 12 12 12s-3 1-3 2.5S10.3 17 12 17s3-1 3-2.5"/>
      <line x1="12" y1="5" x2="12" y2="7"/>
      <line x1="12" y1="17" x2="12" y2="19"/>
    </svg>
  ),
  Fridge: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="6" y="3" width="12" height="18" rx="1"/>
      <line x1="6" y1="10" x2="18" y2="10"/>
      <line x1="9" y1="6" x2="9" y2="8"/>
      <line x1="9" y1="13" x2="9" y2="16"/>
    </svg>
  ),
  Washer: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="3" width="16" height="18" rx="1"/>
      <circle cx="12" cy="14" r="4"/>
      <circle cx="7.5" cy="6.5" r="0.6"/>
    </svg>
  ),
  Induction: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="6" width="18" height="13" rx="1"/>
      <circle cx="8" cy="11" r="2"/>
      <circle cx="16" cy="11" r="2"/>
      <line x1="6" y1="16" x2="18" y2="16"/>
    </svg>
  ),
  Hood: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 4h16l-3 7H7z"/>
      <path d="M7 11v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"/>
      <line x1="10" y1="20" x2="14" y2="20"/>
    </svg>
  ),
  Oven: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="1"/>
      <line x1="4" y1="9" x2="20" y2="9"/>
      <circle cx="8" cy="6.5" r="0.4"/>
      <circle cx="11" cy="6.5" r="0.4"/>
      <rect x="7" y="12" width="10" height="5" rx="0.5"/>
    </svg>
  ),
  Dish: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="3" width="16" height="18" rx="1"/>
      <line x1="4" y1="9" x2="20" y2="9"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="16" x2="16" y2="16"/>
    </svg>
  ),
  Water2: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M7 8h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/>
      <path d="M9 8V5a3 3 0 0 1 6 0v3"/>
      <line x1="12" y1="13" x2="12" y2="17"/>
    </svg>
  ),
  Aircon: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="6" width="18" height="6" rx="1"/>
      <path d="M7 16v1M10 16v2M14 16v2M17 16v1"/>
    </svg>
  ),
  Vent: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="3" x2="9" y2="21"/>
      <line x1="15" y1="3" x2="15" y2="21"/>
    </svg>
  ),
  Cabinet: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="3" width="16" height="18" rx="0.5"/>
      <line x1="12" y1="3" x2="12" y2="21"/>
      <circle cx="10" cy="12" r="0.5"/>
      <circle cx="14" cy="12" r="0.5"/>
    </svg>
  ),
  Star: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <polygon points="12,3 14.5,9 21,9.5 16,13.8 17.5,20 12,16.5 6.5,20 8,13.8 3,9.5 9.5,9"/>
    </svg>
  ),
  Heart: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Shield: () => (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
    </svg>
  ),
};

const POINTS = [
  { num: "01", title: "선유도역 도보 5분", desc: "9호선 초역세권 · 당산역·여의도역 3·5분 환승", Ico: Icon.Subway },
  { num: "02", title: "한강·공원 생활권", desc: "양화한강공원 · 선유도공원 · 안양천 도보 15분", Ico: Icon.Water },
  { num: "03", title: "빌트인 풀옵션 제공", desc: "가전·시스템장 무상 · 입주 즉시 생활 가능", Ico: Icon.Cabinet },
  { num: "04", title: "안전마진 분양가", desc: "인근 시세 7억 안팎 대비 합리적 분양가", Ico: Icon.Shield },
  { num: "05", title: "1,200개 인근 사업체", desc: "종사자 9,000명 · 임대 수요 확실한 직주근접", Ico: Icon.Bldg },
];

const OPTIONS = [
  { name: "냉장고", sub: "빌트인 매립형", Ico: Icon.Fridge },
  { name: "드럼세탁기", sub: "빌트인 세탁기", Ico: Icon.Washer },
  { name: "인덕션", sub: "빌트인 3구", Ico: Icon.Induction },
  { name: "후드", sub: "빌트인 슬림", Ico: Icon.Hood },
  { name: "광파오븐", sub: "빌트인 매립형", Ico: Icon.Oven },
  { name: "식기세척기", sub: "빌트인 매립형", Ico: Icon.Dish },
  { name: "정수기", sub: "빌트인 직수형", Ico: Icon.Water2 },
  { name: "에어컨", sub: "천장 매립형", Ico: Icon.Aircon },
  { name: "전열교환기", sub: "24시간 환기", Ico: Icon.Vent },
  { name: "시스템장", sub: "현관·침실", Ico: Icon.Cabinet },
];

const LOC = [
  { ko: "지하철", en: "Subway", text: "9호선 선유도역 도보 5분 · 2호선 당산역 환승 3분 · 5호선 여의도역 환승 5분", Ico: Icon.Subway },
  { ko: "도로", en: "Road", text: "올림픽대로 · 서부간선도로 · 경인고속도로 직결 (강남·김포·용산·가산 30분)", Ico: Icon.Car },
  { ko: "한강·공원", en: "River & Park", text: "양화한강공원 · 선유도공원 · 안양천 산책로 도보 15분", Ico: Icon.Water },
  { ko: "의료", en: "Medical", text: "이대목동병원 · 한림대 한강성심병원 · 카톨릭대 여의도성심병원", Ico: Icon.Hospital },
  { ko: "쇼핑", en: "Shopping", text: "현대백화점 · 더현대 · 코스트코 · 롯데마트 · 킴스클럽", Ico: Icon.Shop },
  { ko: "교육", en: "Education", text: "선유초/중/고 · 당산초 · 한가람고 · 한강미디어고", Ico: Icon.School },
];

export default function SeonyuClient() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setSlideIdx((i) => (i + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    try {
      const skip = sessionStorage.getItem("seonyu_pop_skip");
      if (!skip) {
        const t = setTimeout(() => setPopupOpen(true), 900);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const closePopup = (skipToday = false) => {
    setPopupOpen(false);
    if (skipToday) {
      try { sessionStorage.setItem("seonyu_pop_skip", "1"); } catch {}
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          message: fd.get("message") || "상담 요청",
          project_name: "선유노블레르",
          project_slug: "seonyu-noblere",
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormSubmitted(false), 3000);
      } else {
        alert("접수 중 오류가 발생했습니다.\n전화 문의: " + PHONE);
      }
    } catch {
      alert("네트워크 오류입니다.\n전화 문의: " + PHONE);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sp">
      {/* ── 진입 팝업 ── */}
      {popupOpen && (
        <div className="sp-entry-pop" role="dialog" aria-label="선착순 특별분양 안내">
          <div className="sp-entry-box">
            <div className="sp-entry-overline">SPECIAL OFFER</div>
            <h2 className="sp-entry-headline">
              <strong>선착순 동·호지정</strong><br />특별분양 진행 중
            </h2>
            <p className="sp-entry-sub">
              빌트인 풀옵션 무상 제공 · 입주 즉시 생활<br />
              한정 세대 · 정확한 분양가는 상담 시 안내
            </p>
            <div className="sp-entry-row">
              <button
                className="sp-entry-btn"
                onClick={() => { closePopup(); setTimeout(() => scrollTo("contact"), 50); }}
              >
                상담 신청
              </button>
              <button className="sp-entry-btn alt" onClick={() => closePopup()}>
                자세히 보기
              </button>
            </div>
            <button className="sp-entry-close" onClick={() => closePopup(true)}>
              오늘 하루동안 보지 않기
            </button>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className={`sp-header ${headerScrolled ? "scrolled" : ""}`}>
        <button className="sp-logo" onClick={() => scrollTo("hero")}>
          선유 <span className="lk">노블레르</span>
        </button>
        <nav className="sp-nav">
          <button onClick={() => scrollTo("overview")}>OVERVIEW</button>
          <button onClick={() => scrollTo("points")}>PREMIUM</button>
          <button onClick={() => scrollTo("options")}>OPTIONS</button>
          <button onClick={() => scrollTo("units")}>UNITS</button>
          <button onClick={() => scrollTo("plans")}>FLOOR PLAN</button>
          <button onClick={() => scrollTo("gallery")}>GALLERY</button>
          <button onClick={() => scrollTo("location")}>LOCATION</button>
          <button onClick={() => scrollTo("market")}>MARKET</button>
          <button onClick={() => scrollTo("contact")}>CONTACT</button>
        </nav>
        <a href={`tel:${PHONE}`} className="sp-header-tel">
          <Icon.Phone />
          {PHONE}
        </a>
      </header>

      {/* ── Hero ── */}
      <section className="sp-hero" id="hero">
        <div className="sp-hero-bg">
          {HERO_SLIDES.map((src, i) => (
            <div key={src} className={`sp-hero-slide ${i === slideIdx ? "active" : ""}`}>
              <Image
                src={src}
                alt={`선유노블레르 비주얼 ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        <div className="sp-hero-content">
          <div className="sp-hero-overline">SEONYU NOBLAIRE · 선착순 특별분양</div>
          <h1 className="sp-hero-title">
            한강을 곁에 둔<br />
            서울의 <span className="b">노블레르</span>
            <span className="en">Han River Residence, Three Rooms</span>
          </h1>
          <p className="sp-hero-sub">
            9호선 선유도역 도보 5분 · 양화한강공원·선유도공원 도보권<br />
            전용 49㎡ 쓰리룸 단일 평형 46실 · 빌트인 풀옵션 무상 제공
          </p>
          <div className="sp-hero-btns">
            <button className="sp-btn-big" onClick={() => scrollTo("contact")}>
              상담 신청
              <Icon.ArrowRight />
            </button>
            <a href={`tel:${PHONE}`} className="sp-btn-big sp-btn-outline">
              {PHONE}
            </a>
          </div>
        </div>
        <div className="sp-hero-dots" role="tablist">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`sp-hero-dot ${i === slideIdx ? "active" : ""}`}
              onClick={() => setSlideIdx(i)}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── 사업개요 ── */}
      <section className="sp-section" id="overview">
        <span className="sp-eyebrow">Project Overview · 사업개요</span>
        <h2 className="sp-title">선유도역 9호선<br />초역세권 신축 쓰리룸</h2>
        <div className="sp-rule" />
        <p className="sp-subtitle">
          지상 9층 · 2개 동 · 오피스텔 46실 · 양평동6가 2-1
        </p>
        <div className="sp-building-img">
          <Image
            src={`${BASE}/exterior/building-front.jpg`}
            alt="선유노블레르 건물 정면 투시도"
            width={960}
            height={680}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <table className="sp-table">
          <tbody>
            <tr>
              <th>Name</th><td>선유노블레르 오피스텔</td>
              <th>Location</th><td>서울특별시 영등포구 양평동6가 2-1</td>
            </tr>
            <tr>
              <th>Zoning</th><td>도시지역 · 준공업지역</td>
              <th>Use</th><td>오피스텔</td>
            </tr>
            <tr>
              <th>Scale</th><td>지하 1층 ~ 지상 9층 · 2개 동</td>
              <th>Lot Area</th><td>762.60㎡ (230.68평)</td>
            </tr>
            <tr>
              <th>Building</th><td>420.48㎡ (127.19평)</td>
              <th>Total Floor</th><td>2,968.98㎡ (898.11평)</td>
            </tr>
            <tr>
              <th>BCR</th><td>55.14 %</td>
              <th>FAR</th><td>358.21 %</td>
            </tr>
            <tr>
              <th>Units</th><td>오피스텔 46실 (민간임대 6실 포함)</td>
              <th>Parking</th><td>37대 (기계식 28 / 자주식 9, SUV 8 포함)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── 프리미엄 5 ── */}
      <section className="sp-section sp-dark" id="points">
        <span className="sp-eyebrow">Premium · 다섯 가지 가치</span>
        <h2 className="sp-title">노블레르가 답한<br /><strong>다섯 가지 기준</strong></h2>
        <div className="sp-rule" />
        <p className="sp-subtitle">
          한강에 가장 가까운 9호선 초역세권, 그리고 일상이 머무는 자리
        </p>
        <div className="sp-points">
          {POINTS.map((p) => (
            <div className="sp-point" key={p.num}>
              <p.Ico />
              <div className="sp-point-num">— {p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 빌트인 옵션 ── */}
      <section className="sp-section" id="options">
        <span className="sp-eyebrow">Built-in Free Options · 무상 옵션</span>
        <h2 className="sp-title">입주 즉시 생활,<br />열 가지 <strong>빌트인 풀옵션</strong></h2>
        <div className="sp-rule" />
        <p className="sp-subtitle">전 호실 동일 사양 · 무상 제공</p>
        <div className="sp-options-grid">
          {OPTIONS.map((o) => (
            <div className="sp-option-item" key={o.name}>
              <o.Ico />
              <h4>{o.name}</h4>
              <p>{o.sub}</p>
            </div>
          ))}
        </div>
        <p className="sp-note">
          옵션 구성·브랜드는 시행사 사정에 따라 변경될 수 있으며, 정확한 사양은 상담 시 안내드립니다.
        </p>
      </section>

      {/* ── 평형 안내 ── */}
      <section className="sp-section sp-paper-2" id="units">
        <span className="sp-eyebrow">Unit Composition · 평형 안내</span>
        <h2 className="sp-title">전용 49㎡<br /><strong>단일 평형 · 쓰리룸</strong></h2>
        <div className="sp-rule" />
        <p className="sp-subtitle">총 40실 (민간임대 6실 별도)</p>

        <div className="sp-type-cards">
          <div className="sp-type-card">
            <span className="tc-tag">A TYPE</span>
            <div className="tc-name">49A</div>
            <div className="tc-area">전용 49.01㎡ · 14.83평</div>
            <ul className="tc-spec">
              <li><span>공용면적</span><strong>3.03㎡</strong></li>
              <li><span>공급면적</span><strong>52.04㎡</strong></li>
              <li><span>기타공용</span><strong>12.50㎡</strong></li>
              <li><span>계약면적</span><strong>64.54㎡</strong></li>
              <li><span>대지지분</span><strong>16.578㎡</strong></li>
            </ul>
            <div className="tc-count"><strong>27</strong>실 · 점유 67.5%</div>
          </div>
          <div className="sp-type-card">
            <span className="tc-tag">B TYPE</span>
            <div className="tc-name">49B</div>
            <div className="tc-area">전용 49.01㎡ · 14.83평</div>
            <ul className="tc-spec">
              <li><span>공용면적</span><strong>3.03㎡</strong></li>
              <li><span>공급면적</span><strong>52.04㎡</strong></li>
              <li><span>기타공용</span><strong>12.50㎡</strong></li>
              <li><span>계약면적</span><strong>64.54㎡</strong></li>
              <li><span>대지지분</span><strong>16.578㎡</strong></li>
            </ul>
            <div className="tc-count"><strong>13</strong>실 · 점유 32.5%</div>
          </div>
        </div>

        <div className="sp-view-img" style={{ marginTop: 64 }}>
          <Image
            src={`${BASE}/units/unit-floors.jpg`}
            alt="선유노블레르 층별 호수 배치도 — 101동 22실 / 102동 24실"
            width={1040}
            height={760}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <p className="sp-view-caption">층별 호수 배치 · 101동 22실 · 102동 24실</p>
      </section>

      {/* ── 평면도 ── */}
      <section className="sp-section" id="plans">
        <span className="sp-eyebrow">Floor Plan · 평면 안내</span>
        <h2 className="sp-title">투룸+거실+주방, <strong>쓰리룸 구성</strong></h2>
        <div className="sp-rule" />
        <p className="sp-subtitle">2D 평면 + 3D 등각투상으로 공간을 확인하세요</p>

        <div className="sp-plans-img-grid">
          {FLOOR_PLANS.map((plan) => (
            <div key={plan.type} className="sp-plan-img-card">
              <div className="pic">
                <Image
                  src={plan.image}
                  alt={`선유노블레르 ${plan.type} 평면도`}
                  width={800}
                  height={560}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="sp-plan-img-label">
                {plan.type}
                <small>{plan.sub}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="sp-plans-img-grid" style={{ marginTop: 24 }}>
          {ISO_PLANS.map((plan) => (
            <div key={plan.type} className="sp-plan-img-card">
              <div className="pic">
                <Image
                  src={plan.image}
                  alt={`선유노블레르 ${plan.type} 3D 평면`}
                  width={800}
                  height={560}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="sp-plan-img-label">
                {plan.type}
                <small>{plan.sub}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 갤러리 ── */}
      <section className="sp-section sp-paper-2" id="gallery">
        <span className="sp-eyebrow">Gallery · 실내 모습</span>
        <h2 className="sp-title">준공된 <strong>실제 호실</strong>의 시간</h2>
        <div className="sp-rule" />
        <p className="sp-subtitle">모델하우스가 아닌 실 호실 사진을 그대로 보여드립니다</p>
        <div className="sp-gallery">
          {GALLERY.map((img) => (
            <div key={img.src} className="sp-gallery-item">
              <Image
                src={img.src}
                alt={img.label}
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className="sp-gallery-label">{img.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 입지 ── */}
      <section className="sp-section" id="location">
        <span className="sp-eyebrow">Location · 입지환경</span>
        <h2 className="sp-title">선유도역 도보 5분<br /><strong>한강 생활권</strong></h2>
        <div className="sp-rule" />
        <p className="sp-subtitle">영등포구 양평동6가 2-1 · 9호선 선유도역 인접</p>

        <div className="sp-location-map-img">
          <Image
            src={`${BASE}/location/map-naver.jpg`}
            alt="선유노블레르 입지환경 지도 — 9호선 선유도역"
            width={1200}
            height={1100}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="sp-location-info">
          {LOC.map((l) => (
            <div className="sp-loc-item" key={l.en}>
              <l.Ico />
              <div className="lc-body">
                <strong>{l.en}</strong>
                <span>{l.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 안전마진 ── */}
      <section className="sp-section sp-dark" id="market">
        <span className="sp-eyebrow">Market Analysis · 시세 비교</span>
        <h2 className="sp-title">인근 신축 시세<br /><strong>7억대 ~ 9억대</strong></h2>
        <div className="sp-rule" />
        <p className="sp-subtitle">
          인근 동일 평형 신축 오피스텔 시세 비교 — 안전마진의 근거
        </p>

        <div className="sp-margin-grid">
          <div className="sp-margin-card">
            <h4>한강더채움</h4>
            <p className="mc-area">전용 45.5㎡ · 2022.11 준공 · 당산역</p>
            <p className="mc-price">매매 <strong>8.9억</strong></p>
            <Image src={`${BASE}/market/hangang-dachaeum.jpg`} alt="한강더채움 매매 8.9억"
              width={1400} height={560} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="sp-margin-card">
            <h4>목동더채움</h4>
            <p className="mc-area">전용 49㎡ · 1동 14층</p>
            <p className="mc-price">매매 <strong>7.5억</strong></p>
            <Image src={`${BASE}/market/mokdong-dachaeum.jpg`} alt="목동더채움 매매 7.5억"
              width={1400} height={560} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="sp-margin-card">
            <h4>하이앤드63st</h4>
            <p className="mc-area">전용 39㎡ · 13층 신축 · 영등포</p>
            <p className="mc-price">매매 <strong>7억</strong></p>
            <Image src={`${BASE}/market/highend-63.jpg`} alt="하이앤드63st 매매 7억"
              width={1400} height={560} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="sp-margin-card">
            <h4>헬스케어스마이드</h4>
            <p className="mc-area">전용 14평 · 5층 · 마곡</p>
            <p className="mc-price">매매 <strong>7.4억</strong></p>
            <Image src={`${BASE}/market/healthcare-smyde.png`} alt="헬스케어스마이드 매매 7.4억"
              width={1200} height={560} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="sp-margin-card sp-margin-summary">
            <span className="mc-tag">Margin · 안전마진</span>
            <h4>분양가 안내</h4>
            <p className="mc-area">
              인근 동일 평형 신축 오피스텔 시세는 <strong>7억대 ~ 9억대</strong> 사이로 형성되어 있습니다.
              선유노블레르 분양가는 합리적 수준으로 책정되어 입주 시점부터 안전마진 확보가 가능합니다.
            </p>
            <p className="mc-cta">
              정확한 분양가는 <a href={`tel:${PHONE}`}>{PHONE}</a>
            </p>
          </div>
        </div>
        <p className="sp-note">
          시세 자료는 네이버 부동산·부동산뱅크 등 공개 매물 기준이며 실거래가와 다를 수 있습니다.
        </p>
      </section>

      {/* ── 인근 기업 ── */}
      <section className="sp-section" id="companies">
        <span className="sp-eyebrow">Business District · 인근 기업</span>
        <h2 className="sp-title">반경 내 <strong>1,200개 사업체</strong><br />종사자 9,000명</h2>
        <div className="sp-rule" />
        <p className="sp-subtitle">임대 수요가 검증된 직주근접 입지</p>
        <div className="sp-companies">
          {COMPANIES.map((c) => (
            <div key={c.name} className="sp-company">
              <h4>{c.name}</h4>
              <p className="meta"><strong>{c.addr}</strong></p>
              <p className="meta">{c.info}</p>
            </div>
          ))}
        </div>
        <p className="sp-note">
          예상 종사자 수는 점포수 × 7명 기준 산정 · 출처 사업지 인근 지식산업센터 현황
        </p>
      </section>

      {/* ── 상담신청 ── */}
      <section className="sp-section sp-dark" id="contact">
        <span className="sp-eyebrow">Contact · 상담신청</span>
        <h2 className="sp-title">방문 예약 · <strong>맞춤 상담</strong></h2>
        <div className="sp-rule" />
        <p className="sp-subtitle">스마일분양 전문 상담사가 1:1 안내해드립니다</p>

        <form className="sp-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="성함"
            required
            className="sp-input"
          />
          <input
            type="tel"
            name="phone"
            placeholder="010 0000 0000"
            required
            className="sp-input"
            maxLength={13}
            onInput={(e) => {
              const input = e.currentTarget;
              const nums = input.value.replace(/\D/g, "");
              if (nums.length <= 3) input.value = nums;
              else if (nums.length <= 7) input.value = `${nums.slice(0, 3)}-${nums.slice(3)}`;
              else input.value = `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`;
            }}
          />
          <textarea
            name="message"
            placeholder="문의사항 (희망 방문일 / 평형 / 자금 등)"
            required
            className="sp-input sp-textarea"
          />
          <label className="sp-checkbox">
            <input type="checkbox" required />
            개인정보 수집 및 이용에 동의합니다
          </label>
          <button
            type="submit"
            className={`sp-btn-big sp-btn-submit ${formSubmitted ? "done" : ""}`}
            disabled={submitting}
          >
            {formSubmitted ? "접수 완료" : submitting ? "접수 중" : "상담 신청"}
          </button>
        </form>
        <div className="sp-tel-guide">
          전화 상담
          <a href={`tel:${PHONE}`}>{PHONE}</a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="sp-footer">
        <div className="sp-footer-inner">
          <div className="sp-footer-brand">
            Seonyu <span className="lk">Noblaire</span>
          </div>
          <div className="sp-footer-brand-sub">한강 곁 노블레르</div>

          <div className="sp-footer-dev">
            <div>
              <strong>Developer</strong>
              <span>노블레르<br />사업자 531-15-01583</span>
            </div>
            <div>
              <strong>Project Manager</strong>
              <span>(주)태성개발<br />사업자 542-81-01235</span>
            </div>
            <div>
              <strong>Site</strong>
              <span>서울특별시 영등포구<br />양평동6가 2-1번지</span>
            </div>
          </div>

          <p>마케팅 대행 — 스마일분양 · Jpex Studio · 대표 윤지수 · 사업자 560-45-01327 · 문의 {PHONE}</p>
          <p>본 홈페이지 및 홍보물에 사용된 CG · 그래픽 · 이미지컷 · 치수 · 표기 사항 등은 소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있으며,</p>
          <p>개발계획 · 시공 사정에 따라 변경될 수 있으니 참고자료로만 활용하시기 바랍니다. 자세한 사항은 분양 공고문을 확인하시기 바랍니다.</p>
          <p className="copy">© 2026 SEONYU NOBLAIRE · All rights reserved.</p>
        </div>
      </footer>

      {/* ── Bottom Bar (Mobile) ── */}
      <div className="sp-bottom-bar">
        <a href={`tel:${PHONE}`} className="sp-bb-call">전화 상담</a>
        <button className="sp-bb-consult" onClick={() => scrollTo("contact")}>상담 신청</button>
      </div>
    </div>
  );
}

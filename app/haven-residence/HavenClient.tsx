"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ── Floor Plan Data ── */
const fpData: Record<
  string,
  {
    title: string;
    typeLabel: string;
    area: string;
    supply: string;
    rooms: string;
    bay: string;
    dir: string;
    features: string[];
  }
> = {
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
    features: [
      "알파룸",
      "대형 팬트리",
      "드레스룸",
      "확장형 발코니",
      "시스템 에어컨",
      "현관 중문",
    ],
  },
  "80C": {
    title: "80㎡ · 4Bay 남향",
    typeLabel: "TYPE C",
    area: "80.25㎡",
    supply: "125.60㎡",
    rooms: "4실 / 2실",
    bay: "4Bay 판상형",
    dir: "남향",
    features: [
      "서재",
      "대형 팬트리",
      "워크인 드레스룸",
      "확장형 발코니",
      "시스템 에어컨",
      "현관 중문",
      "빌트인 가전",
    ],
  },
};

/* ── Gallery Data ── */
const galleryItems = [
  { category: "exterior", label: "외부 투시도 01", caption: "주간 전경 투시도 — 49층 스카이라인" },
  { category: "exterior", label: "외부 투시도 02", caption: "야간 조명 투시도 — 파사드 라이팅" },
  { category: "interior", label: "실내 투시도 01", caption: "거실 — 풀 윈도우 자연채광 설계" },
  { category: "interior", label: "실내 투시도 02", caption: "주방 — 프리미엄 빌트인 시스템" },
  { category: "community", label: "커뮤니티 01", caption: "피트니스 센터 — 호텔급 운동 시설" },
  { category: "community", label: "커뮤니티 02", caption: "스카이 라운지 — 49층 프리미엄 조망" },
];

/* ── FAQ Data ── */
const faqItems = [
  {
    q: "분양가는 어느 정도인가요?",
    a: "HAVEN RÉSIDENCE의 분양가는 타입별로 상이하며, 정확한 금액은 관심고객 등록 후 개별 안내해드립니다. VIP 라운지에서 자세한 상담을 받으실 수 있습니다.",
  },
  {
    q: "입주 예정일은 언제인가요?",
    a: "2027년 하반기 입주를 목표로 하고 있으며, 공사 진행 상황에 따라 변동될 수 있습니다. 정확한 일정은 추후 공지됩니다.",
  },
  {
    q: "프리미엄 서비스는 별도 비용이 발생하나요?",
    a: "기본 커뮤니티 시설은 관리비에 포함되며, 컨시어지, 멤버십 등 일부 프리미엄 서비스는 선택적으로 이용 가능합니다.",
  },
  {
    q: "모델하우스 방문은 어떻게 예약하나요?",
    a: "전화(1800-7890) 또는 본 페이지의 관심고객 등록을 통해 예약하실 수 있습니다. VIP 라운지에서 1:1 맞춤 상담을 진행합니다.",
  },
  {
    q: "주차는 몇 대까지 가능한가요?",
    a: "세대당 1.3대 이상의 주차 공간을 확보하고 있으며, 지하 주차장에 전기차 충전 시설도 완비되어 있습니다.",
  },
];

/* ── Premium Services ── */
const premiumServices = [
  { icon: "🏥", num: "01", title: "Medical", desc: "서울 주요 대학병원 연계 건강검진 및 24시간 헬스케어 프로그램" },
  { icon: "🏋️", num: "02", title: "Community", desc: "피트니스, 골프, 사우나 등 호텔급 커뮤니티 시설 운영" },
  { icon: "🛎️", num: "03", title: "Concierge", desc: "클리닝, 세탁, 식사 케이터링 등 맞춤형 생활 편의 서비스" },
  { icon: "⭐", num: "04", title: "Membership", desc: "제휴 호텔, 리조트, 골프장 우선 예약 및 특별 할인 혜택" },
  { icon: "📱", num: "05", title: "Smart Living", desc: "IoT 홈 시스템, 무인택배, 스마트 주차 등 첨단 주거 서비스" },
];

/* ── Stats ── */
const stats = [
  { target: 49, suffix: "층", label: "Building Height" },
  { target: 768, suffix: "세대", label: "Total Units" },
  { target: 5, suffix: "대 서비스", label: "Premium Services" },
  { target: 8, suffix: "분", label: "Station Walk" },
];

/* ── Location Details ── */
const locationDetails = [
  { icon: "🚇", label: "Subway", value: "6·7호선 태릉입구역 도보 8분" },
  { icon: "🏫", label: "Education", value: "서울과학기술대, 육군사관학교 인접" },
  { icon: "🌳", label: "Nature", value: "태릉·강릉 숲세권, 불암산 조망" },
  { icon: "🏥", label: "Medical", value: "을지대병원, 노원을지대병원 인근" },
];

const locationInfra = [
  { label: "Education", value: "초·중·고 도보 10분" },
  { label: "Shopping", value: "이마트·롯데백화점 인근" },
  { label: "Hospital", value: "대학병원 차량 10분" },
  { label: "Highway", value: "동부간선·북부간선 연결" },
];

/* ═══════════════════════════════
   Counter Hook
   ═══════════════════════════════ */
function useCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const ease = (t: number) => 1 - Math.pow(1 - t, 3);
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.round(ease(progress) * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}

/* ═══════════════════════════════
   Scroll Reveal Hook
   ═══════════════════════════════ */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveals = el.querySelectorAll(".haven-reveal");
    if (!reveals.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}

/* ═══════════════════════════════
   StatItem Component
   ═══════════════════════════════ */
function StatItem({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { ref, value } = useCounter(target);
  return (
    <div className="haven-stat-item" ref={ref}>
      <div className="haven-stat-number">
        <span>{value.toLocaleString()}</span>
      </div>
      <div className="haven-stat-suffix">{suffix}</div>
      <div className="haven-stat-label">{label}</div>
    </div>
  );
}

/* ═══════════════════════════════
   Main Component
   ═══════════════════════════════ */
export default function HavenClient() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState("all");
  const [fpTab, setFpTab] = useState("70A");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const gallerySliderRef = useRef<HTMLDivElement>(null);
  const revealRef = useScrollReveal();
  const heroVisualRef = useRef<HTMLDivElement>(null);

  // Header scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero parallax
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth <= 1024) return;
    const onScroll = () => {
      const el = heroVisualRef.current;
      if (el && window.scrollY < window.innerHeight) {
        el.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Gallery slider
  const scrollGallery = useCallback((dir: number) => {
    const slider = gallerySliderRef.current;
    if (!slider) return;
    const slide = slider.querySelector(".haven-gallery-slide") as HTMLElement;
    const w = slide ? slide.offsetWidth + 20 : 300;
    slider.scrollBy({ left: dir * w, behavior: "smooth" });
  }, []);

  // Scroll to section
  const scrollToSection = useCallback((id: string) => {
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--haven-nav-h") || "80"
      );
      window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
    }
  }, []);

  // Form submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const fp = fpData[fpTab];
  const filteredGallery =
    galleryTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === galleryTab);

  return (
    <div className="haven-page" ref={revealRef}>
      {/* ── Header ── */}
      <header className={`haven-header ${scrolled ? "scrolled" : ""}`}>
        <button
          onClick={() => scrollToSection("haven-hero")}
          className="haven-logo"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          HAVEN <em>Résidence</em>
        </button>

        <nav className="haven-nav">
          {[
            { id: "haven-hero", label: "Home" },
            { id: "haven-overview", label: "Overview" },
            { id: "haven-premium", label: "Services" },
            { id: "haven-gallery", label: "Gallery" },
            { id: "haven-contact", label: "Contact" },
          ].map((item) => (
            <button
              key={item.id}
              className="haven-nav-link"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="haven-header-right">
          <span className="haven-header-tel">1800-7890</span>
          <button
            className="haven-header-cta"
            onClick={() => scrollToSection("haven-contact")}
          >
            관심고객 등록
          </button>
          <button
            className="haven-hamburger"
            onClick={() => setMobileNavOpen(true)}
            aria-label="메뉴"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ── Mobile Nav ── */}
      <div className={`haven-mobile-nav ${mobileNavOpen ? "open" : ""}`}>
        <button
          className="haven-mobile-close"
          onClick={() => setMobileNavOpen(false)}
          aria-label="닫기"
        >
          &times;
        </button>
        {[
          { id: "haven-hero", label: "Home" },
          { id: "haven-overview", label: "Overview" },
          { id: "haven-premium", label: "Services" },
          { id: "haven-gallery", label: "Gallery" },
          { id: "haven-contact", label: "Contact" },
        ].map((item) => (
          <button
            key={item.id}
            className="haven-nav-link"
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
        <button
          className="haven-btn haven-btn-gold-outline"
          style={{ marginTop: 16 }}
          onClick={() => scrollToSection("haven-contact")}
        >
          관심고객 등록
        </button>
      </div>

      {/* ── Hero ── */}
      <section className="haven-hero" id="haven-hero">
        <div className="haven-hero-bg">
          <div className="haven-hero-pattern" />
        </div>
        <div className="haven-hero-visual" ref={heroVisualRef}>
          <div className="haven-hero-visual-overlay" />
          <div className="haven-hero-visual-inner">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              style={{ opacity: 0.15 }}
            >
              <rect x="30" y="40" width="60" height="120" rx="2" stroke="#B8926A" strokeWidth="1" />
              <rect x="110" y="20" width="60" height="140" rx="2" stroke="#B8926A" strokeWidth="1" />
              <line x1="0" y1="160" x2="200" y2="160" stroke="#B8926A" strokeWidth=".5" />
              <circle cx="60" cy="30" r="15" stroke="#B8926A" strokeWidth=".5" />
            </svg>
          </div>
        </div>

        <div className="haven-hero-content">
          <div className="haven-hero-label">Premium Residence</div>
          <h1 className="haven-hero-title">
            당신이 꿈꾸던
            <br />
            <em>새로운 삶</em>의
            <br />
            <strong>기준이 됩니다</strong>
          </h1>
          <p className="haven-hero-sub">
            서울 노원의 새로운 랜드마크.
            <br />
            지상 49층, 768세대의 프리미엄 웰니스 레지던스.
          </p>
          <div className="haven-hero-actions">
            <button
              className="haven-btn haven-btn-primary haven-btn-arrow"
              onClick={() => scrollToSection("haven-contact")}
            >
              관심고객 등록
            </button>
            <button
              className="haven-btn haven-btn-outline haven-btn-arrow"
              onClick={() => scrollToSection("haven-overview")}
            >
              브랜드 스토리
            </button>
          </div>
        </div>

        <div className="haven-hero-scroll">
          <div className="haven-hero-scroll-line" />
          Scroll
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="haven-overview" id="haven-overview">
        <div className="haven-overview-grid">
          <div className="haven-overview-left haven-reveal">
            <div className="haven-section-label">Overview</div>
            <h2 className="haven-section-title">
              도심 속
              <br />
              <strong>프리미엄 주거</strong>의
              <br />
              새로운 정의
            </h2>
            <p className="haven-section-desc">
              HAVEN RÉSIDENCE는 단순한 주거 공간을 넘어, 건강하고 여유로운
              라이프스타일을 제안합니다. 세대와 세대가 만나고, 일상이 특별해지는
              곳.
            </p>

            <div className="haven-overview-info">
              {[
                { label: "Location", value: "서울시 노원구" },
                { label: "Scale", value: "지하4층~지상49층" },
                { label: "Units", value: "총 768세대" },
                { label: "Area", value: "70·73·80㎡" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`haven-overview-info-item haven-reveal haven-reveal-delay-${i + 1}`}
                >
                  <div className="haven-overview-info-label">{item.label}</div>
                  <div className="haven-overview-info-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="haven-overview-right">
            <div className="haven-overview-img haven-reveal">
              <div className="haven-overview-img-placeholder">
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <rect x="4" y="8" width="18" height="32" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="26" y="4" width="18" height="36" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="0" y1="40" x2="48" y2="40" stroke="currentColor" strokeWidth="1" />
                </svg>
                투시도 이미지
              </div>
            </div>
            <div className="haven-overview-img haven-reveal haven-reveal-delay-2">
              <div className="haven-overview-img-placeholder">
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <path d="M4 40 L24 8 L44 40 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="36" cy="12" r="4" stroke="currentColor" strokeWidth="1" />
                </svg>
                조감도 이미지
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Premium Services ── */}
      <section className="haven-premium" id="haven-premium">
        <div className="haven-premium-header haven-reveal">
          <div
            className="haven-section-label"
            style={{ justifyContent: "center" }}
          >
            <span
              style={{
                width: 24,
                height: 1,
                background: "var(--haven-gold)",
                display: "inline-block",
              }}
            />
            Premium Services
            <span
              style={{
                width: 24,
                height: 1,
                background: "var(--haven-gold)",
                display: "inline-block",
              }}
            />
          </div>
          <h2 className="haven-section-title">
            <strong>5대 프리미엄</strong> 라이프 서비스
          </h2>
          <p
            className="haven-section-desc"
            style={{ maxWidth: 520, margin: "16px auto 0" }}
          >
            입주민의 건강과 편의를 위한 차별화된 서비스를 제공합니다.
          </p>
        </div>

        <div className="haven-premium-grid">
          {premiumServices.map((s, i) => (
            <div
              key={s.num}
              className={`haven-premium-card haven-reveal ${i > 0 ? `haven-reveal-delay-${i}` : ""}`}
            >
              <div className="haven-premium-icon">{s.icon}</div>
              <div className="haven-premium-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Location ── */}
      <section className="haven-location" id="haven-location">
        <div className="haven-location-inner">
          <div className="haven-location-header haven-reveal">
            <div className="haven-section-label">Location</div>
            <h2 className="haven-section-title">
              <strong>도심의 중심</strong>에서 누리는 자연
            </h2>
          </div>

          <div className="haven-location-content">
            <div className="haven-location-map haven-reveal">
              <div className="haven-location-map-placeholder">
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M24 28 L24 40" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="24" cy="20" r="3" fill="currentColor" opacity=".3" />
                  <ellipse cx="24" cy="42" rx="12" ry="3" stroke="currentColor" strokeWidth="1" opacity=".3" />
                </svg>
                지도 영역
              </div>
            </div>

            <div className="haven-location-info haven-reveal haven-reveal-delay-1">
              <h3>서울시 노원구 화랑로45길</h3>

              <div className="haven-location-detail">
                {locationDetails.map((d) => (
                  <div key={d.label} className="haven-location-detail-item">
                    <div className="haven-location-detail-icon">{d.icon}</div>
                    <div>
                      <div className="haven-location-detail-label">{d.label}</div>
                      <div className="haven-location-detail-value">{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="haven-location-infra">
                {locationInfra.map((item, i) => (
                  <div
                    key={item.label}
                    className={`haven-location-infra-item haven-reveal haven-reveal-delay-${i}`}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="haven-gallery" id="haven-gallery">
        <div className="haven-gallery-header haven-reveal">
          <div className="haven-section-label">Gallery</div>
          <h2 className="haven-section-title">
            <strong>공간</strong>을 미리 만나다
          </h2>
          <p className="haven-section-desc">
            투시도와 조감도로 미리 만나보는 HAVEN RÉSIDENCE의 프리미엄 공간.
          </p>
        </div>

        <div className="haven-gallery-tabs haven-reveal">
          {["all", "exterior", "interior", "community"].map((tab) => (
            <button
              key={tab}
              className={`haven-gallery-tab ${galleryTab === tab ? "active" : ""}`}
              onClick={() => setGalleryTab(tab)}
            >
              {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="haven-gallery-slider" ref={gallerySliderRef}>
          {filteredGallery.map((item, i) => (
            <div key={`${item.category}-${i}`} className="haven-gallery-slide">
              <div className="haven-gallery-slide-placeholder">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="12" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="20" cy="24" r="4" stroke="currentColor" />
                  <path d="M8 36 L20 28 L32 34 L40 28" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {item.label}
              </div>
              <div className="haven-gallery-slide-caption">{item.caption}</div>
            </div>
          ))}
        </div>

        <div className="haven-gallery-nav">
          <button onClick={() => scrollGallery(-1)} aria-label="이전">
            ←
          </button>
          <button onClick={() => scrollGallery(1)} aria-label="다음">
            →
          </button>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="haven-stats">
        <div className="haven-stats-grid">
          {stats.map((s) => (
            <StatItem key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* ── Floor Plan ── */}
      <section className="haven-floorplan" id="haven-floorplan">
        <div className="haven-floorplan-inner">
          <div className="haven-floorplan-header haven-reveal">
            <div
              className="haven-section-label"
              style={{ justifyContent: "center" }}
            >
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: "var(--haven-gold)",
                  display: "inline-block",
                }}
              />
              Unit Plan
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: "var(--haven-gold)",
                  display: "inline-block",
                }}
              />
            </div>
            <h2 className="haven-section-title">
              <strong>세대 안내</strong>
            </h2>
          </div>

          <div className="haven-floorplan-tabs haven-reveal">
            {Object.keys(fpData).map((key) => (
              <button
                key={key}
                className={`haven-floorplan-tab ${fpTab === key ? "active" : ""}`}
                onClick={() => setFpTab(key)}
              >
                {key.replace(/(\d+)/, "$1㎡ ")}
              </button>
            ))}
          </div>

          <div className="haven-floorplan-content">
            <div className="haven-floorplan-visual haven-reveal">
              <div className="haven-floorplan-visual-placeholder">
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  style={{ width: 160, opacity: 0.15 }}
                >
                  <rect x="10" y="10" width="180" height="180" stroke="#B8926A" strokeWidth="1" />
                  <rect x="10" y="10" width="90" height="90" stroke="#B8926A" strokeWidth=".5" />
                  <rect x="100" y="10" width="90" height="60" stroke="#B8926A" strokeWidth=".5" />
                  <rect x="10" y="100" width="60" height="90" stroke="#B8926A" strokeWidth=".5" />
                  <rect x="100" y="70" width="90" height="60" stroke="#B8926A" strokeWidth=".5" />
                  <rect x="70" y="100" width="30" height="90" stroke="#B8926A" strokeWidth=".5" />
                  <rect x="100" y="130" width="90" height="60" stroke="#B8926A" strokeWidth=".5" />
                  <text x="55" y="55" textAnchor="middle" fill="#B8926A" fontSize="8" fontFamily="Montserrat">거실</text>
                  <text x="145" y="45" textAnchor="middle" fill="#B8926A" fontSize="7" fontFamily="Montserrat">침실1</text>
                  <text x="40" y="150" textAnchor="middle" fill="#B8926A" fontSize="7" fontFamily="Montserrat">침실2</text>
                  <text x="145" y="105" textAnchor="middle" fill="#B8926A" fontSize="7" fontFamily="Montserrat">주방</text>
                  <text x="85" y="150" textAnchor="middle" fill="#B8926A" fontSize="6" fontFamily="Montserrat">욕실</text>
                  <text x="145" y="165" textAnchor="middle" fill="#B8926A" fontSize="7" fontFamily="Montserrat">침실3</text>
                </svg>
                <span style={{ color: "var(--haven-text-light)", fontSize: 12, marginTop: 16 }}>
                  평면도 이미지
                </span>
              </div>
            </div>

            <div className="haven-floorplan-info haven-reveal haven-reveal-delay-1">
              <div className="type-label">{fp.typeLabel}</div>
              <h3>{fp.title}</h3>

              <div className="haven-floorplan-spec">
                {[
                  { label: "전용면적", value: fp.area },
                  { label: "공급면적", value: fp.supply },
                  { label: "방 / 욕실", value: fp.rooms },
                  { label: "Bay 구조", value: fp.bay },
                  { label: "향", value: fp.dir },
                ].map((row) => (
                  <div key={row.label} className="haven-floorplan-spec-row">
                    <span className="haven-floorplan-spec-label">{row.label}</span>
                    <span className="haven-floorplan-spec-value">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="haven-floorplan-features">
                {fp.features.map((f) => (
                  <span key={f} className="haven-floorplan-feature">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="haven-cta">
        <div className="haven-cta-content haven-reveal">
          <div className="haven-section-label">VIP Lounge</div>
          <h2 className="haven-section-title">
            <strong>모델하우스</strong>
            <br />
            방문 예약
          </h2>
          <p className="haven-section-desc">
            HAVEN RÉSIDENCE의 프리미엄 공간을 직접 경험해보세요. VIP 라운지에서
            1:1 상담을 진행합니다.
          </p>
          <div className="haven-cta-actions">
            <button
              className="haven-btn haven-btn-primary haven-btn-arrow"
              onClick={() => scrollToSection("haven-contact")}
            >
              방문 예약하기
            </button>
            <button
              className="haven-btn haven-btn-outline haven-btn-arrow"
              onClick={() => scrollToSection("haven-contact")}
            >
              관심고객 등록
            </button>
          </div>
          <div className="haven-cta-tel">
            <small>Consultation</small>
            1800-7890
          </div>
        </div>
      </section>

      {/* ── Contact & FAQ ── */}
      <section className="haven-contact-section" id="haven-contact">
        <div className="haven-contact-grid">
          <div>
            <div className="haven-section-label">Contact</div>
            <h2 className="haven-section-title" style={{ marginBottom: 48 }}>
              <strong>관심고객</strong> 등록
            </h2>

            <form onSubmit={handleFormSubmit}>
              <div className="haven-form-row">
                <div className="haven-form-group">
                  <label className="haven-form-label">
                    Name<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="haven-form-input"
                    placeholder="이름을 입력해주세요"
                    required
                  />
                </div>
                <div className="haven-form-group">
                  <label className="haven-form-label">
                    Phone<span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    className="haven-form-input"
                    placeholder="연락처를 입력해주세요"
                    required
                  />
                </div>
              </div>

              <div className="haven-form-row">
                <div className="haven-form-group">
                  <label className="haven-form-label">Email</label>
                  <input
                    type="email"
                    className="haven-form-input"
                    placeholder="이메일 (선택)"
                  />
                </div>
                <div className="haven-form-group">
                  <label className="haven-form-label">Unit Type</label>
                  <select className="haven-form-select">
                    <option value="">관심 타입 선택</option>
                    <option value="70A">70㎡ A타입</option>
                    <option value="73B">73㎡ B타입</option>
                    <option value="80C">80㎡ C타입</option>
                  </select>
                </div>
              </div>

              <div className="haven-form-group">
                <label className="haven-form-label">Message</label>
                <textarea
                  className="haven-form-textarea"
                  placeholder="문의 사항을 입력해주세요 (선택)"
                />
              </div>

              <div className="haven-form-checkbox">
                <input type="checkbox" id="privacy" required />
                <label htmlFor="privacy">
                  개인정보 수집 및 이용에 동의합니다. 수집된 정보는 상담 목적으로만
                  사용됩니다.
                </label>
              </div>

              <div className="haven-form-submit">
                <button
                  type="submit"
                  className="haven-btn haven-btn-primary haven-btn-arrow"
                  style={
                    formSubmitted
                      ? { background: "var(--haven-sage)", width: "100%", justifyContent: "center" }
                      : { width: "100%", justifyContent: "center" }
                  }
                >
                  {formSubmitted ? "접수 완료되었습니다" : "관심고객 등록하기"}
                </button>
              </div>
            </form>

            {/* FAQ */}
            <div className="haven-faq">
              <h3>자주 묻는 질문</h3>
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className={`haven-faq-item ${openFaq === i ? "open" : ""}`}
                >
                  <button
                    className="haven-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {item.q}
                    <span className="icon">+</span>
                  </button>
                  <div className="haven-faq-a">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="haven-contact-sidebar">
            <div className="haven-contact-card">
              <h4>Consultation</h4>
              <p>
                전문 상담사가 1:1 맞춤 상담을
                <br />
                진행해드립니다.
              </p>
              <span className="tel">1800-7890</span>
            </div>
            <div className="haven-contact-card">
              <h4>VIP Lounge</h4>
              <p>
                서울시 노원구 화랑로45길
                <br />
                운영시간: 10:00 - 18:00
              </p>
            </div>
            <div className="haven-contact-card">
              <h4>Project Site</h4>
              <p>
                서울시 노원구 화랑로45길 145
                <br />
                (공릉동 일원)
              </p>
            </div>
            <div className="haven-contact-card">
              <h4>Email</h4>
              <p>vip@haven-residence.kr</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="haven-footer">
        <div className="haven-footer-inner">
          <div className="haven-footer-top">
            <div className="haven-footer-brand">
              <span className="haven-logo">
                HAVEN <em>Résidence</em>
              </span>
              <p>
                서울시 노원구 화랑로45길 145 일원
                <br />
                시행·시공 HAVEN 개발㈜
                <br />
                대표전화 1800-7890
              </p>
            </div>
            <div>
              <h4>Brand</h4>
              <ul>
                <li>
                  <button onClick={() => scrollToSection("haven-overview")}>
                    브랜드 스토리
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("haven-overview")}>
                    건축 설계
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("haven-overview")}>
                    조경 설계
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4>Information</h4>
              <ul>
                <li>
                  <button onClick={() => scrollToSection("haven-floorplan")}>
                    세대 안내
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("haven-gallery")}>
                    갤러리
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("haven-location")}>
                    오시는 길
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <button onClick={() => scrollToSection("haven-contact")}>
                    관심고객 등록
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("haven-contact")}>
                    방문 예약
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("haven-contact")}>
                    문의하기
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="haven-footer-bottom">
            <div className="haven-footer-legal">
              <span>서비스 이용약관</span>
              <span>개인정보처리방침</span>
            </div>
            <div className="haven-footer-copy">
              &copy; 2026 HAVEN RÉSIDENCE. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

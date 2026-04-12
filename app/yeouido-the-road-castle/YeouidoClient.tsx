"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "./simple.css";

const PHONE = "1666-0952";

/* ── 평면 타입 ── */
const FLOOR_PLANS = [
  {
    type: "37A타입",
    image: "/images/yeouido-the-road-castle/crawled/37A.png",
  },
  {
    type: "37B타입",
    image: "/images/yeouido-the-road-castle/crawled/37B.png",
  },
];

/* ── 갤러리 이미지 ── */
const GALLERY = [
  { src: "/images/yeouido-the-road-castle/interior/living-01.png", label: "거실" },
  { src: "/images/yeouido-the-road-castle/interior/kitchen-01.png", label: "주방" },
  { src: "/images/yeouido-the-road-castle/interior/bedroom-01.png", label: "침실" },
  { src: "/images/yeouido-the-road-castle/interior/bathroom-01.png", label: "욕실" },
  { src: "/images/yeouido-the-road-castle/interior/living-02.png", label: "거실2" },
  { src: "/images/yeouido-the-road-castle/interior/kitchen-02.png", label: "주방2" },
];

export default function YeouidoClient() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          project_name: "여의도 더로드캐슬",
          project_slug: "yeouido-the-road-castle",
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
      {/* ── Header ── */}
      <header className={`sp-header ${headerScrolled ? "scrolled" : ""}`}>
        <button className="sp-logo" onClick={() => scrollTo("hero")}>
          여의도 더로드캐슬
        </button>
        <nav className="sp-nav">
          <button onClick={() => scrollTo("overview")}>사업개요</button>
          <button onClick={() => scrollTo("options")}>무상옵션</button>
          <button onClick={() => scrollTo("plans")}>평면안내</button>
          <button onClick={() => scrollTo("location")}>입지환경</button>
          <button onClick={() => scrollTo("contact")}>상담신청</button>
        </nav>
        <a href={`tel:${PHONE}`} className="sp-header-tel">{PHONE}</a>
      </header>

      {/* ── Hero ── */}
      <section className="sp-hero" id="hero">
        <div className="sp-hero-bg">
          <Image
            src="/images/yeouido-the-road-castle/crawled/banner-03.jpg"
            alt="대방역 여의도 더로드캐슬 야경 조감도"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="sp-hero-dim" />
        </div>
        <div className="sp-hero-content">
          <p className="sp-hero-label">대방역 도보 2분 · 더블역세권</p>
          <h1 className="sp-hero-title">
            여의도 더로드캐슬<br />
            <span>선착순 특별분양</span>
          </h1>
          <p className="sp-hero-sub">
            7년전 분양가 · 즉시입주 · LG 풀옵션 무상
          </p>
          <div className="sp-hero-btns">
            <button className="sp-btn-big" onClick={() => scrollTo("contact")}>
              상담신청하기
            </button>
            <a href={`tel:${PHONE}`} className="sp-btn-big sp-btn-outline">
              {PHONE}
            </a>
          </div>
        </div>
      </section>


      {/* ── 사업개요 ── */}
      <section className="sp-section" id="overview">
        <h2 className="sp-title">사업개요</h2>
        <div className="sp-building-img">
          <Image
            src="/images/yeouido-the-road-castle/crawled/info-01.jpg"
            alt="여의도 더로드캐슬 건물 외관 투시도"
            width={700}
            height={500}
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
        </div>
        <table className="sp-table">
          <tbody>
            <tr>
              <th>사업명</th><td>대방역 여의도 더로드캐슬</td>
              <th>대지위치</th><td>서울특별시 영등포구 신길동 449-11</td>
            </tr>
            <tr>
              <th>지역/지구</th><td>일반상업지역, 제3종일반주거지역</td>
              <th>건물용도</th><td>공동주택, 오피스텔, 근린생활시설</td>
            </tr>
            <tr>
              <th>건축규모</th><td>지하 2층 ~ 지상 17층, 1개동</td>
              <th>대지면적</th><td>409.00㎡ (123.723 평)</td>
            </tr>
            <tr>
              <th>건축면적</th><td>211.53 ㎡</td>
              <th>연면적</th><td>2702.27㎡ (817.437평)</td>
            </tr>
            <tr>
              <th>건폐율</th><td>51.72 %</td>
              <th>용적률</th><td>542.51%</td>
            </tr>
            <tr>
              <th>세대수</th><td>아파트 총 46세대, 오피스텔 6실, 근린생활시설 6실</td>
              <th>주차대수</th><td>33 대</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── 핵심 포인트 ── */}
      <section className="sp-section sp-dark">
        <h2 className="sp-title">왜 더로드캐슬인가</h2>
        <div className="sp-points">
          <div className="sp-point">
            <div className="sp-point-num">01</div>
            <h3>대방역 도보 2분</h3>
            <p>1호선 · 신림선 더블역세권<br />5·7·9호선 도보권 멀티역세권</p>
          </div>
          <div className="sp-point">
            <div className="sp-point-num">02</div>
            <h3>7년전 분양가</h3>
            <p>서울 중심 초역세권<br />파격적인 신축 분양가</p>
          </div>
          <div className="sp-point">
            <div className="sp-point-num">03</div>
            <h3>LG 풀옵션 무상</h3>
            <p>1,900만원 상당<br />가전·가구 풀옵션 무상 제공</p>
          </div>
          <div className="sp-point">
            <div className="sp-point-num">04</div>
            <h3>청약통장 불필요</h3>
            <p>토지거래허가 제외<br />누구나 자유롭게 매입 가능</p>
          </div>
        </div>
      </section>

      {/* ── 무상옵션 제품 ── */}
      <section className="sp-section" id="options">
        <h2 className="sp-title">무상옵션 제품</h2>
        <p className="sp-subtitle">청약 사전 접수 시 <strong>1,900만원 상당</strong> 무상 제공</p>
        <div className="sp-options-img">
          <Image
            src="/images/yeouido-the-road-castle/crawled/options.png"
            alt="무상옵션 제품 - LG 드럼세탁기, LG 건조기, 비스포크 정수기, LG모던엣지 냉장고, 3구 빌트인 하이브리드, 시스템장, 빌트인 광파오븐, LG 에어컨, 전열교환기"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </section>

      {/* ── 실내 갤러리 ── */}
      <section className="sp-section sp-gray">
        <h2 className="sp-title">실내 모습</h2>
        <p className="sp-subtitle">준공 완료된 실제 모델하우스입니다</p>
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

      {/* ── 평면 안내 ── */}
      <section className="sp-section" id="plans">
        <h2 className="sp-title">평면 안내</h2>
        <p className="sp-subtitle">전 타입 투룸 구성</p>
        <div className="sp-plans-img-grid">
          {FLOOR_PLANS.map((plan) => (
            <div key={plan.type} className="sp-plan-img-card">
              <Image
                src={plan.image}
                alt={`${plan.type} 평면구조도`}
                width={800}
                height={600}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="sp-plan-img-label">{plan.type}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 지도 / 오시는길 ── */}
      <section className="sp-section sp-gray" id="location">
        <h2 className="sp-title">입지 환경</h2>
        <p className="sp-subtitle">서울시 영등포구 신길동 449-11 (대방역 도보 2분)</p>

        {/* 입지환경 지도 (크롤링) */}
        <div className="sp-location-map-img">
          <Image
            src="/images/yeouido-the-road-castle/crawled/location-01.jpg"
            alt="여의도 더로드캐슬 입지환경 지도"
            width={1920}
            height={1284}
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
        </div>

        <div className="sp-location-info">
          <div className="sp-loc-item">
            <strong>🚇 지하철</strong>
            <span>대방역 1호선 · 신림선 도보 2분</span>
          </div>
          <div className="sp-loc-item">
            <strong>🚌 교통</strong>
            <span>신길역 1·5호선, 샛강역 9호선 도보권</span>
          </div>
          <div className="sp-loc-item">
            <strong>🛍️ 쇼핑</strong>
            <span>더현대, 타임스퀘어, 롯데·신세계백화점, IFC몰</span>
          </div>
          <div className="sp-loc-item">
            <strong>🌊 생활</strong>
            <span>여의도 한강공원, 이마트 등 생활 인프라</span>
          </div>
        </div>
      </section>

      {/* ── 상담신청 ── */}
      <section className="sp-section sp-dark" id="contact">
        <h2 className="sp-title">상담신청</h2>
        <p className="sp-subtitle">스마일분양 전문 상담사가 1:1 맞춤 상담해드립니다</p>
        <form className="sp-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="이름"
            required
            className="sp-input"
          />
          <input
            type="tel"
            name="phone"
            placeholder="연락처 (010-0000-0000)"
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
            placeholder="문의사항"
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
            {formSubmitted ? "✓ 접수 완료되었습니다" : submitting ? "접수 중..." : "상담신청하기"}
          </button>
        </form>
        <div className="sp-tel-guide">
          전화 상담 <a href={`tel:${PHONE}`}>{PHONE}</a>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="sp-footer">
        <p>스마일분양 | Jpex Studio | 대표: 윤지수 | 사업자등록번호: 560-45-01327</p>
        <p>※ 본 홍보물은 소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있습니다.</p>
        <p>&copy; 2026 여의도 더로드캐슬. All rights reserved.</p>
      </footer>

      {/* ── 하단 고정 바 (모바일) ── */}
      <div className="sp-bottom-bar">
        <a href={`tel:${PHONE}`} className="sp-bb-call">📞 전화상담</a>
        <button className="sp-bb-consult" onClick={() => scrollTo("contact")}>상담신청</button>
      </div>
    </div>
  );
}

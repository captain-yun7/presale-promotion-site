"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "./simple.css";

const PHONE = "1666-0952";
const BASE = "/images/seonyu-noblere";

/* ── 평면 타입 (49㎡ 단일 평형, A·B·A1) ── */
const FLOOR_PLANS = [
  {
    type: "A타입",
    area: "전용 49.01㎡ · 26실",
    image: `${BASE}/floorplan/plan-A.jpg`,
  },
  {
    type: "B타입",
    area: "전용 49.01㎡ · 13실",
    image: `${BASE}/floorplan/plan-B.jpg`,
  },
];

/* ── ISO 평면 (3D 등각) ── */
const ISO_PLANS = [
  {
    type: "A타입 (3D)",
    area: "거실·주방 중심형 2룸 구조",
    image: `${BASE}/floorplan-iso/iso-A.jpg`,
  },
  {
    type: "B타입 (3D)",
    area: "코너형 2룸 구조",
    image: `${BASE}/floorplan-iso/iso-B.jpg`,
  },
];

/* ── 실제 모델하우스 갤러리 (베스트 12장) ── */
const GALLERY = [
  { src: `${BASE}/interior/living-07.jpg`, label: "거실 — 한강 채광" },
  { src: `${BASE}/interior/living-01.jpg`, label: "거실 전경" },
  { src: `${BASE}/interior/kitchen-04.jpg`, label: "주방 — 대리석 아일랜드" },
  { src: `${BASE}/interior/kitchen-01.jpg`, label: "주방 — L자 그레이톤" },
  { src: `${BASE}/interior/kitchen-06.jpg`, label: "주방 — 아일랜드 인덕션" },
  { src: `${BASE}/interior/bedroom-01.jpg`, label: "침실 — 드레스룸 일체형" },
  { src: `${BASE}/interior/bedroom-04.jpg`, label: "안방 공간" },
  { src: `${BASE}/interior/bathroom-03.jpg`, label: "욕실 — 레인샤워" },
  { src: `${BASE}/interior/bathroom-01.jpg`, label: "욕실 — 건식 분리" },
  { src: `${BASE}/interior/closet-01.jpg`, label: "현관 수납장" },
  { src: `${BASE}/interior/utility-01.jpg`, label: "다용도 공간" },
  { src: `${BASE}/interior/balcony-01.jpg`, label: "발코니" },
];

/* ── 인근 주요 입주기업 / 지식산업센터 ── */
const COMPANIES = [
  {
    name: "세종앤까뮤스퀘어",
    addr: "양평동6가 4-2",
    info: "2019.05 준공 · B5~12층 · 209실 · 종사자 1,463명",
  },
  {
    name: "투웨니퍼스트",
    addr: "양평동5가 43",
    info: "2020.10 준공 · B3~18층 · 183실 · 종사자 1,281명",
  },
  {
    name: "아이에스비즈타워 2차",
    addr: "양평동4가 80",
    info: "2014.11 준공 · B3~15층 · 238실 · 종사자 1,666명",
  },
  {
    name: "코오롱 디지털타워",
    addr: "양평동5가 106-1",
    info: "2012.03 준공 · B5~14층 · 216실 · 종사자 1,512명",
  },
  {
    name: "아이에스비즈타워 1차",
    addr: "양평동5가 1-1",
    info: "2013.05 준공 · B2~26층 · 210실 · 종사자 1,470명",
  },
  {
    name: "우림라이온스밸리 A·B동",
    addr: "양평동4가 80",
    info: "2009.08 준공 · 205실 · 종사자 1,435명",
  },
];

export default function SeonyuClient() {
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
      {/* ── Header ── */}
      <header className={`sp-header ${headerScrolled ? "scrolled" : ""}`}>
        <button className="sp-logo" onClick={() => scrollTo("hero")}>
          선유노블레르
        </button>
        <nav className="sp-nav">
          <button onClick={() => scrollTo("overview")}>사업개요</button>
          <button onClick={() => scrollTo("points")}>핵심포인트</button>
          <button onClick={() => scrollTo("units")}>평형안내</button>
          <button onClick={() => scrollTo("plans")}>평면도</button>
          <button onClick={() => scrollTo("gallery")}>실내모습</button>
          <button onClick={() => scrollTo("location")}>입지환경</button>
          <button onClick={() => scrollTo("contact")}>상담신청</button>
        </nav>
        <a href={`tel:${PHONE}`} className="sp-header-tel">{PHONE}</a>
      </header>

      {/* ── Hero ── */}
      <section className="sp-hero" id="hero">
        <div className="sp-hero-bg">
          <Image
            src={`${BASE}/exterior/aerial-river.jpg`}
            alt="선유노블레르 한강뷰 조감도"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="sp-hero-dim" />
        </div>
        <div className="sp-hero-content">
          <p className="sp-hero-label">선유도역 도보 5분 · 9호선 초역세권</p>
          <h1 className="sp-hero-title">
            선유노블레르<br />
            <span>한강 생활권 신축 오피스텔</span>
          </h1>
          <p className="sp-hero-sub">
            양화한강공원 · 선유도공원 도보권 · 당산역 환승 3분 · 여의도역 환승 5분
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
        <p className="sp-subtitle">선유도역 9호선 <strong>초역세권 신축 오피스텔</strong></p>
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
              <th>사업명</th><td>선유노블레르 오피스텔</td>
              <th>대지위치</th><td>서울특별시 영등포구 양평동6가 2-1번지</td>
            </tr>
            <tr>
              <th>지역지구</th><td>도시지역, 준공업지역</td>
              <th>건물용도</th><td>오피스텔</td>
            </tr>
            <tr>
              <th>건축규모</th><td>지하 1층 ~ 지상 9층, 2개동</td>
              <th>대지면적</th><td>762.60㎡ (230.68평)</td>
            </tr>
            <tr>
              <th>건축면적</th><td>420.48㎡ (127.19평)</td>
              <th>연면적</th><td>2,968.98㎡ (898.11평)</td>
            </tr>
            <tr>
              <th>건폐율</th><td>55.14 %</td>
              <th>용적률</th><td>358.21 %</td>
            </tr>
            <tr>
              <th>공급규모</th><td>오피스텔 46실 (민간임대 6실 포함)</td>
              <th>주차대수</th><td>37대 (기계식 28 / 자주식 9, SUV 8대 포함)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── 핵심 포인트 ── */}
      <section className="sp-section sp-dark" id="points">
        <h2 className="sp-title">왜 선유노블레르인가</h2>
        <p className="sp-subtitle">한강과 가장 가까운 <strong>9호선 초역세권 신축</strong></p>
        <div className="sp-points">
          <div className="sp-point">
            <div className="sp-point-num">01</div>
            <h3>선유도역 5분</h3>
            <p>9호선 초역세권 도보 5분<br />당산역 3분 · 여의도역 5분 환승</p>
          </div>
          <div className="sp-point">
            <div className="sp-point-num">02</div>
            <h3>한강 생활권</h3>
            <p>양화한강공원 · 선유도공원<br />안양천 산책로 도보 15분</p>
          </div>
          <div className="sp-point">
            <div className="sp-point-num">03</div>
            <h3>직주근접</h3>
            <p>여의도·강남·가산디지털<br />차량 30분 내 주요 도심권</p>
          </div>
          <div className="sp-point">
            <div className="sp-point-num">04</div>
            <h3>1,200개 사업체</h3>
            <p>인근 종사자 약 9,000명<br />롯데홈쇼핑·롯데칠성 등 대기업 인접</p>
          </div>
        </div>
      </section>

      {/* ── 평형 안내 ── */}
      <section className="sp-section" id="units">
        <h2 className="sp-title">평형 안내</h2>
        <p className="sp-subtitle">
          전용 49㎡ <strong>단일 평형 · 투룸 구조</strong> · 총 40실
        </p>
        <div className="sp-type-cards">
          <div className="sp-type-card">
            <span className="tc-tag">A TYPE</span>
            <div className="tc-name">49A</div>
            <div className="tc-area">전용 49.01㎡ (14.83평) · 계약 64.54㎡</div>
            <div className="tc-count"><strong>26실</strong> 공급 · 점유율 65.0%</div>
          </div>
          <div className="sp-type-card">
            <span className="tc-tag">A1 TYPE</span>
            <div className="tc-name">49A1</div>
            <div className="tc-area">전용 49.01㎡ (14.83평) · 계약 64.55㎡</div>
            <div className="tc-count"><strong>1실</strong> 공급 · 점유율 2.5%</div>
          </div>
          <div className="sp-type-card">
            <span className="tc-tag">B TYPE</span>
            <div className="tc-name">49B</div>
            <div className="tc-area">전용 49.01㎡ (14.83평) · 계약 64.54㎡</div>
            <div className="tc-count"><strong>13실</strong> 공급 · 점유율 32.5%</div>
          </div>
        </div>
        <p className="sp-note">※ 민간임대 6실 별도. 정확한 호별 정보는 상담 시 안내드립니다.</p>

        {/* 동호수표 / 층별 배치 */}
        <div className="sp-view-img" style={{ marginTop: 48 }}>
          <Image
            src={`${BASE}/units/unit-floors.jpg`}
            alt="선유노블레르 층별 호수 배치도 — 101동 22실 / 102동 24실"
            width={1040}
            height={760}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <p className="sp-view-caption">층별 호수 배치 · 101동 22실 / 102동 24실</p>
      </section>

      {/* ── 평면도 ── */}
      <section className="sp-section sp-gray" id="plans">
        <h2 className="sp-title">평면도</h2>
        <p className="sp-subtitle">투룸 + 거실 + 주방 + 욕실 + 발코니</p>

        <div className="sp-plans-img-grid">
          {FLOOR_PLANS.map((plan) => (
            <div key={plan.type} className="sp-plan-img-card">
              <div className="pic">
                <Image
                  src={plan.image}
                  alt={`선유노블레르 ${plan.type} 평면도`}
                  width={800}
                  height={550}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="sp-plan-img-label">
                {plan.type}
                <small>{plan.area}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="sp-plans-img-grid" style={{ marginTop: 32 }}>
          {ISO_PLANS.map((plan) => (
            <div key={plan.type} className="sp-plan-img-card">
              <div className="pic">
                <Image
                  src={plan.image}
                  alt={`선유노블레르 ${plan.type} 3D 평면`}
                  width={800}
                  height={550}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="sp-plan-img-label">
                {plan.type}
                <small>{plan.area}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 실내 갤러리 ── */}
      <section className="sp-section" id="gallery">
        <h2 className="sp-title">실내 모습</h2>
        <p className="sp-subtitle">준공된 <strong>실제 호실 사진</strong>입니다</p>
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

      {/* ── 입지환경 ── */}
      <section className="sp-section sp-gray" id="location">
        <h2 className="sp-title">입지 환경</h2>
        <p className="sp-subtitle">
          서울특별시 영등포구 양평동6가 2-1 (<strong>선유도역 도보 5분</strong>)
        </p>

        <div className="sp-location-map-img">
          <Image
            src={`${BASE}/location/map-naver.jpg`}
            alt="선유노블레르 입지환경 지도 — 선유도역 9호선"
            width={1200}
            height={1100}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="sp-location-info">
          <div className="sp-loc-item">
            <strong>🚇 지하철</strong>
            <span>9호선 선유도역 도보 5분 · 2호선 당산역 환승 3분 · 5호선 여의도역 5분</span>
          </div>
          <div className="sp-loc-item">
            <strong>🚗 도로</strong>
            <span>올림픽대로 · 서부간선도로 · 경인고속도로 직결 (강남·김포·용산·가산 30분)</span>
          </div>
          <div className="sp-loc-item">
            <strong>🌊 한강·공원</strong>
            <span>양화한강공원·선유도공원·안양천 산책로 도보 15분</span>
          </div>
          <div className="sp-loc-item">
            <strong>🏥 의료</strong>
            <span>이대목동병원 · 한림대 한강성심병원 · 카톨릭대 여의도성심병원</span>
          </div>
          <div className="sp-loc-item">
            <strong>🛍️ 쇼핑</strong>
            <span>현대백화점·더현대·코스트코·롯데마트·킴스클럽</span>
          </div>
          <div className="sp-loc-item">
            <strong>🏫 교육</strong>
            <span>선유초/선유중/선유고 · 당산초 · 한가람고 · 한강미디어고</span>
          </div>
        </div>
      </section>

      {/* ── 인근 입주기업 ── */}
      <section className="sp-section" id="companies">
        <h2 className="sp-title">인근 주요 기업</h2>
        <p className="sp-subtitle">
          반경 내 약 <strong>1,200개 사업체 · 종사자 9,000명</strong>의 풍부한 임대 수요
        </p>
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
          ※ 예상 종사자 수는 점포수 × 7명 기준 산정. 출처: 사업지 인근 지식산업센터 현황.
        </p>
      </section>

      {/* ── 상담신청 ── */}
      <section className="sp-section sp-dark" id="contact">
        <h2 className="sp-title">상담신청</h2>
        <p className="sp-subtitle">스마일분양 전문 상담사가 <strong>1:1 맞춤 상담</strong>해드립니다</p>
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
        <p>※ 본 홍보물은 소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있으며,</p>
        <p>개발계획·치수·이미지·내용 등은 향후 변경될 수 있으니 참고자료로 활용하시기 바랍니다.</p>
        <p>&copy; 2026 선유노블레르. All rights reserved.</p>
      </footer>

      {/* ── 하단 고정 바 (모바일) ── */}
      <div className="sp-bottom-bar">
        <a href={`tel:${PHONE}`} className="sp-bb-call">📞 전화상담</a>
        <button className="sp-bb-consult" onClick={() => scrollTo("contact")}>상담신청</button>
      </div>
    </div>
  );
}

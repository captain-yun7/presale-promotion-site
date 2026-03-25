import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const projects = [
    {
      slug: "yeomchang-thechaeum",
      name: "염창역 더채움",
      location: "서울시 강서구 염창동",
      description: "9호선 급행 초역세권, 투룸값에 쓰리룸 특가",
      status: "분양중",
      image: "/ref_data/image-00.jpg",
      highlight: "9호선 급행",
      tags: ["초역세권", "쓰리룸", "특가분양"],
    },
    {
      slug: "haven-residence",
      name: "HAVEN RÉSIDENCE",
      location: "서울시 노원구 공릉동",
      description: "49층 768세대, 프리미엄 웰니스 레지던스",
      status: "관심고객 등록중",
      image: "",
      highlight: "49층 랜드마크",
      tags: ["프리미엄", "웰니스", "대단지"],
    },
    {
      slug: "yeouido-the-road-castle",
      name: "여의도 더로드캐슬",
      location: "서울시 영등포구 대방동",
      description: "대방역 2분 더블역세권, 7년전 분양가 신축 2룸. 선착순 6세대",
      status: "특별분양중",
      image: "/images/yeouido-the-road-castle/exterior/aerial-02.png",
      highlight: "선착순 6세대",
      tags: ["더블역세권", "즉시입주", "7년전분양가"],
    },
  ];

  const stats = [
    { num: "3+", label: "프로젝트" },
    { num: "1,200+", label: "세대 규모" },
    { num: "98%", label: "고객 만족도" },
    { num: "24H", label: "상담 응대" },
  ];

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-bg">
          <div className="home-hero-gradient" />
          <div className="home-hero-pattern" />
        </div>
        <div className="home-hero-content">
          <div className="home-hero-badge">Premium Real Estate Platform</div>
          <h1 className="home-hero-title">
            서울 핵심 입지<br />
            <span className="home-hero-accent">프리미엄 분양</span> 정보
          </h1>
          <p className="home-hero-sub">
            엄선된 분양 프로젝트를 한눈에 비교하고,<br />
            전문 상담사의 1:1 맞춤 상담을 받아보세요.
          </p>
          <div className="home-hero-actions">
            <a href="#projects" className="home-btn home-btn-primary">
              프로젝트 둘러보기
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="tel:1666-0952" className="home-btn home-btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.876.37 1.84.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.97.33 1.934.57 2.81.7A2 2 0 0122 16.92z" /></svg>
              1666-0952
            </a>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="home-stats-bar">
          {stats.map((s) => (
            <div key={s.label} className="home-stat-item">
              <div className="home-stat-num">{s.num}</div>
              <div className="home-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="home-projects" id="projects">
        <div className="home-container">
          <div className="home-section-header">
            <span className="home-section-label">Our Projects</span>
            <h2 className="home-section-title">진행 중인 프로젝트</h2>
            <p className="home-section-desc">서울 핵심 입지의 엄선된 분양 프로젝트를 확인하세요</p>
          </div>

          <div className="home-project-grid">
            {projects.map((project, idx) => (
              <Link
                key={project.slug}
                href={`/${project.slug}`}
                className="home-project-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Image */}
                <div className="home-card-image">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="home-card-placeholder">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="8" y="12" width="14" height="24" rx="1" />
                        <rect x="26" y="6" width="14" height="30" rx="1" />
                        <line x1="4" y1="36" x2="44" y2="36" />
                      </svg>
                    </div>
                  )}
                  <div className="home-card-overlay" />
                  <div className="home-card-badges">
                    <span className="home-card-status">{project.status}</span>
                    {project.highlight && (
                      <span className="home-card-highlight">{project.highlight}</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="home-card-content">
                  <div className="home-card-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {project.location}
                  </div>
                  <h3 className="home-card-name">{project.name}</h3>
                  <p className="home-card-desc">{project.description}</p>
                  <div className="home-card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="home-card-tag">#{tag}</span>
                    ))}
                  </div>
                  <div className="home-card-cta">
                    자세히 보기
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="home-why">
        <div className="home-container">
          <div className="home-section-header">
            <span className="home-section-label">Why Choose Us</span>
            <h2 className="home-section-title">왜 저희를 선택해야 할까요?</h2>
          </div>
          <div className="home-why-grid">
            <div className="home-why-card">
              <div className="home-why-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>검증된 프로젝트</h3>
              <p>철저한 검증을 거친 우수 분양 프로젝트만 엄선하여 소개합니다</p>
            </div>
            <div className="home-why-card">
              <div className="home-why-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h3>1:1 전문 상담</h3>
              <p>경험 풍부한 전문 상담사가 고객 맞춤형 분양 컨설팅을 제공합니다</p>
            </div>
            <div className="home-why-card">
              <div className="home-why-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>빠른 정보 제공</h3>
              <p>최신 분양 정보와 시장 동향을 실시간으로 업데이트합니다</p>
            </div>
            <div className="home-why-card">
              <div className="home-why-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <h3>맞춤 자금 설계</h3>
              <p>대출, 자금 계획까지 원스톱으로 안내해드립니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta-section">
        <div className="home-container">
          <div className="home-cta-content">
            <h2>지금 바로 상담받으세요</h2>
            <p>전문 상담사가 최적의 분양 정보를 안내해드립니다</p>
            <div className="home-cta-actions">
              <a href="tel:1666-0952" className="home-btn home-btn-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.876.37 1.84.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.97.33 1.934.57 2.81.7A2 2 0 0122 16.92z" /></svg>
                1666-0952
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-container">
          <div className="home-footer-content">
            <p className="home-footer-company">
              Jpex Studio | 대표: 윤지수 | 사업자등록번호: 560-45-01327 | 문의: 1666-0952
            </p>
            <p className="home-footer-disclaimer">
              ※ 본 홍보물은 소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있으며,
              사업계획승인 변경 및 신고 등에 따라 변경될 수 있습니다.
            </p>
            <p className="home-footer-copy">&copy; 2026 Jpex Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

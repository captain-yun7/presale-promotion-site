"use client";

export default function ComplexInfo() {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          <path d="M4 12h16M12 2v20"/>
        </svg>
      ),
      title: "9호선 급행 초역세권",
      description: "염창역 도보 3분, 한강벨트라인 황금노선 접근성",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
      ),
      title: "전 세대 먹방 없이 시원한 뷰",
      description: "막힘없는 전호실 일조량 GOOD, 탁 트인 조망",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
        </svg>
      ),
      title: "의료 인프라 대한민국 2위",
      description: "인근 대학병원 3개, 의료시설 밀집 지역",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
        </svg>
      ),
      title: "제2의 목동 학군",
      description: "목동에 뒤쳐지지 않는 우수한 교육 환경",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: "삼성 비스포크 + 현대 리바트 풀옵션",
      description: "프리미엄 가전·가구 완비, 입주 즉시 생활 가능",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm7 16h-2v-6H7v6H5v-8.5l7-6.3 7 6.3V19z"/>
        </svg>
      ),
      title: "염창&가양 개발 호재",
      description: "사업비 4조 규모 업무시설 착공 (코엑스 약 2배 규모)",
    },
  ];

  const complexData = [
    { label: "위치", value: "서울특별시 강서구 염창동" },
    { label: "브랜드", value: "더채움 (4번째 성공 신화)" },
    { label: "타입", value: "쓰리룸 아파텔" },
    { label: "주차", value: "1:1 주차 가능" },
  ];

  return (
    <section id="complex-info" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-secondary text-lg mb-3 font-medium">Complex Information</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            단지 정보
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            프리미엄 라이프스타일을 위한 완벽한 주거 환경을 제공합니다
          </p>
        </div>

        {/* Complex Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complexData.map((item, index) => (
              <div key={index} className="text-center md:text-left">
                <p className="text-gray-500 text-sm mb-2">{item.label}</p>
                <p className="text-primary font-bold text-xl">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-luxury-gold mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Story */}
        <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              4無의 자유로움
            </h3>
            <p className="text-lg leading-relaxed mb-8 text-gray-100">
              주택수 無 · 자금조달 無 · 대출규제 無 · 실거주의무 無<br />
              실거주자와 투자자 모두에게 열린 기회, 마곡·여의도·마포·DMC 수요 흡수와 더불어
              염창&가양 대규모 업무시설 착공으로 가치 상승이 기대되는 프리미엄 아파텔입니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["주택수 無", "자금조달 無", "대출규제 無", "실거주의무 無"].map((item, i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl py-3 px-4 font-bold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

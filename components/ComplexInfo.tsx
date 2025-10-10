"use client";

export default function ComplexInfo() {
  const features = [
    {
      icon: "🏢",
      title: "프리미엄 브랜드",
      description: "대한민국 최고의 건설사가 만드는 명품 주거공간",
    },
    {
      icon: "🚇",
      title: "역세권 입지",
      description: "지하철역 도보 3분, 완벽한 교통 인프라",
    },
    {
      icon: "🌳",
      title: "쾌적한 환경",
      description: "대규모 공원과 녹지를 품은 친환경 단지",
    },
    {
      icon: "🏫",
      title: "교육 인프라",
      description: "우수한 학군과 다양한 교육 시설",
    },
    {
      icon: "🛍️",
      title: "편의 시설",
      description: "대형 쇼핑몰, 백화점이 가까운 생활 중심지",
    },
    {
      icon: "💡",
      title: "스마트 시스템",
      description: "IoT 기반 최첨단 홈 네트워크",
    },
  ];

  const complexData = [
    { label: "위치", value: "서울특별시 강남구 테헤란로" },
    { label: "규모", value: "지하 3층 ~ 지상 35층, 10개동" },
    { label: "세대수", value: "총 1,200세대" },
    { label: "입주 예정", value: "2026년 12월" },
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
              <div className="text-5xl mb-4">{feature.icon}</div>
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
              프리미엄 라이프스타일 플랫폼
            </h3>
            <p className="text-lg leading-relaxed mb-8 text-gray-100">
              단순한 주거 공간을 넘어 삶의 가치를 높이는 라이프스타일 플랫폼을 제공합니다.
              최고급 커뮤니티 시설, 스마트 홈 시스템, 프리미엄 서비스가 어우러진
              새로운 주거 문화를 경험하세요.
            </p>
            <button className="bg-secondary hover:bg-white hover:text-primary text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
              브랜드 스토리 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function Home() {
  const projects = [
    {
      slug: "yeomchang-thechaeum",
      name: "염창역 더채움",
      location: "서울시 강서구 염창동",
      description: "9호선 급행 초역세권, 투룸값에 쓰리룸 특가",
      status: "분양중",
      image: "/ref_data/image-00.jpg",
    },
    // 추후 프로젝트 추가 예정
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-luxury-charcoal via-gray-800 to-luxury-charcoal text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            분양 정보 플랫폼
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            최신 분양 정보를 한눈에 확인하세요
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/${project.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-luxury-gold text-luxury-charcoal px-4 py-2 rounded-full text-sm font-bold">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    프로젝트 이미지
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-luxury-charcoal mb-2 group-hover:text-luxury-gold transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-luxury-gold"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {project.location}
                  </p>
                  <p className="text-gray-700 mb-6">{project.description}</p>
                  <div className="flex items-center text-luxury-gold font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span>자세히 보기</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white rounded-2xl p-12 shadow-lg">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-luxury-charcoal mb-2">
                더 많은 프로젝트 준비중
              </h3>
              <p className="text-gray-600">
                곧 다양한 분양 정보를 만나보실 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

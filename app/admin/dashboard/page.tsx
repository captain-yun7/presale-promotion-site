"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Consultation {
  id: string;
  name: string;
  phone: string;
  message?: string;
  source: string;
  project: string;
  created_at: string;
}

interface Stats {
  totalCount: number;
  todayCount: number;
  sourceCounts: Record<string, number>;
  projectCounts: Record<string, number>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");

  // 통계 데이터 로드
  useEffect(() => {
    fetch("/api/admin/consultations/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats error:", err));
  }, []);

  // 상담 목록 로드
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "50",
      ...(search && { search }),
      ...(sourceFilter && { source: sourceFilter }),
      ...(projectFilter && { project: projectFilter }),
    });

    fetch(`/api/admin/consultations?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setConsultations(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading consultations:", err);
        setLoading(false);
      });
  }, [page, search, sourceFilter, projectFilter]);

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  const exportToCSV = () => {
    const csv = [
      ["번호", "이름", "전화번호", "문의내용", "분양출처", "유입 경로", "신청일시"],
      ...consultations.map((item, index) => [
        index + 1,
        item.name,
        item.phone,
        item.message || '-',
        item.project || '염창역더채움',
        item.source,
        new Date(item.created_at).toLocaleString("ko-KR"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `consultations_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">관리자 대시보드</h1>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">전체 상담 신청</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCount}건</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">오늘 상담 신청</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.todayCount}건</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">분양출처별 통계</h3>
              <div className="text-sm space-y-1 mt-2">
                {Object.entries(stats.projectCounts || {}).map(([project, count]) => (
                  <div key={project} className="flex justify-between">
                    <span className="text-gray-600">{project}:</span>
                    <span className="font-semibold">{count}건</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">유입 경로별 통계</h3>
              <div className="text-sm space-y-1 mt-2">
                {Object.entries(stats.sourceCounts).map(([source, count]) => (
                  <div key={source} className="flex justify-between">
                    <span className="text-gray-600">{source}:</span>
                    <span className="font-semibold">{count}건</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="이름 또는 전화번호 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">모든 분양출처</option>
              <option value="염창역더채움">염창역더채움</option>
            </select>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">모든 유입 경로</option>
              <option value="daangn">당근</option>
              <option value="naver">네이버</option>
              <option value="kakao">카카오</option>
              <option value="website">직접 방문</option>
              <option value="landing-page">랜딩페이지</option>
              <option value="플로팅폼">플로팅폼</option>
            </select>
            <button
              onClick={exportToCSV}
              className="px-3 sm:px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              📥 CSV 다운로드
            </button>
          </div>
        </div>

        {/* 상담 목록 - 데스크톱 테이블 */}
        <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  전화번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  문의내용
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  분양출처
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  유입 경로
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  신청일시
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    로딩 중...
                  </td>
                </tr>
              ) : consultations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                consultations.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(page - 1) * 50 + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      <div className="line-clamp-2" title={item.message || '-'}>
                        {item.message || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {item.project || '염창역더채움'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {item.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(item.created_at).toLocaleString("ko-KR")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>

        {/* 상담 목록 - 모바일 카드 */}
        <div className="lg:hidden space-y-4">
          {loading ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              로딩 중...
            </div>
          ) : consultations.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              데이터가 없습니다.
            </div>
          ) : (
            consultations.map((item, index) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500">
                      #{(page - 1) * 50 + index + 1}
                    </span>
                    <span className="text-base font-bold text-gray-900">{item.name}</span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    {item.project || '염창역더채움'}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-16">전화:</span>
                    <a href={`tel:${item.phone}`} className="text-blue-600 font-medium">
                      {item.phone}
                    </a>
                  </div>

                  {item.message && (
                    <div className="flex gap-2">
                      <span className="text-gray-500 w-16 flex-shrink-0">문의:</span>
                      <p className="text-gray-700 break-words">{item.message}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-16">경로:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {item.source}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-16">일시:</span>
                    <span className="text-gray-600 text-xs">
                      {new Date(item.created_at).toLocaleString("ko-KR")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-6">
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  이전
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  다음
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    페이지 <span className="font-medium">{page}</span> /{" "}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      이전
                    </button>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      다음
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

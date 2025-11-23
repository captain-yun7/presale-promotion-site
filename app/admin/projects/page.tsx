"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Project {
  id: string;
  slug: string;
  name: string;
  status: "draft" | "published" | "archived";
  address?: string;
  total_units?: number;
  created_at: string;
  template?: {
    id: string;
    name: string;
  };
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchProjects();
  }, [page, statusFilter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(statusFilter && { status: statusFilter }),
      });

      const res = await fetch(`/api/admin/projects?${params}`);
      const data = await res.json();

      setProjects(data.projects || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" 프로젝트를 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchProjects();
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: "bg-yellow-100 text-yellow-800",
      published: "bg-green-100 text-green-800",
      archived: "bg-gray-100 text-gray-800",
    };
    const labels = {
      draft: "초안",
      published: "게시됨",
      archived: "보관됨",
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700">
              ← 대시보드
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">프로젝트 관리</h1>
          </div>
          <Link
            href="/admin/projects/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + 새 프로젝트
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">모든 상태</option>
            <option value="draft">초안</option>
            <option value="published">게시됨</option>
            <option value="archived">보관됨</option>
          </select>
        </div>

        {/* Project List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">로딩 중...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">프로젝트가 없습니다.</p>
            <Link
              href="/admin/projects/new"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800"
            >
              첫 번째 프로젝트 만들기
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    프로젝트
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    생성일
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        {project.address && (
                          <div className="text-sm text-gray-500">{project.address}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={project.status}
                        onChange={(e) => handleStatusChange(project.id, e.target.value)}
                        className="text-xs border rounded px-2 py-1"
                      >
                        <option value="draft">초안</option>
                        <option value="published">게시됨</option>
                        <option value="archived">보관됨</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <a
                        href={`/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        /{project.slug}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(project.created_at).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        편집
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id, project.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              이전
            </button>
            <span className="px-3 py-1">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              다음
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

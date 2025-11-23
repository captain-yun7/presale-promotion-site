"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  description?: string;
  is_default: boolean;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    template_id: "",
    address: "",
    phone: "",
    email: "",
    total_units: "",
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/admin/templates");
      const data = await res.json();
      setTemplates(data.templates || []);

      // 기본 템플릿 선택
      const defaultTemplate = data.templates?.find((t: Template) => t.is_default);
      if (defaultTemplate) {
        setFormData((prev) => ({ ...prev, template_id: defaultTemplate.id }));
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleNameChange = (name: string) => {
    // 이름에서 자동으로 slug 생성
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          total_units: formData.total_units ? parseInt(formData.total_units) : null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/admin/projects/${data.project.id}/edit`);
      } else {
        alert(data.error || "프로젝트 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("프로젝트 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/projects" className="text-gray-500 hover:text-gray-700">
              ← 프로젝트 목록
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">새 프로젝트</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
          {/* 템플릿 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              템플릿 선택
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {templates.map((template) => (
                <label
                  key={template.id}
                  className={`
                    relative flex cursor-pointer rounded-lg border p-4 focus:outline-none
                    ${formData.template_id === template.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="template"
                    value={template.id}
                    checked={formData.template_id === template.id}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, template_id: e.target.value }))
                    }
                    className="sr-only"
                  />
                  <div>
                    <span className="block text-sm font-medium text-gray-900">
                      {template.name}
                      {template.is_default && (
                        <span className="ml-2 text-xs text-blue-600">(기본)</span>
                      )}
                    </span>
                    {template.description && (
                      <span className="block text-xs text-gray-500 mt-1">
                        {template.description}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">기본 정보</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                프로젝트 이름 *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="예: 염창역 더채움"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL 슬러그 *
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">/</span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="yeomchang-thechaeum"
                  className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                영문, 숫자, 하이픈만 사용 가능합니다.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="서울시 양천구 신정동 일대"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  대표 전화번호
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="1533-8848"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  총 세대수
                </label>
                <input
                  type="number"
                  value={formData.total_units}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, total_units: e.target.value }))
                  }
                  placeholder="158"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="info@example.com"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Link
              href="/admin/projects"
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "생성 중..." : "프로젝트 생성"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

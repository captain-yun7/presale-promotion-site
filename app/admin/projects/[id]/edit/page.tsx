"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Project {
  id: string;
  slug: string;
  name: string;
  status: string;
  address?: string;
  phone?: string;
  email?: string;
  total_units?: number;
  sale_start_date?: string;
  sale_end_date?: string;
  move_in_date?: string;
  settings: {
    showFloatingCTA: boolean;
    showSocialProof: boolean;
    showUrgencyBanner: boolean;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  meta_title?: string;
  meta_description?: string;
  contents?: Array<{
    section_type: string;
    content: Record<string, unknown>;
    is_enabled: boolean;
  }>;
  units?: Array<{
    id: string;
    name: string;
    area_exclusive?: number;
    area_supply?: number;
    rooms?: number;
    bathrooms?: number;
    price_min?: number;
    price_max?: number;
  }>;
}

const TABS = [
  { id: "basic", label: "기본 정보" },
  { id: "hero", label: "히어로" },
  { id: "units", label: "세대 타입" },
  { id: "location", label: "위치" },
  { id: "schedule", label: "일정" },
  { id: "qna", label: "QnA" },
  { id: "settings", label: "설정" },
];

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`);
      const data = await res.json();

      if (res.ok) {
        setProject(data.project);
      } else {
        alert("프로젝트를 찾을 수 없습니다.");
        router.push("/admin/projects");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async (updates: Partial<Project>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const data = await res.json();
        setProject((prev) => (prev ? { ...prev, ...data.project } : null));
      } else {
        const data = await res.json();
        alert(data.error || "저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const saveContent = async (sectionType: string, content: Record<string, unknown>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/projects/${id}/contents`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section_type: sectionType, content }),
      });

      if (res.ok) {
        fetchProject(); // Refresh to get updated contents
      } else {
        alert("콘텐츠 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) return null;

  const getContentByType = (type: string) => {
    return project.contents?.find((c) => c.section_type === type)?.content || {};
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/projects" className="text-gray-500 hover:text-gray-700">
                ← 목록
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                {project.name}
              </h1>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  project.status === "published"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {project.status === "published" ? "게시됨" : "초안"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`/${project.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                미리보기 →
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex gap-1 overflow-x-auto" aria-label="Tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2
                    ${activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {saving && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
            저장 중...
          </div>
        )}

        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <BasicInfoTab project={project} onSave={saveProject} />
        )}

        {/* Hero Tab */}
        {activeTab === "hero" && (
          <HeroTab
            content={getContentByType("hero")}
            onSave={(content) => saveContent("hero", content)}
          />
        )}

        {/* Units Tab */}
        {activeTab === "units" && (
          <UnitsTab projectId={id} units={project.units || []} onRefresh={fetchProject} />
        )}

        {/* Location Tab */}
        {activeTab === "location" && (
          <LocationTab
            content={getContentByType("location")}
            onSave={(content) => saveContent("location", content)}
          />
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <ScheduleTab
            content={getContentByType("schedule")}
            onSave={(content) => saveContent("schedule", content)}
          />
        )}

        {/* QnA Tab */}
        {activeTab === "qna" && (
          <QnATab
            content={getContentByType("qna")}
            onSave={(content) => saveContent("qna", content)}
          />
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <SettingsTab project={project} onSave={saveProject} />
        )}
      </main>
    </div>
  );
}

// 기본 정보 탭
function BasicInfoTab({
  project,
  onSave,
}: {
  project: Project;
  onSave: (updates: Partial<Project>) => void;
}) {
  const [formData, setFormData] = useState({
    name: project.name,
    slug: project.slug,
    address: project.address || "",
    phone: project.phone || "",
    email: project.email || "",
    total_units: project.total_units?.toString() || "",
    sale_start_date: project.sale_start_date || "",
    move_in_date: project.move_in_date || "",
    meta_title: project.meta_title || "",
    meta_description: project.meta_description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      total_units: formData.total_units ? parseInt(formData.total_units) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            프로젝트 이름
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL 슬러그
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">총 세대수</label>
          <input
            type="number"
            value={formData.total_units}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, total_units: e.target.value }))
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            분양 시작일
          </label>
          <input
            type="date"
            value={formData.sale_start_date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, sale_start_date: e.target.value }))
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            입주 예정일
          </label>
          <input
            type="date"
            value={formData.move_in_date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, move_in_date: e.target.value }))
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-4">SEO 설정</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              메타 타이틀
            </label>
            <input
              type="text"
              value={formData.meta_title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, meta_title: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              메타 설명
            </label>
            <textarea
              value={formData.meta_description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, meta_description: e.target.value }))
              }
              rows={3}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </form>
  );
}

// 히어로 탭
function HeroTab({
  content,
  onSave,
}: {
  content: Record<string, unknown>;
  onSave: (content: Record<string, unknown>) => void;
}) {
  const [formData, setFormData] = useState({
    title: (content.title as string) || "",
    subtitle: (content.subtitle as string) || "",
    description: (content.description as string) || "",
    ctaText: (content.ctaText as string) || "무료 상담 신청",
    ctaLink: (content.ctaLink as string) || "#contact",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">부제목</label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={3}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTA 버튼 텍스트
          </label>
          <input
            type="text"
            value={formData.ctaText}
            onChange={(e) => setFormData((prev) => ({ ...prev, ctaText: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CTA 버튼 링크
          </label>
          <input
            type="text"
            value={formData.ctaLink}
            onChange={(e) => setFormData((prev) => ({ ...prev, ctaLink: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </form>
  );
}

// 세대 타입 탭 (간단 버전)
function UnitsTab({
  projectId,
  units,
  onRefresh,
}: {
  projectId: string;
  units: Array<{
    id: string;
    name: string;
    area_exclusive?: number;
    area_supply?: number;
    price_min?: number;
    price_max?: number;
  }>;
  onRefresh: () => void;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">세대 타입 목록</h3>
      {units.length === 0 ? (
        <p className="text-gray-500">등록된 세대 타입이 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {units.map((unit) => (
            <div key={unit.id} className="flex justify-between items-center p-3 border rounded">
              <div>
                <span className="font-medium">{unit.name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {unit.area_exclusive}㎡ / {unit.area_supply}㎡
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {unit.price_min && unit.price_max
                  ? `${(unit.price_min / 100000000).toFixed(1)}억 ~ ${(unit.price_max / 100000000).toFixed(1)}억`
                  : "-"}
              </span>
            </div>
          ))}
        </div>
      )}
      <p className="text-sm text-gray-500 mt-4">
        * 세대 타입 상세 편집 기능은 추후 추가 예정입니다.
      </p>
    </div>
  );
}

// 위치 탭
function LocationTab({
  content,
  onSave,
}: {
  content: Record<string, unknown>;
  onSave: (content: Record<string, unknown>) => void;
}) {
  const [formData, setFormData] = useState({
    title: (content.title as string) || "프리미엄 입지",
    address: (content.address as string) || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">섹션 제목</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <p className="text-sm text-gray-500">
        * 교통정보, 주변시설 등 상세 편집 기능은 추후 추가 예정입니다.
      </p>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </form>
  );
}

// 일정 탭
function ScheduleTab({
  content,
  onSave,
}: {
  content: Record<string, unknown>;
  onSave: (content: Record<string, unknown>) => void;
}) {
  const [formData, setFormData] = useState({
    title: (content.title as string) || "분양 일정",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">섹션 제목</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <p className="text-sm text-gray-500">
        * 일정 항목 편집 기능은 추후 추가 예정입니다.
      </p>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </form>
  );
}

// QnA 탭
function QnATab({
  content,
  onSave,
}: {
  content: Record<string, unknown>;
  onSave: (content: Record<string, unknown>) => void;
}) {
  const [formData, setFormData] = useState({
    title: (content.title as string) || "자주 묻는 질문",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">섹션 제목</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <p className="text-sm text-gray-500">
        * FAQ 항목 편집 기능은 추후 추가 예정입니다.
      </p>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </form>
  );
}

// 설정 탭
function SettingsTab({
  project,
  onSave,
}: {
  project: Project;
  onSave: (updates: Partial<Project>) => void;
}) {
  const [formData, setFormData] = useState({
    status: project.status,
    settings: { ...project.settings },
    theme: { ...project.theme },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="draft">초안</option>
          <option value="published">게시됨</option>
          <option value="archived">보관됨</option>
        </select>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-4">기능 설정</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.settings.showFloatingCTA}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  settings: { ...prev.settings, showFloatingCTA: e.target.checked },
                }))
              }
              className="mr-2"
            />
            플로팅 CTA 버튼 표시
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.settings.showSocialProof}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  settings: { ...prev.settings, showSocialProof: e.target.checked },
                }))
              }
              className="mr-2"
            />
            소셜 프루프 알림 표시
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.settings.showUrgencyBanner}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  settings: { ...prev.settings, showUrgencyBanner: e.target.checked },
                }))
              }
              className="mr-2"
            />
            긴급 배너 표시
          </label>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-4">테마 설정</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              메인 색상
            </label>
            <input
              type="color"
              value={formData.theme.primaryColor}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  theme: { ...prev.theme, primaryColor: e.target.value },
                }))
              }
              className="w-full h-10 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              보조 색상
            </label>
            <input
              type="color"
              value={formData.theme.secondaryColor}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  theme: { ...prev.theme, secondaryColor: e.target.value },
                }))
              }
              className="w-full h-10 border rounded"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </form>
  );
}

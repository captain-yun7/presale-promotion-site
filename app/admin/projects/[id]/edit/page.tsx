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
  const [saveSuccess, setSaveSuccess] = useState(false);
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
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const data = await res.json();
        setProject((prev) => (prev ? { ...prev, ...data.project } : null));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
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
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/admin/projects/${id}/contents`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section_type: sectionType, content }),
      });

      if (res.ok) {
        fetchProject(); // Refresh to get updated contents
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("콘텐츠 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("저장 중 오류가 발생했습니다.");
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
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            저장 중...
          </div>
        )}
        {saveSuccess && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            저장 완료!
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
    status: project.status || "draft",
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            상태
          </label>
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

// 히어로 탭 - 슬라이드 편집 포함
interface SlideData {
  image: string;
  tag: string;
  title: string;
  subtitleLines: string[];
}

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
    badges: (content.badges as string[]) || [],
    slides: (content.slides as SlideData[]) || [],
  });

  const [newBadge, setNewBadge] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // 뱃지 관리
  const addBadge = () => {
    if (newBadge.trim()) {
      setFormData(prev => ({
        ...prev,
        badges: [...prev.badges, newBadge.trim()]
      }));
      setNewBadge("");
    }
  };

  const removeBadge = (index: number) => {
    setFormData(prev => ({
      ...prev,
      badges: prev.badges.filter((_, i) => i !== index)
    }));
  };

  // 슬라이드 관리
  const addSlide = () => {
    setFormData(prev => ({
      ...prev,
      slides: [...prev.slides, {
        image: "/images/hero-bg.jpg",
        tag: "새 슬라이드",
        title: "제목",
        subtitleLines: ["설명 라인"]
      }]
    }));
  };

  const removeSlide = (index: number) => {
    setFormData(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index)
    }));
  };

  const updateSlide = (index: number, field: keyof SlideData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      slides: prev.slides.map((slide, i) =>
        i === index ? { ...slide, [field]: value } : slide
      )
    }));
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.slides.length) return;

    const newSlides = [...formData.slides];
    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    setFormData(prev => ({ ...prev, slides: newSlides }));
  };

  // subtitleLines 관리
  const addSubtitleLine = (slideIndex: number) => {
    const newSlides = [...formData.slides];
    newSlides[slideIndex].subtitleLines.push("");
    setFormData(prev => ({ ...prev, slides: newSlides }));
  };

  const removeSubtitleLine = (slideIndex: number, lineIndex: number) => {
    const newSlides = [...formData.slides];
    newSlides[slideIndex].subtitleLines = newSlides[slideIndex].subtitleLines.filter((_, i) => i !== lineIndex);
    setFormData(prev => ({ ...prev, slides: newSlides }));
  };

  const updateSubtitleLine = (slideIndex: number, lineIndex: number, value: string) => {
    const newSlides = [...formData.slides];
    newSlides[slideIndex].subtitleLines[lineIndex] = value;
    setFormData(prev => ({ ...prev, slides: newSlides }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 기본 정보 */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">기본 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기본 제목</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="슬라이드가 없을 때 표시"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기본 부제목</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CTA 버튼 텍스트</label>
          <input
            type="text"
            value={formData.ctaText}
            onChange={(e) => setFormData((prev) => ({ ...prev, ctaText: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* 뱃지 */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">뱃지</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.badges.map((badge, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {badge}
              <button type="button" onClick={() => removeBadge(index)} className="text-blue-600 hover:text-blue-800">
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newBadge}
            onChange={(e) => setNewBadge(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBadge())}
            placeholder="새 뱃지 추가"
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button type="button" onClick={addBadge} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            추가
          </button>
        </div>
      </div>

      {/* 슬라이드 */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-medium">슬라이드 ({formData.slides.length}개)</h3>
          <button type="button" onClick={addSlide} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            + 슬라이드 추가
          </button>
        </div>

        {formData.slides.length === 0 ? (
          <p className="text-gray-500 text-center py-8">슬라이드가 없습니다. 기본 정보가 표시됩니다.</p>
        ) : (
          <div className="space-y-4">
            {formData.slides.map((slide, slideIndex) => (
              <div key={slideIndex} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-medium text-sm text-gray-600">슬라이드 {slideIndex + 1}</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveSlide(slideIndex, 'up')}
                      disabled={slideIndex === 0}
                      className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSlide(slideIndex, 'down')}
                      disabled={slideIndex === formData.slides.length - 1}
                      className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSlide(slideIndex)}
                      className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">이미지 경로</label>
                    <input
                      type="text"
                      value={slide.image}
                      onChange={(e) => updateSlide(slideIndex, 'image', e.target.value)}
                      className="w-full border rounded px-2 py-1.5 text-sm"
                      placeholder="/images/hero-bg.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">태그</label>
                    <input
                      type="text"
                      value={slide.tag}
                      onChange={(e) => updateSlide(slideIndex, 'tag', e.target.value)}
                      className="w-full border rounded px-2 py-1.5 text-sm"
                      placeholder="투룸값에 쓰리룸 산다!"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">타이틀</label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => updateSlide(slideIndex, 'title', e.target.value)}
                    className="w-full border rounded px-2 py-1.5 text-sm"
                    placeholder="염창역 더채움"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-gray-600">설명 라인</label>
                    <button
                      type="button"
                      onClick={() => addSubtitleLine(slideIndex)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      + 라인 추가
                    </button>
                  </div>
                  <div className="space-y-2">
                    {slide.subtitleLines.map((line, lineIndex) => (
                      <div key={lineIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => updateSubtitleLine(slideIndex, lineIndex, e.target.value)}
                          className="flex-1 border rounded px-2 py-1.5 text-sm"
                          placeholder="&lt;highlight&gt;강조&lt;/highlight&gt; 태그 사용 가능"
                        />
                        <button
                          type="button"
                          onClick={() => removeSubtitleLine(slideIndex, lineIndex)}
                          className="px-2 text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    * &lt;highlight&gt;텍스트&lt;/highlight&gt;로 골드색 강조
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
interface TransportItem {
  type: string;
  name: string;
  time: string;
}

interface FacilityItem {
  category: string;
  items: string[];
}

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
    mapCoordinates: (content.mapCoordinates as { lat: number; lng: number }) || { lat: 37.5465, lng: 126.8768 },
    transport: (content.transport as TransportItem[]) || [],
    facilities: (content.facilities as FacilityItem[]) || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // 교통 정보 관리
  const addTransport = () => {
    setFormData(prev => ({
      ...prev,
      transport: [...prev.transport, { type: "지하철", name: "", time: "" }]
    }));
  };

  const removeTransport = (index: number) => {
    setFormData(prev => ({
      ...prev,
      transport: prev.transport.filter((_, i) => i !== index)
    }));
  };

  const updateTransport = (index: number, field: keyof TransportItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      transport: prev.transport.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // 주변시설 관리
  const addFacility = () => {
    setFormData(prev => ({
      ...prev,
      facilities: [...prev.facilities, { category: "교육", items: [] }]
    }));
  };

  const removeFacility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index)
    }));
  };

  const updateFacilityCategory = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.map((item, i) =>
        i === index ? { ...item, category: value } : item
      )
    }));
  };

  const updateFacilityItems = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.map((item, i) =>
        i === index ? { ...item, items: value.split(',').map(s => s.trim()).filter(Boolean) } : item
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 기본 정보 */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">기본 정보</h3>
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">위도</label>
            <input
              type="number"
              step="0.0001"
              value={formData.mapCoordinates.lat}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                mapCoordinates: { ...prev.mapCoordinates, lat: parseFloat(e.target.value) }
              }))}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">경도</label>
            <input
              type="number"
              step="0.0001"
              value={formData.mapCoordinates.lng}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                mapCoordinates: { ...prev.mapCoordinates, lng: parseFloat(e.target.value) }
              }))}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* 교통 정보 */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-medium">교통 정보</h3>
          <button type="button" onClick={addTransport} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            + 추가
          </button>
        </div>
        {formData.transport.length === 0 ? (
          <p className="text-gray-500 text-center py-4">교통 정보가 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {formData.transport.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <select
                  value={item.type}
                  onChange={(e) => updateTransport(index, 'type', e.target.value)}
                  className="border rounded px-2 py-1.5 text-sm"
                >
                  <option value="지하철">지하철</option>
                  <option value="버스">버스</option>
                  <option value="도로">도로</option>
                </select>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateTransport(index, 'name', e.target.value)}
                  placeholder="역/정류장 이름"
                  className="flex-1 border rounded px-2 py-1.5 text-sm"
                />
                <input
                  type="text"
                  value={item.time}
                  onChange={(e) => updateTransport(index, 'time', e.target.value)}
                  placeholder="도보 2분"
                  className="w-24 border rounded px-2 py-1.5 text-sm"
                />
                <button type="button" onClick={() => removeTransport(index)} className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 주변시설 */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-medium">주변시설</h3>
          <button type="button" onClick={addFacility} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            + 추가
          </button>
        </div>
        {formData.facilities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">주변시설 정보가 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {formData.facilities.map((item, index) => (
              <div key={index} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) => updateFacilityCategory(index, e.target.value)}
                  placeholder="카테고리"
                  className="w-24 border rounded px-2 py-1.5 text-sm"
                />
                <input
                  type="text"
                  value={item.items.join(', ')}
                  onChange={(e) => updateFacilityItems(index, e.target.value)}
                  placeholder="시설1, 시설2, 시설3 (쉼표 구분)"
                  className="flex-1 border rounded px-2 py-1.5 text-sm"
                />
                <button type="button" onClick={() => removeFacility(index)} className="text-red-500 hover:text-red-700 mt-1">
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </form>
  );
}

// 일정 탭
interface ScheduleItem {
  label: string;
  date: string;
  description?: string;
}

function ScheduleTab({
  content,
  onSave,
}: {
  content: Record<string, unknown>;
  onSave: (content: Record<string, unknown>) => void;
}) {
  const [formData, setFormData] = useState({
    title: (content.title as string) || "분양 일정",
    items: (content.items as ScheduleItem[]) || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { label: "", date: "", description: "" }]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, field: keyof ScheduleItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">기본 정보</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">섹션 제목</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-medium">일정 항목</h3>
          <button type="button" onClick={addItem} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            + 추가
          </button>
        </div>
        {formData.items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">일정 항목이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {formData.items.map((item, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">항목 {index + 1}</span>
                  <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 text-sm">
                    삭제
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateItem(index, 'label', e.target.value)}
                    placeholder="항목명 (예: 청약 접수)"
                    className="border rounded px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => updateItem(index, 'date', e.target.value)}
                    placeholder="날짜 (예: 2024년 3월 1일)"
                    className="border rounded px-2 py-1.5 text-sm"
                  />
                </div>
                <input
                  type="text"
                  value={item.description || ''}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="설명 (선택사항)"
                  className="w-full border rounded px-2 py-1.5 text-sm mt-2"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </form>
  );
}

// QnA 탭
interface FAQItem {
  question: string;
  answer: string;
}

function QnATab({
  content,
  onSave,
}: {
  content: Record<string, unknown>;
  onSave: (content: Record<string, unknown>) => void;
}) {
  const [formData, setFormData] = useState({
    title: (content.title as string) || "자주 묻는 질문",
    items: (content.items as FAQItem[]) || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { question: "", answer: "" }]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, field: keyof FAQItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">기본 정보</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">섹션 제목</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-medium">FAQ 항목</h3>
          <button type="button" onClick={addItem} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            + 추가
          </button>
        </div>
        {formData.items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">FAQ 항목이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {formData.items.map((item, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Q{index + 1}</span>
                  <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 text-sm">
                    삭제
                  </button>
                </div>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateItem(index, 'question', e.target.value)}
                  placeholder="질문"
                  className="w-full border rounded px-2 py-1.5 text-sm mb-2"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => updateItem(index, 'answer', e.target.value)}
                  placeholder="답변"
                  rows={3}
                  className="w-full border rounded px-2 py-1.5 text-sm resize-none"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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

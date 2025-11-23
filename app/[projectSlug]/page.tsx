import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Props {
  params: Promise<{ projectSlug: string }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectSlug } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("name, meta_title, meta_description, og_image")
    .eq("slug", projectSlug)
    .eq("status", "published")
    .single();

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다",
    };
  }

  return {
    title: project.meta_title || `${project.name} 분양 홈페이지`,
    description: project.meta_description,
    openGraph: {
      title: project.meta_title || project.name,
      description: project.meta_description || "",
      images: project.og_image ? [project.og_image] : [],
    },
  };
}

// 프로젝트 데이터 가져오기
async function getProject(slug: string) {
  const { data: project, error } = await supabase
    .from("projects")
    .select(`
      *,
      contents:project_contents(*),
      units:project_units(*),
      images:project_images(*)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !project) {
    return null;
  }

  return project;
}

export default async function ProjectPage({ params }: Props) {
  const { projectSlug } = await params;
  const project = await getProject(projectSlug);

  if (!project) {
    notFound();
  }

  // 콘텐츠에서 섹션별 데이터 추출
  const getContent = (type: string) => {
    return project.contents?.find(
      (c: { section_type: string }) => c.section_type === type
    )?.content;
  };

  const heroContent = getContent("hero") as {
    title?: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    badges?: string[];
  } | undefined;

  // 구조화된 데이터 (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: project.name,
    description: project.meta_description,
    url: `https://smilebunyang.com/${project.slug}`,
    telephone: project.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: project.address,
      addressCountry: "KR",
    },
    priceRange: "$$",
  };

  return (
    <>
      {/* 구조화된 데이터 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />
      <main>
        <HeroSection
          projectName={project.name}
          projectSlug={project.slug}
          phone={project.phone || "1666-0952"}
          heroContent={heroContent}
        />
      </main>
      <Footer />
    </>
  );
}

// 정적 페이지 생성을 위한 경로 목록
export async function generateStaticParams() {
  const { data: projects } = await supabase
    .from("projects")
    .select("slug")
    .eq("status", "published");

  return (projects || []).map((project) => ({
    projectSlug: project.slug,
  }));
}

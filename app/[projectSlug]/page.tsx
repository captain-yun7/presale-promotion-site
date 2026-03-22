import { notFound } from "next/navigation";
import { Metadata } from "next";
import { sql } from "@/lib/db";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

// 캐싱 비활성화 - 항상 최신 데이터 fetch
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: Promise<{ projectSlug: string }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectSlug } = await params;

  const rows = await sql`
    SELECT name, meta_title, meta_description, og_image
    FROM projects
    WHERE slug = ${projectSlug} AND status = 'published'
    LIMIT 1
  `;

  const project = rows[0];

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
  const projects = await sql`
    SELECT * FROM projects
    WHERE slug = ${slug} AND status = 'published'
    LIMIT 1
  `;

  const project = projects[0] as Record<string, unknown> | undefined;
  if (!project) return null;

  const contents = await sql`
    SELECT * FROM project_contents WHERE project_id = ${project.id} ORDER BY display_order ASC
  `;
  const units = await sql`
    SELECT * FROM project_units WHERE project_id = ${project.id} ORDER BY display_order ASC
  `;
  const images = await sql`
    SELECT * FROM project_images WHERE project_id = ${project.id} ORDER BY display_order ASC
  `;

  return {
    ...project,
    contents: contents as Array<{ section_type: string; content: Record<string, unknown> }>,
    units,
    images,
  } as {
    id: string;
    slug: string;
    name: string;
    phone?: string;
    address?: string;
    meta_description?: string;
    meta_title?: string;
    og_image?: string;
    contents: Array<{ section_type: string; content: Record<string, unknown> }>;
    units: Record<string, unknown>[];
    images: Record<string, unknown>[];
    [key: string]: unknown;
  };
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
      (c) => c.section_type === type
    )?.content;
  };

  const heroContent = getContent("hero") as {
    title?: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    badges?: string[];
    slides?: Array<{
      image: string;
      tag: string;
      title: string;
      subtitleLines: string[];
    }>;
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
  const projects = await sql`
    SELECT slug FROM projects WHERE status = 'published'
  `;

  return (projects || []).map((project) => ({
    projectSlug: project.slug,
  }));
}

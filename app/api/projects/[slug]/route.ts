import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET: 공개 프로젝트 데이터 조회 (slug 기반)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // 프로젝트 기본 정보
    const projects = await sql`
      SELECT id, slug, name, status, address, phone, email, total_units,
             sale_start_date, sale_end_date, move_in_date, settings, theme,
             meta_title, meta_description, og_image
      FROM projects
      WHERE slug = ${slug} AND status = 'published'
      LIMIT 1
    `;

    const project = projects[0] || null;

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // 콘텐츠 조회
    const contents = await sql`
      SELECT section_type, content, is_enabled, display_order
      FROM project_contents
      WHERE project_id = ${project.id} AND is_enabled = true
      ORDER BY display_order ASC
    `;

    // 세대 타입 조회
    const units = await sql`
      SELECT * FROM project_units
      WHERE project_id = ${project.id}
      ORDER BY display_order ASC
    `;

    // 이미지 조회
    const images = await sql`
      SELECT * FROM project_images
      WHERE project_id = ${project.id}
      ORDER BY display_order ASC
    `;

    return NextResponse.json({
      project: {
        ...project,
        contents: contents || [],
        units: units || [],
        images: images || [],
      },
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

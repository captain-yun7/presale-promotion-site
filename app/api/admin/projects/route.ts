import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET: 프로젝트 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let data;
    let countResult;

    if (status) {
      data = await sql`
        SELECT p.*, row_to_json(t.*) as template
        FROM projects p
        LEFT JOIN templates t ON p.template_id = t.id
        WHERE p.status = ${status}
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as count FROM projects WHERE status = ${status}
      `;
    } else {
      data = await sql`
        SELECT p.*, row_to_json(t.*) as template
        FROM projects p
        LEFT JOIN templates t ON p.template_id = t.id
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as count FROM projects
      `;
    }

    const count = parseInt(countResult[0].count);

    return NextResponse.json({
      projects: data,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST: 새 프로젝트 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      template_id,
      address,
      phone,
      email,
      total_units,
      sale_start_date,
      sale_end_date,
      move_in_date,
      settings,
      theme,
      meta_title,
      meta_description,
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // 슬러그 중복 확인
    const existing = await sql`
      SELECT id FROM projects WHERE slug = ${slug} LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    // 템플릿에서 기본 설정 가져오기
    let defaultSettings = {
      showFloatingCTA: true,
      showSocialProof: true,
      showUrgencyBanner: true,
    };
    let defaultTheme = {
      primaryColor: '#C9A961',
      secondaryColor: '#1A1A1A',
      fontFamily: 'Pretendard',
    };

    if (template_id) {
      const templateRows = await sql`
        SELECT default_settings, default_theme FROM templates WHERE id = ${template_id} LIMIT 1
      `;
      const template = templateRows[0];

      if (template) {
        defaultSettings = { ...defaultSettings, ...template.default_settings };
        defaultTheme = { ...defaultTheme, ...template.default_theme };
      }
    }

    // 프로젝트 생성
    const projectSettings = settings || defaultSettings;
    const projectTheme = theme || defaultTheme;
    const projectMetaTitle = meta_title || name;

    const projectRows = await sql`
      INSERT INTO projects (
        name, slug, template_id, status, address, phone, email,
        total_units, sale_start_date, sale_end_date, move_in_date,
        settings, theme, meta_title, meta_description
      ) VALUES (
        ${name}, ${slug}, ${template_id || null}, 'draft',
        ${address || null}, ${phone || null}, ${email || null},
        ${total_units || null}, ${sale_start_date || null},
        ${sale_end_date || null}, ${move_in_date || null},
        ${JSON.stringify(projectSettings)}, ${JSON.stringify(projectTheme)},
        ${projectMetaTitle}, ${meta_description || null}
      )
      RETURNING *
    `;

    const project = projectRows[0];

    // 템플릿에서 기본 콘텐츠 복사
    if (template_id) {
      await copyTemplateContents(template_id, project.id);
    }

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// 템플릿에서 기본 콘텐츠 복사 (템플릿 기반 프로젝트에서 복사)
async function copyTemplateContents(templateId: string, projectId: string) {
  // 템플릿으로 만들어진 기존 프로젝트에서 콘텐츠 구조 복사
  const templateProjects = await sql`
    SELECT id FROM projects WHERE template_id = ${templateId} LIMIT 1
  `;

  const templateProject = templateProjects[0];
  if (!templateProject) return;

  // 콘텐츠 복사
  const contents = await sql`
    SELECT section_type, content, is_enabled, display_order
    FROM project_contents
    WHERE project_id = ${templateProject.id}
  `;

  if (contents && contents.length > 0) {
    for (const c of contents) {
      await sql`
        INSERT INTO project_contents (project_id, section_type, content, is_enabled, display_order)
        VALUES (${projectId}, ${c.section_type}, ${JSON.stringify(c.content)}, ${c.is_enabled}, ${c.display_order})
      `;
    }
  }
}

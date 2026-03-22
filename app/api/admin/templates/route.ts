import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET: 템플릿 목록 조회
export async function GET() {
  try {
    const data = await sql`
      SELECT * FROM templates
      ORDER BY is_default DESC, created_at DESC
    `;

    return NextResponse.json({ templates: data });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

// POST: 프로젝트를 템플릿으로 저장
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, project_id } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // 기존 프로젝트에서 템플릿 생성
    if (project_id) {
      const projectRows = await sql`
        SELECT settings, theme FROM projects WHERE id = ${project_id} LIMIT 1
      `;

      const project = projectRows[0];

      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }

      const templateRows = await sql`
        INSERT INTO templates (name, description, default_settings, default_theme)
        VALUES (${name}, ${description || null}, ${JSON.stringify(project.settings)}, ${JSON.stringify(project.theme)})
        RETURNING *
      `;

      return NextResponse.json({ template: templateRows[0] }, { status: 201 });
    }

    // 빈 템플릿 생성
    const defaultSettings = JSON.stringify({
      showFloatingCTA: true,
      showSocialProof: true,
      showUrgencyBanner: true,
    });
    const defaultTheme = JSON.stringify({
      primaryColor: '#C9A961',
      secondaryColor: '#1A1A1A',
      fontFamily: 'Pretendard',
    });

    const templateRows = await sql`
      INSERT INTO templates (name, description, default_settings, default_theme)
      VALUES (${name}, ${description || null}, ${defaultSettings}, ${defaultTheme})
      RETURNING *
    `;

    return NextResponse.json({ template: templateRows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

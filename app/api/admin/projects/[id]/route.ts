import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET: 프로젝트 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 프로젝트 기본 정보 + 템플릿
    const projects = await sql`
      SELECT p.*, row_to_json(t.*) as template
      FROM projects p
      LEFT JOIN templates t ON p.template_id = t.id
      WHERE p.id = ${id}
      LIMIT 1
    `;

    const project = projects[0];

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // 관련 데이터 조회
    const contents = await sql`
      SELECT * FROM project_contents WHERE project_id = ${id} ORDER BY display_order ASC
    `;
    const units = await sql`
      SELECT * FROM project_units WHERE project_id = ${id} ORDER BY display_order ASC
    `;
    const images = await sql`
      SELECT * FROM project_images WHERE project_id = ${id} ORDER BY display_order ASC
    `;

    return NextResponse.json({
      project: {
        ...project,
        contents,
        units,
        images,
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

// PUT: 프로젝트 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      name,
      slug,
      status,
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
      og_image,
    } = body;

    // 슬러그 변경 시 중복 확인
    if (slug) {
      const existing = await sql`
        SELECT id FROM projects WHERE slug = ${slug} AND id != ${id} LIMIT 1
      `;

      if (existing.length > 0) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    // Build SET clauses dynamically
    // Since neon tagged template doesn't support dynamic column sets easily,
    // we update all fields using COALESCE-like approach
    const projectRows = await sql`
      UPDATE projects SET
        name = COALESCE(${name !== undefined ? name : null}, name),
        slug = COALESCE(${slug !== undefined ? slug : null}, slug),
        status = COALESCE(${status !== undefined ? status : null}, status),
        address = ${address !== undefined ? address : null},
        phone = ${phone !== undefined ? phone : null},
        email = ${email !== undefined ? email : null},
        total_units = ${total_units !== undefined ? total_units : null},
        sale_start_date = ${sale_start_date !== undefined ? sale_start_date : null},
        sale_end_date = ${sale_end_date !== undefined ? sale_end_date : null},
        move_in_date = ${move_in_date !== undefined ? move_in_date : null},
        settings = COALESCE(${settings !== undefined ? JSON.stringify(settings) : null}::jsonb, settings),
        theme = COALESCE(${theme !== undefined ? JSON.stringify(theme) : null}::jsonb, theme),
        meta_title = ${meta_title !== undefined ? meta_title : null},
        meta_description = ${meta_description !== undefined ? meta_description : null},
        og_image = ${og_image !== undefined ? og_image : null},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    const project = projectRows[0];

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE: 프로젝트 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await sql`DELETE FROM projects WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

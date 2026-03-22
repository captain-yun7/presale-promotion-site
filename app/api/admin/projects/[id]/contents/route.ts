import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// PUT: 프로젝트 콘텐츠 업데이트 (upsert)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { section_type, content, is_enabled, display_order } = body;

    if (!section_type) {
      return NextResponse.json(
        { error: 'section_type is required' },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO project_contents (project_id, section_type, content, is_enabled, display_order)
      VALUES (${id}, ${section_type}, ${JSON.stringify(content || {})}, ${is_enabled ?? true}, ${display_order ?? 0})
      ON CONFLICT (project_id, section_type)
      DO UPDATE SET
        content = EXCLUDED.content,
        is_enabled = EXCLUDED.is_enabled,
        display_order = EXCLUDED.display_order,
        updated_at = NOW()
      RETURNING *
    `;

    const data = rows[0];

    return NextResponse.json({ content: data });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

// DELETE: 프로젝트 콘텐츠 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const section_type = searchParams.get('section_type');

    if (!section_type) {
      return NextResponse.json(
        { error: 'section_type is required' },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM project_contents
      WHERE project_id = ${id} AND section_type = ${section_type}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    );
  }
}

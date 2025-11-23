import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

    const { data, error } = await supabase
      .from('project_contents')
      .upsert(
        {
          project_id: id,
          section_type,
          content: content || {},
          is_enabled: is_enabled ?? true,
          display_order: display_order ?? 0,
        },
        {
          onConflict: 'project_id,section_type',
        }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

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

    const { error } = await supabase
      .from('project_contents')
      .delete()
      .eq('project_id', id)
      .eq('section_type', section_type);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    );
  }
}

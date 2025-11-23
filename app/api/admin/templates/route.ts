import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET: 템플릿 목록 조회
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

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
      const { data: project } = await supabase
        .from('projects')
        .select('settings, theme')
        .eq('id', project_id)
        .single();

      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }

      const { data: template, error } = await supabase
        .from('templates')
        .insert([
          {
            name,
            description,
            default_settings: project.settings,
            default_theme: project.theme,
          },
        ])
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ template }, { status: 201 });
    }

    // 빈 템플릿 생성
    const { data: template, error } = await supabase
      .from('templates')
      .insert([
        {
          name,
          description,
          default_settings: {
            showFloatingCTA: true,
            showSocialProof: true,
            showUrgencyBanner: true,
          },
          default_theme: {
            primaryColor: '#C9A961',
            secondaryColor: '#1A1A1A',
            fontFamily: 'Pretendard',
          },
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

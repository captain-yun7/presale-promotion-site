import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Project } from '@/lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET: 프로젝트 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('projects')
      .select('*, template:templates(id, name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      projects: data,
      total: count,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
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
    const { data: existing } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
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
      const { data: template } = await supabase
        .from('templates')
        .select('default_settings, default_theme')
        .eq('id', template_id)
        .single();

      if (template) {
        defaultSettings = { ...defaultSettings, ...template.default_settings };
        defaultTheme = { ...defaultTheme, ...template.default_theme };
      }
    }

    // 프로젝트 생성
    const projectData: Partial<Project> = {
      name,
      slug,
      template_id,
      status: 'draft',
      address,
      phone,
      email,
      total_units,
      sale_start_date,
      sale_end_date,
      move_in_date,
      settings: settings || defaultSettings,
      theme: theme || defaultTheme,
      meta_title: meta_title || name,
      meta_description,
    };

    const { data: project, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

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
  const { data: templateProject } = await supabase
    .from('projects')
    .select('id')
    .eq('template_id', templateId)
    .limit(1)
    .single();

  if (!templateProject) return;

  // 콘텐츠 복사
  const { data: contents } = await supabase
    .from('project_contents')
    .select('section_type, content, is_enabled, display_order')
    .eq('project_id', templateProject.id);

  if (contents && contents.length > 0) {
    const newContents = contents.map((c) => ({
      ...c,
      project_id: projectId,
    }));
    await supabase.from('project_contents').insert(newContents);
  }
}

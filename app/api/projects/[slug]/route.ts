import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// GET: 공개 프로젝트 데이터 조회 (slug 기반)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // 프로젝트 기본 정보
    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        id,
        slug,
        name,
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
        og_image
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // 콘텐츠 조회
    const { data: contents } = await supabase
      .from('project_contents')
      .select('section_type, content, is_enabled, display_order')
      .eq('project_id', project.id)
      .eq('is_enabled', true)
      .order('display_order', { ascending: true });

    // 세대 타입 조회
    const { data: units } = await supabase
      .from('project_units')
      .select('*')
      .eq('project_id', project.id)
      .order('display_order', { ascending: true });

    // 이미지 조회
    const { data: images } = await supabase
      .from('project_images')
      .select('*')
      .eq('project_id', project.id)
      .order('display_order', { ascending: true });

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

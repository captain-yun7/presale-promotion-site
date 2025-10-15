import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const source = searchParams.get('source') || '';
    const project = searchParams.get('project') || '';

    const offset = (page - 1) * limit;

    // 기본 쿼리
    let query = supabase
      .from('consultations')
      .select('*', { count: 'exact' });

    // 검색 필터
    if (search) {
      query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    // 출처 필터
    if (source) {
      query = query.eq('source', source);
    }

    // 프로젝트 필터
    if (project) {
      query = query.eq('project', project);
    }

    // 정렬 및 페이지네이션
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      { error: '데이터 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 통계 데이터 조회
export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action === 'stats') {
      // 전체 상담 수
      const { count: totalCount } = await supabase
        .from('consultations')
        .select('*', { count: 'exact', head: true });

      // 오늘 상담 수
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayCount } = await supabase
        .from('consultations')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      // 출처별 통계
      const { data: sourceStats } = await supabase
        .from('consultations')
        .select('source');

      const sourceCounts = sourceStats?.reduce((acc: Record<string, number>, item) => {
        acc[item.source || 'unknown'] = (acc[item.source || 'unknown'] || 0) + 1;
        return acc;
      }, {});

      // 프로젝트별 통계
      const { data: projectStats } = await supabase
        .from('consultations')
        .select('project');

      const projectCounts = projectStats?.reduce((acc: Record<string, number>, item) => {
        acc[item.project || '염창역더채움'] = (acc[item.project || '염창역더채움'] || 0) + 1;
        return acc;
      }, {});

      return NextResponse.json({
        totalCount: totalCount || 0,
        todayCount: todayCount || 0,
        sourceCounts: sourceCounts || {},
        projectCounts: projectCounts || {},
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: '통계 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

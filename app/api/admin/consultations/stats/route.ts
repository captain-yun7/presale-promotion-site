import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
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
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: '통계 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

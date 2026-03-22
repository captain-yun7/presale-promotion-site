import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    // 전체 상담 수
    const totalResult = await sql`SELECT COUNT(*) as count FROM consultations`;
    const totalCount = parseInt(totalResult[0].count);

    // 오늘 상담 수
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayResult = await sql`
      SELECT COUNT(*) as count FROM consultations
      WHERE created_at >= ${today.toISOString()}
    `;
    const todayCount = parseInt(todayResult[0].count);

    // 출처별 통계
    const sourceStats = await sql`SELECT source FROM consultations`;
    const sourceCounts = sourceStats?.reduce((acc: Record<string, number>, item) => {
      acc[item.source || 'unknown'] = (acc[item.source || 'unknown'] || 0) + 1;
      return acc;
    }, {});

    // 프로젝트별 통계
    const projectStats = await sql`SELECT project FROM consultations`;
    const projectCounts = projectStats?.reduce((acc: Record<string, number>, item) => {
      acc[item.project || '염창역더채움'] = (acc[item.project || '염창역더채움'] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      totalCount,
      todayCount,
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

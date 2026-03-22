import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const source = searchParams.get('source') || '';
    const project = searchParams.get('project') || '';

    const offset = (page - 1) * limit;

    // Build query based on filters
    let data;
    let countResult;

    if (search && source && project) {
      const searchPattern = `%${search}%`;
      data = await sql`
        SELECT * FROM consultations
        WHERE (name ILIKE ${searchPattern} OR phone ILIKE ${searchPattern})
          AND source = ${source}
          AND project = ${project}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as count FROM consultations
        WHERE (name ILIKE ${searchPattern} OR phone ILIKE ${searchPattern})
          AND source = ${source}
          AND project = ${project}
      `;
    } else if (search && source) {
      const searchPattern = `%${search}%`;
      data = await sql`
        SELECT * FROM consultations
        WHERE (name ILIKE ${searchPattern} OR phone ILIKE ${searchPattern})
          AND source = ${source}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as count FROM consultations
        WHERE (name ILIKE ${searchPattern} OR phone ILIKE ${searchPattern})
          AND source = ${source}
      `;
    } else if (search && project) {
      const searchPattern = `%${search}%`;
      data = await sql`
        SELECT * FROM consultations
        WHERE (name ILIKE ${searchPattern} OR phone ILIKE ${searchPattern})
          AND project = ${project}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as count FROM consultations
        WHERE (name ILIKE ${searchPattern} OR phone ILIKE ${searchPattern})
          AND project = ${project}
      `;
    } else if (source && project) {
      data = await sql`
        SELECT * FROM consultations
        WHERE source = ${source} AND project = ${project}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as count FROM consultations
        WHERE source = ${source} AND project = ${project}
      `;
    } else if (search) {
      const searchPattern = `%${search}%`;
      data = await sql`
        SELECT * FROM consultations
        WHERE name ILIKE ${searchPattern} OR phone ILIKE ${searchPattern}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as count FROM consultations
        WHERE name ILIKE ${searchPattern} OR phone ILIKE ${searchPattern}
      `;
    } else if (source) {
      data = await sql`
        SELECT * FROM consultations
        WHERE source = ${source}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as count FROM consultations
        WHERE source = ${source}
      `;
    } else if (project) {
      data = await sql`
        SELECT * FROM consultations
        WHERE project = ${project}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as count FROM consultations
        WHERE project = ${project}
      `;
    } else {
      data = await sql`
        SELECT * FROM consultations
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as count FROM consultations
      `;
    }

    const count = parseInt(countResult[0].count);

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
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

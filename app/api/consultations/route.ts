import { NextResponse } from 'next/server';
import { submitConsultation } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, source, project } = body;

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: '이름과 전화번호는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }

    // Submit to Supabase
    const result = await submitConsultation({
      name,
      phone,
      source: source || 'website',
      project: project || '염창역더채움',
    });

    return NextResponse.json(
      { message: '상담 신청이 완료되었습니다.', data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Consultation submission error:', error);
    return NextResponse.json(
      { error: '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { submitConsultation } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message, source, project } = body;

    console.log('[Consultation API] 상담 신청 요청 받음:', { name, phone, message, source, project });

    // Validation
    if (!name || !phone) {
      console.error('[Consultation API] 유효성 검사 실패: 필수 항목 누락');
      return NextResponse.json(
        { error: '이름과 전화번호는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }

    // Submit to Supabase
    console.log('[Consultation API] Supabase에 데이터 저장 시도...');
    const result = await submitConsultation({
      name,
      phone,
      message,
      source: source || 'website',
      project: project || '염창역더채움',
    });

    console.log('[Consultation API] ✅ Supabase 저장 성공:', result);

    return NextResponse.json(
      { message: '상담 신청이 완료되었습니다.', data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Consultation API] ❌ 심각한 오류 발생:');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Full error:', error);

    return NextResponse.json(
      { error: '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { submitConsultation } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, source, project } = body;

    console.log('[Consultation API] 상담 신청 요청 받음:', { name, phone, source, project });

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
      source: source || 'website',
      project: project || '염창역더채움',
    });

    console.log('[Consultation API] ✅ Supabase 저장 성공:', result);

    // 백업 로깅 (파일에도 저장)
    try {
      const fs = require('fs');
      const path = require('path');
      const logDir = path.join(process.cwd(), 'logs');
      const logFile = path.join(logDir, 'consultations.log');

      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      const logEntry = `${new Date().toISOString()} | ${name} | ${phone} | ${source || 'website'} | ${project || '염창역더채움'}\n`;
      fs.appendFileSync(logFile, logEntry);
      console.log('[Consultation API] 백업 로그 저장 완료');
    } catch (logError) {
      console.error('[Consultation API] 백업 로그 저장 실패 (치명적 아님):', logError);
    }

    return NextResponse.json(
      { message: '상담 신청이 완료되었습니다.', data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Consultation API] ❌ 심각한 오류 발생:');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Full error:', error);

    // 에러가 발생해도 백업 로그에는 저장 시도
    try {
      const body = await request.json();
      const fs = require('fs');
      const path = require('path');
      const logDir = path.join(process.cwd(), 'logs');
      const errorLogFile = path.join(logDir, 'consultation-errors.log');

      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      const errorLog = `${new Date().toISOString()} | ERROR | ${JSON.stringify(body)} | ${error instanceof Error ? error.message : String(error)}\n`;
      fs.appendFileSync(errorLogFile, errorLog);
      console.log('[Consultation API] 에러 로그 저장 완료');
    } catch (backupError) {
      console.error('[Consultation API] 에러 로그 저장도 실패:', backupError);
    }

    return NextResponse.json(
      { error: '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

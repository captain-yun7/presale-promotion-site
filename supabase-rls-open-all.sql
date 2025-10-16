-- ================================================
-- Supabase RLS 정책: 모든 권한 완전 개방
-- ================================================
-- 이 SQL을 Supabase Dashboard > SQL Editor에서 실행하세요
-- ================================================

-- 1. 기존 정책 모두 삭제
DROP POLICY IF EXISTS "Anyone can insert consultations" ON consultations;
DROP POLICY IF EXISTS "Authenticated users can read all consultations" ON consultations;
DROP POLICY IF EXISTS "Service role can do everything" ON consultations;

-- 2. RLS 비활성화 (완전 개방)
ALTER TABLE consultations DISABLE ROW LEVEL SECURITY;

-- 또는 RLS 활성화 상태에서 모든 작업 허용하려면:
-- ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY "Allow all operations for everyone"
-- ON consultations
-- FOR ALL
-- TO public
-- USING (true)
-- WITH CHECK (true);

-- ================================================
-- 확인:
-- ================================================
-- SELECT * FROM consultations; 로 데이터 확인
-- 웹사이트에서 상담 신청 테스트
-- ================================================

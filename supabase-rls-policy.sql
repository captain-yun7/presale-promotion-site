-- ================================================
-- Supabase RLS 정책: consultations 테이블
-- ================================================
-- 이 SQL을 Supabase Dashboard > SQL Editor에서 실행하세요
--
-- 문제: 익명 사용자가 consultations 테이블에 INSERT 할 수 없음
-- 해결: RLS 정책을 추가하여 익명 사용자의 INSERT 권한 부여
-- ================================================

-- 1. RLS 활성화 (이미 활성화되어 있을 수 있음)
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 2. 익명 사용자(anon)가 데이터를 삽입할 수 있도록 허용
CREATE POLICY "Anyone can insert consultations"
ON consultations
FOR INSERT
TO anon
WITH CHECK (true);

-- 3. 인증된 사용자(관리자)가 모든 데이터를 조회할 수 있도록 허용
CREATE POLICY "Authenticated users can read all consultations"
ON consultations
FOR SELECT
TO authenticated
USING (true);

-- 4. 서비스 역할도 모든 작업 가능하도록 허용 (관리자 페이지용)
CREATE POLICY "Service role can do everything"
ON consultations
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ================================================
-- 확인 방법:
-- ================================================
-- 1. Supabase Dashboard > Authentication > Policies 에서 정책 확인
-- 2. 테스트 데이터 삽입:
--    INSERT INTO consultations (name, phone, source, project)
--    VALUES ('테스트', '01012345678', 'website', '염창역더채움');
-- 3. 웹사이트에서 상담 신청 테스트
-- ================================================

# 상담 신청 테스트 가이드

## 1. 브라우저 개발자 도구 열기
- **Chrome/Edge**: F12 또는 우클릭 > 검사
- **Console 탭**으로 이동

## 2. 상담 신청 폼 작성 후 제출

## 3. Console에서 확인할 로그:
```
[Floating CTA] 상담 신청 시작: {name: "...", phone: "..."}
[Floating CTA] API 응답 상태: 200 OK (또는 500 Error)
[Floating CTA] API 응답 데이터: {...}
[Floating CTA] ✅ 상담 신청 성공 (또는 ❌ 에러)
```

## 4. Network 탭에서 확인:
- `/api/consultations` 요청 클릭
- **Response** 탭에서 응답 확인
- **Payload** 탭에서 전송된 데이터 확인

## 5. 에러가 나면:
- Console에 표시된 **정확한 에러 메시지** 복사
- Network 탭의 **Response 내용** 복사
- 이 정보를 보내주세요

---

## 빠른 체크:

1. Supabase SQL 실행했나요?
   ```sql
   ALTER TABLE consultations DISABLE ROW LEVEL SECURITY;
   ```

2. 배포했나요?
   - Vercel에 자동 배포되었나요?
   - 또는 로컬에서 `npm run dev` 실행 중인가요?

3. .env 파일에 Supabase 설정 있나요?
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://boficjdtudycpjtkuvps.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

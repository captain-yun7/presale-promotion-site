---
name: worklog
description: docs/WORKLOG.md에 작업 내역을 기록합니다
user_invocable: true
arguments:
  - name: title
    description: "작업 제목 (예: HAVEN RÉSIDENCE 페이지 추가)"
    required: false
---

# WORKLOG 작업 기록

`docs/WORKLOG.md`에 작업 내역을 추가합니다.

## 작업 절차

### 1. 기록할 내용 파악

- `title` 인자가 있으면 해당 제목 사용
- 없으면 현재 대화에서 수행한 작업을 분석하여 자동 결정
- 현재 대화의 맥락을 파악하여 작업 내용 요약

### 2. 기존 WORKLOG 확인

- `docs/WORKLOG.md`를 읽어 마지막 번호 확인
- 기존 형식과 일관성 유지

### 3. 항목 추가

기존 WORKLOG.md의 패턴을 따라 마지막에 새 항목 추가:

```markdown
### {번호}. {작업 제목}
**완료 시간**: {오늘 날짜 YYYY-MM-DD}
**핵심 요약**: {1줄 요약}

**상세 내용**:
- 변경/추가된 파일과 내용
- 주요 기능 설명
- 기술적 결정사항
```

### 4. 기록 규칙

- 날짜는 CLAUDE.md의 currentDate 사용 (오늘: 2026-03-20이면 그 값)
- 핵심 요약은 반드시 1줄로 작성
- 상세 내용은 구체적인 파일명과 변경사항 포함
- 번호는 이전 항목에서 자동 증가
- 이미 기록된 중복 내용은 추가하지 않음

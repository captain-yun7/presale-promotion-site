---
name: new-template
description: docs/template 기반으로 정적 HTML 프로젝트 템플릿을 생성합니다
user_invocable: true
arguments:
  - name: template_id
    description: "템플릿 번호 (예: 011)"
    required: true
  - name: project_name
    description: "프로젝트 이름"
    required: false
---

# 새 템플릿 기반 프로젝트 생성

`docs/template-010/` 구조를 기반으로 새로운 정적 HTML 템플릿을 생성합니다.

## 작업 절차

### 1. 기존 템플릿 분석
- `docs/template-010/` 디렉토리의 모든 파일을 읽어 구조 파악
- index.html, about.html, contact.html, gallery.html, units.html, styles.css, script.js 구조 확인

### 2. 정보 수집
사용자에게 아래 정보를 확인:
1. **프로젝트명**
2. **위치/주소**
3. **전화번호**
4. **디자인 컨셉**: 색상 테마, 분위기
5. **포함할 페이지**: index, about, units, gallery, contact 중 선택

### 3. 템플릿 생성
```
docs/template-{template_id}/
├── index.html      # 메인 랜딩 페이지
├── about.html      # 단지 소개
├── units.html      # 세대 정보 / 평면도
├── gallery.html    # 갤러리
├── contact.html    # 상담 신청
├── styles.css      # 전체 스타일
└── script.js       # 인터랙션
```

### 4. 생성 규칙
- `docs/template-010/`의 HTML 구조와 네비게이션 패턴을 유지
- 프로젝트 정보를 반영하여 텍스트 교체
- 색상 테마를 CSS 변수로 관리
- 반응형 디자인 유지
- 이미지는 placeholder로 표시하고 경로 주석 추가

### 5. 생성 후 안내
- 브라우저에서 index.html을 직접 열어 확인 가능
- 이미지 파일 교체 필요 위치 안내
- Next.js 프로젝트로 전환하려면 `/new-project` 스킬 활용 안내

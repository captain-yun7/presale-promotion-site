---
name: new-project
description: 새로운 분양 프로젝트 페이지를 생성합니다 (디렉토리, page.tsx, layout.tsx, Client 컴포넌트, CSS)
user_invocable: true
arguments:
  - name: project_name
    description: "프로젝트 한글 이름 (예: 여의도더로드캐슬)"
    required: true
  - name: slug
    description: "URL 슬러그 (예: yeouido-the-road-castle)"
    required: true
---

# 새 분양 프로젝트 페이지 생성

사용자에게 아래 정보를 확인한 후 프로젝트 페이지를 생성합니다.

## 필수 수집 정보

사용자가 인자로 제공하지 않은 항목은 반드시 질문하여 수집합니다:

1. **프로젝트명** (한글): 예) HAVEN RÉSIDENCE
2. **URL 슬러그**: 예) haven-residence
3. **위치**: 예) 서울시 노원구 화랑로45길 145
4. **대표 전화번호**: 예) 1800-7890
5. **핵심 키워드** (3~5개): 예) 49층, 768세대, 프리미엄, 웰니스
6. **디자인 톤**: 프리미엄(어두운톤) / 밝은톤 / 모던 중 선택
7. **주요 섹션**: 히어로, 단지정보, 세대정보, 갤러리, 입지, 분양안내, FAQ, 상담신청 중 선택

## 생성 파일 구조

```
app/{slug}/
├── page.tsx          # 서버 컴포넌트 (SEO 메타데이터 + JSON-LD)
├── layout.tsx        # 레이아웃 (폰트 로드, CSS import)
└── {Name}Client.tsx  # 클라이언트 컴포넌트 (전체 UI)

styles/{slug}.css     # 프로젝트 전용 CSS
```

## 생성 규칙

### page.tsx
- `app/haven-residence/page.tsx` 패턴을 따름
- JSON-LD 구조화 데이터 포함 (RealEstateAgent 스키마)
- 프로젝트 정보(이름, 주소, 전화번호) 반영

### layout.tsx
- `app/haven-residence/layout.tsx` 패턴을 따름
- Metadata export (title, description, openGraph)
- 프로젝트 전용 CSS import
- 필요한 웹폰트 로드

### {Name}Client.tsx
- `"use client"` 선언
- 사용자가 선택한 섹션들을 포함
- 각 섹션의 데이터는 상단에 상수로 정의 (fpData, galleryItems, faqItems 등)
- 스크롤 reveal 애니메이션 포함
- 상담 신청 폼 포함 (Supabase + 텔레그램 알림 연동)
- FloatingCTA 포함
- 반응형 디자인 (모바일 우선)

### {slug}.css
- `styles/haven.css` 구조를 참고하되, 선택된 디자인 톤에 맞는 색상 변수 적용
- CSS 변수로 테마 색상 관리
- 섹션별 스타일, reveal 애니메이션, 반응형 미디어쿼리

## 생성 후 안내사항

파일 생성 완료 후 사용자에게 안내:
1. `npm run dev`로 로컬에서 확인
2. 이미지 파일을 `public/images/{slug}/` 에 추가
3. 실제 데이터(평면도, 갤러리 이미지 등)로 교체 필요
4. WORKLOG.md에 작업 내역 기록 (worklog 스킬 활용)

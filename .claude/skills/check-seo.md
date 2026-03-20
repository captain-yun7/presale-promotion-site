---
name: check-seo
description: 프로젝트 페이지의 SEO 메타데이터, 구조화 데이터, 접근성을 점검합니다
user_invocable: true
arguments:
  - name: target
    description: "점검할 페이지 경로 (예: haven-residence) 또는 'all'"
    required: false
---

# SEO 점검

분양 프로젝트 페이지의 SEO 최적화 상태를 점검하고 개선점을 보고합니다.

## 점검 대상 결정

- `target` 인자가 있으면 해당 페이지만 점검
- `target`이 'all'이면 `app/` 하위 모든 프로젝트 페이지 점검
- 인자가 없으면 사용자에게 어떤 페이지를 점검할지 질문

## 점검 항목

### 1. 메타데이터 (Metadata)
- [ ] `title` 존재 여부 및 길이 (30~60자 권장)
- [ ] `description` 존재 여부 및 길이 (120~160자 권장)
- [ ] OpenGraph `title`, `description`, `images` 설정
- [ ] 부동산 관련 핵심 키워드 포함 여부 (분양, 아파트, 지역명 등)

### 2. 구조화 데이터 (JSON-LD)
- [ ] `@type: RealEstateAgent` 스키마 존재
- [ ] `name`, `description`, `telephone`, `address` 필드 완성도
- [ ] `url` 이 실제 배포 URL과 일치하는지
- [ ] `priceRange` 설정 여부

### 3. 시맨틱 HTML
- [ ] `<h1>` 태그 존재 및 유일성 (페이지당 1개)
- [ ] 헤딩 계층 구조 (h1 > h2 > h3 순서)
- [ ] `<main>`, `<nav>`, `<footer>` 시맨틱 태그 사용
- [ ] 이미지 `alt` 속성 존재

### 4. 성능 관련 SEO
- [ ] 이미지 `next/image` 사용 여부 (Next.js 최적화)
- [ ] 폰트 프리로드 설정
- [ ] CSS/JS 번들 크기 고려사항

### 5. 모바일 SEO
- [ ] 반응형 뷰포트 설정
- [ ] 터치 타겟 크기 (최소 44x44px)
- [ ] 전화번호 `tel:` 링크 설정

## 결과 보고 형식

```
## SEO 점검 결과: {프로젝트명}

### 점수: {X}/100

### 통과 항목 (N개)
- ✅ 항목명

### 개선 필요 (N개)
- ⚠️ 항목명 — 현재 상태 → 권장 사항

### 심각 (N개)
- ❌ 항목명 — 문제 설명 → 수정 방법
```

## 자동 수정

심각도가 높은 항목은 사용자 동의 후 바로 수정합니다:
- 누락된 메타데이터 추가
- JSON-LD 스키마 보완
- alt 속성 추가

# 프리미엄 아파트 분양 홍보 사이트

프리미엄 라이프스타일을 위한 최고급 주거 공간 분양 홍보 웹사이트

## 기술 스택

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase
- **UI Library:** Swiper (이미지 갤러리)

## 주요 기능

- 📱 반응형 디자인 (모바일/태블릿/데스크톱)
- 🏢 단지 정보 및 특장점 소개
- 🏠 평면도/세대타입 갤러리
- 🗺️ 위치 및 교통 정보
- 📅 분양 일정 안내
- 💬 상담 신청 폼

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버: [http://localhost:3000](http://localhost:3000)

## 프로젝트 구조

```
presale-promotion-site/
├── app/              # Next.js App Router
├── components/       # React 컴포넌트
├── lib/             # 유틸리티 및 Supabase 클라이언트
├── public/          # 정적 파일 (이미지 등)
├── styles/          # 글로벌 CSS
└── docs/            # 문서
```

## 배포

Vercel을 통한 배포 권장

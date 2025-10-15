# 광고 추적 시스템 사용 가이드

## 1. 환경 설정

### .env 파일 설정
```bash
# Analytics & Tracking
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX           # Google Analytics 측정 ID
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345  # Facebook Pixel ID
NEXT_PUBLIC_NAVER_ANALYTICS_ID=s_xxxxx   # 네이버 애널리틱스 ID
```

### 측정 ID 발급 방법

#### Google Analytics
1. https://analytics.google.com 접속
2. 관리 > 속성 만들기
3. 데이터 스트림 > 웹
4. 측정 ID (G-로 시작) 복사

#### Facebook Pixel
1. https://business.facebook.com 접속
2. 비즈니스 설정 > 데이터 소스 > Pixel
3. Pixel 추가 > Pixel ID 복사

#### 네이버 애널리틱스
1. https://analytics.naver.com 접속
2. 사이트 등록
3. 사이트 ID (s_로 시작) 복사

---

## 2. UTM 파라미터 사용법

### UTM 파라미터 구조
```
https://smilebunyang.com/yeomchang-thechaeum?utm_source=naver&utm_medium=cpc&utm_campaign=spring2025&utm_term=염창역아파텔&utm_content=ad1
```

### 파라미터 설명
- `utm_source`: 유입 경로 (naver, instagram, facebook, google 등)
- `utm_medium`: 매체 유형 (cpc, display, social, email 등)
- `utm_campaign`: 캠페인명 (spring2025, opening, special 등)
- `utm_term`: 검색 키워드 (염창역아파텔, 강서구오피스텔 등)
- `utm_content`: 광고 콘텐츠 구분 (ad1, ad2, banner1 등)

### 캠페인별 UTM 예시

#### 네이버 검색광고
```
https://smilebunyang.com/yeomchang-thechaeum?utm_source=naver&utm_medium=cpc&utm_campaign=search_yeomchang&utm_term=염창역더채움
```

#### 네이버 디스플레이 광고
```
https://smilebunyang.com/yeomchang-thechaeum?utm_source=naver&utm_medium=display&utm_campaign=banner_main&utm_content=image1
```

#### 인스타그램 광고
```
https://smilebunyang.com/yeomchang-thechaeum?utm_source=instagram&utm_medium=social&utm_campaign=ig_feed&utm_content=post1
```

#### 페이스북 광고
```
https://smilebunyang.com/yeomchang-thechaeum?utm_source=facebook&utm_medium=social&utm_campaign=fb_conversion&utm_content=carousel
```

---

## 3. 추적 이벤트

### 자동 추적 이벤트
- **PageView**: 모든 페이지 조회 (GA, FB Pixel, Naver)
- **BlogView**: 블로그 글 조회
- **PhoneClick**: 전화 버튼 클릭
- **Consultation**: 상담 신청 완료

### 수동 이벤트 추가 방법
```typescript
import { trackEvent } from "@/components/Analytics";

// 상담 신청
trackEvent.consultation("방법명");  // 예: "플로팅폼", "메인폼", "블로그"

// 전화 클릭
trackEvent.phoneClick();

// 블로그 조회
trackEvent.blogView(slug, title);
```

---

## 4. 광고 플랫폼별 설정

### 네이버 검색광고 전환 추적

#### 1. 네이버 광고 시스템에서 전환 스크립트 발급
```javascript
// 상담 신청 완료 시 호출
if(typeof wcs !== 'undefined') {
  wcs_do({
    cnv: wcs.cnv("3", "1")  // 전환ID, 전환금액
  });
}
```

#### 2. components/Analytics.tsx에 추가
```typescript
// 네이버 전환 추적
if (typeof window !== 'undefined' && (window as any).wcs) {
  (window as any).wcs_do({
    cnv: (window as any).wcs.cnv("3", "1")
  });
}
```

### Facebook 전환 API 설정

#### 서버 측 이벤트 전송 (선택사항)
```typescript
// app/api/fb-conversion/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { event_name, user_data } = await request.json();

  // Facebook Conversion API 호출
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${process.env.NEXT_PUBLIC_FB_PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [{
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          user_data,
          action_source: 'website',
        }],
        access_token: process.env.FB_ACCESS_TOKEN,
      }),
    }
  );

  return NextResponse.json(await response.json());
}
```

---

## 5. 성과 측정

### Google Analytics에서 확인
1. 보고서 > 실시간
2. 보고서 > 수명 주기 > 획득 > 트래픽 획득
3. UTM 파라미터별 세션, 전환 확인

### Facebook 광고 관리자에서 확인
1. 광고 관리자 > 캠페인
2. 측정항목 > 전환 > Lead (리드 생성)
3. 세부 정보에서 PhoneClick, BlogView 등 커스텀 이벤트 확인

### 네이버 광고 시스템에서 확인
1. 광고 관리 > 전환 추적
2. 전환수, 전환율 확인
3. 키워드별 성과 분석

---

## 6. 테스트 방법

### 로컬 환경 테스트
```bash
# 개발 서버 실행
npm run dev

# UTM 파라미터 포함 URL 접속
http://localhost:3000/yeomchang-thechaeum?utm_source=test&utm_medium=cpc
```

### 브라우저 콘솔에서 확인
```javascript
// localStorage에 저장된 UTM 확인
localStorage.getItem('utm_params')

// GA 이벤트 확인
dataLayer

// Facebook Pixel 이벤트 확인
fbq('track', 'PageView')
```

### Chrome 확장 프로그램 사용
- **Google Tag Assistant**: GA 태그 확인
- **Facebook Pixel Helper**: FB Pixel 이벤트 확인

---

## 7. 주의사항

### 개인정보 보호
- 사용자 동의 없이 민감한 정보 수집 금지
- GDPR, 개인정보보호법 준수
- 쿠키 동의 배너 추가 (필요 시)

### 테스트 환경
- 프로덕션 환경에서만 실제 ID 사용
- 개발 환경에서는 테스트 ID 사용

### 데이터 정확성
- 광고 차단 소프트웨어로 인한 누락 가능
- 실제 전환수는 CRM 데이터와 교차 검증 필요

---

## 8. 문제 해결

### 이벤트가 전송되지 않을 때
1. 브라우저 콘솔에서 오류 확인
2. .env 파일의 ID 확인
3. 광고 차단 확장 프로그램 비활성화
4. 시크릿 모드에서 테스트

### UTM 파라미터가 저장되지 않을 때
1. localStorage 용량 확인
2. 브라우저 쿠키 설정 확인
3. 개발자 도구 > Application > Local Storage 확인

---

## 9. 고급 설정

### 이벤트 커스터마이징
```typescript
// components/Analytics.tsx
export const trackEvent = {
  // 커스텀 이벤트 추가
  brochureDownload: () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download', {
        event_category: 'engagement',
        event_label: '브로셔 다운로드',
      });
    }

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'BrochureDownload');
    }
  },
};
```

### 리타겟팅 픽셀 추가
```typescript
// Facebook 리타겟팅
fbq('track', 'ViewContent', {
  content_name: '염창역 더채움',
  content_category: 'real_estate',
  value: 0,
  currency: 'KRW'
});
```

---

## 10. 광고 소재 작성 가이드

### 랜딩 URL 구조
```
메인: https://smilebunyang.com/yeomchang-thechaeum?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}

블로그: https://smilebunyang.com/yeomchang-thechaeum/blog?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}
```

### 네이버 광고 작성 예시
```
제목1: 염창역 도보5분 더채움 아파텔
제목2: 9호선 급행역 여의도10분
설명: 영천시장 옆 프리미엄 아파텔. 1666-0952 상담예약
URL: https://smilebunyang.com/yeomchang-thechaeum?utm_source=naver&utm_medium=cpc&utm_campaign=search_main&utm_term={keyword}
```

### 인스타그램 광고 작성 예시
```
문구:
🏢 염창역 도보 5분, 여의도 출근 10분

프리미엄 아파텔 '더채움'
✅ 9호선 급행역 역세권
✅ 영천시장 바로 옆
✅ 스마트홈 시스템

📞 1666-0952

URL: https://smilebunyang.com/yeomchang-thechaeum?utm_source=instagram&utm_medium=social&utm_campaign=ig_feed&utm_content=image1
```

---

## 지원

문의사항이나 추가 기능이 필요하시면 개발팀에 연락 주세요.

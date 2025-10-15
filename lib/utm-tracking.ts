// UTM 파라미터 추적 시스템

export interface UTMParams {
  utm_source?: string;      // 유입 경로 (naver, instagram, facebook 등)
  utm_medium?: string;       // 매체 (cpc, display, social 등)
  utm_campaign?: string;     // 캠페인명
  utm_term?: string;         // 검색 키워드
  utm_content?: string;      // 광고 콘텐츠 구분
}

const UTM_STORAGE_KEY = "utm_params";
const UTM_EXPIRY_DAYS = 30;

// URL에서 UTM 파라미터 추출
export function extractUTMParams(url: string): UTMParams | null {
  try {
    const urlObj = new URL(url);
    const params: UTMParams = {};

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    utmKeys.forEach(key => {
      const value = urlObj.searchParams.get(key);
      if (value) {
        params[key as keyof UTMParams] = value;
      }
    });

    return Object.keys(params).length > 0 ? params : null;
  } catch {
    return null;
  }
}

// localStorage에 UTM 파라미터 저장
export function saveUTMParams(params: UTMParams): void {
  if (typeof window === 'undefined') return;

  try {
    const data = {
      params,
      timestamp: Date.now(),
      expiryDate: Date.now() + (UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
    };

    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save UTM params:', error);
  }
}

// localStorage에서 UTM 파라미터 가져오기
export function getStoredUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);

    // 만료 체크
    if (Date.now() > data.expiryDate) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      return null;
    }

    return data.params;
  } catch {
    return null;
  }
}

// 현재 페이지의 UTM 파라미터 확인 및 저장
export function trackUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null;

  const utmParams = extractUTMParams(window.location.href);

  if (utmParams) {
    saveUTMParams(utmParams);
    return utmParams;
  }

  return getStoredUTMParams();
}

// UTM 파라미터를 문자열로 변환 (GA, FB Pixel 전송용)
export function formatUTMParams(params: UTMParams | null): string {
  if (!params) return '';

  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

// UTM 파라미터를 표시용 텍스트로 변환
export function getUTMDisplayText(params: UTMParams | null): string {
  if (!params) return '직접 방문';

  const { utm_source, utm_medium, utm_campaign } = params;

  if (utm_source) {
    let text = utm_source;
    if (utm_medium) text += ` (${utm_medium})`;
    if (utm_campaign) text += ` - ${utm_campaign}`;
    return text;
  }

  return '직접 방문';
}

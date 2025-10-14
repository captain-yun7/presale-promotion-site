import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "염창역 더채움 분양 | 한강벨트라인 9호선 급행 초역세권 쓰리룸 아파텔 | 투룸가격 쓰리룸",
  description: "한강벨트라인 염창역 9호선 급행 초역세권 쓰리룸 아파텔! 주택수·대출규제·자금출처 무관. 투룸 가격으로 쓰리룸 (안전마진 2억). 전세대 먹방없는 시원한뷰, 역세권·초품아·숲세권, 삼성비스포크·현대리바트 프리미엄 가전가구. 1666-0952",
  keywords: "염창역더채움, 염창역더채움분양, 목동더채움, 9호선급행, 9호선초역세권, 염창역초역세권, 한강벨트라인, 쓰리룸아파텔, 투룸가격쓰리룸, 안전마진2억, 주택수무관, 대출규제무관, 자금출처무관, 역세권아파텔, 초품아, 숲세권, 서울분양, 2025서울분양, 강서구분양, 목동분양, 염창역오피스텔, 염창역아파텔, 삼성비스포크, 현대리바트, 제2의목동, 대학병원인근, 학군우수",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://smilebunyang.com/yeomchang-thechaeum",
    siteName: "스마일분양 - 염창역 더채움",
    title: "염창역 더채움 | 한강벨트라인 9호선 급행 초역세권 쓰리룸 아파텔",
    description: "투룸 가격으로 쓰리룸 잡는 기회! 안전마진 2억. 9호선 급행 초역세권, 전세대 시원한뷰, 역세권·초품아·숲세권 모두 갖춤. 주택수·대출규제·자금출처 무관. 삼성비스포크·현대리바트 프리미엄 가전가구",
    images: [
      {
        url: "/images/KakaoTalk_20251014_125002456.jpg",
        width: 1200,
        height: 630,
        alt: "염창역 더채움 9호선 급행 초역세권 쓰리룸 아파텔 투룸가격"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "염창역 더채움 | 9호선 급행 초역세권 쓰리룸 아파텔 | 투룸가격",
    description: "투룸 가격으로 쓰리룸! 안전마진 2억. 한강벨트라인 9호선 급행 초역세권. 주택수·대출규제·자금출처 무관",
    images: ["/images/KakaoTalk_20251014_125002456.jpg"],
  },
  alternates: {
    canonical: "https://smilebunyang.com/yeomchang-thechaeum"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    // 네이버 검색 최적화
    "naver-site-verification": "02734334489e2dbda315a3562f39004c",
  }
};

export default function YeomchangTheChaeumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

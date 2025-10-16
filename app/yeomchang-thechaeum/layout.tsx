import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "목동 염창역 더채움 분양 | 투룸가격 쓰리룸 아파텔",
  description: "목동 염창역 더채움 분양 홈페이지. 9호선 급행 초역세권 투룸 가격에 쓰리룸! ☎1666-0952",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://smilebunyang.com/yeomchang-thechaeum",
    siteName: "스마일분양 | 염창역더채움",
    title: "목동 염창역 더채움 | 투룸가격으로 쓰리룸!",
    description: "목동 염창역 더채움 분양 홈페이지. 9호선 급행 초역세권 투룸 가격에 쓰리룸! ☎1666-0952",
    images: [
      {
        url: "/images/yeomchang-thechaeum-exterior-view.jpg",
        width: 1200,
        height: 630,
        alt: "염창역 더채움 9호선 급행 초역세권 쓰리룸 아파텔 외관"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "목동 염창역 더채움 | 투룸가격으로 쓰리룸!",
    description: "목동 염창역 더채움 분양 홈페이지. 9호선 급행 초역세권 투룸 가격에 쓰리룸! ☎1666-0952",
    images: ["/images/yeomchang-thechaeum-exterior-view.jpg"],
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

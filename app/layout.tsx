import type { Metadata } from "next";
import "./globals.css";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://smilebunyang.com'),
  title: "분양 정보 플랫폼 - 최신 아파트/오피스텔 분양 정보",
  description: "아파트, 오피스텔, 상가 등 최신 분양 정보를 한눈에 확인하세요. 실시간 청약 일정과 상담 신청",
  openGraph: {
    title: "분양 정보 플랫폼 - 최신 분양 정보",
    description: "아파트, 오피스텔, 상가 등 최신 분양 정보를 한눈에 확인하세요",
    images: ["/ref_data/image-00.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Noto+Serif+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-noto">{children}</body>
    </html>
  );
}

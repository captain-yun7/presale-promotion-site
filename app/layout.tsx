import type { Metadata } from "next";
import "./globals.css";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "프리미엄 아파트 분양",
  description: "프리미엄 라이프스타일을 위한 최고급 주거 공간. 편리한 교통과 쾌적한 환경, 최신 설계의 아파트 분양 안내",
  openGraph: {
    title: "프리미엄 아파트 분양",
    description: "프리미엄 라이프스타일을 위한 최고급 주거 공간",
    images: ["/images/og-image.png"],
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
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-noto">{children}</body>
    </html>
  );
}

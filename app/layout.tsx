import type { Metadata } from "next";
import "./globals.css";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "염창역 더채움 - 2·9호선 더블역세권 프리미엄 레지던스",
  description: "염창역 도보 3분, 2·9호선 더블역세권. 프리미엄 라이프스타일을 위한 최고급 주거 공간. 한강 10분 거리의 특별한 가치",
  openGraph: {
    title: "염창역 더채움 - 2·9호선 더블역세권 프리미엄 레지던스",
    description: "염창역 도보 3분, 2·9호선 더블역세권. 프리미엄 라이프스타일을 위한 최고급 주거 공간",
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
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || 'YOUR_KAKAO_MAP_APP_KEY'}&libraries=services,clusterer&autoload=false`}
        ></script>
      </head>
      <body className="font-noto">{children}</body>
    </html>
  );
}

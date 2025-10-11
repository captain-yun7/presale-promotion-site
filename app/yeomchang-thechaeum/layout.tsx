import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "염창역 더채움 - 2·9호선 더블역세권 프리미엄 레지던스",
  description: "염창역 도보 3분, 2·9호선 더블역세권. 프리미엄 라이프스타일을 위한 최고급 주거 공간. 한강 10분 거리의 특별한 가치",
  openGraph: {
    title: "염창역 더채움 - 2·9호선 더블역세권 프리미엄 레지던스",
    description: "염창역 도보 3분, 2·9호선 더블역세권. 프리미엄 라이프스타일을 위한 최고급 주거 공간",
    images: ["/ref_data/image-00.jpg"],
  },
};

export default function YeomchangTheChaeumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import HavenClient from "./HavenClient";

export default function HavenResidencePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "HAVEN RÉSIDENCE",
    description:
      "서울 노원구 49층 768세대 프리미엄 웰니스 레지던스",
    url: "https://smilebunyang.com/haven-residence",
    telephone: "1800-7890",
    address: {
      "@type": "PostalAddress",
      streetAddress: "서울시 노원구 화랑로45길 145",
      addressCountry: "KR",
    },
    priceRange: "$$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HavenClient />
    </>
  );
}

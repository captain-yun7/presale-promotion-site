import YeouidoClient from "./YeouidoClient";
import config from "./config";

export default function YeouidoTheRoadCastlePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: config.meta.name,
    description: config.meta.description,
    url: config.meta.url,
    telephone: config.meta.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.meta.address,
      addressCountry: "KR",
    },
    priceRange: config.meta.priceRange,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <YeouidoClient />
    </>
  );
}

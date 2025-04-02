import React from "react";
import Script from "next/script";
import { Municipality } from "@/types/mongodb";

interface JsonLdProps {
  municipality?: Municipality;
  type: "website" | "organization";
}

const JsonLd: React.FC<JsonLdProps> = ({ municipality, type }) => {
  const baseUrl = "https://muni-logo-vote.vercel.app";

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LogoVote Thailand",
    description:
      "ร่วมโหวตโลโก้เทศบาลที่คุณชื่นชอบ ค้นหาและแชร์โลโก้เทศบาลทั่วประเทศไทย",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const organizationJsonLd = municipality
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: `เทศบาล${municipality.mun_name}`,
        description: `เทศบาล${municipality.mun_name} จังหวัด${municipality.cwt_name}`,
        image: municipality.logo,
        url: `${baseUrl}/municipality/${municipality.muni_code}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: municipality.amp_name,
          addressRegion: municipality.cwt_name,
          addressCountry: "TH",
        },
      }
    : null;

  const jsonLd = type === "website" ? websiteJsonLd : organizationJsonLd;

  if (!jsonLd) return null;

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default JsonLd;

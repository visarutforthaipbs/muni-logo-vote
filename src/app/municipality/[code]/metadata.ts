import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { code: string };
}): Promise<Metadata> {
  const url = `https://muni-logo-vote.vercel.app/municipality/${params.code}`;
  const title = "ขอ 1 โหวตให้โลโก้ในใจเธอ ❤️";
  const description =
    "ร่วมโหวตโลโก้เทศบาลที่คุณชื่นชอบ ค้นหาและแชร์โลโก้เทศบาลทั่วประเทศไทย";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "ขอ 1 โหวตให้โลโก้ในใจเธอ ❤️",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "โลโก้เว็บไซต์โหวตโลโก้เทศบาล",
        },
      ],
      locale: "th_TH",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      site: "@creatorsgarten",
    },
    alternates: {
      canonical: url,
    },
  };
}

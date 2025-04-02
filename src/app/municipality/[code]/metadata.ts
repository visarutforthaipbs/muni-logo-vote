import { Metadata } from "next";
import { Municipality } from "@/types/mongodb";
import clientPromise from "@/lib/mongodb";

const baseUrl = "https://muni-logo-vote.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: { code: string };
}): Promise<Metadata> {
  const client = await clientPromise;
  const db = client.db("logo-vote");
  const municipality = await db
    .collection<Municipality>("municipalities")
    .findOne({ muni_code: params.code });

  if (!municipality) {
    return {
      title: "ไม่พบเทศบาล",
      description: "ไม่พบข้อมูลเทศบาลที่ต้องการ",
    };
  }

  const title = `${municipality.mun_name} - ขอ 1 โหวตให้โลโก้ในใจเธอ ❤️`;
  const description = `ดูและโหวตโลโก้ของเทศบาล${municipality.mun_name} จังหวัด${municipality.cwt_name} พร้อมข้อมูลเทศบาลและช่องทางติดต่อ`;
  const imageUrl = municipality.logo || `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      siteName: "ขอ 1 โหวตให้โลโก้ในใจเธอ ❤️",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `โลโก้เทศบาล${municipality.mun_name}`,
        },
      ],
      locale: "th_TH",
      url: `${baseUrl}/municipality/${municipality.muni_code}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@creatorsgarten",
    },
    alternates: {
      canonical: `${baseUrl}/municipality/${municipality.muni_code}`,
    },
    authors: [{ name: "Creatorsgarten" }],
    category: "Government",
    keywords: [
      municipality.mun_name,
      municipality.cwt_name,
      "เทศบาล",
      "โลโก้",
      "ตราสัญลักษณ์",
      "เลือกตั้งเทศบาล",
    ],
  };
}

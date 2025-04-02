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
  const description = `ดูและโหวตโลโก้ของเทศบาล${municipality.mun_name} จังหวัด${municipality.cwt_name}`;
  const imageUrl = municipality.logo || `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `โลโก้เทศบาล${municipality.mun_name}`,
        },
      ],
      locale: "th_TH",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/municipality/${municipality.muni_code}`,
    },
  };
}

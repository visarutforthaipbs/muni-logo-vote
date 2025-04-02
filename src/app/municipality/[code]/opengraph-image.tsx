import { ImageResponse } from "next/og";
import { Municipality } from "@/types/mongodb";
import clientPromise from "@/lib/mongodb";

export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image({ params }: { params: { code: string } }) {
  const client = await clientPromise;
  const db = client.db("logo-vote");
  const municipality = await db
    .collection<Municipality>("municipalities")
    .findOne({ muni_code: params.code });

  if (!municipality) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(to right, #2B6CB0, #4299E1)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            ไม่พบข้อมูลเทศบาล
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Noto Sans Thai",
            data: await fetch(
              "https://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RtpzF-QRvzzXg.woff2"
            ).then((res) => res.arrayBuffer()),
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to right, #2B6CB0, #4299E1)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <img
          src={municipality.logo}
          alt={`โลโก้${municipality.mun_name}`}
          width="250"
          height="250"
          style={{
            marginBottom: "40px",
            background: "white",
            padding: "20px",
            borderRadius: "20px",
          }}
        />
        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {municipality.mun_name}
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "white",
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          {municipality.cwt_name}
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "white",
            textAlign: "center",
            opacity: 0.8,
            marginTop: "20px",
          }}
        >
          ขอ 1 โหวตให้โลโก้เทศบาลในใจเธอ ❤️
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans Thai",
          data: await fetch(
            "https://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RtpzF-QRvzzXg.woff2"
          ).then((res) => res.arrayBuffer()),
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}

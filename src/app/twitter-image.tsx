import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ขอ 1 โหวตให้โลโก้ในใจเธอ ❤️";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          src="https://muni-logo-vote.vercel.app/logo-vote.svg"
          alt="Logo"
          width="200"
          height="200"
          style={{
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          ขอ 1 โหวตให้โลโก้ในใจเธอ ❤️
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "white",
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          รวมโลโก้เทศบาลทั่วประเทศไทย 2,474 แห่ง
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

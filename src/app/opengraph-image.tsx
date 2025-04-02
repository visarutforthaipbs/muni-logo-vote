import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LogoVote Thailand - โหวตโลโก้เทศบาลที่ชื่นชอบ";
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
          background: "linear-gradient(to bottom right, #2B6CB0, #4299E1)",
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
          src="favicon-1.svg"
          alt="Logo"
          width={200}
          height={200}
          style={{
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          LogoVote Thailand
        </div>
        <div
          style={{
            fontSize: 30,
            color: "white",
            textAlign: "center",
          }}
        >
          โหวตโลโก้เทศบาลที่ชื่นชอบ
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

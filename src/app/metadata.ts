import { Metadata } from "next";

const title = "ขอ 1 โหวตให้โลโก้เทศบาลในใจเธอ ❤️";
const description =
  "ร่วมโหวตโลโก้เทศบาลที่คุณชื่นชอบ ค้นหาและแชร์โลโก้เทศบาลทั่วประเทศไทย พร้อมข้อมูลเทศบาลทั้ง 2,474 แห่งทั่วประเทศ";
const url = "https://muni-logo-vote.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s | ขอ 1 โหวตให้โลโก้เทศบาลในใจเธอ ❤️",
  },
  description,
  icons: {
    icon: "/logo-vote.svg",
    shortcut: "/logo-vote.svg",
    apple: "/logo-vote.svg",
    other: {
      rel: "mask-icon",
      url: "/logo-vote.svg",
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "ขอ 1 โหวตให้โลโก้เทศบาลในใจเธอ ❤️",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "โลโก้เว็บไซต์โหวตโลโก้เทศบาล",
      },
    ],
    locale: "th_TH",
    url: url,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
    site: "@creatorsgarten",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: url,
  },
  authors: [{ name: "Creatorsgarten" }],
  category: "Government",
  keywords: [
    "เทศบาล",
    "โลโก้",
    "ตราสัญลักษณ์",
    "เลือกตั้งเทศบาล",
    "การมีส่วนร่วม",
    "ประชาธิปไตย",
  ],
};

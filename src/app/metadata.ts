import { Metadata } from "next";

const title = "ขอ 1 โหวตให้โลโก้ในใจเธอ ❤️";
const description =
  "ร่วมโหวตโลโก้เทศบาลที่คุณชื่นชอบ ค้นหาและแชร์โลโก้เทศบาลทั่วประเทศไทย";
const url = "https://muni-logo-vote.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s | ขอ 1 โหวตให้โลโก้ในใจเธอ ❤️",
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
    siteName: "ขอ 1 โหวตให้โลโก้ในใจเธอ ❤️",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ขอ 1 โหวตให้โลโก้ในใจเธอ ❤️",
      },
    ],
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-site-verification", // You'll need to add this later
  },
};

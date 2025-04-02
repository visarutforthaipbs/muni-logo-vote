import { Providers } from "@/components/Providers";
import { metadata } from "./metadata";
import "@/styles/globals.css";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-vote.svg" />
        <link rel="mask-icon" href="/logo-vote.svg" color="#2B6CB0" />
        <meta name="theme-color" content="#2B6CB0" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

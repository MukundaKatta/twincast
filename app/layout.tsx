import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TwinCast — Clone yourself on video.",
  description:
    "Record once. Speak any script, in any language, on every platform. Made for creators, priced for creators.",
  openGraph: {
    title: "TwinCast — Clone yourself on video.",
    description:
      "Record once. Speak any script, in any language, on every platform. Made for creators, priced for creators.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=TwinCast&accent=purple&category=Creator%20tools",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=TwinCast&accent=purple&category=Creator%20tools",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { env } from "@/env";

export const metadata: Metadata = {
  title: "Kelas Mengaji Online",
  description: "Senarai kelas mengaji online di Malaysia",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "website",
    url: "https://kelasmengaji.online",
    title: "Kelas Mengaji Online",
    description: "Senarai kelas mengaji online di Malaysia",
    siteName: "Kelas Mengaji Online",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@afrieirham_",
    images: "/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <script
          defer
          src="https://analytics.afrieirham.com/script.js"
          data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        />
      </head>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

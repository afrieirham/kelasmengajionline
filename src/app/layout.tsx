import { type Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { env } from "@/env";

import "@/styles/globals.css";

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
    <ClerkProvider>
      <html lang="ms" className={`${GeistSans.variable}`}>
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
    </ClerkProvider>
  );
}

import { type Metadata } from "next";

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
  return children;
}

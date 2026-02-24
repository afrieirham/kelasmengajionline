import { desc } from "drizzle-orm";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { db } from "@/.server/db";
import { profiles } from "@/.server/db/schema";
import { Button } from "@/components/core/button";
import { Spinner } from "@/components/core/spinner";
import Footer from "@/components/widget/footer";
import Logo from "@/components/widget/logo";
import { authClient } from "@/lib/auth-client";
import type { Route } from "./+types/home";

export async function loader() {
  const classes = await db
    .select({
      name: profiles.name,
      headline: profiles.headline,
      imageUrl: profiles.imageUrl,
      websiteUrl: profiles.websiteUrl,
      createdAt: profiles.createdAt,
    })
    .from(profiles)
    .orderBy(desc(profiles.createdAt));

  return { classes };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kelas Mengaji Online" },
    {
      name: "description",
      content: "Senarai kelas mengaji online di Malaysia",
    },
    { property: "og:title", content: "Kelas Mengaji Online" },
    { property: "og:image", content: "./og.png" },
  ];
}

export default function Home() {
  const { classes } = useLoaderData<typeof loader>();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const handleSignIn = async () => {
    setIsLoggingIn(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="flex flex-col px-4">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between py-4">
        <Logo />
        <Button onClick={handleSignIn} size="lg" disabled={isLoggingIn}>
          {isLoggingIn && <Spinner />}
          Tambah Kelas
        </Button>
      </nav>
      <div className="mt-8 flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Cari Kelas Mengaji Online di Malaysia
        </h1>
        <div className="mx-auto space-y-4 rounded-lg text-gray-500">
          <p className="text-sm italic">
            {
              '"Sebaik manusia di antara kamu adalah orang yang belajar al-Quran dan mengajarkannya."'
            }
          </p>
        </div>
        <div className="mx-auto text-xs text-gray-500">
          <a
            href="https://www.muftiwp.gov.my/ms/artikel/irsyad-al-hadith/6035-irsyad-al-hadith-siri-ke-564-pahala-bagi-mereka-yang-tidak-lancar-membaca-al-quran#:~:text=Sebaik%2Dbaik%20kalian%20adalah%20mereka%20yang%20belajar%20al%2DQuran%20dan%20mengajarkannya"
            target="_blank"
            className="flex items-center gap-1 text-xs hover:underline"
            rel="noopener"
          >
            <span>Hadis Riwayat al-Bukhari</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
      <main className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-1 gap-2 md:grid-cols-3">
        {classes.map((kelas) => (
          <a
            key={kelas.websiteUrl}
            target="_blank"
            href={`${kelas.websiteUrl}?ref=kelasmengaji.online`}
            className="flex cursor-pointer items-center space-x-4 rounded-lg border bg-white p-4 hover:bg-gray-50"
          >
            <img
              src={kelas.imageUrl || ""}
              className="h-12 w-12 rounded border object-contain p-1"
              alt={`Logo ${kelas.name}`}
            />
            <div className="flex flex-col">
              <p className="font-semibold">{kelas.name}</p>
              <p className="text-sm text-gray-500 line-clamp-2">
                {kelas.headline}
              </p>
            </div>
          </a>
        ))}
      </main>
      <Footer />
    </div>
  );
}

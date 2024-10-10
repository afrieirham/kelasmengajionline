import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HydrateClient } from "@/trpc/server";

const classes = [
  {
    title: "MengajiOnline.com",
    description:
      "Kini Lebih Mudah & Bersistematik Belajar Mengaji Al-Quran, Tajwid, Tadabbur Dan Lain-lain Dengan Aplikasi Mengaji Online Pertama Di Dunia.",
    websiteUrl: "https://mengajionline.com",
    logoUrl:
      "https://mengajionline.com/wp-content/uploads/2022/11/aplikasi-mengaji-online.png",
  },
  {
    title: "nakngaji.my",
    description:
      "Nakngaji.my adalah jenama dibawah SifuTutor yang telah menyediakan perkhidmatan tutor peribadi sejak 2017.",
    websiteUrl: "https://nakngaji.my",
    logoUrl: "https://nakngaji.my/wp-content/uploads/2022/03/nakngaji-logo.svg",
  },
  {
    title: "ALQORI",
    description:
      "Jom Belajar AlQuran & Fardhu Ain Dengan ALQORI. Kelas Private Online. 1 Rumah 1 Ustaz/Ustazah",
    websiteUrl: "https://alqori.com/kelas-mengaji-online-alqori/",
    logoUrl: "https://alqori.com/wp-content/uploads/2022/10/ALQORI-1-2.png",
  },
  {
    title: "Kelas Quran Online",
    description:
      "Kelas Quran Online - Kelas mengaji yang mudah, seronok dan yuran yang sangat murah. Sesuai untuk semua tidak kira usia samada kanak-kanak atau dewasa.",
    websiteUrl: "https://kelasquranonline.com",
    logoUrl:
      "https://kelasquranonline.com/wp-content/uploads/2021/08/favi-1.png",
  },
  {
    title: "Jom Al Quran",
    description:
      "Jangan malu cuma pandai Iqra'. Kini ada kelas mengaji online dewasa. Boleh belajar Al Quran persendirian / personal guna Zoom / Google Meet.",
    websiteUrl: "https://jomalquran.my/",
    logoUrl:
      "https://jomalquran.b-cdn.net/wp-content/uploads/2021/06/cropped-jomalquran-favicon-2021-v2-192x192.png",
  },
];

export default async function Home() {
  return (
    <HydrateClient>
      <div className="flex flex-col px-4">
        <nav className="mx-auto mt-4 flex w-full max-w-screen-xl items-center justify-between py-4">
          <Logo />

          <div className="relative">
            <Button
              disabled
              className="cursor-not-allowed"
              title="Akan datang..."
            >
              Tambah Kelas
            </Button>
            <p className="absolute bottom-0 -mb-5 w-full text-center text-xs">
              Akan datang...
            </p>
          </div>
        </nav>
        <div className="mt-8 flex flex-col gap-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Cari Kelas Mengaji Online di Malaysia
          </h1>
          <div className="mx-auto max-w-sm space-y-4 rounded-lg text-gray-500">
            <p className="text-sm italic">
              {
                '"Sebaik manusia di antara kamu adalah orang yang belajar al-Quran dan mengajarkannya."'
              }
            </p>
            <p className="text-xs">Hadis Riwayat al-Bukhari</p>
          </div>
        </div>
        <main className="mx-auto mt-8 flex w-full max-w-screen-lg flex-col gap-2">
          {classes.map((kelas) => (
            <a
              key={kelas.websiteUrl}
              target="_blank"
              href={`${kelas.websiteUrl}?ref=kelasmengaji.online`}
              className="flex cursor-pointer items-center space-x-4 rounded-lg border bg-white p-4 hover:bg-gray-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={kelas.logoUrl}
                className="h-12 w-12 rounded border object-contain p-1"
                alt={`Logo ${kelas.title}`}
              />
              <div className="flex flex-col">
                <p className="font-semibold">{kelas.title}</p>
                <p className="text-sm text-gray-500">{kelas.description}</p>
              </div>
            </a>
          ))}
        </main>
        <div className="flex w-full items-center justify-center space-x-2 py-8 text-xs text-gray-500">
          <span>
            Dibina oleh{" "}
            <a
              href="https://x.com/afrieirham_"
              target="_blank"
              className="hover:underline"
            >
              Afrie
            </a>
          </span>
          <span>•</span>
          <span>
            Logo daripada{" "}
            <a
              href="https://www.flaticon.com/free-icons/holy"
              target="_blank"
              title="holy icons"
              className="hover:underline"
            >
              Atif Arshad
            </a>
          </span>
        </div>
      </div>
    </HydrateClient>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        width={870}
        height={180}
        className="w-[200px]"
        alt="Logo Kelas Mengaji Online"
      />
    </Link>
  );
}

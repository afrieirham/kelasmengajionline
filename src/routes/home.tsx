import Footer from "src/components/widget/footer";
import Logo from "src/components/widget/logo";
import { Button } from "@/components/core/button";
import type { Route } from "./+types/home";

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
  return (
    <div className="flex flex-col px-4">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between py-4">
        <Logo />
        <Button variant="outline">Tambah Kelas (akan datang)</Button>
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
          <a
            href="https://www.muftiwp.gov.my/ms/artikel/irsyad-al-hadith/6035-irsyad-al-hadith-siri-ke-564-pahala-bagi-mereka-yang-tidak-lancar-membaca-al-quran#:~:text=Sebaik%2Dbaik%20kalian%20adalah%20mereka%20yang%20belajar%20al%2DQuran%20dan%20mengajarkannya"
            target="_blank"
            className="text-xs hover:underline"
            rel="noopener"
          >
            Hadis Riwayat al-Bukhari
          </a>
        </div>
      </div>
      <main className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-2">
        {/* {classes.map((kelas) => (
            <a
              key={kelas.websiteUrl}
              target="_blank"
              href={`${kelas.websiteUrl}?ref=kelasmengaji.online`}
              className="flex cursor-pointer items-center space-x-4 rounded-lg border bg-white p-4 hover:bg-gray-50"
            >
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
          ))} */}
      </main>
      <Footer />
    </div>
  );
}

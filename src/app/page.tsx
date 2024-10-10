import { HydrateClient } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex h-screen flex-col items-center justify-center gap-y-2 bg-emerald-100/30">
        <p>Sedang dibina...</p>
        <div className="flex items-center space-x-2">
          <Image
            src="/favicon.ico"
            width={100}
            height={100}
            className="h-8 w-8"
            alt="Logo Kelas Mengaji Online"
          />
          <h1 className="text-2xl font-bold">Kelas Mengaji Online</h1>
        </div>
        <p className="text-xl">Senarai kelas mengaji online di Malaysia.</p>
      </main>
    </HydrateClient>
  );
}

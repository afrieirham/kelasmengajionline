import { HydrateClient } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex h-screen flex-col items-center justify-center gap-y-4 px-2">
        <div className="relative flex items-center space-x-2">
          <Image
            src="/favicon.ico"
            width={100}
            height={100}
            className="h-12 w-12"
            alt="Logo Kelas Mengaji Online"
          />
          <div className="flex flex-col">
            <h1 className="font-bold">Kelas Mengaji Online</h1>
            <p className="text-sm text-gray-500">
              Senarai kelas mengaji online di Malaysia.
            </p>
          </div>
        </div>
        <div className="absolute bottom-5 flex items-center space-x-2 text-xs text-gray-500">
          <span>
            Built by{" "}
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
            Logo by{" "}
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
      </main>
    </HydrateClient>
  );
}

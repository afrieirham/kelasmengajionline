import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/pengajar" className="flex items-center gap-2 font-semibold">
      <Image
        src="/favicon.ico"
        width={200}
        height={200}
        className="h-8 w-8"
        alt="Logo Kelas Mengaji Online"
      />
      <p className="text-sm">Kelas Mengaji Online</p>
    </Link>
  );
}

export default Logo;

"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PhoneIcon, PresentationIcon, UsersRoundIcon } from "lucide-react";

import Logo from "./logo";

function Nav({ type }: { type: "desktop" | "mobile" }) {
  if (type === "mobile") {
    return (
      <nav className="grid gap-2 text-sm font-medium">
        <Logo />
        <div className="mt-4 flex flex-col space-y-2">
          <Links />
        </div>
      </nav>
    );
  }

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium sm:px-4">
      <Links />
    </nav>
  );
}

export default Nav;

function Links() {
  const pathname = usePathname();
  const [links, setLinks] = useState([
    {
      title: "Pengajar",
      href: "/pengajar",
      Icon: UsersRoundIcon,
      active: false,
    },
    {
      title: "Kelas",
      href: "/kelas",
      Icon: PresentationIcon,
      active: false,
    },
    {
      title: "Perhubungan",
      href: "/perhubungan",
      Icon: PhoneIcon,
      active: false,
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLinks((links) =>
        links.map((link) =>
          link.href === "/pengajar" ? { ...link, active: true } : link,
        ),
      );
    }, 2000);
    setTimeout(() => {
      setLinks((links) =>
        links.map((link) =>
          link.href === "/kelas" || link.href === "/pengajar"
            ? { ...link, active: true }
            : link,
        ),
      );
    }, 4000);
    setTimeout(() => {
      setLinks((links) =>
        links.map((link) =>
          link.href === "/kelas" ||
          link.href === "/pengajar" ||
          link.href === "/perhubungan"
            ? { ...link, active: true }
            : link,
        ),
      );
    }, 6000);
  }, []);

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          data-active={pathname.startsWith(link.href)}
          className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary data-[active=true]:bg-gray-200 data-[active=true]:text-primary"
        >
          <div className="flex items-center space-x-2">
            <link.Icon className="h-4 w-4" />
            <span>{link.title}</span>
          </div>
          <div className="relative h-2 w-2">
            <div
              data-active={link.active}
              className="absolute h-full w-full animate-ping rounded-full bg-red-500 data-[active=true]:hidden"
            />
            <div
              data-active={link.active}
              className="absolute h-full w-full rounded-full data-[active=false]:bg-red-500 data-[active=true]:bg-emerald-500"
            />
          </div>
        </Link>
      ))}
    </>
  );
}

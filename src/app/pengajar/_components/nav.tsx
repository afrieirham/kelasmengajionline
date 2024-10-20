"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { UsersRoundIcon } from "lucide-react";

import Logo from "./logo";

const links = [
  {
    title: "Pengajar",
    href: "/pengajar",
    Icon: UsersRoundIcon,
  },
];

function Nav({ type }: { type: "desktop" | "mobile" }) {
  const pathname = usePathname();

  if (type === "mobile") {
    return (
      <nav className="grid gap-2 text-sm font-medium">
        <Logo />
        <div className="mt-4 flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={pathname.startsWith(link.href)}
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-primary"
            >
              <link.Icon className="h-4 w-4" />
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="grid items-start px-2 text-sm font-medium sm:px-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          data-active={pathname.startsWith(link.href)}
          className="flex items-center space-x-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-gray-200 hover:text-primary data-[active=true]:bg-gray-200 data-[active=true]:text-primary"
        >
          <link.Icon className="h-4 w-4" />
          <span>{link.title}</span>
        </Link>
      ))}
    </nav>
  );
}

export default Nav;

import { type Metadata } from "next";

import { SignedIn } from "@clerk/nextjs";
import { Menu } from "lucide-react";

import ClerkUserButton from "@/components/common/clerk-user-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import CTACard from "./_components/cta-card";
import Logo from "./_components/logo";
import Nav from "./_components/nav";

export const metadata: Metadata = {
  title: "Dashboard | Kelas Mengaji Online",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SignedIn>
      <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="bg-muted/40 hidden h-screen border-r md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[8dvh] items-center border-b px-4 sm:px-6">
              <Logo />
            </div>
            <div className="flex-1">
              <Nav type="desktop" />
            </div>
            <div className="mt-auto p-4">
              <CTACard />
            </div>
          </div>
        </div>
        <div className="flex h-screen flex-col overflow-scroll">
          <header className="bg-muted/40 flex h-[8dvh] items-center justify-between gap-4 border-b px-4 sm:justify-end sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <Nav type="mobile" />
                <div className="mt-auto">
                  <CTACard />
                </div>
              </SheetContent>
            </Sheet>
            <ClerkUserButton />
          </header>
          <main className="flex h-[92dvh] flex-1 flex-col gap-4 overflow-scroll p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SignedIn>
  );
}

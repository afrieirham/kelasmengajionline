"use client";
import { useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserRole } from "@/enums";

export default function PengajarPage() {
  const [parent] = useAutoAnimate();

  const [type, setType] = useState<UserRole | "">("");

  return (
    <div>
      <p className="text-lg font-bold">Maklumat Pengajar</p>
      <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
        <div className="w-full space-y-6" ref={parent}>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="instructor-type">Jenis Pengajar</Label>
            <Select
              value={type}
              onValueChange={(value: UserRole) => setType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis pengajar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserRole.Individual}>Individu</SelectItem>
                <SelectItem value={UserRole.Organization}>
                  Organisasi
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {type === UserRole.Individual && (
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="instructor-type">Jantina Pengajar</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jantina pengajar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lelaki">Lelaki</SelectItem>
                  <SelectItem value="perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="logo">Gambar</Label>
            <Input id="logo" type="file" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" />
          </div>
        </div>
        <div className="w-full space-y-6">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" placeholder="afrieirham.com" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-2">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <div className="flex rounded-lg shadow-sm shadow-black/[.04]">
                <span className="inline-flex items-center rounded-l-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                  facebook.com/
                </span>
                <Input
                  id="facebook"
                  className="-ml-px rounded-l-none shadow-none"
                  placeholder="afrieirham"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>

              <div className="flex rounded-lg shadow-sm shadow-black/[.04]">
                <span className="inline-flex items-center rounded-l-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                  instagram.com/
                </span>
                <Input
                  id="instagram"
                  className="-ml-px rounded-l-none shadow-none"
                  placeholder="afrieirham"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <div className="space-y-2">
              <Label htmlFor="tiktok">TikTok</Label>
              <div className="flex rounded-lg shadow-sm shadow-black/[.04]">
                <span className="inline-flex items-center rounded-l-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                  tiktok.com/
                </span>
                <Input
                  id="tiktok"
                  className="-ml-px rounded-l-none shadow-none"
                  placeholder="@afrieirham"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <div className="flex rounded-lg shadow-sm shadow-black/[.04]">
                <span className="inline-flex items-center rounded-l-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                  x.com/
                </span>
                <Input
                  id="twitter"
                  className="-ml-px rounded-l-none shadow-none"
                  placeholder="afrieirham_"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-b-lg border-x border-b bg-gray-100 px-6 py-4">
        <Button>Simpan</Button>
      </div>
    </div>
  );
}

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

enum instructor {
  individual = "individual",
  organization = "organization",
}

export default function DashboardPage() {
  const [parent] = useAutoAnimate();
  const [type, setType] = useState(instructor.organization);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-lg font-bold">Maklumat Pengajar</p>
          <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
            <div className="w-full space-y-6" ref={parent}>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="instructor-type">Jenis Pengajar</Label>
                <Select
                  value={type}
                  onValueChange={(value: instructor) => setType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis pengajar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={instructor.individual}>
                      Individu
                    </SelectItem>
                    <SelectItem value={instructor.organization}>
                      Organisasi
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {type === instructor.individual && (
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
                <Input id="website" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="tiktok">TikTok</Label>
                <Input id="tiktok" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" />
              </div>
            </div>
          </div>
          <div className="w-full rounded-b-lg border-x border-b bg-gray-100 px-6 py-4">
            <Button>Simpan</Button>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold">Maklumat Perhubungan</p>
          <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
            <div className="w-full space-y-6">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="phone">Nombor Telefon</Label>
                <Input id="phone" placeholder="60 13 123 1234" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="message">Template Mesej (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Asalamualaikum, saya berminat untuk sertai kelas mengaji online."
                />
              </div>
            </div>
          </div>
          <div className="w-full rounded-b-lg border-x border-b bg-gray-100 px-6 py-4">
            <Button>Simpan</Button>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold">Maklumat Kelas</p>
          <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
            <div className="w-full space-y-6" ref={parent}>
              {type === instructor.organization && (
                <div className="grid w-full max-w-sm items-center gap-2">
                  <p className="text-sm font-medium">
                    Pengajar terdiri daripada
                  </p>
                  {[{ title: "Guru lelaki" }, { title: "Guru perempuan" }].map(
                    (tag, i) => (
                      <div
                        key={String(`${tag.title}-${i}`)}
                        className="flex items-center gap-2"
                      >
                        {tag.title && (
                          <input
                            type="checkbox"
                            id={String(`${tag.title}-${i}`)}
                          />
                        )}
                        <Label
                          htmlFor={String(`${tag.title}-${i}`)}
                          className="font-normal"
                        >
                          {tag.title}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              )}
              <div className="grid w-full max-w-sm items-center gap-2">
                <p className="text-sm font-medium">Penyertaan Kelas</p>
                {[
                  { title: "Kelas individu" },
                  { title: "Kelas berkumpulan" },
                ].map((tag, i) => (
                  <div
                    key={String(`${tag.title}-${i}`)}
                    className="flex items-center gap-2"
                  >
                    {tag.title && (
                      <input type="checkbox" id={String(`${tag.title}-${i}`)} />
                    )}
                    <Label
                      htmlFor={String(`${tag.title}-${i}`)}
                      className="font-normal"
                    >
                      {tag.title}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <p className="text-sm font-medium">Menerima Pelajar</p>
                {[
                  { title: "Kanak-kanak lelaki" },
                  { title: "Remaja lelaki" },
                  { title: "Dewasa lelaki" },
                  { title: "Warga emas lelaki" },
                  { title: "Kanak-kanak perempuan" },
                  { title: "Remaja perempuan" },
                  { title: "Dewasa perempuan" },
                  { title: "Warga emas perempuan" },
                ].map((tag, i) => (
                  <div
                    key={String(`${tag.title}-${i}`)}
                    className="flex items-center gap-2"
                  >
                    {tag.title && (
                      <input type="checkbox" id={String(`${tag.title}-${i}`)} />
                    )}
                    <Label
                      htmlFor={String(`${tag.title}-${i}`)}
                      className="font-normal"
                    >
                      {tag.title}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="grid w-full max-w-sm items-center gap-2">
                <p className="text-sm font-medium">Format Kelas</p>
                {[
                  { title: "Kelas online" },
                  { title: "Kelas fizikal di tempat kami" },
                  { title: "Kelas fizikal di tempat student" },
                ].map((tag, i) => (
                  <div
                    key={String(`${tag.title}-${i}`)}
                    className="flex items-center gap-2"
                  >
                    {tag.title && (
                      <input type="checkbox" id={String(`${tag.title}-${i}`)} />
                    )}
                    <Label
                      htmlFor={String(`${tag.title}-${i}`)}
                      className="font-normal"
                    >
                      {tag.title}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <p className="text-sm font-medium">Yuran Kelas</p>
                {[
                  { title: "Tiada yuran pendaftaran" },
                  { title: "Yuran flexible" },
                  { title: "Yuran tetap bulanan" },
                  { title: "Yuran tetap mengikut sesi" },
                  { title: "Yuran tetap mengikut umur pelajar" },
                  { title: "Bayaran seikhlas hati" },
                ].map((tag, i) => (
                  <div
                    key={String(`${tag.title}-${i}`)}
                    className="flex items-center gap-2"
                  >
                    {tag.title && (
                      <input type="checkbox" id={String(`${tag.title}-${i}`)} />
                    )}
                    <Label
                      htmlFor={String(`${tag.title}-${i}`)}
                      className="font-normal"
                    >
                      {tag.title}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <p className="text-sm font-medium">Jadual Kelas</p>
                {[
                  { title: "Hari/masa flexible" },
                  { title: "Boleh ganti kelas" },
                ].map((tag, i) => (
                  <div
                    key={String(`${tag.title}-${i}`)}
                    className="flex items-center gap-2"
                  >
                    {tag.title && (
                      <input type="checkbox" id={String(`${tag.title}-${i}`)} />
                    )}
                    <Label
                      htmlFor={String(`${tag.title}-${i}`)}
                      className="font-normal"
                    >
                      {tag.title}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <p className="text-sm font-medium">Pilih yang berkenaan</p>
                {[
                  { title: "Kelas percubaan percuma" },
                  { title: "Boleh pilih Ustaz/Ustazah" },
                  { title: "Sijil disediakan" },
                  { title: "Laporan prestasi disediakan" },
                ].map((tag, i) => (
                  <div
                    key={String(`${tag.title}-${i}`)}
                    className="flex items-center gap-2"
                  >
                    {tag.title && (
                      <input type="checkbox" id={String(`${tag.title}-${i}`)} />
                    )}
                    <Label
                      htmlFor={String(`${tag.title}-${i}`)}
                      className="font-normal"
                    >
                      {tag.title}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full rounded-b-lg border-x border-b bg-gray-100 px-6 py-4">
            <Button>Simpan</Button>
          </div>
        </div>
      </div>
    </>
  );
}

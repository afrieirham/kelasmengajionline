"use client";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [parent] = useAutoAnimate();

  const [type, setType] = useState(instructor.organization);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

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
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>

                  <div className="flex rounded-lg shadow-sm shadow-black/[.04]">
                    <span className="inline-flex items-center rounded-l-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                      https://instagram.com/
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
                      https://tiktok.com/
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
                      https://x.com/
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
        <div>
          <p className="text-lg font-bold">Maklumat Perhubungan (WhatsApp)</p>
          <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
            <div className="w-full space-y-6">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="phone">Nombor Telefon</Label>
                <Input
                  id="phone"
                  placeholder="60 13 123 1234"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="message">Template Mesej (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Asalamualaikum, saya berminat untuk sertai kelas mengaji online."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                disabled={!phone}
                className="space-x-2"
                onClick={() =>
                  void router.push(
                    `https://wa.me/${phone}${message ? `?text=${encodeURI(message)}` : ""}`,
                  )
                }
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Cuba Link</span>
              </Button>
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
                <p className="text-sm">Lelaki</p>
                {[
                  { title: "Kanak-kanak (12 tahun dan ke bawah)" },
                  { title: "Remaja (13 tahun dan ke atas)" },
                  { title: "Dewasa (18 tahun dan ke atas)" },
                  { title: "Warga emas (60 tahun dan ke atas)" },
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
                <p className="mt-2 text-sm">Perempuan</p>
                {[
                  { title: "Kanak-kanak (12 tahun dan ke bawah)" },
                  { title: "Remaja (13 tahun dan ke atas)" },
                  { title: "Dewasa (18 tahun dan ke atas)" },
                  { title: "Warga emas (60 tahun dan ke atas)" },
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
                <p className="text-sm">Yuran Tetap</p>
                {[
                  { title: "Bulanan" },
                  { title: "Mengikut sesi" },
                  { title: "Mengikut umur pelajar" },
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
                <p className="mt-2 text-sm">Yuran Flexible</p>
                {[
                  { title: "Pelajar tentukan yuran" },
                  { title: "Tiada yuran pendaftaran" },
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

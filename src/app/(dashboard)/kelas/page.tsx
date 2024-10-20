"use client";

import React from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { instructor } from "../pengajar/page";

function KelasPage() {
  const type = instructor.organization;
  const [parent] = useAutoAnimate();

  return (
    <div>
      <p className="text-lg font-bold">Maklumat Kelas</p>
      <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
        <div className="w-full space-y-6" ref={parent}>
          {type === instructor.organization && (
            <div className="grid w-full max-w-sm items-center gap-2">
              <p className="text-sm font-medium">Pengajar terdiri daripada</p>
              {[{ title: "Guru lelaki" }, { title: "Guru perempuan" }].map(
                (tag, i) => (
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
                ),
              )}
            </div>
          )}
          <div className="grid w-full max-w-sm items-center gap-2">
            <p className="text-sm font-medium">Penyertaan Kelas</p>
            {[{ title: "Kelas individu" }, { title: "Kelas berkumpulan" }].map(
              (tag, i) => (
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
              ),
            )}
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
  );
}

export default KelasPage;

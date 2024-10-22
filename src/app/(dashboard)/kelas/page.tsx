import React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { instructor } from "../types";

function KelasPage() {
  const type = instructor.organization;

  return (
    <div>
      <p className="text-lg font-bold">Maklumat Kelas</p>
      <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
        <div className="w-full space-y-6">
          {type === instructor.organization && (
            <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
              <p className="text-sm font-medium">Pengajar terdiri daripada</p>
              {[{ title: "Guru lelaki" }, { title: "Guru perempuan" }].map(
                (tag, i) => (
                  <div
                    key={String(`${tag.title}-${i}`)}
                    className="flex items-center gap-2"
                  >
                    <input type="checkbox" id={String(`${tag.title}-${i}`)} />
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
          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Penyertaan Kelas</p>
            {[{ title: "Kelas individu" }, { title: "Kelas berkumpulan" }].map(
              (tag, i) => (
                <div
                  key={String(`${tag.title}-${i}`)}
                  className="flex items-center gap-2"
                >
                  <input type="checkbox" id={String(`${tag.title}-${i}`)} />
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
          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Menerima Pelajar</p>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium underline">Lelaki</p>
                {[
                  { title: "Kanak-kanak (12 tahun dan ke bawah)" },
                  { title: "Remaja (13 tahun dan ke atas)" },
                  { title: "Dewasa (18 tahun dan ke atas)" },
                  { title: "Warga emas (60 tahun dan ke atas)" },
                ].map((tag, i) => (
                  <div
                    key={String(`l-${tag.title}-${i}`)}
                    className="flex items-center gap-2"
                  >
                    <input type="checkbox" id={String(`l-${tag.title}-${i}`)} />
                    <Label
                      htmlFor={String(`l-${tag.title}-${i}`)}
                      className="font-normal"
                    >
                      {tag.title}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium underline">Perempuan</p>
                {[
                  { title: "Kanak-kanak (12 tahun dan ke bawah)" },
                  { title: "Remaja (13 tahun dan ke atas)" },
                  { title: "Dewasa (18 tahun dan ke atas)" },
                  { title: "Warga emas (60 tahun dan ke atas)" },
                ].map((tag, i) => (
                  <div
                    key={String(`p-${tag.title}-${i}`)}
                    className="flex items-center gap-2"
                  >
                    <input type="checkbox" id={String(`p-${tag.title}-${i}`)} />
                    <Label
                      htmlFor={String(`p-${tag.title}-${i}`)}
                      className="font-normal"
                    >
                      {tag.title}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Format Kelas</p>
            {[
              { title: "Kelas online" },
              { title: "Kelas fizikal di tempat student" },
              { title: "Kelas fizikal di tempat kami" },
            ].map((tag, i) => (
              <div
                key={String(`${tag.title}-${i}`)}
                className="flex items-center gap-2"
              >
                <input type="checkbox" id={String(`${tag.title}-${i}`)} />
                <Label
                  htmlFor={String(`${tag.title}-${i}`)}
                  className="font-normal"
                >
                  {tag.title}
                </Label>
              </div>
            ))}
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Yuran Kelas</p>
            {[
              { title: "Tiada yuran pendaftaran" },
              { title: "Pelajar tentukan yuran" },
              { title: "Bayaran seikhlas hati" },
              { title: "Kelas percuma" },
            ].map((tag, i) => (
              <div
                key={String(`${tag.title}-${i}`)}
                className="flex items-center gap-2"
              >
                <input type="checkbox" id={String(`${tag.title}-${i}`)} />
                <Label
                  htmlFor={String(`${tag.title}-${i}`)}
                  className="font-normal"
                >
                  {tag.title}
                </Label>
              </div>
            ))}
          </div>

          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Jadual Kelas</p>
            {[
              { title: "Hari/masa flexible" },
              { title: "Boleh ganti kelas" },
              { title: "Pelajar tentukan jadual" },
            ].map((tag, i) => (
              <div
                key={String(`${tag.title}-${i}`)}
                className="flex items-center gap-2"
              >
                <input type="checkbox" id={String(`${tag.title}-${i}`)} />
                <Label
                  htmlFor={String(`${tag.title}-${i}`)}
                  className="font-normal"
                >
                  {tag.title}
                </Label>
              </div>
            ))}
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
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
                <input type="checkbox" id={String(`${tag.title}-${i}`)} />
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

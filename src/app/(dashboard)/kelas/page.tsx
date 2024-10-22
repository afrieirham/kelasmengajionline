import React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/enums";
import { db } from "@/server/db";

async function KelasPage() {
  const type = UserRole.Organization;
  const tags = await db.query.tag.findMany();
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const tagIds: string[] = [];
        formData.forEach((value) => {
          if (value) {
            tagIds.push(value as string);
          }
        });

        console.log(tagIds);
      }}
    >
      <p className="text-lg font-bold">Maklumat Kelas</p>
      <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
        <div className="w-full space-y-6">
          {type === UserRole.Organization && (
            <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
              <p className="text-sm font-medium">Pengajar terdiri daripada</p>
              {tags
                .filter((tag) => tag.group === "teacher_gender")
                .map((tag) => (
                  <div key={tag.id} className="flex items-center gap-2">
                    <input
                      id={tag.id}
                      type="checkbox"
                      name={tag.group}
                      value={tag.id}
                    />
                    <Label htmlFor={tag.id} className="font-normal">
                      {tag.name}
                    </Label>
                  </div>
                ))}
            </div>
          )}
          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Penyertaan Kelas</p>
            {tags
              .filter((tag) => tag.group === "class_participation")
              .map((tag) => (
                <div key={tag.id} className="flex items-center gap-2">
                  <input
                    id={tag.id}
                    type="checkbox"
                    name={tag.group}
                    value={tag.id}
                  />
                  <Label htmlFor={tag.id} className="font-normal">
                    {tag.name}
                  </Label>
                </div>
              ))}
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Menerima Pelajar</p>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium underline">Lelaki</p>
                {tags
                  .filter((tag) => tag.group === "accepted_male_students")
                  .map((tag) => (
                    <div key={tag.id} className="flex items-center gap-2">
                      <input
                        id={tag.id}
                        type="checkbox"
                        name={tag.group}
                        value={tag.id}
                      />
                      <Label htmlFor={tag.id} className="font-normal">
                        {tag.name}
                      </Label>
                    </div>
                  ))}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium underline">Perempuan</p>
                {tags
                  .filter((tag) => tag.group === "accepted_female_students")
                  .map((tag) => (
                    <div key={tag.id} className="flex items-center gap-2">
                      <input
                        id={tag.id}
                        type="checkbox"
                        name={tag.group}
                        value={tag.id}
                      />
                      <Label htmlFor={tag.id} className="font-normal">
                        {tag.name}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Format Kelas</p>
            {tags
              .filter((tag) => tag.group === "class_format")
              .map((tag) => (
                <div key={tag.id} className="flex items-center gap-2">
                  <input
                    id={tag.id}
                    type="checkbox"
                    name={tag.group}
                    value={tag.id}
                  />
                  <Label htmlFor={tag.id} className="font-normal">
                    {tag.name}
                  </Label>
                </div>
              ))}
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Yuran Kelas</p>
            {tags
              .filter((tag) => tag.group === "class_fee")
              .map((tag) => (
                <div key={tag.id} className="flex items-center gap-2">
                  <input
                    id={tag.id}
                    type="checkbox"
                    name={tag.group}
                    value={tag.id}
                  />
                  <Label htmlFor={tag.id} className="font-normal">
                    {tag.name}
                  </Label>
                </div>
              ))}
          </div>

          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Jadual Kelas</p>
            {tags
              .filter((tag) => tag.group === "class_schedule")
              .map((tag) => (
                <div key={tag.id} className="flex items-center gap-2">
                  <input
                    id={tag.id}
                    type="checkbox"
                    name={tag.group}
                    value={tag.id}
                  />
                  <Label htmlFor={tag.id} className="font-normal">
                    {tag.name}
                  </Label>
                </div>
              ))}
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Pilih yang berkenaan</p>
            {tags
              .filter((tag) => tag.group === "others")
              .map((tag) => (
                <div key={tag.id} className="flex items-center gap-2">
                  <input
                    id={tag.id}
                    type="checkbox"
                    name={tag.group}
                    value={tag.id}
                  />
                  <Label htmlFor={tag.id} className="font-normal">
                    {tag.name}
                  </Label>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full rounded-b-lg border-x border-b bg-gray-100 px-6 py-4">
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  );
}

export default KelasPage;

import "dotenv/config";
import { exit } from "process";

import { type TagGroupType } from "@/types";
import { db } from "../db";
import { tag as tagSchema } from "./schema";

type Tag = {
  name: string;
  group: TagGroupType;
  order: string;
  slug: string;
};

const createTag = (
  name: string,
  group: TagGroupType,
  order: string,
  slug?: string,
): Tag => ({
  name,
  group,
  order,
  slug: slug
    ? slug
    : name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, ""),
});

// prettier-ignore
const tags: Tag[] = [
  createTag("Guru Lelaki", "teacher_gender", "1"),
  createTag("Guru Perempuan", "teacher_gender", "2"),

  createTag("Kelas Individu", "class_participation", "1"),
  createTag("Kelas Berkumpulan", "class_participation", "2"),

  createTag("Kanak-kanak (12 tahun dan ke bawah)", "accepted_male_students", "1", "kanak-kanak-lelaki"),
  createTag("Remaja (13 tahun dan ke atas)", "accepted_male_students", "2", "remaja-lelaki"),
  createTag("Dewasa (18 tahun dan ke atas)", "accepted_male_students", "3", "lelaki-dewasa"),
  createTag("Warga emas (60 tahun dan ke atas)", "accepted_male_students", "4", "lelaki-warga-emas"),
  
  createTag("Kanak-kanak (12 tahun dan ke bawah)", "accepted_female_students", "1", "kanak-kanak-perempuan"),
  createTag("Remaja (13 tahun dan ke atas)", "accepted_female_students", "2", "remaja-perempuan"),
  createTag("Dewasa (18 tahun dan ke atas)", "accepted_female_students", "3", "perempuan-dewasa"),
  createTag("Warga emas (60 tahun dan ke atas)", "accepted_female_students", "4", "perempuan-warga-emas"),

  createTag("Kelas online", "class_format", "1"),
  createTag("Kelas fizikal di tempat student", "class_format", "2"),
  createTag("Kelas fizikal di tempat kami", "class_format", "3"),

  createTag("Tiada yuran pendaftaran", "class_fee", "1"),
  createTag("Pelajar tentukan yuran", "class_fee", "2"),
  createTag("Bayaran seikhlas hati", "class_fee", "3"),
  createTag("Kelas percuma", "class_fee", "4"),

  createTag("Hari/masa flexible", "class_schedule", "1", "jadual-flexible"),
  createTag("Boleh ganti kelas", "class_schedule", "2"),
  createTag("Pelajar tentukan jadual", "class_schedule", "3"),

  createTag("Kelas percubaan percuma", "others", "1"),
  createTag("Boleh pilih Ustaz/Ustazah", "others", "2"),
  createTag("Sijil disediakan", "others", "3"),
  createTag("Laporan prestasi disediakan", "others", "4"),
];

const seed = async () => {
  const result = await Promise.allSettled(
    tags.map((tag) =>
      db.insert(tagSchema).values({
        name: tag.name,
        group: tag.group,
        order: tag.order,
        slug: tag.slug,
      }),
    ),
  );

  console.log(result);
  exit();
};

await seed();

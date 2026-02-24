/** biome-ignore-all lint/suspicious/noConsole: <> */
import "dotenv/config";
import { db } from "./index";
import { tags } from "./schema";

const tagsData = [
  // --- Teacher Gender ---
  {
    name: "Ustaz (Lelaki)",
    slug: "ustaz",
    group: "teacher_gender" as const,
    order: 1,
    metaTitle: "Senarai Ustaz (Guru Lelaki) | Kelas Mengaji Online",
    pageTitle: "Guru Mengaji Lelaki (Ustaz)",
  },
  {
    name: "Ustazah (Perempuan)",
    slug: "ustazah",
    group: "teacher_gender" as const,
    order: 2,
    metaTitle: "Senarai Ustazah (Guru Perempuan) | Kelas Mengaji Online",
    pageTitle: "Guru Mengaji Perempuan (Ustazah)",
  },

  // --- Target Audience (The Matrix) ---
  {
    name: "Kanak-kanak",
    slug: "kanak-kanak",
    group: "target_audience" as const,
    order: 1,
    metaTitle: "Kelas Mengaji Online Kanak-kanak | Belajar Iqra & Al-Quran",
    pageTitle: "Kelas Mengaji untuk Kanak-kanak",
  },
  {
    name: "Remaja Lelaki",
    slug: "remaja-lelaki",
    group: "target_audience" as const,
    order: 2,
    metaTitle: "Kelas Mengaji Remaja Lelaki Online",
    pageTitle: "Kelas Mengaji untuk Remaja Lelaki",
  },
  {
    name: "Remaja Perempuan",
    slug: "remaja-perempuan",
    group: "target_audience" as const,
    order: 3,
    metaTitle: "Kelas Mengaji Remaja Perempuan Online",
    pageTitle: "Kelas Mengaji untuk Remaja Perempuan",
  },
  {
    name: "Lelaki Dewasa",
    slug: "lelaki-dewasa",
    group: "target_audience" as const,
    order: 4,
    metaTitle: "Kelas Mengaji Lelaki Dewasa | Tajwid & Talaqqi",
    pageTitle: "Kelas Mengaji untuk Lelaki Dewasa",
  },
  {
    name: "Perempuan Dewasa",
    slug: "perempuan-dewasa",
    group: "target_audience" as const,
    order: 5,
    metaTitle: "Kelas Mengaji Perempuan Dewasa (Muslimah) Online",
    pageTitle: "Kelas Mengaji untuk Muslimah/Wanita",
  },
  {
    name: "Warga Emas",
    slug: "warga-emas",
    group: "target_audience" as const,
    order: 6,
    metaTitle: "Kelas Mengaji Warga Emas Online",
    pageTitle: "Kelas Mengaji untuk Warga Emas",
  },

  // --- Class Format ---
  {
    name: "Kelas Online",
    slug: "online",
    group: "class_format" as const,
    order: 1,
    metaTitle: "Senarai Kelas Mengaji Online (Zoom/Google Meet)",
    pageTitle: "Kelas Mengaji Secara Online",
  },
  {
    name: "Hybrid (Online + Fizikal)",
    slug: "hybrid",
    group: "class_format" as const,
    order: 2,
    metaTitle: "Kelas Mengaji Hybrid (Online + Fizikal)",
    pageTitle: "Kelas Mengaji Secara Hybrid",
  },
  {
    name: "Fizikal (Rumah Pelajar)",
    slug: "fizikal-rumah",
    group: "class_format" as const,
    order: 3,
    metaTitle: "Guru Mengaji ke Rumah (Home Tutoring)",
    pageTitle: "Kelas Mengaji Fizikal ke Rumah",
  },
  {
    name: "Fizikal (Pusat Mengaji)",
    slug: "fizikal-pusat",
    group: "class_format" as const,
    order: 4,
    metaTitle: "Kelas Mengaji di Pusat / Madrasah",
    pageTitle: "Kelas Mengaji di Pusat Pembelajaran",
  },

  // --- Class Fee ---
  {
    name: "Kelas Percuma",
    slug: "percuma",
    group: "class_fee" as const,
    order: 1,
    metaTitle: "Kelas Mengaji Percuma Online",
    pageTitle: "Senarai Kelas Mengaji Percuma",
  },
  {
    name: "Seikhlas Hati",
    slug: "seikhlas-hati",
    group: "class_fee" as const,
    order: 2,
    metaTitle: "Kelas Mengaji Bayaran Seikhlas Hati",
    pageTitle: "Kelas Mengaji (Sumbangan Seikhlas Hati)",
  },
  {
    name: "Yuran Tetap Bulanan",
    slug: "yuran-tetap",
    group: "class_fee" as const,
    order: 3,
    metaTitle: "Kelas Mengaji Yuran Tetap Bulanan",
    pageTitle: "Kelas Mengaji Berbayar (Yuran Tetap)",
  },
  {
    name: "Tiada Yuran Pendaftaran",
    slug: "tiada-yuran-pendaftaran",
    group: "class_fee" as const,
    order: 4,
    metaTitle: "Kelas Mengaji Tanpa Yuran Pendaftaran",
    pageTitle: "Kelas Mengaji (Tanpa Yuran Pendaftaran)",
  },

  // --- Educational Value ---
  {
    name: "Sijil Disediakan",
    slug: "sijil-disediakan",
    group: "educational_value" as const,
    order: 1,
    metaTitle: "Kelas Mengaji dengan Sijil Tamat Pengajian",
    pageTitle: "Kelas Mengaji (Sijil Disediakan)",
  },
  {
    name: "Laporan Prestasi",
    slug: "laporan-prestasi",
    group: "educational_value" as const,
    order: 2,
    metaTitle: "Kelas Mengaji dengan Laporan Prestasi Pelajar",
    pageTitle: "Kelas Mengaji dengan Laporan Prestasi",
  },
  {
    name: "Modul Hafazan",
    slug: "hafazan",
    group: "educational_value" as const,
    order: 3,
    metaTitle: "Kelas Hafazan Al-Quran Online",
    pageTitle: "Program Hafazan & Tahfiz Online",
  },

  // --- Class Policy ---
  {
    name: "Jadual Fleksibel",
    slug: "jadual-fleksibel",
    group: "class_policy" as const,
    order: 1,
    metaTitle: "Kelas Mengaji Jadual Masa Fleksibel",
    pageTitle: "Kelas dengan Jadual Masa Fleksibel",
  },
  {
    name: "Kelas Boleh Ganti ",
    slug: "kelas-boleh-ganti",
    group: "class_policy" as const,
    order: 2,
    metaTitle: "Kelas Mengaji: Polisi Ganti Kelas (Replacement)",
    pageTitle: "Kelas Mengaji (Boleh Ganti Kelas)",
  },

  // --- Perks ---
  {
    name: "Kelas Percubaan Percuma",
    slug: "kelas-percubaan-percuma",
    group: "perks" as const,
    order: 1,
    metaTitle: "Kelas Mengaji Online Free Trial (Percubaan Percuma)",
    pageTitle: "Kelas Mengaji dengan Percubaan Percuma",
  },
  {
    name: "Boleh Pilih Guru",
    slug: "boleh-pilih-guru",
    group: "perks" as const,
    order: 2,
    metaTitle: "Kelas Mengaji: Pilih Ustaz atau Ustazah Sendiri",
    pageTitle: "Kelas Mengaji (Boleh Pilih Guru)",
  },
];

async function seed() {
  console.log("🌱 Seeding tags...");

  await db
    .insert(tags)
    .values(tagsData.map((tag, idx) => ({ ...tag, id: `tag-${idx}` })))
    .onConflictDoNothing();
  console.log(`✅ Inserted ${tagsData.length} tags`);
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });

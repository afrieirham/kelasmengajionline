import "dotenv/config";
import { db } from "./index";
import { profiles, profilesToTags, tags } from "./schema";

const tagsData = [
  // audience
  {
    id: "tag_1",
    slug: "kanak-kanak",
    name: "Kanak-kanak",
    group: "audience" as const,
    order: 1,
  },
  {
    id: "tag_2",
    slug: "dewasa",
    name: "Dewasa",
    group: "audience" as const,
    order: 2,
  },
  {
    id: "tag_3",
    slug: "orang-tua",
    name: "Orang Tua",
    group: "audience" as const,
    order: 3,
  },

  // format
  {
    id: "tag_4",
    slug: "online",
    name: "Online",
    group: "format" as const,
    order: 1,
  },
  {
    id: "tag_5",
    slug: "fizikal",
    name: "Fizikal",
    group: "format" as const,
    order: 2,
  },
  {
    id: "tag_6",
    slug: "hybrid",
    name: "Hybrid",
    group: "format" as const,
    order: 3,
  },

  // fee
  {
    id: "tag_7",
    slug: "percuma",
    name: "Percuma",
    group: "fee" as const,
    order: 1,
  },
  {
    id: "tag_8",
    slug: "berbayar",
    name: "Berbayar",
    group: "fee" as const,
    order: 2,
  },

  // quality
  {
    id: "tag_9",
    slug: "verified",
    name: "Verified",
    group: "quality" as const,
    order: 1,
  },
  {
    id: "tag_10",
    slug: "boosted",
    name: "Boosted",
    group: "quality" as const,
    order: 2,
  },

  // policy
  {
    id: "tag_11",
    slug: "sijil-virik",
    name: "Sijil Viral",
    group: "policy" as const,
    order: 1,
  },
  {
    id: "tag_12",
    slug: "buku-texto",
    name: "Buku Texto",
    group: "policy" as const,
    order: 2,
  },

  // perks
  {
    id: "tag_13",
    slug: "bebas-cukai",
    name: "Bebas Cukai",
    group: "perks" as const,
    order: 1,
  },
  {
    id: "tag_14",
    slug: "sijil-pengiktirafan",
    name: "Sijil Pengiktirafan",
    group: "perks" as const,
    order: 2,
  },
];

const profilesData = [
  {
    id: "profile_1",
    slug: "ustadz-ahmad-quran",
    type: "individual" as const,
    name: "Ustadz Ahmad",
    headline: "Guru Quran & Tajwid Profesional",
    bio: "Saya berpengalaman lebih 10 tahun mengajar Quran dan Tajwid. Fokus kepada pengajian tartil dan qiraat. Sesuai untuk semua peringkat umur.",
    imageUrl:
      "https://images.unsplash.com/photo-1618383406944-0df8186c3aff?w=400&h=400&fit=crop",
    whatsappNumber: "+60123456789",
    websiteUrl: null,
    socialLinks: {
      facebook: "fb.com/ustadzahmad",
      instagram: "instagram.com/ustadzahmad",
    },
    isClaimed: false,
    isVerified: true,
    isBoosted: false,
    ownerId: null,
  },
  {
    id: "profile_2",
    slug: "cikgu-sarah-tajwid",
    type: "individual" as const,
    name: "Cikgu Sarah",
    headline: "Pakar Tajwid & Tilawah",
    bio: "Graduan Sains Islam dari Universiti Malaya. Mengajar tajwid dengan kaedah yang mudah dan sistematik. Kelas online available.",
    imageUrl:
      "https://images.unsplash.com/photo-1580220810949-e7ddee6a4954?w=400&h=400&fit=crop",
    whatsappNumber: "+60119876543",
    websiteUrl: "https://cikgusarah.my",
    socialLinks: {
      instagram: "instagram.com/cikgusarah",
      youtube: "youtube.com/@cikgusarah",
    },
    isClaimed: true,
    isVerified: true,
    isBoosted: true,
    ownerId: null,
  },
  {
    id: "profile_3",
    slug: "madrasah-al-munawwarah",
    type: "organization" as const,
    name: "Madrasah Al-Munawwarah",
    headline: "Sekolah Mengaji & Islamiyah",
    bio: "Madrasah yang menawarkan pengajian Quran, Tajwid, Fiqh, dan Akidah untuk kanak-kanak dan dewasa. Berlocasi di Shah Alam.",
    imageUrl:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=400&fit=crop",
    whatsappNumber: "+60355231234",
    websiteUrl: "https://almunawwarah.edu.my",
    socialLinks: {
      facebook: "fb.com/almunawwarah",
      instagram: "instagram.com/almunawwarah",
    },
    isClaimed: true,
    isVerified: true,
    isBoosted: false,
    ownerId: null,
  },
  {
    id: "profile_4",
    slug: "kelas-mengaji-online",
    type: "individual" as const,
    name: "Kelas Mengaji Malaysia",
    headline: "Platform Pembelajaran Quran Online",
    bio: "Platform online yang menyediakan kelas mengaji untuk semua peringkat. Mula ditubuhkan pada 2020. Mempunyai lebih 5000 students.",
    imageUrl:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop",
    whatsappNumber: "+601112345678",
    websiteUrl: "https://kelasmengaji.online",
    socialLinks: {
      instagram: "instagram.com/kelasmengaji",
      tiktok: "tiktok.com/@kelasmengaji",
      youtube: "youtube.com/@kelasmengaji",
    },
    isClaimed: true,
    isVerified: true,
    isBoosted: true,
    ownerId: null,
  },
  {
    id: "profile_5",
    slug: "yayasan-quran-malaysia",
    type: "organization" as const,
    name: "Yayasan Quran Malaysia",
    headline: "Badan Amal Pengajian Quran",
    bio: "Yayasan tidak berasaskan keuntungan yang ditubuhkan untuk promotes pengajian Quran di Malaysia. Menyediakan kelas percuma untuk Asnaf.",
    imageUrl:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400&h=400&fit=crop",
    whatsappNumber: "+60326981234",
    websiteUrl: "https://yqm.org.my",
    socialLinks: {
      facebook: "fb.com/yqm",
      instagram: "instagram.com/yayasanquranmalaysia",
    },
    isClaimed: true,
    isVerified: true,
    isBoosted: false,
    ownerId: null,
  },
];

const profilesToTagsData = [
  // Ustadz Ahmad - individual, dewasa, online, berbayar, verified
  { profileId: "profile_1", tagId: "tag_2" }, // dewasa
  { profileId: "profile_1", tagId: "tag_4" }, // online
  { profileId: "profile_1", tagId: "tag_8" }, // berbayar
  { profileId: "profile_1", tagId: "tag_9" }, // verified

  // Cikgu Sarah - individual, dewasa, online, hybrid, berbayar, verified, boosted
  { profileId: "profile_2", tagId: "tag_2" }, // dewasa
  { profileId: "profile_2", tagId: "tag_4" }, // online
  { profileId: "profile_2", tagId: "tag_6" }, // hybrid
  { profileId: "profile_2", tagId: "tag_8" }, // berbayar
  { profileId: "profile_2", tagId: "tag_9" }, // verified
  { profileId: "profile_2", tagId: "tag_10" }, // boosted

  // Madrasah Al-Munawwarah - organization, kanak-kanak, dewasa, fizikal, berbayar, verified
  { profileId: "profile_3", tagId: "tag_1" }, // kanak-kanak
  { profileId: "profile_3", tagId: "tag_2" }, // dewasa
  { profileId: "profile_3", tagId: "tag_5" }, // fizikal
  { profileId: "profile_3", tagId: "tag_8" }, // berbayar
  { profileId: "profile_3", tagId: "tag_9" }, // verified

  // Kelas Mengaji Malaysia - individual, kanak-kanak, dewasa, online, hybrid, berbayar, verified, boosted
  { profileId: "profile_4", tagId: "tag_1" }, // kanak-kanak
  { profileId: "profile_4", tagId: "tag_2" }, // dewasa
  { profileId: "profile_4", tagId: "tag_4" }, // online
  { profileId: "profile_4", tagId: "tag_6" }, // hybrid
  { profileId: "profile_4", tagId: "tag_8" }, // berbayar
  { profileId: "profile_4", tagId: "tag_9" }, // verified
  { profileId: "profile_4", tagId: "tag_10" }, // boosted

  // Yayasan Quran Malaysia - organization, kanak-kanak, dewasa, online, fizikal, percuma, verified
  { profileId: "profile_5", tagId: "tag_1" }, // kanak-kanak
  { profileId: "profile_5", tagId: "tag_2" }, // dewasa
  { profileId: "profile_5", tagId: "tag_4" }, // online
  { profileId: "profile_5", tagId: "tag_5" }, // fizikal
  { profileId: "profile_5", tagId: "tag_7" }, // percuma
  { profileId: "profile_5", tagId: "tag_9" }, // verified
];

async function seed() {
  console.log("🌱 Seeding database...");

  console.log("Inserting tags...");
  await db.insert(tags).values(tagsData).onConflictDoNothing();
  console.log(`✓ Inserted ${tagsData.length} tags`);

  console.log("Inserting profiles...");
  await db.insert(profiles).values(profilesData).onConflictDoNothing();
  console.log(`✓ Inserted ${profilesData.length} profiles`);

  console.log("Inserting profile-tag relations...");
  await db
    .insert(profilesToTags)
    .values(profilesToTagsData)
    .onConflictDoNothing();
  console.log(`✓ Inserted ${profilesToTagsData.length} profile-tag relations`);

  console.log("✅ Seeding complete!");
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });

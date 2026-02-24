import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// --- ENUMS ---
export const roleEnum = pgEnum("user_role", ["admin", "user"]);
export const profileTypeEnum = pgEnum("profile_type", [
  "individual",
  "organization",
]);
export const tagGroupEnum = pgEnum("tag_group", [
  "teacher_gender",
  "target_audience",
  "class_format",
  "class_fee",
  "educational_value",
  "class_policy",
  "perks",
]);

export const claimStatusEnum = pgEnum("claim_status", [
  "pending",
  "approved",
  "rejected",
]);

// --- BETTER AUTH TABLES ---
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  role: roleEnum("role").notNull().default("user"),
});

export const sessions = pgTable("sessions", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  accountId: integer("account_id").notNull(),
  providerId: integer("provider_id").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verifications = pgTable("verifications", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// --- KMO DIRECTORY TABLES ---

export const profiles = pgTable(
  "profiles",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    slug: text("slug").notNull().unique(),
    type: profileTypeEnum("type").notNull().default("individual"),

    // Content
    name: text("name").notNull(),
    headline: text("headline"),
    bio: text("bio"),
    imageUrl: text("image_url"),

    // Contacts
    whatsappNumber: text("whatsapp_number"),
    whatsappLabel: text("whatsapp_label"),
    websiteUrl: text("website_url"),
    socialLinks: jsonb("social_links")
      .$type<{
        facebook?: string;
        instagram?: string;
        tiktok?: string;
        youtube?: string;
      }>()
      .default({}),

    // Status
    isClaimed: boolean("is_claimed").notNull().default(false),
    isVerified: boolean("is_verified").notNull().default(false),
    isBoosted: boolean("is_boosted").notNull().default(false),

    // Ownership
    ownerId: integer("owner_id").references(() => users.id, {
      onDelete: "set null",
    }),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [uniqueIndex("slug_idx").on(table.slug)],
);

export const tags = pgTable("tags", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  group: tagGroupEnum("group").notNull(),
  order: integer("order").notNull().default(0),

  // SEO Fields
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  pageTitle: text("page_title"),
  descriptionText: text("description_text"),
});

// Junction table for Many-to-Many relationship (Profiles <-> Tags)
export const profilesToTags = pgTable(
  "profiles_to_tags",
  {
    profileId: integer("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.profileId, t.tagId] })],
);

export const claimRequests = pgTable(
  "claim_requests",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    profileId: integer("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    // Simplified: Just a message, verification happens on Telegram
    message: text("message"),

    status: claimStatusEnum("status").notNull().default("pending"),
    adminNotes: text("admin_notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    // Prevents the same user from submitting multiple requests for the same profile
    unique().on(t.userId, t.profileId),
  ],
);

// --- RELATIONS (For Drizzle Relational Queries) ---

export const userRelations = relations(users, ({ many }) => ({
  profiles: many(profiles),
  claimRequests: many(claimRequests),
}));

export const profileRelations = relations(profiles, ({ one, many }) => ({
  owner: one(users, {
    fields: [profiles.ownerId],
    references: [users.id],
  }),
  tags: many(profilesToTags),
  claimRequests: many(claimRequests),
}));

export const tagRelations = relations(tags, ({ many }) => ({
  profiles: many(profilesToTags),
}));

export const profilesToTagsRelations = relations(profilesToTags, ({ one }) => ({
  profile: one(profiles, {
    fields: [profilesToTags.profileId],
    references: [profiles.id],
  }),
  tag: one(tags, {
    fields: [profilesToTags.tagId],
    references: [tags.id],
  }),
}));

export const claimRequestRelations = relations(claimRequests, ({ one }) => ({
  profile: one(profiles, {
    fields: [claimRequests.profileId],
    references: [profiles.id],
  }),
  user: one(users, {
    fields: [claimRequests.userId],
    references: [users.id],
  }),
}));

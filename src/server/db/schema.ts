// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  numeric,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { TagGroupArray } from "@/enums";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kmo_${name}`);

// start users
export const Gender = pgEnum("Gender", ["male", "female"]);
export const UserRole = pgEnum("UserRole", [
  "individual",
  "organization",
  "admin",
]);
export const user = createTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),
  role: UserRole("role").notNull(),
  gender: Gender("gender"),
  photoUrl: text("photo_url"),
  name: varchar("name", { length: 256 }).notNull(),
  bio: varchar("bio", { length: 256 }),

  websiteUrl: text("website_url"),
  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  tiktokUrl: text("tiktok_url"),
  twitterUrl: text("twitter_url"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
export const userRelations = relations(user, ({ many }) => ({
  contact: many(contact),
  userToTag: many(userToTag),
}));
// end users

// start contacts
export const contact = createTable("contacts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),

  name: varchar("name", { length: 256 }).notNull(),
  message: text("message"),

  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
export const contactRelations = relations(contact, ({ one }) => ({
  user: one(user, {
    fields: [contact.userId],
    references: [user.id],
  }),
}));
// end contacts

// start tags
export const TagGroup = pgEnum("Group", TagGroupArray);
export const tag = createTable("tags", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),

  name: varchar("name", { length: 256 }).notNull(),
  group: TagGroup("group").notNull(),
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  order: numeric("order").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
export const tagRelations = relations(tag, ({ many }) => ({
  userToTag: many(userToTag),
}));
// end tags

// start user_to_tags
export const userToTag = createTable(
  "users_to_tags",
  {
    userId: text("user_id")
      .references(() => user.id)
      .notNull(),
    tagId: text("tag_id")
      .references(() => tag.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.tagId] }),
  }),
);
export const userToTagRelations = relations(userToTag, ({ one }) => ({
  user: one(user, {
    fields: [userToTag.userId],
    references: [user.id],
  }),
  tag: one(tag, {
    fields: [userToTag.tagId],
    references: [tag.id],
  }),
}));
// end user_to_tags

// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kmo_${name}`);

export const Instructor = pgEnum("Instructor", ["individual", "organization"]);
export const Gender = pgEnum("Gender", ["male", "female"]);

export const instructor = createTable("instructors", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),
  type: Instructor("type").notNull(),
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

export const instructorRelations = relations(instructor, ({ many }) => ({
  contact: many(contact),
}));

export const contact = createTable("contacts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),

  name: varchar("name", { length: 256 }).notNull(),
  message: text("message"),

  instructorId: text("instructor_id").references(() => instructor.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const contactRelations = relations(contact, ({ one }) => ({
  instructor: one(instructor, {
    fields: [contact.instructorId],
    references: [instructor.id],
  }),
}));

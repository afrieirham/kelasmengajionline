import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/env/server";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof drizzle> | undefined;
};

export const db =
  globalForDb.db ??
  drizzle({
    connection: { connectionString: env.DATABASE_URL },
    schema,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}

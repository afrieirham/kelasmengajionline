/** biome-ignore-all lint/suspicious/noConsole: <> */
import { Client } from "pg";
import { env } from "../src/env/server";

async function setupDatabase() {
  const client = new Client({
    connectionString: env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Connected to database");

    // Enable pgcrypto extension
    await client.query("CREATE EXTENSION IF NOT EXISTS pgcrypto;");
    console.log("✓ pgcrypto extension enabled");

    await client.end();
    console.log("\nDatabase setup complete! You can now run 'npm run db:push'");
  } catch (error) {
    console.error("Error setting up database:", error);
    await client.end();
    process.exit(1);
  }
}

setupDatabase();

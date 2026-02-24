import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import { db } from "@/.server/db";
import { profiles } from "@/.server/db/schema";
import { requireUser } from "@/lib/user";

export async function loader({ request }: { request: Request }) {
  const user = await requireUser(request);

  const userProfiles = await db
    .select()
    .from(profiles)
    .where(eq(profiles.ownerId, user.id))
    .limit(1);

  if (userProfiles.length === 0) {
    throw redirect("/dashboard/new");
  }

  throw redirect("/dashboard/profile");
}

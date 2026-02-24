import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import { auth } from "@/.server/auth";
import { db } from "@/.server/db";
import { users } from "@/.server/db/schema";

export async function requireAdmin(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const session = await auth.api.getSession({
    headers: { cookie: cookieHeader || "" },
  });

  if (!session?.user) {
    throw redirect("/");
  }

  const userList = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  const user = userList[0];
  if (!user || user.role !== "admin") {
    throw redirect("/");
  }

  return user;
}

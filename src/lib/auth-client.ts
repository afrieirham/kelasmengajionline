import { createAuthClient } from "better-auth/react";
import { env } from "@/env/client";

export const authClient = createAuthClient({
  baseURL: env.VITE_APP_URL,
});

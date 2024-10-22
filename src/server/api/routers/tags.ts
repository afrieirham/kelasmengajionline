import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const tagRouter = createTRPCRouter({
  getAllTags: privateProcedure.query(() => {
    return db.query.tag.findMany({});
  }),
});

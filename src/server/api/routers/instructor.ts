import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { instructor } from "@/server/db/schema";

export const instructorRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(instructor).values({
        name: input.name,
        type: "individual",
        id: "",
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const instructor = await ctx.db.query.instructor.findFirst({
      orderBy: (instructor, { desc }) => [desc(instructor.createdAt)],
    });

    return instructor ?? null;
  }),
});

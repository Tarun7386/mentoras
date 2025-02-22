import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const alumniRouter = createTRPCRouter({
    getAlumni: publicProcedure
    .query(async ({ctx})=>{
        const data = await ctx.db.alumni.findMany({})
        return {
            message: "Alumni data fetched successfully",
            data
        }
    }),
    getAlumniById: publicProcedure
    .input(
        z.object({
            id: z.string()
        }))
    .mutation(async ({ctx, input})=>{
        const {id} = input
        const data = await ctx.db.alumni.findUnique({
            where: {id}
        })
        return {
            message: "Alumni byt id",
            data
        }
    }),
    
})

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const alumniRouter = createTRPCRouter({
    getAlumni: publicProcedure
    .query(async ({ctx})=>{
        const data = await ctx.db.alumni.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        });
        return data
    }),
    getAlumniById: publicProcedure
        .input(z.object({
            id: z.string().min(1, "Alumni ID is required"),
        }))
        .query(async ({ ctx, input }) => {  
            try {
                const data = await ctx.db.alumni.findFirst({
                    where: { 
                        userId: input.id 
                    },
                    include: {
                        user: {
                            select: {
                                name: true,
                                image: true,
                                email: true,
                            },
                        },
                    },
                });

                if (!data) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: 'Alumni profile not found',
                    });
                }

                return {
                    message: "Alumni found successfully",
                    data,
                };
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to fetch alumni profile',
                });
            }
        }),
})

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const formRouter = createTRPCRouter({
    aspirantForm: protectedProcedure
        .input(
            z.object({
                role: z.string(),
                preparation: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const { preparation } = input;

                await ctx.db.user.update({
                    where: { id: ctx.session.user.id },
                    data: {
                        role: "ASPIRANT",
                    },
                });

                await ctx.db.aspirant.create({
                    data: {
                        user: { connect: { id: ctx.session.user.id } },
                        preparation: preparation ? [preparation] : undefined,
                    },
                });

                console.log("Aspirant form submitted successfully:", { preparation });

                return {
                    message: "Aspirant form submitted successfully!",
                    data: { preparation },
                };
            } catch (error) {
                console.error("Error submitting aspirant form:", error);
                throw new Error("Failed to submit aspirant form. Please try again.");
            }
        }),

    mentorForm: protectedProcedure
        .input(
            z.object({
                mainWork: z.string(),
                description: z.string(),
                introVideo: z.string().optional(),
                hashtags: z.array(z.string()),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { mainWork = "", description = "", introVideo = "", hashtags } = input;

            try {
                await ctx.db.user.update({
                    where: { id: ctx.session.user.id },
                    data: {
                        role: "MENTOR",
                    },
                });
                const mentorData = await ctx.db.mentor.create({
                    data: {
                        user: { connect: { id: ctx.session.user.id } },
                        mainWork,
                        description,
                        introVideo,
                        hashtags: {
                            connectOrCreate: hashtags.map((hashtag) => ({
                                where: { name: hashtag }, // Check if a hashtag with this name exists
                                create: { name: hashtag }, // If it doesn't, create it
                            })),
                        },
                    },
                });
                console.log("Mentor form submitted successfully:", {
                    mainWork,
                    description,
                    hashtags,
                    introVideo,
                });

                return {
                    message: "Mentor form submitted successfully!",
                    data: mentorData,
                };
            } catch (error) {
                console.error("Error submitting mentor form:", error);
                throw new Error("Failed to submit mentor form. Please try again.");
            }
        }),

    getRole: protectedProcedure
        .input(z.object({
            ownerId: z.string().optional()
        }))
        .query(async ({ ctx, input: { ownerId } }) => {

            const { id } = ctx.session.user;
            const userId = ownerId ?? id
            // Use a single query to find if the user exists in either table
            const [aspirant, mentor] = await Promise.all([
                ctx.db.aspirant.findFirst({ where: { userId: userId } }),
                ctx.db.mentor.findFirst({ where: { userId: userId } }),
            ]);

            if (aspirant) {
                return {
                    role: "ASPIRANT",
                };
            }

            if (mentor) {
                return {
                    role: "MENTOR",

                };
            }

        }),
        getAspirantProfile: protectedProcedure
        .input(z.object({
            id: z.string().optional()
        }))
        .query(async ({ctx,input:{id}})=>{
            const profile = await ctx.db.user.findFirst({
                where:{
                    id:id ?? ctx.session.user.id,
                },
                select:{
                    name:true,
                    image:true
                }
            })
            return profile
        })
});

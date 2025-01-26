import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const studyGroupRouter = createTRPCRouter({
    createStudyGroup: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                description: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                // Create a new study group
                const newStudyGroup = await ctx.db.studyGroup.create({
                    data: {
                        title: input.title,
                        description: input.description,
                        createdBy: {
                            connect: {
                                id: ctx.session.user.id,
                            },
                        },
                    },
                });

                return {
                    message: "Study group created successfully!",
                    studyGroup: newStudyGroup,
                };
            } catch (error) {
                console.error("Error creating study group:", error);
                throw new Error("Failed to create study group. Please try again later.");
            }
        }),

    getStudyGroups: protectedProcedure
        .query(async ({ ctx }) => {
            try {
                // Get all study groups
                const studyGroups = await ctx.db.studyGroup.findMany({
                    where: {
                        createdBy: {id: ctx.session.user.id},
                    },
                });

                return studyGroups;
            } catch (error) {
                console.error("Error fetching study groups:", error);
                throw new Error("Failed to fetch study groups. Please try again later.");
            }
        }),

    getAspirantStudyGroups: protectedProcedure
        .query(async ({ ctx }) => {
            try {
                // Get all study groups
                const studyGroupsIds = await ctx.db.studyGroupMember.findMany({
                    where: {
                        userId: ctx.session.user.id,
                    },
                    select: {
                        studyGroupId:true,
                    }
                });

                const studyGroups = await ctx.db.studyGroup.findMany({
                    where: {
                        id: {
                            in: studyGroupsIds.map((studyGroup) => studyGroup.studyGroupId),
                        },
                    },
                });

                return studyGroups;
            } catch (error) {
                console.error("Error fetching study groups:", error);
                throw new Error("Failed to fetch study groups. Please try again later.");
            }
        }),
    joinStudyGroup: protectedProcedure
        .input(
            z.object({
                studyGroupId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                // Check if user is already a member of the study group
                const isMember = await ctx.db.studyGroupMember.findFirst({
                    where: {
                        userId: ctx.session.user.id,
                        studyGroupId: input.studyGroupId,
                    },
                });

                if (isMember) {
                    throw new Error("You are already a member of this study group.");
                }

                // Add user to the study group
                await ctx.db.studyGroupMember.create({
                    data: {
                        role: "member", // or any appropriate role
                        user: {
                            connect: {
                                id: ctx.session.user.id,
                            },
                        },
                        studyGroup: {
                            connect: {
                                id: input.studyGroupId,
                            },
                        },
                    },
                });

                return {
                    message: "You have successfully joined the study group!",
                };
            } catch (error) {
                console.error("Error joining study group:", error);
                throw new Error("Failed to join study group. Please try again later.");
            }
        }),
});



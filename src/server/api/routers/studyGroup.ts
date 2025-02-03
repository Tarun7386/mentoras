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

    getStudyGroupsByMe: protectedProcedure
        .input(z.object({
            ownerId: z.string().optional(),
        }))
        .query(async ({ ctx, input: { ownerId } }) => {
            try {
                // Get all study groups created by the given owner (or the logged-in user if no ownerId is provided)
                const studyGroups = await ctx.db.studyGroup.findMany({
                    where: {
                        createdById: ownerId ?? ctx.session.user.id,
                    },
                    include: {
                        createdBy: {
                            select: { name: true },
                        },
                        members: {
                            select: { userId: true }, // Fetch user IDs to check membership
                        },
                    },
                });

                // Add `isMember` field as a boolean, but remove `members`
                const enrichedStudyGroups = studyGroups.map(({ members, ...group }) => ({
                    ...group,
                    isMember: Boolean(members.some(member => member.userId === ctx.session.user.id)),
                }));

                return enrichedStudyGroups;
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
    getMemberStudyGrp: protectedProcedure
    .query(async ({ctx})=>{
        const studyGrp = await ctx.db.studyGroup.findMany({
            where:{
                members:{
                    some :{ userId : ctx.session.user.id}
                }
            },
            include: {
                createdBy: {
                    select: { name: true },
                },
            },

        })
        return studyGrp
    }),
countOfmembers: publicProcedure
    .input(z.object({
        groupId: z.string()
    }))
    .query(async ({ ctx }) => {
        const groupStatus = await ctx.db.studyGroup.findMany({
            select: {
                _count: {
                    select: {
                        members: true  // Get the count of members in the group
                    }
                },
                members: {
                    where: {
                        userId: ctx.session?.user.id
                    },
                    select: { id: true }  // Select member IDs to check if the user is part of the group
                }
            }
        });

        // Check if the user is a member of any group
        const isMember = groupStatus.length > 0 && (groupStatus[0]?.members?.length ?? 0) > 0;

        // Get the count of members in the first group (or 0 if no groups found)
        const membersCount = groupStatus.length > 0 ? groupStatus[0]?._count.members : 0;

        // Return both the `isMember` status and the `membersCount`
        return {
            isMember,   // boolean indicating if the user is a member
            membersCount  // count of members in the group
        };
    }
    )
});



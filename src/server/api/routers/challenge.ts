import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const challengeRouter = createTRPCRouter({
    createChallenge: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                description: z.string(),
                durationDays: z.number(),
                
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const mentorId = await ctx.db.mentor.findFirst({
                    where: {
                        userId: ctx.session.user.id,
                    },
                    select:{ id: true },
                });
                if (mentorId === null) {
                    throw new Error("User is not a mentor.");
                }
                const challenge = await ctx.db.challenge.create({
                    data: {
                        title: input.title,
                        description: input.description,
                        durationDays: input.durationDays,
                        mentorId: mentorId.id,
                    },
                });

                return {
                    message: "Challenge created successfully!",
                    challenge,
                };
            } catch (error) {
                console.error("Error creating challenge:", error);
                throw new Error("Failed to create challenge. Please try again later.");
            }
        }),
    checkInChallenge: protectedProcedure
        .input(
            z.object({
                challengeId: z.string(),
                aspirantId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const challengeParticipation = await ctx.db.challengeParticipation.findFirst({
                    where: {
                        challengeId: input.challengeId,
                        userId: input.aspirantId,
                    },
                });

                if (!challengeParticipation) {
                    throw new Error("User is not participating in this challenge.");
                }

                const checkin = await ctx.db.checkin.create({
                    data: {
                        participationId: challengeParticipation.id,
                        checkinDate: new Date(),
                        userId: input.aspirantId,
                    },
                });

                return {
                    message: "Checked in successfully!",
                    checkin,
                };
            } catch (error) {
                console.error("Error checking in:", error);
                throw new Error("Failed to check-in. Please try again later.");
            }
        }),
    getStreakScore: protectedProcedure
        .input(
            z.object({
                aspirantId: z.string(),
                challengeId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            try {
                const challengeParticipation = await ctx.db.challengeParticipation.findFirst({
                    where: {
                        challengeId: input.challengeId,
                        userId: input.aspirantId,
                    },
                });

                if (!challengeParticipation) {
                    throw new Error("User is not participating in this challenge.");
                }

                const checkins = await ctx.db.checkin.findMany({
                    where: {
                        participationId: challengeParticipation.id,
                    },
                    orderBy: {
                        checkinDate: "asc",
                    },
                });

                let streak = 0;
                let currentStreak = 0;
                let lastCheckinDate: Date | null = null;

                checkins.forEach((checkin) => {
                    const currentDate = checkin.checkinDate;
                    if (lastCheckinDate) {
                        const diffInDays = (currentDate.getTime() - lastCheckinDate.getTime()) / (1000 * 3600 * 24);
                        if (diffInDays === 1) {
                            currentStreak += 1;
                        } else if (diffInDays > 1) {
                            currentStreak = 1;
                        }
                    } else {
                        currentStreak = 1;
                    }
                    lastCheckinDate = currentDate;
                    streak = Math.max(streak, currentStreak);  // Track the maximum streak
                });

                return {
                    message: "Streak score fetched successfully!",
                    streak,
                };
            } catch (error) {
                console.error("Error fetching streak score:", error);
                throw new Error("Failed to fetch streak score. Please try again later.");
            }
        }),
    increaseOrDecreaseStreak: protectedProcedure
        .input(
            z.object({
                aspirantId: z.string(),
                challengeId: z.string(),
                change: z.number(),  // Positive number for increasing, negative for decreasing
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const challengeParticipation = await ctx.db.challengeParticipation.findFirst({
                    where: {
                        challengeId: input.challengeId,
                        userId: input.aspirantId,
                    },
                });

                if (!challengeParticipation) {
                    throw new Error("User is not participating in this challenge.");
                }

                const checkins = await ctx.db.checkin.findMany({
                    where: {
                        participationId: challengeParticipation.id,
                    },
                    orderBy: {
                        checkinDate: "asc",
                    },
                });

                let currentStreak = checkins.length ? checkins.length : 0;
                let newStreak = currentStreak + input.change;

                if (newStreak < 0) {
                    newStreak = 0;  // Prevent negative streaks
                }

                // Optionally, update or store the new streak value in the challengeParticipation model
                await ctx.db.challengeParticipation.update({
                    where: {
                        id: challengeParticipation.id,
                    },
                    data: {
                        maxStreak: newStreak,  // Updating the streak score
                    },
                });

                return {
                    message: "Streak score updated successfully!",
                    newStreak,
                };
            } catch (error) {
                console.error("Error updating streak score:", error);
                throw new Error("Failed to update streak score. Please try again later.");
            }
        }),

    
});



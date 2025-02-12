import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { addDays, isYesterday, isToday } from 'date-fns';

export const streakRouter = createTRPCRouter({
    updateTaskStreak: protectedProcedure.mutation(async ({ ctx }) => {
        try {
            const aspirant = await ctx.db.aspirant.findFirst({
                where: {
                    userId: ctx.session.user.id,
                },
            });

            if (!aspirant) {
                throw new Error('Aspirant not found');
            }

            const currentDate = new Date();
            const lastStreakDate = aspirant.lastStreakDate;

            // If there is no last streak date or it's more than a day ago, reset the streak
            if (!lastStreakDate || addDays(lastStreakDate, 1) < currentDate) {
                // If the streak was missed for more than 1 day, reset it
                await ctx.db.aspirant.update({
                    where: {
                        id: aspirant.id
                    },
                    data: {
                        streak: 0,
                        lastStreakDate: currentDate, // Set the current date as the new streak date
                    },
                });
            } else if (isYesterday(lastStreakDate)) {
                // If the last streak date was yesterday, increment the streak by 2
                const newStreak = aspirant.streak + 2;
                const maxStreak = newStreak > aspirant.maxStreak ? newStreak : aspirant.maxStreak;
                await ctx.db.aspirant.update({
                    where: {
                        id: aspirant.id, // Use aspirant.id
                    },
                    data: {
                        streak: newStreak, 
                        maxStreak: maxStreak,
                        lastStreakDate: currentDate, // Update the streak date
                    },
                });
            } else if (isToday(lastStreakDate)) {
                // If the last streak date was today, increment the streak
                const newStreak = aspirant.streak + 1;

                // Update max streak if the current streak is higher
                const maxStreak = newStreak > aspirant.maxStreak ? newStreak : aspirant.maxStreak;

                await ctx.db.aspirant.update({
                    where: {
                        id: aspirant.id, // Use aspirant.id
                    },
                    data: {
                        streak: newStreak, // Increment the streak count by 1
                        maxStreak: maxStreak, // Update max streak if necessary
                        lastStreakDate: currentDate, // Update the streak date to today
                    },
                });
            }
        } catch (error) {
            throw new Error( 'An error occurred while updating streak');
        }
    }),

    getStreak: protectedProcedure.query(async ({ ctx }) => {
        try {
            const aspirant = await ctx.db.aspirant.findFirst({
                where: {
                    userId: ctx.session.user.id,
                },
            });

            if (!aspirant) {
                throw new Error('Aspirant not found');
            }

            return {
                streak: aspirant.streak,
                maxStreak: aspirant.maxStreak,
            };
        } catch (error) {
            throw new Error('An error occurred while fetching streak');
        }
    }),

    topStreak: publicProcedure.query(async ({ ctx }) => {
        try {
            const topAspirants = await ctx.db.aspirant.findMany({
                orderBy: {
                    streak: 'desc',
                },
                take: 10,
                select: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                    streak: true,
                },
            });

            return topAspirants;
        } catch (error) {
            throw new Error( 'An error occurred while fetching top streaks');
        }
    }),

});

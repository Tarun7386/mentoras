import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const dailyTaskRouter = createTRPCRouter({
    isGroupOwner: protectedProcedure
        .input(
            z.object({
                groupId: z.string(),
                
            })
        )
        .query(async ({ctx,input:{groupId}}) =>{
            const owner = await ctx.db.studyGroup.findFirst({
                where:{
                    id:groupId
                },
                select:{
                    createdById:true
                }
            })

            const isOwner = owner?.createdById === ctx.session.user.id

            return isOwner

        }),
    createTask: protectedProcedure
        .input(
            z.object({
                groupId: z.string(),
                content: z.string(),
            })
        )
        .mutation(async ({ ctx, input: { groupId, content } }) => {
            const createTask = await ctx.db.dailyTask.create({
                data: {
                    groupId: groupId,
                    content: content,
                    postedById: ctx.session.user.id, 
                },
            });

            return createTask;
        }),

    getTasks: publicProcedure
        .input(z.object({
            groupId: z.string(),
        }))
        .query(async ({ ctx, input: { groupId } }) => {
            try {
                const userId = ctx.session?.user?.id; // Check if user is logged in
                let aspirantId: string | null = null;

                if (userId) {
                    // Get the logged-in user's aspirant ID
                    const aspirant = await ctx.db.aspirant.findFirst({
                        where: { userId },
                        select: { id: true },
                    });

                    aspirantId = aspirant?.id ?? null;
                }

                // Fetch all tasks for the group, including completion count
                const tasks = await ctx.db.dailyTask.findMany({
                    where: { groupId },
                    include: {
                        _count: {
                            select: { completions: true }, // Count of members who completed the task
                        },
                    },
                });

                // Enhance tasks with `isCompleted` information for the logged-in user
                const enrichedTasks = await Promise.all(
                    tasks.map(async (task) => {
                        let isCompleted = false;

                        if (aspirantId) {
                            const completion = await ctx.db.dailyTaskCompletion.findFirst({
                                where: {
                                    taskId: task.id,
                                    aspirantId: aspirantId,
                                },
                                select: { id: true },
                            });

                            isCompleted = Boolean(completion);
                        }

                        return {
                            ...task,
                            isCompleted,
                            completedCount: task._count.completions, // Total count of members who completed the task
                        };
                    })
                );

                return enrichedTasks;
            } catch (error) {
                console.error("Error fetching tasks:", error);
                throw new Error("Failed to fetch tasks. Please try again later.");
            }
        }),
    completeTask: protectedProcedure
        .input(z.object({
            taskId: z.string(),
        }))
        .mutation(async ({ ctx, input: { taskId } }) => {
            try {
                // Find the aspirant ID for the logged-in user
                const aspirant = await ctx.db.aspirant.findFirst({
                    where: { userId: ctx.session.user.id },
                    select: { id: true },
                });

                // If no aspirant found, throw an error
                if (!aspirant) {
                    throw new Error("Aspirant profile not found.");
                }

                // Check if the task is already completed to prevent duplicates
                const existingCompletion = await ctx.db.dailyTaskCompletion.findFirst({
                    where: {
                        taskId,
                        aspirantId: aspirant.id,
                    },
                });

                if (existingCompletion) {
                    throw new Error("Task already completed.");
                }

                // Create task completion record
                const completedTask = await ctx.db.dailyTaskCompletion.create({
                    data: {
                        taskId,
                        aspirantId: aspirant.id,
                    },
                });

                return {
                    success: true,
                    message: "Task completed successfully!",
                    completedTask,
                };
            } catch (error) {
                console.error("Error completing task:", error);
                throw new Error( "Failed to complete task.");
            }
        })

})
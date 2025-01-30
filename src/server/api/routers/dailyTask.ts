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
        groupId : z.string(),
    }))
    .query(async ({ctx,input:{groupId}}) => {

        const tasks = await ctx.db.dailyTask.findMany({
            where: {
                groupId: groupId,
            },
        });

        return tasks;
    })

})
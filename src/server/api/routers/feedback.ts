import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const feedbackRouter = createTRPCRouter({
    addFeedback : publicProcedure
    .input(z.object({
        content:z.string(),
    }))
    .mutation(async ({ctx,input:{content}})=>{
        try{
            await ctx.db.feedback.create({
                data:{
                    content:content,
                    userId: ctx.session?.user?.id ?? "defaultUserId",
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error("Failed to add feedback");
        }
    }),
    getFeedback:publicProcedure
    .query(async ({ctx})=>{
        try {
            const feedback = await ctx.db.feedback.findMany({
                select: {
                    id:true,
                    content: true,
                    response: true,
                }
            });

            // Return the fetched feedback data
            return feedback;
        } catch (error) {
            console.error('Error fetching feedback:', error);
            throw new Error('Failed to fetch feedback. Please try again later.');
        }
})
})

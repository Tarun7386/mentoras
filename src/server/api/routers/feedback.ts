import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const feedbackRouter = createTRPCRouter({
    addFeedback : publicProcedure
    .input(z.object({
        content:z.string(),
        userId:z.string().optional()
    }))
    .mutation(async ({ctx,input:{content,userId}})=>{
        try{
            await ctx.db.feedback.create({
                data:{
                    content:content,
                    userId :userId
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error("Failed to add feedback");
        }
    })
})

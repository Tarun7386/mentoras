import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const postRouter = createTRPCRouter({
  // Mutation to create a post
  createPost: protectedProcedure
    .input(
      z.object({
        content: z
          .string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Find the menIDtor  associated with the logged-in user
        const mentor = await ctx.db.mentor.findFirst({
          where: { userId: ctx.session.user.id },
          select: { id: true },
        });

        // Check if the mentor record exists
        if (!mentor) {
          throw new Error("Mentor profile not found. Please complete your mentor profile before creating a post.");
        }

        // Create a new post
        const newPost = await ctx.db.insight.create({
          data: {
            content: input.content,
            mentor: { connect: { id: mentor.id } }, // Use mentor.id here
          },
        });

        return {
          message: "Post created successfully!",
          post: newPost,
        };
      } catch (error) {
        console.error("Error creating post:",error);
        throw new Error("Failed to create post. Please try again later.");
      }
    }),

  // Query to fetch posts
  getPosts: publicProcedure.query(async ({ ctx }) => {
    try {
      const posts = await ctx.db.insight.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          mentor: {
            select: {
              userId: true,
            },
          },
        },
      });
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts. Please try again later.");
    }
  }),
});



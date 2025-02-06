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
        console.error("Error creating post:", error);
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
              user: {
                select: {
                  image: true,
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              likes: true, // Get the count of likes
            },
          },
          likes: {
            where: { userId: ctx.session?.user.id },
            select: {
              id: true,
            },
          },
          bookmarks: {
            where: { userId: ctx.session?.user.id },
            select: {
              id: true,
            },
          },
        },
      });

      // Transform the results
      const formattedPosts = posts.map((post) => ({
        ...post,
        likeCount: post._count.likes, // Add the like count
        hasLiked: post.likes.length > 0,
        hasBookmarked: post.bookmarks.length > 0,
      }));

      return formattedPosts;

;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts. Please try again later.");
    }
  }),

  getPostById : publicProcedure
    .input(
      z.object({
        id: z
          .string()
      })
    )
  .query(async ({ctx,input})=>{
    try{
      const post = await ctx.db.insight.findUnique({
        where:{
          id : input.id,
        }, 
        include: {
          mentor: {
            select: {
              user: {
                select: {
                  image: true,
                  name: true
                }
              }
            }
          },
          _count: {
            select: {
              likes: true, // Get the count of likes
            },
          },
          likes: {
            where: { userId: ctx.session?.user.id },
            select: {
              id: true,
            },
          },
          bookmarks: {
            where: { userId: ctx.session?.user.id },
            select: {
              id: true,
            },
          },
        },

      })
      const formattedPosts = {
        ...post,
        likeCount: post?._count.likes, // Add the like count
        hasLiked: (post?.likes?.length ?? 0) > 0,
        hasBookmarked: (post?.bookmarks?.length ?? 0) > 0,
      };

      return formattedPosts;

    }
    catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts. Please try again later.");
    }

  }),
  getPostsByMentorId: publicProcedure
    .input(
      z.object({
        mentorId: z.string()
      })
    )

    .query(async ({ ctx, input: { mentorId } }) => {
    try {
      const posts = await ctx.db.insight.findMany({
        where: { mentorId: mentorId },
        orderBy: { createdAt: "desc" },
        include: {
          mentor: {
            select: {
              user: {
                select: {
                  image: true,
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              likes: true, // Get the count of likes
            },
          },
          likes: {
            where: { userId: ctx.session?.user.id },
            select: {
              id: true,
            },
          },
          bookmarks: {
            where: { userId: ctx.session?.user.id },
            select: {
              id: true,
            },
          },
        },
      });

      // Transform the results
      const formattedPosts = posts.map((post) => ({
        ...post,
        likeCount: post._count.likes, // Add the like count
        hasLiked: post.likes.length > 0,
        hasBookmarked: post.bookmarks.length > 0,
      }));

      return formattedPosts;

      ;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts. Please try again later.");
    }
  }),
});



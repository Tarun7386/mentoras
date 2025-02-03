import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";


export const engagementsRouter = createTRPCRouter({
    toggleLike: protectedProcedure
        .input(
            z.object({
                postId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                // Check if the user has already liked the post
                const existingLike = await ctx.db.like.findFirst({
                    where: {
                        insightId: input.postId,
                        userId: ctx.session.user.id,
                    },
                });

                // If the like already exists, delete it (unlike)
                if (existingLike) {
                    await ctx.db.like.delete({
                        where: {
                            id: existingLike.id,
                        },
                    });

                    return {
                        message: "Unliked successfully!",
                    };
                }

                // If the like doesn't exist, create a new like
                const newLike = await ctx.db.like.create({
                    data: {
                        insightId: input.postId,
                        userId: ctx.session.user.id,
                    },
                });

                return {
                    message: "Liked successfully!",
                    post: newLike,
                };
            } catch (error) {
                console.error("Error toggling like:", error);
                throw new Error("Failed to toggle like. Please try again later.");
            }
        }),


    bookmarkPost: protectedProcedure
        .input(
            z.object({
                postId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                // Check if the bookmark already exists
                const existingBookmark = await ctx.db.bookmark.findFirst({
                    where: {
                        insightId: input.postId,
                        userId: ctx.session.user.id,
                    },
                });

                // If the bookmark exists, delete it (unbookmark)
                if (existingBookmark) {
                    await ctx.db.bookmark.delete({
                        where: {
                            id: existingBookmark.id,
                        },
                    });

                    return {
                        message: "Bookmark removed successfully!",
                    };
                }

                // If the bookmark doesn't exist, create a new bookmark
                const newBookmark = await ctx.db.bookmark.create({
                    data: {
                        insightId: input.postId,
                        userId: ctx.session.user.id,
                    },
                });

                return {
                    message: "Bookmarked successfully!",
                    post: newBookmark,
                };
            } catch (error) {
                console.error("Error toggling bookmark:", error);
                throw new Error("Failed to toggle bookmark. Please try again later.");
            }
        }),


    toggleFollow: protectedProcedure
        .input(
            z.object({
                mentorId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                // Check if the user is already following the mentor
                const existingFollow = await ctx.db.mentorFollower.findFirst({
                    where: {
                        mentorId: input.mentorId,
                        userId: ctx.session.user.id,
                    },
                });

                // If the follow already exists, delete it (unfollow)
                if (existingFollow) {
                    await ctx.db.mentorFollower.delete({
                        where: {
                            id: existingFollow.id,
                        },
                    });

                    return {
                        message: "Unfollowed successfully!",
                    };
                }

                // If the follow doesn't exist, create a new follow
                const newFollow = await ctx.db.mentorFollower.create({
                    data: {
                        mentorId: input.mentorId,
                        userId: ctx.session.user.id,
                    },
                });

                return {
                    message: "Followed successfully!",
                    follow: newFollow,
                };
            } catch (error) {
                console.error("Error toggling follow:", error);
                throw new Error("Failed to toggle follow. Please try again later.");
            }
        }),

    getBookmarks: protectedProcedure.query(async ({ ctx }) => {
        try {
            // Ensure session exists and user ID is available
            if (!ctx.session?.user?.id) {
                throw new Error("User is not authenticated.");
            }

            const bookmarks = await ctx.db.bookmark.findMany({
                where: {
                    userId: ctx.session.user.id,
                },
                include: {
                    insight: true,
                    user: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                },
            });

            return bookmarks;
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
            throw new Error("Failed to fetch bookmarks. Please try again later.");
        }
    }),

    getFollowing: protectedProcedure
        .input(
            z.object({
                aspirantId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            try {
                // Get the list of mentors the aspirant is following
                const followingMentors = await ctx.db.mentorFollower.findMany({
                    where: {
                        userId: input.aspirantId,
                    },
                    include: {
                        mentor: true,  // This will include mentor details in the result
                    },
                });

                return {
                    message: "Following mentors fetched successfully!",
                    mentors: followingMentors.map((follow) => follow.mentor),  // Extracting the mentor details
                };
            } catch (error) {
                console.error("Error fetching following mentors:", error);
                throw new Error("Failed to fetch following mentors. Please try again later.");
            }
        }),





});



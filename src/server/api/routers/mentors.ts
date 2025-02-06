import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const mentorsRouter = createTRPCRouter({
    getMentors: publicProcedure.query(async ({ ctx }) => {
        try {
            // Fetch all mentors
            const mentors = await ctx.db.mentor.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                    hashtags: true,
                    MentorFollower: {
                        where: { userId: ctx.session?.user?.id ?? "" },
                        select: { id: true }
                    },
                    _count: {  // Adding the count for followers
                        select: {
                            MentorFollower: true,
                        },
                    },
                },
            });

            // Add `followedByMe` field and `followersCount` field to each mentor
            const updatedMentors = mentors.map((mentor) => ({
                ...mentor,
                followedByMe: mentor.MentorFollower.length > 0, // Whether the user follows this mentor
                followersCount: mentor._count.MentorFollower, // Number of followers for the mentor
            }));

            return updatedMentors;
        } catch (error) {
            console.error("Error fetching mentors:", error);
            throw new Error("Failed to fetch mentors. Please try again later.");
        }
    }),


    addBook: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                author: z.string(),
                description: z.string(),
                genre: z.string(),
            })
        )
        .mutation(async ({ ctx, input: { title, author, description,genre } }) => {
            try {
                // Fetch the mentor ID associated with the logged-in user
                const mentor = await ctx.db.mentor.findFirst({
                    where: { userId: ctx.session.user.id },
                    select: { id: true },
                });

                if (!mentor) {
                    throw new Error("Mentor profile not found for the current user.");
                }

                // Create the book recommendation
                const newBook = await ctx.db.bookRecommendation.create({
                    data: {
                        title,
                        author,
                        description,
                        genre,
                        mentor: { connect: { id: mentor.id } },
                    },
                });

                // Return success response
                return {
                    message: "Book recommendation added successfully!",
                    book: newBook,
                };
            } catch (error) {
                console.error("Error adding book recommendation:", error);
                throw new Error("Failed to add the book recommendation. Please try again.");
            }
        }),

    getBookByMentorId: publicProcedure
    .input(z.object({
        userId:z.string().optional()
    }))
    .query(async ({ ctx,input:{userId} }) => {
        try {
            const book = await ctx.db.bookRecommendation.findMany({
                where: { mentor: { userId: userId ?? ctx.session?.user.id} },
                include: {
                    mentor: {
                        select: {
                            user: { select: { name: true } },
                        },
                    },
                },
            });

            return book;
        } catch (error) {
            console.error("Error fetching book:", error);
            throw new Error("Failed to fetch book. Please try again later.");
        }
    }),

    getProfileDetails: protectedProcedure.query(async ({ ctx }) => {
        try {
            // Fetch profile data and profile picture in one step
            const profile = await ctx.db.mentor.findFirst({
                where: {
                    userId: ctx.session.user.id,
                },
                include: {
                    hashtags: true 
                }
            });

            if (!profile) {
                throw new Error("Profile not found.");
            }

            // Return profile data along with profilePic from session
            return {
                profileData: profile,
                profilePic: ctx.session.user.image,
                name : ctx.session.user.name
            };
        } catch (error) {
            console.error("Error fetching profile details:", error);
            throw new Error("Failed to fetch profile details. Please try again later.");
        }
    }),
    getProfileDetailsById: protectedProcedure
        .input(z.object({
            id: z.string(),
        }))
    .query(async ({ ctx,input:{id} }) => {
        try {
            // Fetch profile data and profile picture in one step
            const profile = await ctx.db.mentor.findFirst({
                where: {
                    id:id,
                },
                include: {
                    hashtags: true,
                    user:{
                        select:{
                            name:true,
                            image:true,
                            id:true
                        }
                    },
                    MentorFollower : {
                        where:{userId:ctx.session.user.id},
                        select:{id:true}
                    }
                }
            });

            if (!profile) {
                throw new Error("Profile not found.");
            }

            const followedByMe = profile.MentorFollower.length > 0;

            return {
                profileData: { ...profile, followedByMe }                  
            };
        } catch (error) {
            console.error("Error fetching profile details:", error);
            throw new Error("Failed to fetch profile details. Please try again later.");
        }
    }),
    getMentorId:publicProcedure
    .input(z.object({
        userId : z.string(),
    }))
    .query(async ({ctx,input:{userId}}) => {

        const mentorId = await ctx.db.mentor.findFirst({
            where:{userId:userId},
            select:{ id:true}
        })
        return mentorId
    })


});

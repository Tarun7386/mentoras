import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const mentorsRouter = createTRPCRouter({
    getMentors: publicProcedure.query(async ({ ctx }) => {
        try {
            const mentors = await ctx.db.mentor.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                },
            });

            // Return the mentors data
            return mentors;
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
            })
        )
        .mutation(async ({ ctx, input: { title, author, description } }) => {
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
                        genre: "Mentor", // Set a static genre value, assuming it's predefined
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

        getBook: publicProcedure.query(async ({ ctx }) => {
            try {
                const book = await ctx.db.bookRecommendation.findMany({
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

});

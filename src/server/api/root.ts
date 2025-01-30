import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { formRouter } from "./routers/profileDetails";
import { mentorsRouter } from "./routers/mentors";
import { challengeRouter } from "./routers/challenge";
import { engagementsRouter } from "./routers/engagements";
import { studyGroupRouter } from "./routers/studyGroup";
import { dailyTaskRouter } from "./routers/dailyTask";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  profileData : formRouter,
  mentorsData: mentorsRouter,
  challengeRouter: challengeRouter,
  engagementsRouter: engagementsRouter,
  studyGroupRouter: studyGroupRouter,
  dailyTaskRouter: dailyTaskRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

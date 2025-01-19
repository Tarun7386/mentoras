
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Carousel from "./_components/carousel";
import GetstartedButton from "./_components/getStartedButton";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from mentoras" });
  const session = await auth();

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  console.log(session?.user);

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center text-white">
        <Carousel images={[]} />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-6xl font-bold text-center">
            Welcome to Mentoras
          </h1>
          <p className="text-xl text-center">
            The best place to find a mentor or become one.
          </p>
        </div>
        <GetstartedButton />
      </main>
    </HydrateClient>
  );
}


import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import GetstartedButton from "./_components/getStartedButton";
import LandingPage from "./_components/Landing_page";


export default async function Home() {
  // const hello = await api.post.hello({ text: "from mentoras" });
  const session = await auth();

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  console.log(session?.user);

  return (
    <HydrateClient>
    <main className="relative min-h-screen w-full overflow-x-hidden">
        {/* Hero Section with Carousel */}
        <section className="relative h-screen ">
          {/* <Carousel images={[]} /> */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-8 px-4">
              <h1 className="text-6xl sm:text-5xl lg:text-6xl font-bold text-center">
                Welcome to Mentoras
              </h1>
              <p className="text-lg sm:text-xl text-center max-w-2xl">
                The best place to educators, and successful individuals come together to share wisdom, offer motivation, and collaborate on learning journeys. .
              </p>
              <GetstartedButton />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <LandingPage />
      </main>
    </HydrateClient>
  );
}


import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Carousel from "./_components/carousel";
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
    // <HydrateClient>
    //   <main className="flex min-h-screen flex-col items-center justify-center text-white">
    //     <Carousel images={[]} />
    //     <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
    //       <h1 className="text-6xl font-bold text-center">
    //         Welcome to Mentoras
    //       </h1>
    //       <p className="text-xl text-center">
    //         The best place to find a mentor or become one.
    //       </p>
    //     </div>
    //     <GetstartedButton />
    //   </main>
    // </HydrateClient>
    <HydrateClient>
    <main className="relative min-h-screen w-full overflow-x-hidden">
        {/* Hero Section with Carousel */}
        <section className="relative h-screen">
          <Carousel images={[]} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-8 px-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">
                Welcome to Mentoras
              </h1>
              <p className="text-lg sm:text-xl text-center max-w-2xl">
                The best place to find a mentor or become one.
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

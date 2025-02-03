import MentorHome from "~/app/_components/mentor/mentorHomepage";
import { notFound, redirect } from 'next/navigation'; // Import notFound from Next.js to trigger 404
import { auth } from "~/server/auth";

async function MentorHomePage({
    params,
}: {
    params: Promise<{ button: string[] }>;
}) {
    const { button } = await params;
    const session = await auth();

    // Redirect to sign-in if the user is not logged in
    if (!session?.user) {
        redirect("/api/auth/signin");
    }        
    // Extract the slug, if not found, set it to 'postInsight' by default
    const slug = button?.[0]
        ? (button[0] as "postInsight" | "bookRecommended" | "challenge" | "studyGroup" | "profile" | "aspirantView")
        : "postInsight"; // Default to 'postInsight' if undefined


    // Valid slugs array
    const validSlugs: ("postInsight" | "bookRecommended" | "challenge" | "studyGroup" | "profile" | "aspirantView")[] = [
        "postInsight", "bookRecommended", "challenge", "studyGroup", "profile", "aspirantView"
    ];

    // If slug is not in validSlugs, trigger 404
    if (!validSlugs.includes(slug)) {
        notFound(); // This will render the default 404 page in Next.js
        return null; // Return null to prevent further rendering
    }

    return (
        <div>
            <MentorHome tabSelected={slug} />
        </div>
    );
}

export default MentorHomePage;

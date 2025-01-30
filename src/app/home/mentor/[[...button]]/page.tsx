import MentorHome from "~/app/_components/mentor/mentorHomepage";
import { notFound } from 'next/navigation'; // Import notFound from Next.js to trigger 404

async function MentorHomePage({
    params,
}: {
    params: Promise<{ button: string[] }>;
}) {
    const { button } = await params;

    // Extract the slug, if not found, set it to 'postInsight' by default
    const slug = button && button[0]
        ? (button[0] as "postInsight" | "bookRecommended" | "challenge" | "studyGroup" | "profile" | "mentorView")
        : "postInsight"; // Default to 'postInsight' if undefined or invalid

    // Valid slugs array
    const validSlugs: ("postInsight" | "bookRecommended" | "challenge" | "studyGroup" | "profile" | "mentorView")[] = [
        "postInsight", "bookRecommended", "challenge", "studyGroup", "profile", "mentorView"
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

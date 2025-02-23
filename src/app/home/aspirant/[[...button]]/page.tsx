import { notFound } from 'next/navigation'; // Import notFound from Next.js to trigger 404
import AspirantHomePage from "~/app/_components/aspirant/AspirantHomePage";

async function Aspirant({
    params,
}: {
    params: Promise<{ button: string[] }>;
}) {
    const { button } = await params;

    // Extract the slug, if not found, set it to 'postInsight' by default
    const slug = button?.[0] ? (button[0] as "feed" | "mentors" | "alumni") : "alumni";
    // Valid slugs array
    const validSlugs: ("feed" | "mentors"|"alumni")[] = [
        "feed", "mentors","alumni",
    ];

    // If slug is not in validSlugs, trigger 404
    if (!validSlugs.includes(slug)) {
        notFound(); // This will render the default 404 page in Next.js
        return null; // Return null to prevent further rendering
    }

    return (
        <div>
            <AspirantHomePage tabSelected={slug} />
        </div>
    );
}

export default Aspirant;

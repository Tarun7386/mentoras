import { redirect } from "next/navigation";
import MentorProfileClient from "~/app/_components/aspirant/MentorProfileClient";
import { auth } from "~/server/auth";

export default async function MentorById({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();

    // Redirect to sign-in if the user is not logged in
    if (!session?.user) {
        redirect("/api/auth/signin");
    }
        
    const { id } = await params;

    return <MentorProfileClient id={id} />;
}
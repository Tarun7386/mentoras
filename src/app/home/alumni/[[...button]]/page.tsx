import AlumniProfile from "~/app/_components/aspirant/AlumniProfile";
import { redirect } from 'next/navigation';
import { auth } from "~/server/auth";

async function AlumniHomePage() {
    const session = await auth();

    // Redirect to sign-in if the user is not logged in
    if (!session?.user) {
        redirect("/api/auth/signin");
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-[#300171] to-slate-900">
            <AlumniProfile />
        </div>
    );
}

export default AlumniHomePage;
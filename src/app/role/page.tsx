import { auth } from "~/server/auth";
import { redirect } from 'next/navigation'
import { api } from "~/trpc/server";
import MultiStepForm from "../_components/multiform";

async function Role() {
    const session = await auth();

    // Redirect to sign-in if the user is not logged in
    if (!session?.user) {
        redirect("/api/auth/signin");
    }


    const { role } = await api.profileData.getRole({});

    console.log(role)
    // Redirect based on user role when data is fetched
    if (role) {
        const redirectURL =
            role === "ASPIRANT"
                ? "/home/aspirant"
                : role === "MENTOR"
                    ? "/home/mentor"
                    : "/role"; // Default fallback role page

        // Perform the redirection
        redirect(redirectURL);
    }

   
    // Render the client component with session data
    return <MultiStepForm />;
}

export default Role;

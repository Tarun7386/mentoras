import { auth } from "~/server/auth";
import { redirect } from 'next/navigation'
import { api } from "~/trpc/server";
import MultiStepForm from "../_components/multiform";

async function Role() {
    const session = await auth();


    if (!session?.user) {
        redirect("/api/auth/signin");
    }

    const { role } = await api.profileData.getRole({});

    if (role) {
        
        const redirectURL =
            role === "ASPIRANT"
                ? "/home/aspirant"
                : role === "MENTOR"
                    ? "/home/mentor"
                    : "/role"; // Default fallback role page

        redirect(redirectURL);
    }

   
    return <MultiStepForm />;
}

export default Role;

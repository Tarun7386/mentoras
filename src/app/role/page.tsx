'use client'
import { redirect } from 'next/navigation'
import { api } from "~/trpc/react";
import MultiStepForm from "../_components/multiform";
import { useSession } from "next-auth/react";
import LoaderComponent from '../_components/LoaderComponent';

 function Role() {
    const {data:session,status} = useSession();
    const { data, isLoading } = api.profileData.getRole.useQuery({ ownerId: undefined });

     const role = data?.role;

    if (isLoading || status === "loading") {
        return <LoaderComponent/>
    }

    if (!session?.user) {
        redirect("/api/auth/signin");
    }

    if (role) {
        
        const redirectURL =
            role === "ASPIRANT"
                ? "/home/aspirant"
                : role === "MENTOR"
                    ? "/home/mentor"
                    : "/role"; // Default fallback role page

        redirect(redirectURL);
    }

   
    return role === undefined ? <MultiStepForm /> : null;
}

export default Role;

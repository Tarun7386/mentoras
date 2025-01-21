'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import MultiStepForm from "../_components/multiform";

function ClientRolePage({ userId }: { userId: string }) {
    const router = useRouter();

    // Fetch the user's role
    const { data, isLoading } = api.profileData.getRole.useQuery(undefined, {
        enabled: !!userId, // Only fetch if userId is available
    });

    useEffect(() => {
        if (!isLoading && data) {
            const redirectURL =
                data.role === "ASPIRANT"
                    ? "/home/aspirant"
                    : data.role === "MENTOR"
                        ? "/home/mentor"
                        : "/role";
            router.replace(redirectURL);
        }
    }, [data, isLoading, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return  <MultiStepForm />;
}

export default ClientRolePage;

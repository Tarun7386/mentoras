'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from "~/trpc/react";
import MultiStepForm from "../_components/multiform";
import { useSession } from "next-auth/react";
import LoaderComponent from '../_components/LoaderComponent';

function Role() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { data, isLoading } = api.profileData.getRole.useQuery({ ownerId: undefined });

    const role = data?.role;

    useEffect(() => {
        if (!session?.user && status !== "loading") {
            router.push("/api/auth/signin");
        }

        if (role) {
            const redirectURL =
                role === "ASPIRANT"
                    ? "/home/aspirant"
                    : role === "MENTOR"
                        ? "/home/mentor"
                        : role === "ALUMNI"
                            ? "/home/alumni"
                            : "/role";

        router.push(redirectURL);
        }
    }, [session, status, role, router]);

    if (isLoading || status === "loading") {
        return <LoaderComponent />;
    }

    return role === undefined ? <MultiStepForm /> : null;
}

export default Role;

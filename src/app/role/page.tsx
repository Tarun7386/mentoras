'use client'

import { redirect } from 'next/navigation';
import { api } from "~/trpc/react";
import MultiStepForm from "../_components/multiform";
import { useState, useEffect } from 'react';
import LoaderComponent from "../_components/LoaderComponent";
import { useSession } from "next-auth/react";

function Role() {
    const [loading, setLoading] = useState(true);  // Track loading state
    const { data: session } = useSession();
    const { data, isLoading } = api.profileData.getRole.useQuery({});
    const role = data?.role;

    // Redirect to sign-in if the user is not logged in
    useEffect(() => {
        if (!session?.user) {
            redirect("/api/auth/signin");
        }
    }, [session]);

    // Handle redirect based on user role
    useEffect(() => {
        if (role) {
            const redirectURL =
                role === "ASPIRANT"
                    ? "/home/aspirant"
                    : role === "MENTOR"
                        ? "/home/mentor"
                        : "/role"; // Default fallback role page

            // Show the loader and wait for a moment before redirecting
            setLoading(true); // Ensure loader is shown
            setTimeout(() => {
                redirect(redirectURL);
            }, 1000); // Adjust the timeout as needed (1000ms = 1 second)
        }
    }, [role]);

    // Manage loading state once data is fetched
    useEffect(() => {
        if (!isLoading && data) {
            setLoading(false);
        }
    }, [isLoading, data]);

    // If loading, show a loading spinner or message
    if (loading || isLoading) {
        return <LoaderComponent />; // Or replace with a spinner component
    }

    // Render the client component once data is ready
    return <MultiStepForm />;
}

export default Role;

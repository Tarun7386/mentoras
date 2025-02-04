'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import MentorProfileClient from "~/app/_components/aspirant/MentorProfileClient";
import Loader from "~/app/_components/Loader";
import { api } from "~/trpc/react";

function GroupOwnerProfile() {
    const { data: session } = useSession()
        if (!session?.user) {
                redirect("/api/auth/signin");
            }
        
    const params = useParams();
    const id = params?.id as string; // Explicitly cast to string

    const { data, isLoading, error } = api.profileData.getRole.useQuery({ ownerId: id });
    const { data: profile, isLoading: loading, error: profileError } = api.profileData.getAspirantProfile.useQuery({ id });
    const {data:mentorId} = api.mentorsData.getMentorId.useQuery({ userId:id });
    if (isLoading || loading) {
        return <Loader/>;
    }

    if (error || profileError) {
        return <div className="text-center text-red-500">Error loading profile.</div>;
    }

    if (data?.role === "MENTOR") {
        return <MentorProfileClient id={mentorId?.id ?? ""} />;
    }

    return (
        <div className="container mx-auto max-w-5xl p-4">
            <div className="rounded-xl bg-gradient-to-r from-gray-900 via-[#300171] to-slate-900 p-4 text-white shadow-2xl">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left Column */}
                    <div className="lg:col-span-4">
                        <div className="group relative mx-auto h-48 w-48">
                            <div className="animate-tilt absolute -inset-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur-md transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                            <Image
                                src={profile?.image ?? "/image/profile"}
                                className="relative z-10 h-full w-full transform rounded-full object-cover transition-all duration-500 hover:scale-105"
                                alt="Profile"
                                height={150}
                                width={150}
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-3xl font-bold text-transparent">
                                Created by Learner {profile?.name}
                            </h1>
                        </div>
                    </div>

                    {/* Right Column (you can add more content here) */}
                </div>
            </div>
        </div>
    );
}

export default GroupOwnerProfile;

"use client"; 

import { api } from "~/trpc/react";
import MentorProfilePage from "../mentor/MentorProfilePage";

interface MentorProfileClientProps {
    id: string;
}

const MentorProfileClient: React.FC<MentorProfileClientProps> = ({ id }) => {
    const { data, isLoading, error } = api.mentorsData.getProfileDetailsById.useQuery({ id });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error loading mentor profile. Please try again later.</p>;
    }

    const profileData = data?.profileData;

    if (!profileData) {
        return <p className="text-gray-500">Mentor profile not found.</p>;
    }

    return (
        <MentorProfilePage
            id={profileData.user.id}
            profilePic={profileData.user.image ?? "/images/default-profile.png"}
            name={profileData.user.name}
            mainWork={profileData.mainWork}
            createdAt={new Date(profileData.createdAt).toLocaleDateString()} 
            description={profileData.description}
            hashtags={profileData.hashtags}
            followedByMe={profileData.followedByMe}
        />
    );
};

export default MentorProfileClient;

"use client";

import { api } from "~/trpc/react";
import MentorProfilePage from "../mentor/MentorProfilePage";
import Loader from "../Loader";

interface MentorProfileClientProps {
    id: string;
}

const MentorProfileClient: React.FC<MentorProfileClientProps> = ({ id }) => {
    const { data, isLoading, error } = api.mentorsData.getProfileDetailsById.useQuery({ id });

    if (isLoading) {
        return <Loader/>;
    }

    if (error) {
        return (
            <p className="text-red-500 text-center mt-4">
                Error loading mentor profile. Please try again later.
            </p>
        );
    }

    if (!data?.profileData) {
        return <p className="text-gray-500 text-center mt-4">Mentor profile not found.</p>;
    }

    const { user, mainWork, createdAt, description, hashtags, followedByMe } = data.profileData;

    return (
        <MentorProfilePage
            id={user.id}
            profilePic={user.image ?? "/images/default-profile.png"}
            name={user.name}
            mainWork={mainWork}
            createdAt={new Date(createdAt).toLocaleDateString()}
            description={description}
            hashtags={hashtags}
            followedByMe={followedByMe}
        />
    );
};

export default MentorProfileClient;

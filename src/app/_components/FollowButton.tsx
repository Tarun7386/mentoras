"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

interface FollowButtonProps {
    isFollowed: boolean;
    mentorId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowed: initialIsFollowed, mentorId }) => {
    const [isFollowed, setIsFollowed] = useState(initialIsFollowed);

    // Mutation for toggling follow status
    const followToggle = api.engagementsRouter.toggleFollow.useMutation({
        onSuccess: () => {
            console.log(isFollowed ? "Unfollow successful" : "Follow successful");
        }
    });

    const handleFollowToggle = () => {
        // Optimistically toggle the follow state
        const newFollowStatus = !isFollowed;
        setIsFollowed(newFollowStatus);

        // Call the API to toggle follow
        followToggle.mutate({ mentorId });
    };

    return (
        <button
            onClick={handleFollowToggle}
            className={`rounded-full px-6 py-2 text-sm font-semibold shadow-lg transition-all hover:scale-105 ${isFollowed
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                }`}
        >
            {isFollowed ? "Following" : "Follow"}
        </button>
    );
};

export default FollowButton;

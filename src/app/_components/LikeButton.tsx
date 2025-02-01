import { useState } from 'react';
import { api } from '~/trpc/react';

interface LikeButtonProps {
    isLiked: boolean;
    postId: string;
    likeCount: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked: initialIsLiked, postId, likeCount: initialLikeCount }) => {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    const toggleLike = api.engagementsRouter.toggleLike.useMutation({
        onSuccess: () => {
            // Optionally update the like count on the server if necessary
        },
    });

    const handleLikeToggle = async () => {
        try {
            const newLikedStatus = !isLiked;

            // Optimistically update the UI
            setIsLiked(newLikedStatus);
            setLikeCount((prev) => (newLikedStatus ? prev + 1 : prev - 1));

            // Make the API call to toggle the like status
            toggleLike.mutate({ postId });

            console.log(newLikedStatus ? "Liked API called" : "Unliked API called");
        } catch (error) {
            console.error("Error toggling like status:", error);
            // Revert the state if the API call fails
            setIsLiked((prev) => !prev);
            setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
        }
    };

    return (
        <button
            onClick={handleLikeToggle}
            className=" flex justify-center items-center text-pink-300 bg-green-900/40 rounded-md py-2 text-xs hover:bg-green-900/30 transition"
        >
            <svg
                className={`h-5 w-5 stroke-current ${isLiked ? 'text-pink-500' : 'text-pink-300'}`}
                viewBox="0 0 20 20"
                fill={isLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span className=" text-xs">
                {likeCount > 0 ? `${likeCount} ${isLiked ? 'Liked' : 'Likes'}` : 'Like'}
            </span>
        </button>
    );
};

export default LikeButton;

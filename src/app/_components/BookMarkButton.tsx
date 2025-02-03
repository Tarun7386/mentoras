import { useState } from 'react';
import { api } from '~/trpc/react';

interface BookmarkButtonProps {
    isBookmarked: boolean;
    postId: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked: initialIsBookmarked, postId }) => {
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

    // Mutation for toggling bookmark status
    const bookmarkToggle = api.engagementsRouter.bookmarkPost.useMutation({
        onSuccess: () => {
            console.log(isBookmarked ? "Unbookmark successful" : "Bookmark successful");
        },
        onError: (error) => {
            console.error("Error toggling bookmark status:", error);
            // Revert state in case of error
            setIsBookmarked((prev) => !prev);
        },
    });

    const handleBookmarkToggle = () => {
        // Optimistically toggle the bookmark state
        const newBookmarkStatus = !isBookmarked;
        setIsBookmarked(newBookmarkStatus);

        // API call to toggle bookmark
        bookmarkToggle.mutate({ postId });
    };

    return (
        <button
            onClick={handleBookmarkToggle}
            className="flex justify-center items-center text-purple-400 bg-purple-900/20 rounded-md py-2 text-xs hover:bg-purple-900/30 transition"
            disabled={bookmarkToggle.isPending}
        >
            <svg
                className={`h-5 w-5 transition-colors duration-300 ${isBookmarked ? 'text-purple-700 fill-purple-700' : 'text-purple-500 fill-none'
                    }`}
                viewBox="0 0 20 20"
                fill={isBookmarked ? 'currentColor' : 'none'} // Fill dynamically based on state
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span className="text-xs">
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </span>
        </button>
    );
};

export default BookmarkButton;

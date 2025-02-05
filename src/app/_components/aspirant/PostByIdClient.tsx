'use client'
import { api } from "~/trpc/react";
import PostCard from "./PostCard";
import LoaderComponent from "../LoaderComponent";

interface PostByIdClientProps {
    id: string;
}

const PostByIdClient: React.FC<PostByIdClientProps> = ({ id }) => {
    const { data: fetchedPost, isLoading, isError } = api.post.getPostById.useQuery({ id });

    // Handle loading and error states
    if (isLoading) return <LoaderComponent />;
    if (isError || !fetchedPost) return <div className="text-center text-red-500">Failed to load post.</div>;

    // Extract values from the post object
    const { content, createdAt, mentor, hasLiked, hasBookmarked, _count } = fetchedPost;
    const authorName = mentor?.user?.name ?? "Unknown Author";
    const profilePic = mentor?.user?.image ?? "/images/default-profile.png"; // Provide a default image
    const hashtags = ["#hashtag"]; // Implement hashtag extraction if needed

    return (
        <div className="w-full max-w-lg mx-auto p-4 rounded-lg shadow-md">
            <PostCard
                id={id}
                profilePic={profilePic}
                authorName={authorName}
                createdAt={createdAt ? new Date(createdAt).toISOString() : "Unknown date"} // Ensure proper formatting
                content={content ?? ""}
                hashtags={hashtags}
                authorId={mentor?.user?.name ?? "Unknown"} // Use mentor's actual ID instead of their name
                likedByme={hasLiked}
                bookMarkedByme={hasBookmarked}
                likeCount={_count?.likes ?? 0}
            />
        </div>
    );
}

export default PostByIdClient;

'use client'
import { api } from "~/trpc/react";
import PostCard from "./PostCard";

interface PostByIdClientProps {
    id: string;
}

const PostByIdClient: React.FC<PostByIdClientProps> = ({ id }) => {

    const { data: fetchedPost } =  api.post.getPostById.useQuery({ id });




    // If post is not loaded, you can return a loading state here
    if (!fetchedPost) {
        return <div>Loading...</div>;
    }

    // Extract values from the post object
    const { content, createdAt, mentor } = fetchedPost;
    const authorName = mentor?.user?.name || "Unknown"; // Fallback to "Unknown" if name is not available
    const profilePic = mentor?.user?.image || ""; // Fallback to empty string if image is not available
    const hashtags = ["hashtag"]; // You can implement logic to extract hashtags from content, if needed

    return (
        <div className="w-full max-w-lg mx-auto p-4 rounded-lg shadow-md">
            <PostCard
                id={id}
                profilePic={profilePic}
                authorName={authorName}
                createdAt={createdAt ? createdAt.toString() : "Unknown date"} // Convert to 
                content={content || ""}
                hashtags={hashtags}
                authorId={mentor?.user?.name || "Unknown"}
                likedByme={fetchedPost.hasLiked}
                bookMarkedByme={fetchedPost.hasBookmarked}
                likeCount={fetchedPost._count?.likes ?? 0} />
        </div>
    );
}

export default PostByIdClient;



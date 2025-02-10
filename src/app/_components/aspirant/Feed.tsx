import type { FC } from "react";
import PostCard from "./PostCard";
import { api } from "~/trpc/react";
import LoaderComponent from "../LoaderComponent";

const Feed: FC = () => {
    // Fetch posts using tRPC query
    const { data: posts, isLoading, isError } = api.post.getPosts.useQuery();

    // Handle loading and error states
    if (isLoading) {
        return <LoaderComponent />;
    }

    if (isError) {
        return <div className="text-center text-red-500">Failed to load posts.</div>;
    }

    // Handle empty posts
    if (!posts || posts.length === 0) {
        return <div className="text-center text-gray-400">No posts available.</div>;
    }

    // The ID of the post that should be shown first
    const postToShowFirstId = 'cm6yoda4d00001085ah7roo60'; // Replace this with the actual post ID

    // Reorder posts to make the desired post appear first
    const orderedPosts = [
        ...posts.filter(post => post.id === postToShowFirstId),
        ...posts.filter(post => post.id !== postToShowFirstId),
    ];

    return (
        <div className="space-y-4">
            {orderedPosts.map((post) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    profilePic={post.mentor.user.image ?? "/img"}
                    authorName={post.mentor.user.name}
                    createdAt={post.createdAt.toISOString()}
                    content={post.content}
                    hashtags={["hashtag1", "hashtag2"]} // Consider using actual post hashtags
                    authorId={post.mentorId}
                    likedByme={post.hasLiked ?? false}
                    bookMarkedByme={post.hasBookmarked ?? false}
                    likeCount={post.likeCount}
                />
            ))}
        </div>
    );
};

export default Feed;

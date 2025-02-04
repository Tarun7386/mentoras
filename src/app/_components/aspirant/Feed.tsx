import type{ FC } from "react";
import PostCard from "./PostCard";
import { api } from "~/trpc/react";
import Loader from "../Loader";

const Feed: FC = () => {
    // Fetch posts using tRPC query
    const { data: posts, isLoading, isError } = api.post.getPosts.useQuery();

    // Handle loading and error states
    if (isLoading) {
        return <Loader/>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Failed to load posts.</div>;
    }

    // Handle empty posts
    if (!posts || posts.length === 0) {
        return <div className="text-center text-gray-400">No posts available.</div>;
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
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

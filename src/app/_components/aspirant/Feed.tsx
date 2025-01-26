import { FC } from "react";
import PostCard from "./PostCard";
import { api } from "~/trpc/react";

const Feed: FC = () => {
    // Fetch posts using tRPC query
    const { data, isLoading, isError } = api.post.getPosts.useQuery();

    // Handle loading and error states
    if (isLoading) {
        return <div className="text-center text-white">Loading posts...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Failed to load posts.</div>;
    }

    return (
        <div className="space-y-4  bg-gray-900 p-4">
            {data?.map((post) => (
                <PostCard
                    key={post.id}
                    profilePic={`https://via.placeholder.com/40?text=${post.mentor.userId}`}
                    authorName={post.mentor.userId} // Replace with mentor's name if available
                    createdAt={new Date(post.createdAt).toLocaleString()}
                    content={post.content}
                    hashtags={["ias","motivational"]} // Populate hashtags if available in the data
                    authorId={post.mentor.userId}
                />
            ))}
        </div>
    );
};

export default Feed;

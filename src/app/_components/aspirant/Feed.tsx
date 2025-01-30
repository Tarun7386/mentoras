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
        <>
            {data?.map((post, index) => (
                <div key={index}>
                    <PostCard
                        id={post.id}
                        profilePic={post.mentor.user.image ?? "/img"}
                        authorName={post.mentor.user.name}
                        createdAt={post.createdAt.toISOString()}
                        content={post.content}
                        hashtags={["hashtag1", "hashtag2"]}
                        authorId={post.mentorId}
                        likedByme={post.hasLiked}
                        bookMarkedByme={post.hasBookmarked} 
                        likeCount={post.likeCount}/>
                </div>
            ))}

        </>
    );
};

export default Feed;

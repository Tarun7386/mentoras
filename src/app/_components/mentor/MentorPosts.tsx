import { api } from "~/trpc/react";
import LoaderComponent from "../LoaderComponent";
import PostCard from "../aspirant/PostCard";

function MentorPosts({ mentorId }: { mentorId:string}) {
    const { data: posts, isLoading, isError } = api.post.getPostsByMentorId.useQuery({ mentorId: mentorId });

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

    return (
        <div className="max-w-2xl w-full mx-auto space-y-4 sm:space-y-6 pb-20">
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

}

export default MentorPosts;
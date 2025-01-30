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
            <div className="">
                <PostCard
                    profilePic="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    authorName="John Doe"
                    createdAt="2025-01-20T14:30:00Z"
                    content="This is a sample post about web development and design. Check out these tips!"
                    hashtags={["WebDevelopment", "Design", "Coding"]} authorId={""}                />
            </div>
            <div className=" " >
                <PostCard
                    profilePic="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    authorName="Jane Smith"
                    createdAt="2025-01-19T10:00:00Z"
                    content="Exploring the latest trends in JavaScript frameworks. Stay tuned for more updates!"
                    hashtags={["JavaScript", "Frameworks", "Trends"]} authorId={""}                />
            </div>
        </>
    );
};

export default Feed;

import { useState, useEffect } from "react";
import PostCard from "./PostCard";

interface FeedItem {
    id: string;
    title: string;
    content: string;
    postedBy: string;
    postedAt: string;
}

const Feed: React.FC = () => {
    const [feed, setFeed] = useState<FeedItem[]>([]);

    // Fetch feed data
    useEffect(() => {
        async function fetchFeed() {
            const response = await fetch("/api/getFeed");
            const data = await response.json();
            setFeed(data);
        }

        fetchFeed();
    }, []);

    return (
        <>
            <div className=" bg-gray-800 ">
                <PostCard
                    profilePic="https://via.placeholder.com/40"
                    authorName="John Doe"
                    createdAt="2025-01-20T14:30:00Z"
                    content="This is a sample post about web development and design. Check out these tips!"
                    hashtags={["WebDevelopment", "Design", "Coding"]} authorId={""}                />
            </div>
            <div className=" bg-gray-900 " >
                <PostCard
                    profilePic="https://via.placeholder.com/40"
                    authorName="Jane Smith"
                    createdAt="2025-01-19T10:00:00Z"
                    content="Exploring the latest trends in JavaScript frameworks. Stay tuned for more updates!"
                    hashtags={["JavaScript", "Frameworks", "Trends"]} authorId={""}                />
            </div>
        </>
    );
};

export default Feed;

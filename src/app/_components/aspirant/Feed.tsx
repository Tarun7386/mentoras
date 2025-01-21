import { useState, useEffect } from "react";

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
        <div>
            <h2 className="text-2xl font-semibold mb-4">Feed</h2>
            <ul>
                {feed.map((item) => (
                    <li key={item.id} className="mb-4 p-4 border rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p>{item.content}</p>
                        <p className="text-sm text-gray-500">
                            Posted by {item.postedBy} on {new Date(item.postedAt).toLocaleDateString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feed;

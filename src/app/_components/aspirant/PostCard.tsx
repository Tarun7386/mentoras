import React from "react";

interface PostCardProps {
    profilePic: string;
    authorName: string;
    createdAt: string; // ISO date string
    content: string;
    hashtags: string[];
    authorId: string;
}

const PostCard: React.FC<PostCardProps> = ({ profilePic, authorName, createdAt, content, hashtags,authorId }) => {
    // Function to calculate "time ago" format
    const timeAgo = (date: string) => {
        const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000); // Difference in seconds
        if (diff < 60) return `${diff} seconds ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    };

    return (
        <div className=" shadow-md rounded-lg p-4 mb-4">
            {/* Header: Profile picture, author name, and creation time */}
            <div className="flex items-center mb-4 cursor-pointer" onClick={()=>{window.location.href=`/profile/${authorId}`}}>
                <img
                    src={profilePic}
                    alt={`${authorName}'s profile`}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <h3 className="font-semibold text-lg">{authorName}</h3>
                    <p className="text-gray-500 text-sm">{timeAgo(createdAt)}</p>
                </div>
            </div>

            {/* Content */}
            <p className="text-gray-700 mb-4">{content}</p>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {hashtags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Actions: Like, Share, Bookmark */}
            <div className="flex justify-around text-gray-600">
                <button className="flex items-center space-x-1 hover:text-blue-500">
                    <i className="fas fa-thumbs-up"></i> {/* Replace with an appropriate icon library */}
                    <span>Like</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                    <i className="fas fa-share"></i>
                    <span>Share</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                    <i className="fas fa-bookmark"></i>
                    <span>Bookmark</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;

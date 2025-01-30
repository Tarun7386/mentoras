import React from "react";

interface PostCardProps {
  profilePic: string;
  authorName: string;
  createdAt: string; // ISO date string
  content: string;
  hashtags: string[];
  authorId: string;
}

const PostCard: React.FC<PostCardProps> = ({
  profilePic,
  authorName,
  createdAt,
  content,
  hashtags,
  authorId,
}) => {
  // Function to calculate "time ago" format
  const timeAgo = (date: string) => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000); // Difference in seconds
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="mb-6 rounded-xl bg-gradient-to-r p-6 opacity-100 shadow-lg transition-all duration-300 ease-in-out before:from-purple-500/20 before:via-pink-500/20 hover:shadow-xl">
      {/* Author Info */}
      <div className="mb-6 flex items-center">
        <img
          src={profilePic}
          alt={authorName}
          className="h-12 w-12 rounded-full border-2 border-purple-500/30"
        />
        <div className="ml-4">
          <h3 className="font-semibold text-white">{authorName}</h3>
          <p className="text-sm text-gray-400">{timeAgo(createdAt)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="leading-relaxed text-gray-300">{content}</p>
      </div>

      {/* Hashtags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {hashtags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-purple-900/30 px-3 py-1 text-sm text-purple-300"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 border-t border-gray-700/30 pt-4 sm:gap-4 sm:px-4">
        <button className="flex flex-col items-center justify-center gap-1.5 rounded-lg bg-green-900/20 p-2.5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-purple-500/10 hover:text-purple-400 sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5">
          <svg
            className="h-5 w-5 stroke-current text-pink-300"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          <span className="bg-gradient-to-r from-pink-300 to-pink-300 bg-clip-text text-xs font-medium text-transparent sm:text-sm">
            Like
          </span>
        </button>

        <button className="flex flex-col items-center justify-center gap-1.5 rounded-lg bg-blue-900/20 p-2.5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-purple-500/10 hover:text-purple-400 sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5">
          <svg
            className="h-5 w-5 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-xs font-medium text-transparent sm:text-sm">
            Share
          </span>
        </button>

        <button className="flex flex-col items-center justify-center gap-1.5 rounded-lg bg-purple-900/20 p-2.5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-purple-500/10 hover:text-purple-400 sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5">
          <svg
            className="h-5 w-5 stroke-current text-purple-500"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-xs font-medium text-transparent sm:text-sm">
            Bookmark
          </span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;

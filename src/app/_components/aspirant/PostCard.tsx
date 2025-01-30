'use client'

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Blocks from "editorjs-blocks-react-renderer";
import LikeButton from "../LikeButton";
import BookmarkButton from "../BookMarkButton";
import ShareButton from "../ShareButton";
import { ArrowDownToLine, ArrowUpToLine } from "lucide-react";

interface PostCardProps {
  id: string;
  profilePic: string;
  authorName: string;
  createdAt: string; // ISO date string
  content: string; // Now content is a string that will be parsed
  hashtags: string[];
  authorId: string;
  likedByme: boolean;
  bookMarkedByme: boolean;
  likeCount: number;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  profilePic,
  authorName,
  createdAt,
  content,
  hashtags,
  authorId,
  likedByme,
  bookMarkedByme,
  likeCount
}) => {
  const [parsedContent, setParsedContent] = useState<any>(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const parsedData = JSON.parse(content);
      setParsedContent(parsedData);
    } catch (error) {
      console.error("Failed to parse content:", error);
      setParsedContent(null);
    }
  }, [content]);

  // Check if the content exceeds the max height limit
  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > 300);
    }
  }, [parsedContent]);

  // Function to calculate "time ago" format
  const timeAgo = (date: string) => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="mb-4 rounded-lg bg-gradient-to-r p-4 shadow-md transition-all duration-300 ease-in-out before:from-purple-500/20 before:via-pink-500/20 hover:shadow-lg">
      {/* Author Info */}
      <div className="mb-4 flex items-center cursor-pointer" onClick={() => router.push(`/post/${id}`)}>
        <Image
          src={profilePic}
          alt={authorName}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-purple-500/30"
        />
        <span className="ml-3">
          <h3 className="text-sm font-semibold text-white">{authorName}</h3>
          <p className="text-xs text-gray-400">{timeAgo(createdAt)}</p>
        </span>
      </div>

      {/* Content */}
      <div className="mb-4 relative">
        <div
          ref={contentRef}
          className={`text-sm leading-snug text-gray-300 cursor-pointer transition-all duration-300 overflow-hidden ${showFullContent ? "max-h-none" : "max-h-[300px]"
            }`}
          onClick={() => router.push(`/post/${id}`)}
        >
          {parsedContent ? (
            <Blocks data={parsedContent} />
          ) : (
            <p>Loading content...</p>
          )}
        </div>

        {/* See More button based on content height */}
        {isOverflowing && !showFullContent && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent flex justify-center items-end">
            <button
              className="flex items-center text-xs font-semibold text-purple-400 hover:underline"
              onClick={() => setShowFullContent(!showFullContent)}
            >
              {showFullContent ? (
                <>
                  Show less <ArrowUpToLine className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  See more <ArrowDownToLine className="ml-1 h-4 w-4" />
                </>
              )}
            </button>

          </div>
        )}

        {showFullContent && (
          <button
            className="mt-2 text-xs font-semibold text-purple-400 hover:underline"
            onClick={() => setShowFullContent(false)}
          >
            See Less
          </button>
        )}
      </div>

      {/* Hashtags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {hashtags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-purple-900/30 px-2 py-1 text-xs text-purple-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between border-t border-gray-700/30 pt-3">
        <LikeButton isLiked={likedByme} postId={id} likeCount={likeCount} />
        <ShareButton url={`mentoras.in/post/${id}`} />
        <BookmarkButton isBookmarked={bookMarkedByme} postId={id} />
      </div>
    </div>
  );
};

export default PostCard;

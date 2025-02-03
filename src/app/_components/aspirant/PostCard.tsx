'use client'

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Blocks from "editorjs-blocks-react-renderer";
import LikeButton from "../LikeButton";
import BookmarkButton from "../BookMarkButton";
import ShareButton from "../ShareButton";
import { ChevronsDown, ChevronUp } from "lucide-react";
import Loader from "../Loader";

// Define the data types for different block data
interface HeaderData {
  text: string;
  level: number;
}

interface ParagraphData {
  text: string;
}

interface QuoteData {
  text: string;
  caption: string;
  alignment: "left" | "center" | "right";
}

interface TableData {
  withHeadings: boolean;
  stretched: boolean;
  content: string[][];
}

interface ListData {
  style: "unordered" | "ordered";
  items: ListItem[];
  meta?: {
    start?: number;
    counterType?: "upper-roman" | "decimal" | "lower-roman" | "lower-alpha" | "upper-alpha";
  };
}

interface ImageData {
  url: string;
  caption: string;
  withBorder: boolean;
  withBackground: boolean;
  stretched: boolean;
}

interface DelimiterData { 
  data: unknown
}

interface ListItem {
  content: string;
  meta: unknown;
  items: ListItem[];
}

interface DataProp {
  time: number;
  version: string;
  blocks: Array<{
    id: string;
    type: string;
    data: HeaderData | ParagraphData | QuoteData | TableData | ListData | ImageData | DelimiterData;
  }>;
}

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
  likedByme,
  bookMarkedByme,
  likeCount
}) => {
  const [parsedContent, setParsedContent] = useState<DataProp | null>(null);
  const [showFullContent, setShowFullContent] = useState<boolean>(false);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const parsedData = JSON.parse(content) as DataProp;
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

  const handleRedirect = () => {
    setLoading(true); // Set loading to true when clicking the post
    setTimeout(() => {
      router.push(`/post/${id}`);
      setLoading(false); // Set loading to false after redirection
    }, 500); // Simulate a small delay before redirect (you can adjust this)
  };

  const config = {
    header: {
      className: "font-bold text-3xl md:text-4xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
    },

    paragraph: {
      className: "text-gray-300 text-lg leading-relaxed mb-8"
    },
    link: {
      className: "block p-3 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-blue-500/10  to-purple-500/10 border-5 border-blue-500/30 rounded-lg text-blue-400  hover:text-blue-300 hover:border-blue-500/50 transition-all duration-300  hover:translate-x-1 flex items-center gap-2 group"

    },
    table: {
      className: "w-full  mb-8 overflow-x-auto block rounded-lg border border-purple-500/20",
      wrapperClassName: "min-w-full whitespace-nowrap",
      cellClassName: "p-5 sm:p-4 bg-black/30 border border-purple-500/20 text-gray-300 text-sm sm:text-base transition-colors hover:bg-purple-500/10 first:font-medium"
    },
    image: {
      className: "rounded-xl overflow-hidden mb-8 shadow-xl max-w-full h-auto border-5 border-white",
      actionsClassNames: {
        stretched: "w-full h-full object-cover",
        withBackground: "p-4 bg-gray-800/50 shadow",
        withBorder: "border-2 border-purple-500/20"
      },
      captionClassNames: {
        "text-align": "center",
      },
    },
    list: {
      className: "space-y-3 mb-8 pl-4",
      styleClassNames: {
        ordered: "list-decimal",
        unordered: "list-disc",
        checklist: "space-y-2 list-none pl-0"
      },
      itemClassName: "pl-2 marker:text-purple-400",
      checklistItemClassName: "flex items-center gap-3 text-gray-300 bg-black/30 p-3 rounded-lg border border-purple-500/20 transition-all hover:border-purple-500/40",
      checkboxClassName: "w-5 h-5 rounded border-2 border-purple-500/30 checked:bg-purple-500 checked:border-transparent transition-all focus:ring-2 focus:ring-purple-500/20"
    },
    checkList: {
      className: "space-y-2 list-none pl-0",
      itemClassName: "flex items-center gap-3 text-gray-300 bg-black/30 p-3 rounded-lg border border-purple-500/20 transition-all hover:border-purple-500/40",
      checkboxClassName: "w-5 h-5 rounded border-2 border-purple-500/30 checked:bg-purple-500 checked:border-transparent transition-all focus:ring-2 focus:ring-purple-500/20"
    },
    quote: {
      className: "border-l-4 border-purple-500 pl-6 my-8 py-4 bg-black/20 rounded-r-xl relative",
      captionClassName: "mt-4 text-sm text-purple-400/80 italic flex items-center gap-2 before:content-['—'] before:text-purple-500"
    },
    embed: {
      className: "w-full aspect-video rounded-lg sm:rounded-xl  overflow-hidden border border-purple-500/20 mb-4 sm:mb-8 hover:border-purple-500/40 transition-all duration-300  shadow-lg hover:shadow-purple-500/10"
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 rounded-xl p-4 mb-6 shadow-lg hover:shadow-2xl">
      {/* Author Info */}
      <div className="mb-4 flex items-center cursor-pointer" onClick={handleRedirect}>
        <Image src={profilePic} alt={authorName} width={40} height={40} className="h-10 w-10 rounded-full border border-purple-500/30" />
        <span className="ml-3">
          <h3 className="text-sm font-semibold text-white">{authorName}</h3>
          <p className="text-xs text-gray-400">{timeAgo(createdAt)}</p>
        </span>
      </div>

      {/* Content */}
      <div className="mb-4 relative">
        <div ref={contentRef} className={`text-sm leading-snug text-gray-300 cursor-pointer transition-all duration-300 overflow-hidden ${showFullContent ? "max-h-none" : "max-h-[300px]"}`} onClick={handleRedirect}>
          {parsedContent ? (
            <Blocks data={parsedContent} config={config} />
          ) : (
            <p>Loading content...</p>
          )}
        </div>

        {/* See More button based on content height */}
        {isOverflowing && !showFullContent && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent flex justify-center items-end">
            <button className="flex items-center text-xs font-semibold text-purple-400 hover:underline" onClick={() => setShowFullContent(!showFullContent)}>
              {showFullContent ? (
                <>
                  Show less 
                  <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                    See more 
                    <ChevronsDown className="ml-1 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
        {showFullContent && (
          <button className="mt-2 text-xs font-semibold text-purple-400 hover:underline" onClick={() => setShowFullContent(false)}>
            See Less
          </button>
        )}
      </div>

      {/* Hashtags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {hashtags.map((tag, index) => (
          <span key={index} className="rounded-full bg-purple-900/30 px-2 text-xs text-purple-300">
            #{tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-3 sm:gap-4">
        <LikeButton isLiked={likedByme} postId={id} likeCount={likeCount} />
        <ShareButton url={`mentoras.in/post/${id}`} />
        <BookmarkButton isBookmarked={bookMarkedByme} postId={id} />
      </div>

      {/* Loading Spinner */}
      {loading && <Loader/>}
    </div>
  );
};

export default PostCard;

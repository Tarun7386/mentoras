import React, { useState, useEffect, useRef } from "react";
import Blocks from "editorjs-blocks-react-renderer";
import TaskCompleteButton from "./TaskCompleteButton";

interface TaskCardProps {
  id: string;
  content: string;
  postedBy: string;
  datePosted: string;
  isOwner: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  content,
  postedBy,
  datePosted,
  isOwner,
}) => {
  const [parsedContent, setParsedContent] = useState<any>(null); // State to store parsed content
  const [isOverflowing, setIsOverflowing] = useState(false); // State to track overflow condition
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle content visibility
  const contentRef = useRef<HTMLDivElement | null>(null); // Ref to check content height

  // Parse content when `content` prop changes
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
      setIsOverflowing(contentRef.current.scrollHeight > 300); // Adjust the height limit as needed
    }
  }, [parsedContent]);

  return (
    <div className="rounded-xl border border-purple-500/20 bg-gradient-to-b from-gray-900 via-[#300171]/30 to-slate-900 p-3 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 sm:p-4 md:p-6">
      <div className="mb-2 rounded-lg p-2">
        <h1 className="line-clamp-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-lg font-semibold text-transparent sm:text-xl">
          Task
        </h1>
        {parsedContent ? (
          <div
            ref={contentRef}
            className="relative w-full overflow-x-hidden break-words"
          >
            <div className="prose prose-invert max-w-none">
              <Blocks
                data={parsedContent}
                config={{
                  paragraph: {
                    className:
                      "text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 break-words overflow-wrap-normal whitespace-pre-wrap ",
                  },
                  header: {
                    className:
                      "text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 break-words pr-14 sm:pr-20",
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <p className="px-2 text-sm text-gray-400 sm:text-base">
            Loading content...
          </p>
        )}{" "}
        <div className="absolute right-5">
          <TaskCompleteButton isCompleted={false} initialCompletionCount={0} />
        </div>
        {/* Read More Button */}
        {/* {isOverflowing && !isExpanded && (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-purple-400 hover:text-purple-600 transition-all duration-300"
                >
                    Read More
                </button>
            )} */}
        {/* Collapse button */}
        {/* {isExpanded && (
                <button
                    onClick={() => setIsExpanded(false)}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-purple-400 hover:text-purple-600 transition-all duration-300"
                >
                    Show Less
                </button>
            )} */}
        <span className="mt-2 flex items-center gap-2 text-sm text-gray-400">
          <svg
            className="h-4 w-4 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Completions: {1}
        </span>
      </div>

      {/* Footer with postedBy and date */}
      <div className="flex items-center justify-between border-t border-purple-500/20 pt-3 sm:pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-semibold text-white sm:h-8 sm:w-8 sm:text-sm">
            {postedBy.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-gray-400 sm:text-sm">{postedBy}</span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(datePosted).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;

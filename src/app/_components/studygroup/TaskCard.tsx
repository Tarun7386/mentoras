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

const TaskCard: React.FC<TaskCardProps> = ({ id, content, postedBy, datePosted,isOwner }) => {
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
        <div className="bg-gradient-to-b from-gray-900 via-[#300171]/30 to-slate-900 backdrop-blur-sm border border-purple-500/20 rounded-xl p-3 sm:p-4 md:p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="relative">
                {/* Render parsed content if available */}
                {parsedContent ? (
                    <div ref={contentRef}>
                        {/* Display only part of content if it's not expanded */}
                        <Blocks data={parsedContent} />
                    </div>
                ) : (
                    <p>Loading content...</p>
                )}

                {/* Read More Button */}
                {isOverflowing && !isExpanded && (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-purple-400 hover:text-purple-600 transition-all duration-300"
                    >
                        Read More
                    </button>
                )}

                {/* Collapse button */}
                {isExpanded && (
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-purple-400 hover:text-purple-600 transition-all duration-300"
                    >
                        Show Less
                    </button>
                )}
                <span>completions : {10} </span>

                {/* Task Completed Button */}
                {!isOwner && <div className="absolute top-0 right-16">
                    <TaskCompleteButton isCompleted={false} initialCompletionCount={10}  />
                </div>}
            </div>

            {/* Footer with postedBy and date */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-purple-500/20">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                        {postedBy.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400">{postedBy}</span>
                </div>
                <span className="text-xs text-gray-500">{new Date(datePosted).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default TaskCard;

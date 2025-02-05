import React, { useState, useEffect, useRef } from "react";
import Blocks from "editorjs-blocks-react-renderer";
import TaskCompleteButton from "./TaskCompleteButton";
import { ChevronsDown, ChevronUp } from "lucide-react";
import LoaderComponent from "../LoaderComponent";

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
  data:unknown
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

interface TaskCardProps {
  id: string;
  content: string;
  postedBy: string;
  datePosted: string;
  isOwner: boolean;
  isCompleted: boolean;
  completedCount: number;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  content,
  
  datePosted,
  
  isCompleted,
  completedCount,
}) => {
  const [parsedContent, setParsedContent] = useState<DataProp | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const parsedData = JSON.parse(content) as DataProp;
      setParsedContent(parsedData);
    } catch (error) {
      console.error("Failed to parse content:", error);
      setParsedContent(null);
    }
  }, [content]);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > 300);
    }
  }, [parsedContent]);

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
      className: "rounded-xl overflow-hidden mb-8 shadow-xl max-w-full h-auto border-2 border-white",
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
    <div className="rounded-xl border border-purple-500/20 bg-gradient-to-b from-gray-900 via-[#300171]/30 to-slate-900 p-3 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 sm:p-2 md:p-2">
      <div className="mb-2 rounded-lg p-2">
        <h1 className="line-clamp-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-lg font-semibold text-transparent sm:text-xl">
          Task
        </h1>
        {parsedContent ? (
          <div ref={contentRef} className="relative w-full overflow-x-hidden break-words">
            <div className={`prose prose-invert max-w-none ${isExpanded ? "max-h-full" : "max-h-[300px] overflow-hidden"}`}>
              <Blocks
                data={parsedContent}
                config={config}
              />
            </div>
          </div>
        ) : (
            <LoaderComponent />
        )}
        <div className="absolute right-5">
          <TaskCompleteButton isCompleted={isCompleted} initialCompletionCount={completedCount} taskId={id} />
        </div>
        {isOverflowing && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm font-semibold text-purple-400 hover:text-purple-600 transition-all duration-300"
          >
            {isExpanded ? (
              <>
                Show Less
                <ChevronUp />
              </>
            ) : (
              <>
                Read More 
                <ChevronsDown />
              </>
            )}
          </button>
        )}
        <span className="mt-2 flex items-center gap-2 text-sm text-gray-400">
          <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Completions: {completedCount}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-purple-500/20 pt-1 sm:pt-2">
        <span className="text-xs text-gray-500">{new Date(datePosted).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default TaskCard;

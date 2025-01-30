"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ChallengeCardProps {
    id: string;
    challengeName: string;
    duration: number;
    rules: string;
    createdBy: string;
    createdOn: string; // Should be in a readable format (e.g., "January 21, 2025")
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
    id,
    challengeName,
    duration,
    rules,
    createdBy,
    createdOn,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const showMore = rules.length > 200;
    const router = useRouter();  // Using the useRouter hook

    // Handler for navigating to the detailed page of the challenge
    const handleCardClick = () => {
        router.push(`/challenge/${id}`);  // Navigate to /challenge/{id}
    };

    return (
        <div
            className="flex flex-col h-full bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 rounded-xl p-6 shadow-lg hover:shadow-2xl border border-purple-500/20 hover:border-purple-500/30"
            
        >
            <h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent line-clamp-1"
                onClick={handleCardClick} 
                style={{ cursor: 'pointer' }} 
                >
                {challengeName}
            </h1>

            {/* Duration Section - Highlighted */}
            <p className="mt-2 text-md font-semibold text-teal-400">
                Duration: <span className="text-white">{duration} days</span>
            </p>

            <p className="mt-3 text-gray-300 text-sm sm:text-base flex-grow">
                <span className="font-medium text-purple-300">Rules: </span>
                {isExpanded ? rules : rules.slice(0, 200) + (showMore ? "..." : "")}
            </p>

            {showMore && (
                <button onClick={() => setIsExpanded(prev => !prev)} className="mt-2 text-sm text-purple-400 hover:text-purple-300">
                    {isExpanded ? "Read Less" : "Read More"}
                </button>
            )}

            <div className="mt-4 space-y-1 text-xs sm:text-sm text-gray-400">
                <p><span className="font-medium text-purple-300">Created By: </span>{createdBy}</p>
                <p><span className="font-medium text-purple-300">Created On: </span>{createdOn}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-700/30">
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-medium py-1.5 sm:py-2 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95">
                    Join Challenge
                </button>
                <button className="w-full bg-gradient-to-r from-pink-800 to-pink-700 text-gray-200 text-xs font-medium py-1.5 sm:py-2 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] border border-gray-700 hover:border-gray-600 active:scale-95">
                    Leaderboard
                </button>
            </div>
        </div>
    );
};

export default ChallengeCard;

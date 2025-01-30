"use client"
import React from "react";
import { useState } from "react";
interface ChallengeCardProps {
    challengeName: string;
    rules: string;
    createdBy: string;
    createdOn: string; // Should be in a readable format (e.g., "January 21, 2025")
    onJoin: () => void; // Function to handle join action
    onViewLeaderboard: () => void; // Function to handle leaderboard view
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
    challengeName,
    rules,
    createdBy,
    createdOn,
    onJoin,
    onViewLeaderboard,
}) => {
    

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900
        rounded-xl p-6 shadow-lg hover:shadow-2xl 
        transform hover:-translate-y-1 transition-all duration-300 
        border border-purple-500/20 hover:border-purple-500/30">
        
        {/* Challenge Name */}
        <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r 
            from-purple-400 to-pink-400 bg-clip-text text-transparent 
            line-clamp-1">
            {challengeName}
        </h2>

        {/* Rules/Description */}
        <p className="mt-3 text-gray-300 text-sm sm:text-base 
             flex-grow">
            <span className="font-medium text-purple-300">Rules: </span>
            {rules}
        </p>

        {/* Meta Information */}
        <div className="mt-4 space-y-1">
            <p className="text-gray-400 text-xs sm:text-sm">
                <span className="font-medium text-purple-300">Created By: </span>
                {createdBy}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
                <span className="font-medium text-purple-300">Created On: </span>
                {createdOn}
            </p>
        </div>

        
        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-700/30">
    <button
        onClick={onJoin}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600
            text-white text-[10px] sm:text-xs lg:text-sm font-medium 
            py-1.5 sm:py-2 px-1 sm:px-2 lg:px-4 rounded-lg
            transition-all duration-300 hover:scale-[1.02]
            hover:shadow-lg hover:shadow-emerald-500/20
            active:scale-95"
    >
        <span className="block sm:hidden">Join Challenge</span>
        <span className="hidden sm:block">Join Challenge</span>
    </button>
    <button
        onClick={onViewLeaderboard}
        className="w-full bg-gradient-to-r from-pink-800 to-pink-700
            text-gray-200 text-[10px] sm:text-xs lg:text-sm font-medium 
            py-1.5 sm:py-2 px-1 sm:px-2 lg:px-4 rounded-lg
            transition-all duration-300 hover:scale-[1.02]
            border border-gray-700 hover:border-gray-600
            hover:shadow-lg hover:shadow-gray-800/20
            active:scale-95"
    >
        <span className="block sm:hidden">LeaderBoard</span>
        <span className="hidden sm:block">Leaderboard</span>
    </button>
</div>
    </div>

    );
};

export default ChallengeCard;



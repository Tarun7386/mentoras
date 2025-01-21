import React from "react";

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
        <div className="border rounded-lg shadow-lg p-4 bg-white w-full max-w-md mx-auto">
            {/* Challenge Name */}
            <h2 className="text-xl font-semibold text-gray-800">{challengeName}</h2>

            {/* Rules */}
            <p className="text-gray-600 mt-2">
                <span className="font-medium">Rules: </span>
                {rules}
            </p>

            {/* Created By */}
            <p className="text-gray-600 mt-2">
                <span className="font-medium">Created By: </span>
                {createdBy}
            </p>

            {/* Created On */}
            <p className="text-gray-600 mt-1">
                <span className="font-medium">Created On: </span>
                {createdOn}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={onJoin}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Join the Challenge
                </button>
                <button
                    onClick={onViewLeaderboard}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Leaderboard
                </button>
            </div>
        </div>
    );
};

export default ChallengeCard;

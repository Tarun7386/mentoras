import React from "react";

interface BookRecommendationProps {
    title: string;
    author: string;
    description: string;
}

const BookRecommendationCard: React.FC<BookRecommendationProps> = ({
    title,
    author,
    description,
}) => {
    return (
        <div className="max-w-sm w-full border border-gray-200 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

            {/* Author */}
            <p className="text-gray-600 text-sm mb-4">
                <span className="font-medium">Author:</span> {author}
            </p>

            {/* Description */}
            <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                {description}
            </p>

            {/* Read More */}
            <div className="flex justify-end">
                <button className="text-blue-500 text-sm hover:underline">
                    Read More
                </button>
            </div>
        </div>
    );
};

export default BookRecommendationCard;

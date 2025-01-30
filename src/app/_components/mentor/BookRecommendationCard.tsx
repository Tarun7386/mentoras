import React, { useState } from "react";

interface BookRecommendationProps {
  title: string;
  author: string;
  genre: string;
  description: string;
}

const BookRecommendationCard: React.FC<BookRecommendationProps> = ({
  title,
  author,
  genre,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group rounded-xl border border-purple-500/20 bg-black/30 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Title */}
      <h3 className="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-xl font-semibold text-transparent">
        {title}
      </h3>

      {/* Author */}
      <p className="mb-2 text-sm text-purple-200">by {author}</p>

      {/* Genre */}
      <p className="mb-4 text-sm text-purple-200">Genre: {genre}</p>

      {/* Description */}
      <p
        className={`text-sm text-gray-400 transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"
          }`}
      >
        {description}
      </p>

      {/* Read More */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-purple-400 transition-colors duration-300 hover:text-purple-300"
        >
          {isExpanded ? "Show less ↑" : "Read more →"}
        </button>
      </div>
    </div>
  );
};

export default BookRecommendationCard;

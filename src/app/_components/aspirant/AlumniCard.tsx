"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import FollowButton from "../FollowButton";
import Image from "next/image";
import LoaderComponent from "../LoaderComponent";

interface AlumniCardProps {
    id: string;
    profilePic: string;
    name: string;
    achievement: string;
   
    description: string;
    hashtags: string[];
   
    whatsappNumber?: string;
}

const AlumniCard: React.FC<AlumniCardProps> = ({
    id,
    profilePic,
    name,
    achievement,
   
    description,
    hashtags,
 
    whatsappNumber,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
   

  

    const handleBookSession = () => {
        if (whatsappNumber) {
            window.open(
                `https://wa.me/91${whatsappNumber}?text=Hi, I would like to book a session with you.`, 
                '_blank'
            );
        } else {
            toast.info("Booking feature coming soon!");
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 
            rounded-xl p-4 mb-6 shadow-lg hover:shadow-2xl 
            transform hover:-translate-y-1 transition-all duration-300 ease-in-out
            border border-purple-500/10 hover:border-purple-500/20"
        >
            <ToastContainer />
            {/* Profile Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Image
                        src={profilePic}
                        alt={`${name}'s profile`}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full
                            border-2 border-purple-500/30 hover:border-purple-500/50
                            transition-colors duration-300"
                        height={150}
                        width={150}
                    />
                    <div className="ml-4">
                        <h3 className="font-bold text-lg text-white hover:text-purple-200 
                            transition-colors duration-300">{name}</h3>
                        <p className="text-purple-300 text-xs sm:text-sm font-medium">{achievement}</p>
                       
                    </div>
                </div>

                <button
                    onClick={handleBookSession}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600
                        hover:from-purple-700 hover:to-pink-700
                        text-white rounded-full text-sm font-medium
                        transform transition-all duration-300
                        hover:scale-105 hover:shadow-lg
                        flex items-center gap-2"
                >
                    <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                    </svg>
                    Book Session
                </button>
            </div>

            {/* Description */}
            <div className="w-full mt-3 mb-4">
                <div className="relative">
                    <p className={`text-gray-300 text-sm leading-relaxed break-words
                        ${!isExpanded ? "line-clamp-2" : ""}`}
                    >
                        {description}
                    </p>
                    {description.length > 100 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-1 mt-1
                                text-purple-400 hover:text-purple-300 
                                text-xs font-medium transition-all duration-200"
                        >
                            <span>{isExpanded ? "Show less" : "Read more"}</span>
                            <svg 
                                className={`w-3.5 h-3.5 transform transition-transform duration-200 
                                    ${isExpanded ? "rotate-180" : ""}`}
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M19 9l-7 7-7-7" 
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {hashtags.slice(0, 3).map((tag, index) => (
                    <span
                        key={index}
                        className="bg-purple-900/30 text-purple-300 px-3 py-1.5 
                            rounded-full text-sm hover:bg-purple-800/40 
                            hover:text-purple-200 transition-all duration-300
                            cursor-pointer transform hover:-translate-y-0.5"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Action Buttons */}
            {/* <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <button
                    onClick={handleWhatsAppClick}
                    className="flex justify-center items-center text-green-400 
                        bg-green-900/40 rounded-md py-2 text-xs 
                        hover:bg-green-900/30 transition"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.917 1.049 5.591 2.797 7.687L.954 23.73l4.141-1.305C7.059 23.459 9.457 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                    <span className="text-xs sm:text-sm font-medium ml-2">WhatsApp</span>
                </button>
                
            </div> */}

            {loading && <LoaderComponent />}
        </div>
    );
};

export default AlumniCard;
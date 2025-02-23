"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import Image from "next/image";
import LoaderComponent from "../LoaderComponent";
import { Book, GraduationCap, Building2} from "lucide-react";

interface AlumniCardProps {
    id: string;
    name: string;
    profilePic: string;
    collegeName: string;
    degree: string;
    description: string;
    sessionCost: number;
    whatsappNumber: number;
}

const AlumniCard: React.FC<AlumniCardProps> = ({
    name,
    profilePic,
    collegeName,
    degree,
    description,
    sessionCost,
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
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-[#1a0b2e] to-gray-900 
            rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500
            border border-purple-500/20 hover:border-purple-500/40 ">
            
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-full h-32 opacity-10">
                <div className="w-96 h-96 rotate-45 transform -translate-x-1/2 -translate-y-1/2 
                    bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl"/>
            </div>

            {/* Main Content */}
            <div className="relative p-4 sm:p-6">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-6">
                    {/* Profile and Price */}
                    <div className="flex items-start gap-3 max-w-[70%]">
                        <Image
                            src={profilePic || "/default-avatar.png"}
                            alt={name}
                            width={56}
                            height={56}
                            className="rounded-full ring-2 ring-purple-500/30 w-12 h-12 sm:w-14 sm:h-14
                                flex-shrink-0"
                        />
                        <div className="min-w-0">
                            <h3 className="text-lg font-bold text-white truncate">{name}</h3>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-green-400 font-bold text-xs sm:text-sm">₹{sessionCost}</span>
                                <span className="text-green-500/70 text-xs">/session</span>
                            </div>
                        </div>
                    </div>

                    {/* Book Session Button - Always Top Right */}
                    <button
                        onClick={handleBookSession}
                        className="flex-shrink-0 px-3 sm:px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600
                            hover:from-purple-700 hover:to-pink-700
                            text-white text-xs sm:text-sm font-medium rounded-full
                            transition-all duration-300 hover:shadow-lg
                            flex items-center gap-1.5 whitespace-nowrap ml-2"
                    >
                        <Book className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">Book</span>
                        <span>Book Session</span>
                    </button>
                </div>

                {/* Education Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="bg-purple-900/20 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <GraduationCap className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300 text-sm font-medium">Degree</span>
                        </div>
                        <p className="text-white text-sm font-medium pl-6 truncate">{degree}</p>
                    </div>
                    <div className="bg-purple-900/20 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Building2 className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300 text-sm font-medium">College</span>
                        </div>
                        <p className="text-white text-sm font-medium pl-6 truncate">{collegeName}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Book className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 text-sm font-medium">About</span>
                    </div>
                    <div className="relative">
                        <p className={`text-gray-300 text-sm leading-relaxed
                            ${!isExpanded ? "line-clamp-3" : ""}`}>
                            {description}
                        </p>
                        {description.length > 150 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-purple-400 hover:text-purple-300 text-xs mt-1
                                    font-medium transition-colors duration-200">
                                {isExpanded ? "Show less" : "Read more"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
);
};


export default AlumniCard;
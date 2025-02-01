"use client";
import { useState } from "react";
import { Phone, MessageSquare, Video } from "lucide-react"; // SVG icons
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import FollowButton from "../FollowButton";

interface MentorCardProps {
    id: string;
    profilePic: string;
    name: string;
    designation: string;
    followers: number;
    description: string;
    hashtags: string[];
    followedByMe : boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({
    id,
    profilePic,
    name,
    designation,
    followers,
    description,
    hashtags,
    followedByMe
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const router = useRouter()

    return (
        <div
            className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 
            rounded-xl p-6 mb-8 shadow-lg hover:shadow-2xl 
            transform hover:-translate-y-1 transition-all duration-300 ease-in-out
            border border-purple-500/10 hover:border-purple-500/20"
        >
            <ToastContainer/>
            {/* Author Info */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center cursor-pointer" onClick={() => router.push(`/mentorProfile/${id}`)}>
                    <img
                        src={profilePic}
                        alt={`${name}'s profile`}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full
          border-2 border-purple-500/30 hover:border-purple-500/50
          transition-colors duration-300"
                    />
                    <div className="ml-4">
                    <h3 className="font-bold text-lg text-white hover:text-purple-200 
                        transition-colors duration-300">{name}</h3>
                        <p className="text-gray-400">{designation}</p>
                        <p className="text-purple-400 text-sm mt-1">{followers.toLocaleString()} followers</p>
                    </div>
                </div>

                {/* Follow Button */}
                <div className="flex-2 ">
                <FollowButton isFollowed={followedByMe} mentorId={id}/>
                </div>
                
            </div>


            {/* Description */}
            <div className="mb-6">
                <p
                    className={`text-gray-300 text-sm leading-relaxed ${!isExpanded && "line-clamp-2"
                        }`}
                >
                    {description}
                </p>
                {description.length > 100 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-1 text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors"
                    >
                        {isExpanded ? "Show less" : "See more"}
                    </button>
                )}
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mb-6">
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
            <div className="grid grid-cols-3 gap-2 mb-3 sm:gap-4">
                <button
                    className="flex justify-center items-center text-green-400 bg-green-900/40 rounded-md py-2 text-xs hover:bg-green-900/30 transition"
                    aria-label="Call"
                    onClick={()=> toast.info("we are still working on this feature")}
                >
                    <Phone className="w-5 h-5" />
                    <span className="text-xs sm:text-sm font-medium p-1">Call</span>
                </button>
                <button
                    className="flex justify-center items-center text-blue-400 bg-blue-900/20 rounded-md py-2 text-xs hover:bg-blue-900/30 transition"
                    aria-label="Chat"
                    onClick={() => toast.info("we are still working on this feature")}

                >
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-xs sm:text-sm font-medium ml-1">Chat</span>
                </button>
                <button
                    className="flex justify-center items-center text-purple-400 bg-purple-900/20 rounded-md py-2 text-xs hover:bg-purple-900/30 transition"
                    aria-label="Meet"
                    onClick={() => toast.info("we are still working on this feature")}

                >
                    <Video className="w-5 h-5" />
                    <span className="text-xs sm:text-sm font-medium ml-1">Meet</span>
                </button>
            </div>

           
        </div>
    );
};

export default MentorCard;

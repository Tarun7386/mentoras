"use client"
import { useState } from "react";

interface MentorCardProps {
    profilePic: string;
    name: string;
    designation: string;
    followers: number;
    description: string;
    hashtags: string[];
}

const MentorCard: React.FC<MentorCardProps> = ({
    profilePic,
    name,
    designation,
    followers,
    description,
    hashtags,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    return (
        // <div className=" shadow-md rounded-lg p-6 mb-6 ">
        //     {/* Header: Profile picture, name, designation, and followers */}
        //     <div className="flex items-center mb-4 cursor-pointer" onClick={()=>{window.location.href=`/profile/${name}`}}>
        //         <img
        //             src={profilePic}
        //             alt={`${name}'s profile`}
        //             className="w-12 h-12 rounded-full mr-4"
        //         />
        //         <div>
        //             <h3 className="font-bold text-lg">{name}</h3>
        //             <p className="text-sm text-gray-500">{designation}</p>
        //             <p className="text-sm text-gray-500">{followers} followers</p>
        //         </div>
        //     </div>

        //     {/* Description */}
        //     <p className="text-gray-700 mb-4">{description}</p>

        //     {/* Hashtags */}
        //     <div className="flex flex-wrap gap-2 mb-4">
        //         {hashtags.map((tag, index) => (
        //             <span
        //                 key={index}
        //                 className="bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded"
        //             >
        //                 #{tag}
        //             </span>
        //         ))}
        //     </div>

        //     {/* Icons: Phone, Message, Video Call */}
        //     <div className="flex justify-around mb-4 text-gray-600">
        //         <button className="flex items-center space-x-1 hover:text-green-500">
        //             <i className="fas fa-phone"></i> {/* Replace with your icon library */}
        //             <span>Call</span>
        //         </button>
        //         <button className="flex items-center space-x-1 hover:text-blue-500">
        //             <i className="fas fa-envelope"></i>
        //             <span>Message</span>
        //         </button>
        //         <button className="flex items-center space-x-1 hover:text-purple-500">
        //             <i className="fas fa-video"></i>
        //             <span>Video Call</span>
        //         </button>
        //     </div>

        //     {/* Follow Button */}
        //     <div className="text-center">
        //         <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        //             Follow
        //         </button>
        //     </div>
        // </div>
        <div className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 
            rounded-xl p-6 mb-8 shadow-lg hover:shadow-2xl 
            transform hover:-translate-y-1 transition-all duration-300 ease-in-out
            border border-purple-500/10 hover:border-purple-500/20">
                
            
            
            {/* Author Info */}
            <div className="flex items-center mb-6">
                <img src={profilePic} 
                    alt={`${name}'s profile`} 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full 
                        border-2 border-purple-500/30 hover:border-purple-500/50 
                        transition-colors duration-300" 
                />
                <div className="ml-4">
                    <h3 className="font-bold text-lg text-white hover:text-purple-200 
                        transition-colors duration-300">{name}</h3>
                    <p className="text-gray-400">{designation}</p>
                    <p className="text-purple-400 text-sm mt-1">
                        {followers.toLocaleString()} followers
                    </p>
                </div>
            </div>
            

            {/* Description with See More */}
            <div className="mb-6">
                <p className={`text-gray-300 leading-relaxed ${
                    !isExpanded && 'line-clamp-3'
                }`}>
                    {description}
                </p>
                {description.length > 150 && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-2 text-purple-400 hover:text-purple-300 
                            transition-colors duration-300 text-sm font-medium"
                    >
                        {isExpanded ? 'Show less' : 'See more'}
                    </button>
                )}
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {hashtags.map((tag, index) => (
                    <span key={index} 
                        className="bg-purple-900/30 text-purple-300 px-3 py-1.5 
                            rounded-full text-sm hover:bg-purple-800/40 
                            hover:text-purple-200 transition-all duration-300
                            cursor-pointer transform hover:-translate-y-0.5">
                        #{tag}
                    </span>
                ))}
            </div>
<div className="space-y-6">
    
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
    <button className="flex flex-col sm:flex-row items-center justify-center 
        text-green-400 bg-green-900/40 rounded-xl p-3 sm:px-4 sm:py-2.5
        hover:bg-green-900/30 transition-all duration-300 
        hover:-translate-y-1 gap-1 sm:gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" fill="none" viewBox="0 0 24 24" 
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="text-xs sm:text-sm font-medium">Call</span>
    </button>

    <button className="flex flex-col sm:flex-row items-center justify-center 
        text-blue-400 bg-blue-900/20 rounded-xl p-3 sm:px-4 sm:py-2.5
        hover:bg-blue-900/30 transition-all duration-300 
        hover:-translate-y-1 gap-1 sm:gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" fill="none" viewBox="0 0 24 24" 
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="text-xs sm:text-sm font-medium">Chat</span>
    </button>

    <button className="flex flex-col sm:flex-row items-center justify-center 
        text-purple-400 bg-purple-900/20 rounded-xl p-3 sm:px-4 sm:py-2.5
        hover:bg-purple-900/30 transition-all duration-300 
        hover:-translate-y-1 gap-1 sm:gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" fill="none" viewBox="0 0 24 24" 
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span className="text-xs sm:text-sm font-medium">Meet</span>
    </button>
    
    
</div> 

    {/* Follow Button */}
    <div className=" ">
        <button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`w-full py-2.5 rounded-lg font-medium text-sm
                transition-all duration-300 transform hover:translate-y-[-1px]
                flex items-center justify-center gap-2
                ${isFollowing 
                    ? 'bg-purple-500/10 text-purple-400 border-2 border-purple-500/30 hover:bg-green-500/20' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-green-500/25'
                }`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 sm:h-5 sm:w-5" 
                fill="none" viewBox="0 0 24 24" 
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" 
                    strokeWidth={2} d={isFollowing ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
            </svg>
            <span>{isFollowing ? 'Following' : 'Follow'}</span>
        </button>
    </div>
</div>
        </div>
        
    );
};

export default MentorCard;

import React from "react";

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
    return (
        <div className=" shadow-md rounded-lg p-6 mb-6 ">
            {/* Header: Profile picture, name, designation, and followers */}
            <div className="flex items-center mb-4 cursor-pointer" onClick={()=>{window.location.href=`/profile/${name}`}}>
                <img
                    src={profilePic}
                    alt={`${name}'s profile`}
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p className="text-sm text-gray-500">{designation}</p>
                    <p className="text-sm text-gray-500">{followers} followers</p>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4">{description}</p>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {hashtags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Icons: Phone, Message, Video Call */}
            <div className="flex justify-around mb-4 text-gray-600">
                <button className="flex items-center space-x-1 hover:text-green-500">
                    <i className="fas fa-phone"></i> {/* Replace with your icon library */}
                    <span>Call</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                    <i className="fas fa-envelope"></i>
                    <span>Message</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-purple-500">
                    <i className="fas fa-video"></i>
                    <span>Video Call</span>
                </button>
            </div>

            {/* Follow Button */}
            <div className="text-center">
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Follow
                </button>
            </div>
        </div>
    );
};

export default MentorCard;

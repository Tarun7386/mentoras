"use client";
import { useState } from "react";
import StudyGroupsList from "../studygroup/StudyGroupsList";
import Image from "next/image";
import FollowButton from "../FollowButton";
import { useSession } from "next-auth/react";
import MentorPosts from "./MentorPosts";

interface Hashtag {
  id: string;
  name: string;
}

interface MentorProfilePageProps {
  id: string;
  mentorId: string;
  profilePic: string;
  name: string;
  mainWork: string;
  createdAt: string;
  description: string;
  hashtags: Hashtag[];
  followedByMe: boolean;
}

const MentorProfilePage: React.FC<MentorProfilePageProps> = ({
  id,
  mentorId,
  profilePic,
  name,
  mainWork,
  
  description,
  hashtags,
  followedByMe
}) => {

  const {data:session} = useSession()

 
  const [activeTab, setActiveTab] = useState<"studyGroups" | "Your Posts" | "reviews" | "AMA">(
    "studyGroups"
  );

  const handleTabClick = (tab: "studyGroups" | "Your Posts" | "reviews" |"AMA") => {
    setActiveTab(tab);
  };

  const colors = ["bg-purple-900/50", "bg-blue-900/50", "bg-teal-900/50", "bg-green-900/50"];
  const textColors = ["text-purple-300", "text-blue-300", "text-teal-300", "text-green-300"];

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <div className="rounded-xl bg-gradient-to-r from-gray-900 via-[#300171] to-slate-900 p-4 text-white shadow-2xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-4">
            <div className="group relative mx-auto h-48 w-48">
              <div className="animate-tilt absolute -inset-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur-md transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
              <Image
                src={profilePic ?? "/image/profile"}
                className="relative z-10 h-full w-full transform rounded-full object-cover transition-all duration-500 hover:scale-105"
                alt="Profile"
                height={150}
                width={150}
              />
            </div>
            <div className="mt-6 text-center">
              <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-3xl font-bold text-transparent">
                {name}
              </h1>
              <p className="mt-2 font-medium text-purple-400">{mainWork}</p>
            </div>
            <div className="mt-6 flex justify-between px-4">
              <div className="text-center">
                <p className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">
                  NaN
                </p>
                <p className="text-xs text-gray-400">FOLLOWERS</p>
              </div>
              <div className="text-center">
                <p className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">
                  NaN
                </p>
                <p className="text-xs text-gray-400">POSTS</p>
              </div>
              <div className="text-center">
                <p className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">
                  NaN
                </p>
                <p className="text-xs text-gray-400">RATING</p>
              </div>
            </div>
            { !(id === session?.user.id) && <div className="mt-6 flex justify-center">
              <FollowButton isFollowed={followedByMe} mentorId={id}/>
            </div>}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            <div className="rounded-xl bg-black/30 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-semibold">About Me</h2>
              <p className="leading-relaxed text-gray-300">{description}</p>
              <div className="mt-6">
                <h3 className="mb-3 text-lg font-semibold">Related Hashtags</h3>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((hashtag, i) => (
                    <span
                      key={hashtag.id}
                      className={`rounded-full ${colors[i % colors.length]} px-3 py-1 text-sm ${textColors[i % textColors.length]}`}
                    >
                      {hashtag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black/20 overflow-x-auto">
          <div className="flex min-w-max space-x-4 p-4 md:justify-center">
            {(["studyGroups", "Your Posts", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)} // No need to cast to any
                className={`w-40 rounded-lg px-6 py-3 text-center transition-all duration-200 ${activeTab === tab
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                  : "bg-black/30 text-gray-300 hover:bg-black/50"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
    


        {/* Tab Content */}
        <div className="mt-6 px-4">
          <div className="rounded-lg bg-black/20 p-6">
            {activeTab === "studyGroups" && <StudyGroupsList ownerId={id}/>}
            {activeTab === "Your Posts" && <MentorPosts mentorId={mentorId}/> }
            {activeTab === "AMA" && <p> working.... on Ask Me Anything Feature</p>}
            {activeTab === "reviews" && <p>Reviews appear here (still working on this feature)</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfilePage;

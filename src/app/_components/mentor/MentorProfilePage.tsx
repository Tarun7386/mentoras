// import { useState, useEffect } from "react";

// interface Mentor {
//     id: string;
//     name: string;
//     bio: string;
//     followerCount: number;
//     createdAt: string;
// }

// const MentorProfilePage: React.FC = () => {
//     const [mentor, setMentor] = useState<Mentor | null>(null);
//     const [activeTab, setActiveTab] = useState<string>("studyGroups"); // Default active tab is "Study Groups"

//     // Fetch mentor details
//     // useEffect(() => {
//     //     async function fetchMentor() {
//     //         const response = await fetch("/api/mentorProfile");
//     //         const data = await response.json();
//     //         setMentor(data);
//     //     }

//     //     fetchMentor();
//     // }, []);

//     // Handle tab click
//     const handleTabClick = (tab: string) => {
//         setActiveTab(tab);
//     };

//     return (
//         <div className="p-6">
//             <div className="flex items-center space-x-4">
//                 {/* Mentor Profile Details */}
//                 <div>
//                     <h1 className="text-3xl font-bold">{"mentor.name"}</h1>
//                     <p className="text-lg">{"mentor.bio"}</p>
//                     <p className="mt-2 text-sm text-gray-500">Joined: {"new Date(mentor.createdAt).toLocaleDateString()"}</p>
//                     <p className="mt-2 text-lg">
//                         <strong>Followers: </strong>{"mentor.followerCount"}
//                     </p>
//                 </div>
//             </div>

//             {/* Tab buttons to toggle components */}
//             <div className="mt-6">
//                 <button
//                     onClick={() => handleTabClick("studyGroups")}
//                     className={`p-2 mr-4 rounded ${activeTab === "studyGroups" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                 >
//                     My Study Groups
//                 </button>
//                 <button
//                     onClick={() => handleTabClick("dailyTasks")}
//                     className={`p-2 mr-4 rounded ${activeTab === "dailyTasks" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                 >
//                     Daily Tasks
//                 </button>
//                 <button
//                     onClick={() => handleTabClick("reviews")}
//                     className={`p-2 rounded ${activeTab === "reviews" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                 >
//                     Reviews
//                 </button>
//             </div>

//             {/* Conditional Rendering based on active tab */}
//             <div className="mt-6">
//                 {/* {activeTab === "studyGroups" && <MyStudyGroups mentorId={mentor.id} />}
//                 {activeTab === "dailyTasks" && <DailyTasks mentorId={mentor.id} />}
//                 {activeTab === "reviews" && <Reviews mentorId={mentor.id} />} */}
//                 {activeTab === "studyGroups" && <div> grops </div>}
//                 {activeTab === "dailyTasks" && <div> grops 1 </div>}
//                 {activeTab === "reviews" && <div> grops 2 </div>}
//             </div>
//         </div>
//     );
// };

// export default MentorProfilePage;
"use client";
import { useState } from "react";

const MentorProfilePage = () => {
  const [activeTab, setActiveTab] = useState<
    "studyGroups" | "dailyTasks" | "reviews"
  >("studyGroups");

  const handleTabClick = (tab: "studyGroups" | "dailyTasks" | "reviews") => {
    setActiveTab(tab);
  };

  return (
    <div className="container  max-w-7xl ">
      <div className="rounded-xl bg-gradient-to-r from-gray-900 via-[#300171] to-slate-900  p-4 text-white shadow-2xl ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12  ">
          {/* Left Column - Profile Image & Basic Info */}
          <div className="lg:col-span-4">
            
            <div className="group relative mx-auto h-48 w-48">
              {/* Glowing Circle Background */}
              <div className="animate-tilt absolute -inset-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur-md transition duration-1000 group-hover:opacity-100 group-hover:duration-200  mt-2"></div>

              {/* Profile Image */}
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="relative z-10 h-full w-full transform rounded-full object-cover transition-all duration-500 hover:scale-105"
              />
            </div>
            <div className="mt-6 text-center">
              <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-3xl font-bold text-transparent">
                Mentor Name
              </h1>
              <p className="mt-2 font-medium text-purple-400">
                Senior Software Engineer
              </p>
            </div>
            <div className="mt-6 flex justify-between px-4">
              <div className="text-center">
                <p className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">
                  1.2k
                </p>
                <p className="text-xs text-gray-400">FOLLOWERS</p>
              </div>
              <div className="text-center">
                <p className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">
                  86
                </p>
                <p className="text-xs text-gray-400">PROJECTS</p>
              </div>
              <div className="text-center">
                <p className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">
                  4.8
                </p>
                <p className="text-xs text-gray-400">RATING</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center rounded-full bg-black/30 px-4 py-2 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4 text-purple-400"
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
                <p className="text-sm font-medium text-gray-300">
                  Joined {"  "}
                  <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    12-03-2025
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 md:mt-8 ">
            <div className="rounded-xl bg-black/30 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-semibold">About Me</h2>
              <p className="leading-relaxed text-gray-300">
                Passionate software engineer with over 8 years of experience in
                full-stack development. Specialized in React, Node.js, and cloud
                technologies. Leading technical initiatives and mentoring junior
                developers. Committed to writing clean, maintainable code and
                building scalable applications.
              </p>

              {/* Tech Stack */}
              <div className="mt-6">
                <h3 className="mb-3 text-lg font-semibold">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-purple-900/50 px-3 py-1 text-sm text-purple-300">
                    React
                  </span>
                  <span className="rounded-full bg-blue-900/50 px-3 py-1 text-sm text-blue-300">
                    TypeScript
                  </span>
                  <span className="rounded-full bg-teal-900/50 px-3 py-1 text-sm text-teal-300">
                    Node.js
                  </span>
                  <span className="rounded-full bg-green-900/50 px-3 py-1 text-sm text-green-300">
                    MongoDB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full ">
        <div className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black/20 overflow-x-auto ">
          <div className="flex min-w-max space-x-4 p-4 md:min-w-0 md:justify-center ">
            <button
              onClick={() => handleTabClick("studyGroups")}
              className={`w-40 flex-none rounded-lg px-6 py-3 text-center transition-all duration-200 ${
                activeTab === "studyGroups"
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                  : "bg-black/30 text-gray-300 hover:bg-black/50"
              }`}
            >
              Study Groups
            </button>
            <button
              onClick={() => handleTabClick("dailyTasks")}
              className={`w-40 flex-none rounded-lg px-6 py-3 text-center transition-all duration-200 ${
                activeTab === "dailyTasks"
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                  : "bg-black/30 text-gray-300 hover:bg-black/50"
              }`}
            >
              Daily Tasks
            </button>
            <button
              onClick={() => handleTabClick("reviews")}
              className={`w-40 flex-none rounded-lg px-6 py-3 text-center transition-all duration-200 ${
                activeTab === "reviews"
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                  : "bg-black/30 text-gray-300 hover:bg-black/50"
              }`}
            >
              Reviews
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6 px-4 md:px-6">
          <div className="rounded-lg bg-black/20 p-4 md:p-6">
            {activeTab === "studyGroups" && (
              <div className="space-y-6">
                <h3 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-center text-xl font-semibold text-transparent">
                  Study Groups
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Study Group Cards */}
                  <div className="rounded-lg bg-black/30 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-black/40">
                    <h4 className="text-lg font-semibold text-purple-300">
                      React Advanced
                    </h4>
                    <p className="mt-2 text-gray-300">
                      Advanced React patterns and performance optimization
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-400">12 Members</span>
                      <button className="rounded-full bg-purple-600/30 px-3 py-1 text-sm text-purple-300 hover:bg-purple-600/50">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "dailyTasks" && (
              <div className="space-y-6">
                <h3 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-center text-xl font-semibold text-transparent">
                  Daily Tasks
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Task Cards */}
                  <div className="rounded-lg bg-black/30 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-black/40">
                    <h4 className="text-lg font-semibold text-blue-300">
                      Code Review
                    </h4>
                    <p className="mt-2 text-gray-300">
                      Review and provide feedback on student projects
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-400">Due Today</span>
                      <span className="rounded-full bg-blue-600/30 px-3 py-1 text-sm text-blue-300">
                        In Progress
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <h3 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-center text-xl font-semibold text-transparent">
                  Reviews
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Review Cards */}
                  <div className="rounded-lg bg-black/30 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-black/40">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-full bg-purple-600/30"></div>
                      <div>
                        <h4 className="text-lg font-semibold text-purple-300">
                          John Doe
                        </h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-300">
                      "Great mentor! Clear explanations and always available for
                      help."
                    </p>
                    <span className="mt-2 block text-sm text-gray-400">
                      2 days ago
                    </span>
                  </div>
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfilePage;

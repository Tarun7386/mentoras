"use client";
import React, { useState } from "react";
import AspirantPage from "~/app/_components/aspirant/AspirantPage";

const AspirantHomePage = () => {
  const [initialTab, setInitialTab] = useState<string>("feed"); // Default tab is "feed"

  // Example of how to update the initialTab when a button is clicked
  const handleTabChange = (tab: string) => {
    setInitialTab(tab);
  };

  return (
    <div className="flex min-h-screen flex-col border-2 border-purple-500/10 lg:flex-row">
      {/* Left Sidebar for Large Devices */}
      <div className="hidden border-r-2 border-purple-500/10 p-4 lg:block lg:w-1/4">
        <h2 className="mb-4 text-lg font-semibold">Filter By</h2>
        <div className="space-y-2">Will be implemented</div>
        <h2 className="mb-4 mt-6 text-lg font-semibold">Popular Search</h2>
        <ul className="space-y-2">
          <li className="cursor-pointer text-blue-500 hover:underline">
            Will be implemented
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        <div className="mx-auto flex max-w-md justify-center gap-4 px-4 py-4 sm:flex-row sm:gap-6">
          <button
            onClick={() => handleTabChange("feed")}
            className={`flex items-center justify-center gap-2 rounded-xl 
              border border-purple-500/20 
              ${initialTab === "feed" 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
                  : "bg-black/50 hover:bg-gradient-to-r hover:from-purple-600/80 hover:to-pink-600/80 hover:text-white"
              }
              px-3 py-3 transition-all duration-300 hover:scale-[1.02] 
              sm:flex-1 md:flex-1 lg:flex-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"
              />
            </svg>
            <span className="font-medium">Daily Insights</span>
          </button>

          <button
            onClick={() => handleTabChange("mentors")}
            className={`flex items-center justify-center gap-3 rounded-xl 
              border border-purple-500/20 
              ${initialTab === "mentors" 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
                  : "bg-black/50 hover:bg-gradient-to-r hover:from-purple-600/80 hover:to-pink-600/80 hover:text-white"
              }
              px-6 py-3 transition-all duration-300 hover:scale-[1.02] 
              sm:flex-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="font-medium">Mentors</span>
          </button>
        </div>
        <AspirantPage initialTab={initialTab} />
      </div>

      <div className="hidden p-4 lg:block lg:w-1/4"></div>
    </div>
  );
};

export default AspirantHomePage;

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AspirantPage from "~/app/_components/aspirant/AspirantPage";

const AspirantHomePage = ({
    tabSelected,
}: {
    tabSelected: "feed" | "mentors" |"alumni";
}) => {
    const [activeComponent, setActiveComponent] = useState<"feed" | "mentors" | "alumni" >(tabSelected);
    console.log("Tab Selected: ", tabSelected);

    const router = useRouter();

    const handleTabChange = (
        button: "feed" | "mentors" | "alumni",
    ) => {
        console.log("Button Clicked: ", button);

        router.push(`/home/aspirant/${button}`);
        setActiveComponent(button);
    };

    return (
        <div className="flex min-h-screen flex-col border-2 border-purple-500/10 lg:flex-row ">
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
            <div className="flex-1 ">
    {/* Navigation Tabs */}
    <div className=" top-2 z-10 backdrop-blur-sm mt-2">
        <div className="mx-auto max-w-screen-xl px-2 sm:px-4">
            <div className="flex overflow-x-auto no-scrollbar py-3 sm:py-4 gap-2 sm:gap-4 justify-start sm:justify-center">
                {/* Daily Insights Tab */}
                <button
                    onClick={() => handleTabChange("feed")}
                    className={`flex items-center justify-center gap-2 rounded-xl 
                        border border-purple-500/20 whitespace-nowrap
                        ${activeComponent === "feed"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-black/50 hover:bg-gradient-to-r hover:from-purple-600/80 hover:to-pink-600/80 hover:text-white"
                        }
                        px-4 py-2.5 transition-all duration-300 hover:scale-[1.02] 
                        min-w-[140px] sm:min-w-0 sm:flex-1 sm:max-w-[200px]`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 shrink-0"
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

                {/* Mentors Tab */}
                <button
                    onClick={() => handleTabChange("mentors")}
                    className={`flex items-center justify-center gap-2 rounded-xl 
                        border border-purple-500/20 whitespace-nowrap
                        ${activeComponent === "mentors"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-black/50 hover:bg-gradient-to-r hover:from-purple-600/80 hover:to-pink-600/80 hover:text-white"
                        }
                        px-4 py-2.5 transition-all duration-300 hover:scale-[1.02] 
                        min-w-[120px] sm:min-w-0 sm:flex-1 sm:max-w-[200px]`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 shrink-0"
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

                {/* Alumni Tab */}
                <button
                    onClick={() => handleTabChange("alumni")}
                    className={`flex items-center justify-center gap-2 rounded-xl 
                        border border-purple-500/20 whitespace-nowrap
                        ${activeComponent === "alumni"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-black/50 hover:bg-gradient-to-r hover:from-purple-600/80 hover:to-pink-600/80 hover:text-white"
                        }
                        px-4 py-2.5 transition-all duration-300 hover:scale-[1.02] 
                        min-w-[120px] sm:min-w-0 sm:flex-1 sm:max-w-[200px]`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2M12 3v1m0 16v1m0-8a3 3 0 110 6 3 3 0 010-6z"
                        />
                    </svg>
                    <span className="font-medium">Alumni</span>
                </button>
            </div>
        </div>
    </div>

    {/* Content Area */}
    <div className="p-2 sm:p-4">
        <AspirantPage initialTab={activeComponent} />
    </div>
</div>

            <div className="hidden p-4 lg:block lg:w-1/4 "> </div>
        </div>
    );
};

export default AspirantHomePage;

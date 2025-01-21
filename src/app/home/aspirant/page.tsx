'use client'
import React, { useState } from "react";
import AspirantPage from "~/app/_components/aspirant/AspirantPage";

const AspirantHomePage = () => {
    const [initialTab, setInitialTab] = useState<string>("feed"); // Default tab is "feed"

    // Example of how to update the initialTab when a button is clicked
    const handleTabChange = (tab: string) => {
        setInitialTab(tab);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Sidebar for Large Devices */}
            <div className="hidden lg:block lg:w-1/4 p-4">
                <h2 className="text-lg font-semibold mb-4">Filter By</h2>
                <div className="space-y-2">
                    Will be implemented
                </div>
                <h2 className="text-lg font-semibold mt-6 mb-4">Popular Search</h2>
                <ul className="space-y-2">
                    <li className="text-blue-500 cursor-pointer hover:underline">Will be implemented</li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4">
                <AspirantPage initialTab={initialTab} />
            </div>

            {/* Right Sidebar for Large Devices */}
            <div className="hidden lg:block lg:w-1/4 p-4">
                <div className="space-y-4">
                    <button
                        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => handleTabChange("feed")}
                    >
                        Daily Insights
                    </button>
                    <button
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleTabChange("mentors")}
                    >
                        Mentors
                    </button>
                </div>
            </div>

            {/* Bottom Buttons for Small Devices */}
            <div className="block lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleTabChange("feed")}
                >
                    Daily Insights
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleTabChange("mentors")}
                >
                    Mentors
                </button>
            </div>
        </div>
    );
};

export default AspirantHomePage;

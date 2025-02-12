'use client';
import { useState } from 'react';

export default function Study_Nav() {
    const [activeTab, setActiveTab] = useState('create');

    const getButtonClasses = (tabName: string) => `
        flex items-center justify-center gap-2 px-6 py-3 rounded-xl
        border border-purple-500/20 transition-all duration-300
        whitespace-nowrap w-[200px]
        ${activeTab === tabName 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
            : ''
        }
    `;

    return (
        <div className="min-h-screen w-full  items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-4">
                {/* Centered container for buttons */}
                <div className="flex justify-center w-full ">
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex flex-row gap-4 py-4 px-2">
                            <button
                                onClick={() => setActiveTab('create')}
                                className={getButtonClasses('create')}
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
                                <span className="font-medium">Create Group</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('view')}
                                className={getButtonClasses('view')}
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
                                <span className="font-medium">View Joined Groups</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('discover')}
                                className={getButtonClasses('discover')}
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
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <span className="font-medium">Discover Groups</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content section based on active tab */}
                <div className=" text-center ">
                    {activeTab === 'create' && (
                        <div>Create Group Content</div>
                    )}
                    {activeTab === 'view' && (
                        <div>View Joined Groups Content</div>
                    )}
                    {activeTab === 'discover' && (
                        <div>Discover Groups Content</div>
                    )}
                </div>
            </div>
        </div>
    );
}
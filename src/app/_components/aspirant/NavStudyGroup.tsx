'use client'

import { useState } from "react";
import CreateStudyGroupForm from "../studygroup/CreateStudyGroupForm";
import StudyGroupsList from "../studygroup/StudyGroupsList";
import MemberGroupList from "./MemberGroupList";

function NavStudyGroup({
    tabSelected,
}: {
    tabSelected: "Created Groups" | "Joined Groups" | "Create Group";
}) {

    const [selectedTab, setSelectedTab] = useState(tabSelected);

    const getButtonClasses = (tabName: string) => `
        flex items-center justify-center gap-2 px-6 py-3 rounded-xl
        border border-purple-500/20 transition-all duration-300
        whitespace-nowrap w-[200px]
        ${selectedTab === tabName
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
                                onClick={() => setSelectedTab('Created Groups')}
                                className={getButtonClasses('Created Groups')}
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
                                <span className="font-medium">Created Groups</span>
                            </button>

                            <button
                                onClick={() => setSelectedTab('Joined Groups')}
                                className={getButtonClasses('Joined Groups')}
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
                                <span className="font-medium">Joined Groups</span>
                            </button>

                            <button
                                onClick={() => setSelectedTab('Create Group')}
                                className={getButtonClasses('Create Group')}
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
                        </div>
                    </div>
                </div>

                {/* Content section based on selected tab */}
                <div className=" text-center ">
                    {selectedTab === 'Created Groups' && (
                        <StudyGroupsList ownerId={undefined} />

                    )}
                    {selectedTab === 'Joined Groups' && (
                        <MemberGroupList />
                    )}
                    {selectedTab === 'Create Group' && (
                        <CreateStudyGroupForm onClose={() => setSelectedTab("Created Groups")} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavStudyGroup;

import { useState, useEffect } from "react";

interface Mentor {
    id: string;
    name: string;
    bio: string;
    followerCount: number;
    createdAt: string;
}

const MentorProfilePage: React.FC = () => {
    const [mentor, setMentor] = useState<Mentor | null>(null);
    const [activeTab, setActiveTab] = useState<string>("studyGroups"); // Default active tab is "Study Groups"

    // Fetch mentor details
    // useEffect(() => {
    //     async function fetchMentor() {
    //         const response = await fetch("/api/mentorProfile");
    //         const data = await response.json();
    //         setMentor(data);
    //     }

    //     fetchMentor();
    // }, []);

    // Handle tab click
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        <div className="p-6">
            <div className="flex items-center space-x-4">
                {/* Mentor Profile Details */}
                <div>
                    <h1 className="text-3xl font-bold">{"mentor.name"}</h1>
                    <p className="text-lg">{"mentor.bio"}</p>
                    <p className="mt-2 text-sm text-gray-500">Joined: {"new Date(mentor.createdAt).toLocaleDateString()"}</p>
                    <p className="mt-2 text-lg">
                        <strong>Followers: </strong>{"mentor.followerCount"}
                    </p>
                </div>
            </div>

            {/* Tab buttons to toggle components */}
            <div className="mt-6">
                <button
                    onClick={() => handleTabClick("studyGroups")}
                    className={`p-2 mr-4 rounded ${activeTab === "studyGroups" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    My Study Groups
                </button>
                <button
                    onClick={() => handleTabClick("dailyTasks")}
                    className={`p-2 mr-4 rounded ${activeTab === "dailyTasks" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Daily Tasks
                </button>
                <button
                    onClick={() => handleTabClick("reviews")}
                    className={`p-2 rounded ${activeTab === "reviews" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Reviews
                </button>
            </div>

            {/* Conditional Rendering based on active tab */}
            <div className="mt-6">
                {/* {activeTab === "studyGroups" && <MyStudyGroups mentorId={mentor.id} />}
                {activeTab === "dailyTasks" && <DailyTasks mentorId={mentor.id} />}
                {activeTab === "reviews" && <Reviews mentorId={mentor.id} />} */}
                {activeTab === "studyGroups" && <div> grops </div>}
                {activeTab === "dailyTasks" && <div> grops 1 </div>}
                {activeTab === "reviews" && <div> grops 2 </div>}
            </div>
        </div>
    );
};

export default MentorProfilePage;

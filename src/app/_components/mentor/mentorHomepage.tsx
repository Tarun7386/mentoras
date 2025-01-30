'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Editor from "~/app/_components/Editor";
import BookRecommendationsPage from "~/app/_components/mentor/BookRecommondation";
import DailyChallengesPage from "~/app/_components/mentor/DailyChallenge";
import MentorProfilePage from "~/app/_components/mentor/MentorProfilePage";
import StudyGroupsPage from "~/app/_components/studygroup/StudyGroupsPage";
import MentorProfileClient from "../aspirant/MentorProfileClient";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import AspirantHomePage from "../aspirant/AspirantHomePage";

// Components for different actions
const AddBookRecommendation = () => <BookRecommendationsPage userId={undefined} />;
const DailyChallenge = () => <DailyChallengesPage />;
const StudyGroup = () => <StudyGroupsPage />;
const Profile = ({mentorId}:{mentorId : string}) => <MentorProfileClient id={mentorId}/>;

export default function MentorHome({
    tabSelected,
}: {
    tabSelected: "postInsight" | "bookRecommended" | "challenge" | "studyGroup" | "profile" | "mentorView";
}) {
    console.log(tabSelected); 

    const [activeComponent, setActiveComponent] = useState<
        "postInsight" | "bookRecommended" | "challenge" | "studyGroup" | "profile" | "mentorView"
        >(tabSelected);
    console.log("Tab Selected: ", tabSelected);

    const router = useRouter();

    const handleButtonClick = (
        button: "postInsight" | "bookRecommended" | "challenge" | "studyGroup" | "profile" | "mentorView",
    ) => {
        console.log("Button Clicked: ", button);

        router.push(`/home/mentor/${button}`);
        setActiveComponent(button);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case "postInsight":
                return <Editor />;
            case "bookRecommended":
                return <AddBookRecommendation />;
            case "challenge":
                return <DailyChallenge />;
            case "studyGroup":
                return <StudyGroup />;
            case "profile":
                return <Profile mentorId={mentorId?.id ?? "jhv"} />;
            case "mentorView":
                
                router.replace('/home/aspirant')
                return;
            default:
                return null;
        }
    };
    const { data: session } = useSession() 
    const userId = session?.user.id ?? "";

    const { data: mentorId } = api.mentorsData.getMentorId.useQuery(
        { userId },
        {
            enabled: !!userId, // Ensures the query runs only when userId is truthy
        }
    );


    return (
        <div className="flex h-screen flex-col border-t-[1px] md:flex-row">
            <div className="border-b border-purple-500/20 bg-gradient-to-r from-gray-900 via-[#300171] to-slate-900 md:hidden">
                <div className="scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-black/20 overflow-x-auto overflow-y-hidden">
                    <div className="flex min-w-max gap-4 p-4 px-4">
                        <button
                            className={`flex-none transform rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${activeComponent === "postInsight"
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "border border-purple-500/30 bg-black/50 text-gray-300 hover:border-purple-500/50"
                                }`}
                            onClick={() => handleButtonClick("postInsight")}
                        >
                            Post Insight
                        </button>
                        <button
                            className={`flex-none transform rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${activeComponent === "studyGroup"
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "border border-purple-500/30 bg-black/50 text-gray-300 hover:border-purple-500/50"
                                }`}
                            onClick={() => handleButtonClick("studyGroup")}
                        >
                            Study Group
                        </button>

                        <button
                            className={`flex-none transform rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${activeComponent === "challenge"
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "border border-purple-500/30 bg-black/50 text-gray-300 hover:border-purple-500/50"
                                }`}
                            onClick={() => handleButtonClick("challenge")}
                        >
                            Daily Challenge
                        </button>

                        <button
                            className={`flex-none transform rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${activeComponent === "bookRecommended"
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "border border-purple-500/30 bg-black/50 text-gray-300 hover:border-purple-500/50"
                                }`}
                            onClick={() => handleButtonClick("bookRecommended")}
                        >
                            Book Recommendation
                        </button>
                        <button
                            className={`flex-none transform rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${activeComponent === "profile"
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "border border-purple-500/30 bg-black/50 text-gray-300 hover:border-purple-500/50"
                                }`}
                            onClick={() => handleButtonClick("profile")}
                        >
                            Profile
                        </button>
                        <button
                            className={`flex-none transform rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${activeComponent === "mentorView"
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "border border-purple-500/30 bg-black/50 text-gray-300 hover:border-purple-500/50"
                                }`}
                            onClick={() => handleButtonClick("mentorView")}
                        >
                            Mentor View
                        </button>
                    </div>
                </div>
            </div>

            <aside className="border- hidden min-h-screen w-72 border-purple-500/10 bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 hover:border-purple-500/20 md:block">
                <nav className="mt-8 flex flex-col text-sm text-gray-300">
                    <ul className="space-y-2 p-2">
                        <li>
                            <button
                                onClick={() => handleButtonClick("postInsight")}
                                className={`flex w-full items-center rounded-lg px-3 py-3 transition-all duration-200 ${activeComponent === "postInsight"
                                    ? "bg-gradient-to-r from-pink-600/50 to-purple-600/50 text-white"
                                    : "text-gray-300 hover:bg-black/20"
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="mr-3 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                                    />
                                </svg>
                                <span>Post Insight</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleButtonClick("studyGroup")}
                                className={`flex w-full items-center rounded-lg px-3 py-2 transition-all duration-200 ${activeComponent === "studyGroup"
                                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white"
                                    : "text-gray-300 hover:bg-black/20"
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="mr-3 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                    />
                                </svg>
                                <span>Study Group</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleButtonClick("challenge")}
                                className={`flex w-full items-center rounded-lg px-3 py-2 transition-all duration-200 ${activeComponent === "challenge"
                                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white"
                                    : "text-gray-300 hover:bg-black/20"
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="mr-3 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                    />
                                </svg>
                                <span>Daily Challenge</span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => handleButtonClick("bookRecommended")}
                                className={`flex w-full items-center rounded-lg px-3 py-2 transition-all duration-200 ${activeComponent === "bookRecommended"
                                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white"
                                    : "text-gray-300 hover:bg-black/20"
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="mr-3 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                    />
                                </svg>
                                <span>Book Recommendation</span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => handleButtonClick("profile")}
                                className={`flex w-full items-center rounded-lg px-4 py-3 transition-all duration-200 ${activeComponent === "profile"
                                    ? "bg-gradient-to-r from-pink-600/50 to-purple-600/50 text-white"
                                    : "text-gray-300 hover:bg-black/20"
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="mr-3 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                    />
                                </svg>
                                <span>Profile</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleButtonClick("mentorView")}
                                className={`flex w-full items-center rounded-lg px-4 py-3 transition-all duration-200 ${activeComponent === "mentorView"
                                    ? "bg-gradient-to-r from-pink-600/50 to-purple-600/50 text-white"
                                    : "text-gray-300 hover:bg-black/20"
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="mr-3 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                    />
                                </svg>
                                <span>Mentor View</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Content Section */}
            <div
                className={`flex-1 "pt-3" px-4 md:pt-4`}
            >
                {renderComponent()}
            </div>
        </div>
    );
}
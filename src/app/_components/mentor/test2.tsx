"use client";
import { useState } from "react";
import PostTodayInsight from "../postTodayInsight";
import BookRecommendationsPage from "./BookRecommondation";
import DailyChallengesPage from "./DailyChallenge";
import StudyGroupsPage from "../studygroup/StudyGroupsPage";
import MentorProfilePage from "./MentorProfilePage";

// Components for different actions
const AddBookRecommendation = () => <BookRecommendationsPage />;
const DailyChallenge = () => <DailyChallengesPage />;
const StudyGroup = () => <StudyGroupsPage />;
const Profile = () => <MentorProfilePage />;
const MentorView = () => <div>MentorView Content Goes Here.</div>;

export default function Test2() {
  const [activeComponent, setActiveComponent] = useState<
    "insight" | "book" | "challenge" | "studyGroup" | "profile" | "mentorView"
  >("insight");
  const [showDashboardOptions, setShowDashboardOptions] = useState(true);
  const [activeButton, setActiveButton] = useState<
    "dashboard" | "profile" | "mentorView" | null
  >("dashboard");
  const [showDashboardBar, setShowDashboardBar] = useState(true);
  const handleButtonClick = (
    button: "dashboard" | "profile" | "mentorView",
  ) => {
    setActiveButton(button);
    setShowDashboardOptions(button === "dashboard");
    setActiveComponent(button === "dashboard" ? "insight" : button);
  };
  const handleOptionClick = (
    option: "insight" | "book" | "challenge" | "studyGroup",
  ) => {
    setActiveComponent(option);
    // Keep dashboard bar visible when clicking options
    setShowDashboardBar(true);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "insight":
        return <PostTodayInsight />;
      case "book":
        return <AddBookRecommendation />;
      case "challenge":
        return <DailyChallenge />;
      case "studyGroup":
        return <StudyGroup />;
      case "profile":
        return <Profile />;
      case "mentorView":
        return <MentorView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen flex-col border-t-[1px] md:flex-row">
      <div className="border-b border-purple-500/20 bg-gradient-to-r from-gray-900 via-[#300171] to-slate-900 md:hidden">
        <div className="scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-black/20 overflow-x-auto overflow-y-hidden">
          <div className="flex min-w-max gap-4 p-4 px-4">
            <button
              className={`flex-none transform rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                activeButton === "dashboard"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "border border-purple-500/30 bg-black/50 text-gray-300 hover:border-purple-500/50"
              }`}
              onClick={() => handleButtonClick("dashboard")}
            >
              Dashboard
            </button>

            <button
              className={`flex-none transform rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                activeButton === "profile"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "border border-purple-500/30 bg-black/50 text-gray-300 hover:border-purple-500/50"
              }`}
              onClick={() => handleButtonClick("profile")}
            >
              Profile
            </button>

            <button
              className={`flex-none transform rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                activeButton === "mentorView"
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

      {showDashboardBar && (
        <div className="border-t border-purple-500/20 bg-gradient-to-r from-gray-900 via-[#300171] to-slate-900 md:hidden">
          <div className="scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-black/20 overflow-x-auto overflow-y-hidden">
            <div className="flex min-w-max gap-4 p-4">
              <button
                onClick={() => setActiveComponent("insight")}
                className={`flex transform items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                  activeComponent === "insight"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "border border-purple-500/30 bg-black/50 text-gray-300"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Today's Insight
              </button>

              <button
                onClick={() => setActiveComponent("book")}
                className={`flex transform items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                  activeComponent === "book"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "border border-purple-500/30 bg-black/50 text-gray-300"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Book Recommendation
              </button>

              <button
                onClick={() => setActiveComponent("challenge")}
                className={`flex transform items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                  activeComponent === "challenge"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "border border-purple-500/30 bg-black/50 text-gray-300"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Daily Challenge
              </button>

              <button
                onClick={() => setActiveComponent("studyGroup")}
                className={`flex transform items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                  activeComponent === "studyGroup"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "border border-purple-500/30 bg-black/50 text-gray-300"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Study Group
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className="border- hidden min-h-screen w-72 border-purple-500/10 bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 hover:border-purple-500/20 md:block">
        

        <nav className="mt-8 flex flex-col text-sm text-gray-300">
          <ul className="space-y-2 p-2">
            <li>
              <button
                onClick={() => handleButtonClick("dashboard")}
                className={`flex w-full items-center rounded-lg px-3 py-3 transition-all duration-200 ${
                  activeButton === "dashboard"
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

                <span>Dashboard</span>
              </button>
              {activeButton === "dashboard" && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveComponent("insight")}
                      className={`flex w-full items-center rounded-lg px-3 py-2 transition-all duration-200 ${
                        activeComponent === "insight"
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
                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                        />
                      </svg>
                      <span>Today's Insight</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveComponent("book")}
                      className={`flex w-full items-center rounded-lg px-3 py-2 transition-all duration-200 ${
                        activeComponent === "book"
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
                      onClick={() => setActiveComponent("challenge")}
                      className={`flex w-full items-center rounded-lg px-3 py-2 transition-all duration-200 ${
                        activeComponent === "challenge"
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
                      onClick={() => setActiveComponent("studyGroup")}
                      className={`flex w-full items-center rounded-lg px-3 py-2 transition-all duration-200 ${
                        activeComponent === "studyGroup"
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
                </ul>
              )}
            </li>

            <li>
              
              <span className="border-3 border-t-white"></span>
              <button
                onClick={() => handleButtonClick("profile")}
                className={`flex w-full items-center rounded-lg px-4 py-3 transition-all duration-200 ${
                  activeButton === "profile"
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
                className={`flex w-full items-center rounded-lg px-4 py-3 transition-all duration-200 ${
                  activeButton === "mentorView"
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
        className={`flex-1 ${showDashboardOptions ? "pt-3" : "pt-3"} px-4 md:pt-4`}
      >
        {renderComponent()}
      </div>
    </div>
  );
}


'use client';
import { useState } from 'react';
import PostTodayInsight from '../postTodayInsight';
import BookRecommendationsPage from './BookRecommondation';
import DailyChallengesPage from './DailyChallenge';
import StudyGroupsPage from '../studygroup/StudyGroupsPage';
import MentorProfilePage from './MentorProfilePage';

// Components for different actions
const AddBookRecommendation = () => <BookRecommendationsPage />;
const DailyChallenge = () => <DailyChallengesPage />;
const StudyGroup = () => <StudyGroupsPage />;
const Profile = () => <MentorProfilePage />;
const MentorView = () => <div>MentorView Content Goes Here.</div>;

export default function Test2() {
    const [activeComponent, setActiveComponent] = useState<'insight' | 'book' | 'challenge' | 'studyGroup' | 'profile' | 'mentorView'>('insight');
    const [showDashboardOptions, setShowDashboardOptions] = useState(true);
    const [activeButton, setActiveButton] = useState<'dashboard' | 'profile' | 'mentorView' | null>('dashboard');

    const handleButtonClick = (button: 'dashboard' | 'profile' | 'mentorView') => {
        setActiveButton(button);
        setShowDashboardOptions(button === 'dashboard');
        setActiveComponent(button === 'dashboard' ? 'insight' : button);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'insight':
                return <PostTodayInsight />;
            case 'book':
                return <AddBookRecommendation />;
            case 'challenge':
                return <DailyChallenge />;
            case 'studyGroup':
                return <StudyGroup />;
            case 'profile':
                return <Profile />;
            case 'mentorView':
                return <MentorView />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen border-2">
            {/* Mobile View Buttons */}
            <div className="flex overflow-x-auto p-4 md:hidden space-x-4 scrollbar-thin scrollbar-thumb-black">
                <button
                    className={`bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 text-white rounded-3xl border-2 border-white px-4 py-2 text-center min-w-[150px] ${activeButton === 'dashboard' ? 'bg-blue-500' : ''}`}
                    onClick={() => handleButtonClick('dashboard')}
                >
                    Dashboard
                </button>
                <button
                    className={`bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 text-white rounded-3xl border-2 border-white px-4 py-2 text-center min-w-[150px] ${activeButton === 'profile' ? 'bg-blue-500' : ''}`}
                    onClick={() => handleButtonClick('profile')}
                >
                    Profile
                </button>
                <button
                    className={`bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 text-white rounded-3xl border-2 border-white px-4 py-2 text-center min-w-[150px] ${activeButton === 'mentorView' ? 'bg-blue-500' : ''}`}
                    onClick={() => handleButtonClick('mentorView')}
                >
                    Mentor View
                </button>
            </div>

            {showDashboardOptions && (
                <div className="flex flex-col p-4 md:hidden space-y-2">
                    <button
                        className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 text-white rounded-3xl border-2 border-white px-4 py-2 text-center"
                        onClick={() => setActiveComponent('insight')}
                    >
                        Post a Today Insight
                    </button>
                    <button
                        className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 text-white rounded-3xl border-2 border-white px-4 py-2 text-center"
                        onClick={() => setActiveComponent('book')}
                    >
                        Add Book Recommendation
                    </button>
                    <button
                        className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 text-white rounded-3xl border-2 border-white px-4 py-2 text-center"
                        onClick={() => setActiveComponent('challenge')}
                    >
                        Daily Challenge
                    </button>
                    <button
                        className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 text-white rounded-3xl border-2 border-white px-4 py-2 text-center"
                        onClick={() => setActiveComponent('studyGroup')}
                    >
                        Study Group
                    </button>
                </div>
            )}

            {/* Sidebar for Desktop */}
            <aside className="hidden md:block w-64 bg-gray-800 min-h-screen">
                <div className="py-3 text-2xl uppercase text-center tracking-widest bg-gray-900 border-b-2 border-gray-800 mb-8">
                    
                </div>
                <nav className="text-sm text-gray-300">
                    <ul className="flex flex-col">
                        <li className={`px-4 cursor-pointer bg-gray-500 text-gray-800 hover:bg-gray-700 hover:text-white ${activeButton === 'dashboard' ? 'bg-blue-500' : ''}`}>
                            <a className="py-3 flex items-center" href="#" onClick={() => handleButtonClick('dashboard')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 mr-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                </svg>
                                Dashboard
                            </a>
                        </li>
                        {showDashboardOptions && (
                            <>
                                <li className="px-4 ml-3 cursor-pointer hover:bg-gray-700">
                                    <a className="py-3 flex items-center" href="#" onClick={() => setActiveComponent('insight')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 mr-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                        </svg>
                                        Post a Today Insight
                                    </a>
                                </li>
                                <li className="px-4 ml-3 cursor-pointer hover:bg-gray-700">
                                    <a className="py-3 flex items-center" href="#" onClick={() => setActiveComponent('book')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 mr-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg>
                                        Add Book Recommendation
                                    </a>
                                </li>
                                <li className="px-4 ml-3 cursor-pointer hover:bg-gray-700">
                                    <a className="py-3 flex items-center" href="#" onClick={() => setActiveComponent('challenge')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 mr-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        Daily Challenge
                                    </a>
                                </li>
                                <li className="px-4 ml-3 cursor-pointer hover:bg-gray-700">
                                    <a className="py-3 flex items-center" href="#" onClick={() => setActiveComponent('studyGroup')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 mr-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>
                                        Study Group
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                    <ul className="flex flex-col">
                        <li className={`px-4 cursor-pointer bg-gray-500 text-gray-800 hover:bg-gray-700 hover:text-white ${activeButton === 'profile' ? 'bg-blue-500' : ''}`}>
                            <a className="py-3 flex items-center" href="#" onClick={() => handleButtonClick('profile')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 mr-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                                Profile
                            </a>
                        </li>
                        <li className={`px-4 cursor-pointer bg-gray-500 text-gray-800 hover:bg-gray-700 hover:text-white ${activeButton === 'mentorView' ? 'bg-blue-500' : ''}`}>
                            <a className="py-3 flex items-center" href="#" onClick={() => handleButtonClick('mentorView')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 mr-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                Mentor View
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Content Section */}
            <div className="flex-grow p-6 overflow-y-auto">
                {renderComponent()}
            </div>
        </div>
    );
}
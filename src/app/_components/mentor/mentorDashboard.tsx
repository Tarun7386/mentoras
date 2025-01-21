'use client';
import { useState } from 'react';
import PostTodayInsight from '../postTodayInsight';
import BookRecommendationsPage from './BookRecommondation';
import DailyChallengesPage from './DailyChallenge';
import StudyGroupsPage from '../studygroup/StudyGroupsPage';

// Components for different actions
const AddBookRecommendation = () => <BookRecommendationsPage/>;
const DailyChallenge = () => <DailyChallengesPage/>;
const StudyGroup = () => <StudyGroupsPage/>;

export default function MentorDashboardPage() {
    const [activeComponent, setActiveComponent] = useState<'insight' | 'book' | 'challenge' | 'studyGroup'>('insight');

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
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            {/* Buttons Section */}
            <div className="bg-gray-800 text-white w-full lg:w-1/4 lg:h-full flex lg:flex-col items-center lg:items-start p-4 space-y-4 lg:space-y-4 space-x-4 lg:space-x-0 overflow-x-auto">
                <button
                    className={`px-4 py-2 rounded ${activeComponent === 'insight' ? 'bg-blue-500' : 'bg-gray-700'
                        }`}
                    onClick={() => setActiveComponent('insight')}
                >
                    Post a Today Insight
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeComponent === 'book' ? 'bg-blue-500' : 'bg-gray-700'
                        }`}
                    onClick={() => setActiveComponent('book')}
                >
                    Add Book Recommendation
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeComponent === 'challenge' ? 'bg-blue-500' : 'bg-gray-700'
                        }`}
                    onClick={() => setActiveComponent('challenge')}
                >
                    Daily Challenge
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeComponent === 'studyGroup' ? 'bg-blue-500' : 'bg-gray-700'
                        }`}
                    onClick={() => setActiveComponent('studyGroup')}
                >
                    Study Group
                </button>
            </div>

            {/* Content Section */}
            <div className="flex-grow p-6">
                {renderComponent()}
            </div>
        </div>
    );
}

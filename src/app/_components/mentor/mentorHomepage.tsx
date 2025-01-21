'use client';
import { useState } from 'react';
import MentorDashboardPage from './mentorDashboard';
import MentorProfilePage from './MentorProfilePage';

// Components for different sections
const Dashboard = () =><MentorDashboardPage/>;
const Profile = () => <MentorProfilePage/>;
const MentorView = () => <div>MentorView Content Goes Here.</div>;

export default function MentorPage() {
    const [activeComponent, setActiveComponent] = useState<'dashboard' | 'profile' | 'mentorview'>('dashboard');

    // Function to render the correct component
    const renderComponent = () => {
        switch (activeComponent) {
            case 'dashboard':
                return <Dashboard />;
            case 'profile':
                return <Profile />;
            case 'mentorview':
                return <MentorView />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            {/* Buttons Section */}
            <div className="bg-gray-800 text-white w-full lg:w-1/4 lg:h-full flex lg:flex-col items-center lg:items-start p-4 space-y-4 lg:space-y-4 space-x-4 lg:space-x-0 overflow-x-auto">
                <button
                    className={`px-4 py-2 rounded ${activeComponent === 'dashboard' ? 'bg-blue-500' : 'bg-gray-700'
                        }`}
                    onClick={() => setActiveComponent('dashboard')}
                >
                    Dashboard
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeComponent === 'profile' ? 'bg-blue-500' : 'bg-gray-700'
                        }`}
                    onClick={() => setActiveComponent('profile')}
                >
                    Profile
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeComponent === 'mentorview' ? 'bg-blue-500' : 'bg-gray-700'
                        }`}
                    onClick={() => setActiveComponent('mentorview')}
                >
                    MentorView
                </button>
            </div>

            {/* Content Section */}
            <div className="flex-grow p-6 ">
                {renderComponent()}
            </div>
        </div>
    );
}

'use client'
import { useState, useEffect } from "react";
import Feed from "./Feed";
import Mentors from "./Mentors";

interface AspirantPageProps {
    initialTab: string; // This will be the tab passed as a prop
}

const AspirantPage: React.FC<AspirantPageProps> = ({ initialTab }) => {
    const [activeTab, setActiveTab] = useState<string>(initialTab);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    return (
        <div className="p-2">


            {/* Conditional Rendering based on active tab */}
            <div className="mt-6">
            <div className={`transition-all duration-300 ${
                    activeTab === "feed" ? "opacity-100 transform translate-x-0" : "opacity-0 hidden"
                }`}>
                    <Feed />
                </div>
                <div className={`transition-all duration-300 ${
                    activeTab === "mentors" ? "opacity-100 transform translate-x-0" : "opacity-0 hidden"
                }`}>
                    <Mentors />
                </div>
            </div>
        </div>
        
    );
};

export default AspirantPage;

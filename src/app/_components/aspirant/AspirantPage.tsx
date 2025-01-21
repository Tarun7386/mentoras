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
        <div className="p-6">


            {/* Conditional Rendering based on active tab */}
            <div className="mt-6">
                {activeTab === "feed" && <Feed />}
                {activeTab === "mentors" && <Mentors />}
            </div>
        </div>
    );
};

export default AspirantPage;

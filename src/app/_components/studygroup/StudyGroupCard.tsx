import React from "react";

interface StudyGroup {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    createdAt: string;
}

interface StudyGroupCardProps {
    group: StudyGroup;
    onClick: () => void;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ group, onClick }) => {
    return (
        <div className="border rounded-lg p-4 mb-4 shadow-md" onClick={onClick}>
            <h3 className="text-xl font-semibold">{group.title}</h3>
            <p>{group.description}</p>
            <p className="text-sm text-gray-500">Created by: {group.createdBy}</p>
        </div>
    );
};

export default StudyGroupCard;

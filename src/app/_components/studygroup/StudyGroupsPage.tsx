import { useState, useEffect } from "react";
import StudyGroupCard from "./StudyGroupCard";
import CreateStudyGroup from "./CreateStudyGroup";
import DailyTask from "./DailyTask";

interface StudyGroup {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    createdAt: string;
}

const StudyGroupsPage: React.FC = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStudyGroups() {
            const response = await fetch("/api/getStudyGroups");
            const data = await response.json();
            setStudyGroups(data);
        }

        fetchStudyGroups();
    }, []);

    const handleGroupClick = (groupId: string) => {
        setSelectedGroupId(groupId);
    };

    const handleCreateGroupClick = () => {
        setIsCreating((prev) => !prev);
    };

    return (
        <div className="p-6">
            {/* Toggle Create Study Group button */}
            <button
                onClick={handleCreateGroupClick}
                className="bg-blue-500 text-white p-2 rounded mb-4"
            >
                {isCreating ? "Cancel" : "Create Study Group"}
            </button>

            {/* Show Create Study Group form if isCreating is true */}
            {isCreating ? (
                <CreateStudyGroup />
            ) : selectedGroupId ? (
                // Show the daily tasks component when a group is selected
                // <DailyTask groupId={selectedGroupId} />
                  <DailyTask />

            ) : (
                // Show the list of study groups if not creating
                <div>
                    <h2 className="text-2xl font-bold mb-4">Existing Study Groups</h2>
                    {studyGroups.map((group) => (
                        <StudyGroupCard
                            key={group.id}
                            group={group}
                            onClick={() => handleGroupClick(group.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudyGroupsPage;

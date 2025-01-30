import { useState, useEffect } from "react";
import StudyGroupsList from "./StudyGroupsList";
import StudyGroupDetails from "./StudyGroupDetails";
import CreateStudyGroupForm from "./CreateStudyGroupForm";
import { ToastContainer } from "react-toastify";

const StudyGroupsPage: React.FC = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <ToastContainer />
            { (
                <>
                    <div className="mb-8 flex justify-center">
                        <button onClick={() => setIsCreating(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-purple-500/25 flex items-center gap-2">
                            Create Study Group
                        </button>
                    </div>
                    <StudyGroupsList ownerId={undefined}  />
                </>
            )}
            
            {isCreating && <CreateStudyGroupForm onClose={() => setIsCreating(false)}/>}
        </div>
    );
};

export default StudyGroupsPage;

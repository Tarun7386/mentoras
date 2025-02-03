
interface StudyGroupDetailsProps {
    groupId: string;
    groupName: string;
    onBack: () => void;
    isOwner : boolean;
}

const StudyGroupDetails: React.FC<StudyGroupDetailsProps> = ({ onBack }) => {
    return (
        <div className="relative">
            <button
                onClick={onBack}
                className="mb-4 text-purple-400 hover:text-purple-300 flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Groups
            </button>
           
        </div>
    );
};

export default StudyGroupDetails;

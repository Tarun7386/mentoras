import AddTaskEditor from './AddTaskEditor';

interface AddTaskModalProps {
    groupId: string;
    onClose: () => void;
    isOwner: boolean;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ groupId, onClose,isOwner }) => {
      
    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            
            {/* Modal Container */}
            <div className="fixed inset-0 z-[50] flex items-start justify-center overflow-y-auto">
                <div className="min-h-screen w-full flex items-center justify-center py-8">
                    {/* Modal Content */}
                    <div className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 
                        rounded-xl p-4 sm:p-6 w-full max-w-md lg:max-w-lg 
                        transform transition-all duration-300 
                        border border-purple-500/20 
                        animate-in zoom-in-50 relative
                        mx-4"
                    >
                        {/* Header */}
                        {isOwner && (
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-white">
                                    Add New Task
                                </h2>
                                <button 
                                    onClick={onClose} 
                                    className="text-gray-400 hover:text-gray-300 
                                        transition-colors duration-200"
                                >
                                    <svg 
                                        className="w-6 h-6" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M6 18L18 6M6 6l12 12" 
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Editor Component */}
                        <AddTaskEditor onClose={onClose} groupId={groupId} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTaskModal;

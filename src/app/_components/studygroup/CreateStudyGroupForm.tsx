import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { api } from "~/trpc/react";

interface CreateStudyGroupFormProps {
    onClose: () => void;
}

const CreateStudyGroupForm: React.FC<CreateStudyGroupFormProps> = ({ onClose }) => {
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");

    const createGroup = api.studyGroupRouter.createStudyGroup.useMutation({
        onSuccess: () => {
            toast.success("Successfully created!");
            setTimeout(() => {
                onClose();
            }, 3000);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create group");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!groupName.trim() || !description.trim()) {
            toast.error("Group name and description are required.");
            return;
        }

        createGroup.mutate({ title: groupName, description });
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
                <div className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 rounded-xl p-6 w-full max-w-md transform transition-all duration-300 border border-purple-500/20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white">Create Study Group</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Group Name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full p-3 bg-black/50 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 placeholder-gray-500"
                        />
                        <textarea
                            placeholder="Group Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-black/50 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 placeholder-gray-500 min-h-[120px]"
                        />
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20"
                                disabled={createGroup.isPending}
                            >
                                {createGroup.isPending ? "Creating Group..." : "Create Group"}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-800/50 text-gray-300 font-medium py-3 px-6 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-purple-500/10 hover:text-purple-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateStudyGroupForm;

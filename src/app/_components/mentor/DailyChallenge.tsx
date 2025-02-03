import { useState } from "react";
import ChallengeCard from "../ChallengeCard";
import { api } from "~/trpc/react";
import { toast, ToastContainer } from "react-toastify";

// interface Challenge {
//     id: string;
//     title: string;
//     durationDays: number;
//     description: string;    
//     createdAt: string;
//     createdBy: string; // Assuming the user has a name field
// }

function DailyChallengesPage() {

    const createChallenge = api.challengeRouter.createChallenge.useMutation({
        onSuccess: () => {
            toast.success("Challenge created successfully! 🎉");
            setNewChallenge(
                {
                    title: "",
                    durationDays: "",
                    description: "",
                }
            );
            setIsAdding(false); // Close form after submission

        },
        onError: (error) => {
            toast.error(`Failed to create challenge: ${error.message}`);
        },

       
    });


    const [isAdding, setIsAdding] = useState(false); // To toggle between form and list
    const [newChallenge, setNewChallenge] = useState({
        title: "",
        durationDays: "",
        description: "",
        
        
    });

    // Fetch challenges on page load
    

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewChallenge((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateFields = () => {
        if (!newChallenge.title.trim()) {
            toast.error("Challenge title is required.");
            return false;
        }
        if (!newChallenge.durationDays || isNaN(Number(newChallenge.durationDays)) || Number(newChallenge.durationDays) <= 0) {
            toast.error("Challenge duration must be a positive number.");
            return false;
        }
        if (!newChallenge.description.trim()) {
            toast.error("Challenge description is required.");
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure durationDays is converted to a number before sending to the backend
        const challengeData = {
            ...newChallenge,
            durationDays: Number(newChallenge.durationDays),  // Convert to number
        };

        if (!validateFields()) return;

        // Call the API with the correctly typed data
        await createChallenge.mutateAsync(challengeData);
    };

    const sampleChallenges = [
        {
            id: '1',
            title: '30-Day Fitness Challenge',
            description: 'Complete daily fitness tasks, track your progress, and stay consistent.Complete daily fitness tasks, track your progress, and stay consistent.Complete daily fitness tasks, track your progress, and stay consistent.',
            createdBy: 'John Doe',
            createdAt: 'January 21, 2024'
        },
        {
            id: '2',
            title: 'Coding Practice Challenge',
            description: 'Solve one programming problem every day for 21 days.Complete daily fitness tasks, track your progress, and stay consistent.Read 50 pages every day for 14 days.Complete daily fitness tasks, track your progress, and stay consistent.Complete daily Complete daily fitness tasks, track your progress, and stay consistent.Complete daily fitness tasks, track your progress, and stay consistent.',
            createdBy: 'Jane Smith',
            createdAt: 'January 22, 2024'
        },
        {
            id: '3',
            title: 'Reading Marathon',
            description: 'Read 50 pages every day for 14 days.Complete daily fitness tasks, track your progress, and stay consistent.Complete daily fitness tasks, track your progress, and stay consistent.',
            createdBy: 'Mike Johnson',
            createdAt: 'January 23, 2024'
        },
        {
            id: '4',
            title: 'Reading Marathon',
            description: 'Read 50 pages every day for 14 days.Complete daily fitness tasks, track your progress, and stay consistent.Complete daily fitness tasks, track your progress, and stay consistent.',
            createdBy: 'Mike Johnson',
            createdAt: 'January 23, 2024'
        }
    ];


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 p-4 sm:p-6 lg:p-8">
            <ToastContainer/>
            <div className="max-w-7xl mx-auto mb-8 flex justify-center">
    <button
        onClick={() => setIsAdding(true)}
        className="group flex items-center gap-2 
            w-full sm:w-auto max-w-md
            bg-gradient-to-r from-emerald-600 to-teal-600
            text-white font-medium py-2.5 px-6 rounded-lg
            transition-all duration-300 hover:scale-[1.02]
            hover:shadow-lg hover:shadow-emerald-500/20
            active:scale-95 border border-emerald-500/20"
    >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transition-transform group-hover:rotate-180" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
            />
        </svg>
        <span>Create New Challenge</span>
    </button>
</div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {sampleChallenges.map((challenge) => (
                    <ChallengeCard
                        key={challenge.id}
                        id={challenge.id}
                        challengeName={challenge.title}
                        rules={challenge.description}
                        createdBy={challenge.createdBy}
                        createdOn={new Date(challenge.createdAt).toLocaleDateString()} duration={1}                        
                    />
                    
                ))}
                
            </div>

            {/* Mobile Form Modal */}
            {isAdding && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
                    flex items-center justify-center p-4">
                    <div className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 
                        rounded-xl p-6 w-full max-w-md transform transition-all duration-300 
                        border border-purple-500/20">
                        <h2 className="text-xl font-semibold mb-6 text-center
                            bg-gradient-to-r from-purple-400 to-pink-400 
                            bg-clip-text text-transparent">
                            Create New Challenge
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Challenge Title"
                                value={newChallenge.title}
                                onChange={handleChange}
                                className="w-full p-3 bg-black/50 text-white border 
                                    border-purple-500/30 rounded-lg 
                                    focus:outline-none focus:border-purple-500 
                                    placeholder-gray-500"
                            />
                            <input
                                type="number"
                                name="durationDays"
                                placeholder="Challenge Duration in Days"
                                value={newChallenge.durationDays}
                                onChange={handleChange}
                                className="w-full p-3 bg-black/50 text-white border 
                                    border-purple-500/30 rounded-lg 
                                    focus:outline-none focus:border-purple-500 
                                    placeholder-gray-500"
                            />
                            <textarea
                                name="description"
                                placeholder="Challenge Description/Rules"
                                
                                onChange={handleChange}
                                className="w-full p-3 bg-black/50 text-white border 
                                    border-purple-500/30 rounded-lg 
                                    focus:outline-none focus:border-purple-500 
                                    placeholder-gray-500 min-h-[120px]"
                            />
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600
                                        text-white font-medium py-3 px-6 rounded-lg
                                        transition-all duration-300 hover:scale-[1.02]
                                        hover:shadow-lg hover:shadow-purple-500/20"
                                >
                                    Create Challenge
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="flex-1 bg-gray-800/50 text-gray-300 font-medium
                                        py-3 px-6 rounded-lg border border-purple-500/20
                                        transition-all duration-300 hover:scale-[1.02]
                                        hover:bg-purple-500/10 hover:text-purple-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DailyChallengesPage;

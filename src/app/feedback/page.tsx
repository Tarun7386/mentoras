'use client'
import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import LoaderComponent from "../_components/LoaderComponent";
import { Loader } from "lucide-react";

export default function FeedbackPage() {
    // Fetch feedbacks from the backend using TRPC query
    const { data: getfeedback, isLoading, error } = api.feedbackRouter.getFeedback.useQuery();
    const addFeedback = api.feedbackRouter.addFeedback.useMutation()
    // Local state to store the feedbacks
    const [feedbacks, setFeedbacks] = useState<{ id: string; content: string; response: string | null }[]>([]);
    const [newFeedback, setNewFeedback] = useState("");

    // On successful data fetch, update the feedbacks state
    useEffect(() => {
        if (getfeedback) {
            setFeedbacks(getfeedback);  // Update state with fetched feedback
        }
    }, [getfeedback]);

    // Handle sending new feedback
    const handleSendFeedback = async () => {
        if (newFeedback.trim() !== "") {
            try {
                await addFeedback.mutateAsync({ content: newFeedback });

                // Update local state to reflect the new feedback (optimistic update)
                setFeedbacks([
                    { id: Date.now().toString(), content: newFeedback, response: null },
                    ...feedbacks
                ]);
                setNewFeedback(""); // Clear input after sending feedback
            } catch (error) {
                console.error("Error sending feedback:", error);
            }
        }
    };

    // Loading state
    if (isLoading) {
        return <LoaderComponent />;
    }

    // Error handling
    if (error) {
        return <p>Error fetching feedback: {error.message}</p>;
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-[#300171]/30 to-slate-900 p-4 sm:p-6">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-center 
                    bg-gradient-to-r from-purple-400 to-pink-400 
                    bg-clip-text text-transparent">
                    Feedback
                </h1>

                <div className="space-y-4">
                    {feedbacks.map((fb) => (
                        <div key={fb.id}
                            className="bg-black/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 
                                border border-purple-500/20 space-y-3 hover:border-purple-500/40 
                                transition-all duration-300">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r 
                                    from-purple-600 to-pink-600 flex items-center 
                                    justify-center text-white font-semibold text-sm">
                                    {fb.content?.[0]?.toUpperCase() ?? 'A'}
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-300 mb-1">
                                        <span className="font-medium text-purple-400">Anonymous:</span> {fb.content}
                                    </p>
                                    {fb.response && (
                                        <p className="text-gray-400 text-sm pl-4 border-l-2 
                                            border-purple-500/30 mt-2">
                                            <span className="font-medium text-pink-400">Admin:</span> {fb.response}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 
                    border border-purple-500/20 space-y-4">
                    <input
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        placeholder="Type your feedback..."
                        className="w-full px-4 py-3 bg-black/50 text-white border 
                            border-purple-500/30 rounded-lg focus:outline-none 
                            focus:border-purple-500 placeholder-gray-500 
                            transition-all duration-300"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handleSendFeedback}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r 
                                from-purple-600 to-pink-600 text-white font-medium 
                                hover:shadow-lg hover:shadow-purple-500/25 
                                transition-all duration-300 transform hover:scale-[1.02]"
                            disabled={addFeedback.isPending}
                                >
                            {addFeedback.isPending ? <Loader/> : "Send Feedback"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

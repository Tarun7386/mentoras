'use client'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from "~/trpc/react";

function MyChallenges() {
    const [suggestion, setSuggestion] = useState<string>('');

    const givefeedback = api.feedbackRouter.addFeedback.useMutation({
        onSuccess: () => {
            setSuggestion('');
            toast.success('Suggestion sent successfully!');

        }
    });

    const handleClick = async (): Promise<void> => {
        if (suggestion.trim() === '') {
            toast.info('Please enter a suggestion!');
            return;
        }

        try {
            await givefeedback.mutateAsync({ content: suggestion });

        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to send suggestion. Please try again.');
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-[#300171]/30 to-slate-900 
            flex items-start sm:items-center justify-center p-4 sm:p-6">
            <div className="max-w-md w-full space-y-6 bg-black/30 backdrop-blur-sm 
                rounded-xl p-6 border border-purple-500/20 mt-18 sm:mt-0">
                <p className="text-gray-300 text-justify text-sm sm:text-base leading-relaxed">
                    {'We are still working on this feature. In this section, we plan to enable casual chats with other learners. If you have any suggestions, please submit them here!'}
                </p>

                <div className="space-y-4">
                    <input
                        className="w-full px-4 py-3 bg-black/50 text-white border 
                            border-purple-500/30 rounded-lg focus:outline-none 
                            focus:border-purple-500 placeholder-gray-500 
                            transition-all duration-300"
                        placeholder="Share your suggestion..."
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)} // Update state as user types
                    />
                    <div className="flex justify-center sm:justify-start">
                        <button
                            onClick={handleClick}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl 
                                bg-gradient-to-r from-purple-600 to-pink-600 
                                text-white font-medium hover:shadow-lg 
                                hover:shadow-purple-500/25 transition-all duration-300 
                                transform hover:scale-[1.02]">
                            Send Suggestion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyChallenges;

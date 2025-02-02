import React, { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";  // Import the icons from lucide-react
import { api } from "~/trpc/react";

const TaskCompleteButton: React.FC<{ taskId:string,isCompleted: boolean, initialCompletionCount: number }> = ({ taskId,isCompleted, initialCompletionCount }) => {
    const [completed, setCompleted] = useState(isCompleted);
    const [completionCount, setCompletionCount] = useState(initialCompletionCount); // Add state for the completion count

    const taskCompleted = api.dailyTaskRouter.completeTask.useMutation()

    const handleClick = () => {
        setCompleted(!completed);  // Toggle the completion state
        if (!completed) {
            setCompletionCount(completionCount + 1);  // Increment count when marking completed
        }
        taskCompleted.mutate({taskId})
    };

    return (
        <button
            onClick={handleClick}
            className={`absolute top-4 right-4 px-5 py-2 rounded-xl bg-gradient-to-r ${completed ? 'from-green-600 to-green-500' : 'from-gray-600 to-gray-500'} 
                        hover:${completed ? 'from-green-500 to-green-400' : 'from-gray-500 to-gray-400'} text-white font-semibold text-sm shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-green-500/30`}
            disabled={completed}
        >
            {completed ? (
                <CheckCircle className="w-5 h-5 text-white mr-2" />  // CheckCircle icon for completed
            ) : (
                <Circle className="w-5 h-5 text-white mr-2" />  // Circle icon for not completed
            )}
            {completed ? "Completed" : "Mark as Completed"}
            <span className="ml-2 text-xs text-gray-300">{completionCount}</span>  {/* Display the count */}
        </button>
    );
};

export default TaskCompleteButton;

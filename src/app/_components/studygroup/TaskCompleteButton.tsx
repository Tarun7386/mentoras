import React, { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";  // Import the icons from lucide-react
import { api } from "~/trpc/react";

const TaskCompleteButton: React.FC<{ taskId:string,isCompleted: boolean, initialCompletionCount: number }> = ({ taskId,isCompleted, initialCompletionCount }) => {
    const [completed, setCompleted] = useState(isCompleted);
    const [completionCount, setCompletionCount] = useState(initialCompletionCount); // Add state for the completion count

    const taskCompleted = api.dailyTaskRouter.completeTask.useMutation()

    const handleClick = () => {
        setCompleted(!completed);
        if (!completed) {
            setCompletionCount(completionCount + 1);
        }
        taskCompleted.mutate({taskId})
    };

    return (
       
        <button
        onClick={handleClick}
        className={`  sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl 
            bg-gradient-to-r ${
                completed 
                    ? 'from-green-600 to-green-500' 
                    : 'from-gray-600 to-gray-500'
            } 
            hover:${
                completed 
                    ? 'from-green-500 to-green-400' 
                    : 'from-gray-500 to-gray-400'
            } 
            text-white font-medium text-xs sm:text-sm shadow-md sm:shadow-lg 
            transition-all duration-300 transform 
            hover:scale-[1.02] hover:shadow-green-500/30
            flex items-center gap-1.5 sm:gap-2`}
            disabled={isCompleted}
    >
        {completed ? (
            <CheckCircle className=" w-4 h-4 sm:w-5 sm:h-5 text-white" />
        ) : (
            <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        )}
        <span>{completed ? "Completed" : "Mark Complete"} </span>
    </button>
    );
};

export default TaskCompleteButton;
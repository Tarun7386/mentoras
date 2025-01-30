'use client'
import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import { api } from "~/trpc/react";
;

interface DailyTaskProps {
    groupId: string;
    groupName:string;
    description:string
    
}

const DailyTask: React.FC<DailyTaskProps> = ({ groupId,groupName,description }) => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const {data:isOwner,isLoading,error} = api.dailyTaskRouter.isGroupOwner.useQuery({ groupId: groupId})

    if (error) {
        return "error fetching"
    }
    if (isLoading) {
        return "loading..."
    }
    return (
        <div className="relative min-h-screen p-4 sm:p-6">
            {/* Header */}
            <div className="mb-8 sm:mb-12">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight mb-2">
                    {groupName}
                </h1>
                <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight mb-4">
                    {description}
                </h3>


                <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl text-gray-300 font-semibold">
                        Daily Tasks
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
                </div>
            </div>

            {/* Add Task Button */}
           {isOwner && <button
                onClick={() => setIsAddingTask(true)}
                className="mb-2 right-4 top-4 z-50 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-purple-500/25 flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="">Add Task</span>
            </button>}

            {/* Tasks List */}
            <TaskList groupId={groupId} isOwner={isOwner ?? false} />

            {/* Modal */}
            {isAddingTask && (
                <AddTaskModal groupId={groupId} onClose={() => setIsAddingTask(false)} isOwner={isOwner ?? false}  />
            )}
        </div>
    );
};

export default DailyTask;

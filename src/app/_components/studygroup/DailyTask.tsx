'use client'
import { useState } from "react";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import { api } from "~/trpc/react";
import ShareButton from "../ShareButton";
import { toast, ToastContainer } from "react-toastify";
import LoaderComponent from "../LoaderComponent";
import { Loader } from "lucide-react";

interface DailyTaskProps {
    groupId: string;
    groupName: string;
    description: string;
}

const DailyTask: React.FC<DailyTaskProps> = ({ groupId, groupName, description }) => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [groupLink, setgroupLink] = useState("");


    // Always call hooks in the same order
    const { data: isOwner, isLoading, error } = api.dailyTaskRouter.isGroupOwner.useQuery({ groupId: groupId });
    const { data: countApi } = api.studyGroupRouter.countOfmembers.useQuery({ groupId: groupId });
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); const [membersCount, setMembersCount] = useState(countApi?.membersCount ?? 0);
    const [isMember, setIsMember] = useState(countApi?.isMember ?? false);

    const joinGroup = api.studyGroupRouter.joinStudyGroup.useMutation({
        onSuccess: () => {
            toast.success("Joined study group");
            setIsMember(true);  // Update frontend membership status
            setMembersCount((prev) => prev + 1); // Increase count by 1

        }
    });

    // Function to copy the group link to the clipboard
    const handleShare = () => {
        const encodedGroupName = encodeURIComponent(groupName);
        const encodedDescription = encodeURIComponent(description);
        setgroupLink(`/studygroup/${groupId}?groupName=${encodedGroupName}&description=${encodedDescription}`);
    };

    // Loading and error states
    if (error) {
        return "Error fetching";
    }
    if (isLoading) {
        return <LoaderComponent />;
    }

    // Truncate the description if not expanded
    const truncatedDescription = description.length > 100 ? `${description.slice(0, 100)}...` : description;

    return (
        <div className="relative min-h-screen p-4 sm:p-6">
            <ToastContainer />
            <div className="mb-8 sm:mb-12">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold
                    bg-gradient-to-r from-purple-400 to-pink-400 
                    bg-clip-text text-transparent tracking-tight mb-2">
                    {groupName}
                </h1>
                <h3 className="text-xs sm:text-sm md:text-base
                    text-gray-300 font-medium tracking-tight 
                    leading-relaxed max-w-3xl whitespace-pre">
                    {isDescriptionExpanded ? description : truncatedDescription}
                </h3>

                {/* Read More / Read Less Button */}
                {description.length > 100 && (
                    <button
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm mt-2"
                    >
                        {isDescriptionExpanded ? "Read Less" : "Read More"}
                    </button>
                )}
                {/* Show Number of Members */}
                {countApi && (
                    <span className="text-sm text-gray-400">
                        Members: {membersCount}
                    </span>
                )}

                {/* Buttons Section */}
                <div className="flex items-center justify-between w-full gap-4">
                    <div className="flex items-center gap-2 flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-purple-600 whitespace-nowrap">
                            Daily Tasks
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
                    </div>

                    <div className="flex gap-3">
                        {/* Share Button */}
                        <div onClick={handleShare}>
                            <ShareButton url={groupLink} />
                        </div>

                        

                        {/* Join Group Button (Only show if user is not an owner) */}
                        {!isOwner && isMember && (
                            <button
                                onClick={() => {
                                    joinGroup.mutate({ studyGroupId: groupId });
                                }}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl
                                    bg-green-600 hover:bg-green-500 text-white 
                                    font-medium shadow-lg transition-all duration-300 
                                    transform hover:scale-[1.02] flex items-center 
                                    justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                                disabled={joinGroup.isPending}
                            >
                                ✅ <span>{joinGroup.isPending ? <Loader/> : "Join Group"}</span>
                            </button>
                        )}

                        {/* Add Task Button (Only for owner) */}
                        {isOwner && (
                            <button
                                onClick={() => setIsAddingTask(true)}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl 
                                    bg-gradient-to-r from-purple-600 to-pink-600 
                                    hover:from-purple-500 hover:to-pink-500 text-white 
                                    font-medium shadow-lg transition-all duration-300 
                                    transform hover:scale-[1.02] hover:shadow-purple-500/25 
                                    flex items-center justify-center gap-1.5 sm:gap-2 
                                    text-xs sm:text-sm whitespace-nowrap"
                            >
                                ➕ <span>Add Task</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Task List */}
            <TaskList groupId={groupId} isOwner={isOwner ?? false} />

            {/* Add Task Modal */}
            {isAddingTask && (
                <AddTaskModal
                    groupId={groupId}
                    onClose={() => setIsAddingTask(false)}
                    isOwner={isOwner ?? false}
                />
            )}
        </div>
    );
};

export default DailyTask;

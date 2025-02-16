"use client";
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

const DailyTask: React.FC<DailyTaskProps> = ({
  groupId,
  groupName,
  description,
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [groupLink, setgroupLink] = useState("");

  // Always call hooks in the same order
  const {
    data: isOwner,
    isLoading,
    error,
  } = api.dailyTaskRouter.isGroupOwner.useQuery({ groupId: groupId });
  const { data: countApi } = api.studyGroupRouter.countOfmembers.useQuery({
    groupId: groupId,
  });
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [membersCount, setMembersCount] = useState(countApi?.membersCount ?? 0);
  const [isMember, setIsMember] = useState(countApi?.isMember ?? false);

  const joinGroup = api.studyGroupRouter.joinStudyGroup.useMutation({
    onSuccess: () => {
      toast.success("Joined study group");
      setIsMember(true); // Update frontend membership status
      setMembersCount((prev) => prev + 1); // Increase count by 1
    },
  });

  // Function to copy the group link to the clipboard
  const handleShare = () => {
    const encodedGroupName = encodeURIComponent(groupName);
    const encodedDescription = encodeURIComponent(description);
    setgroupLink(
      `/studygroup/${groupId}?groupName=${encodedGroupName}&description=${encodedDescription}`,
    );
  };

  // Loading and error states
  if (error) {
    return "Error fetching";
  }
  if (isLoading) {
    return <LoaderComponent />;
  }

  // Truncate the description if not expanded
  const truncatedDescription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;

  return (
    <div className="relative min-h-screen p-4 sm:p-6">
      <ToastContainer />
      <div className="mb-8 sm:mb-12">
        <h1 className="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl lg:text-3xl">
          {groupName}
        </h1>

        <div className="flex flex-col space-y-4">
          <div className="relative rounded-xl bg-purple-500/5 p-4 shadow-sm transition-all duration-300 hover:border-purple-500/30 hover:shadow-purple-500/10">
            <div className="space-y-2">
            <p className="text-xs sm:text-sm md:text-base text-gray-300 
                font-medium leading-relaxed break-words whitespace-pre-line
                w-full px-1 sm:px-0"
            >                {isDescriptionExpanded ? description : truncatedDescription}
              </p>

              {description.length > 100 && (
                <button
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                  className="group mt-2 inline-flex items-center gap-1 text-xs text-purple-400 transition-all duration-200 hover:text-purple-300 sm:text-sm"
                >
                  <span>
                    {isDescriptionExpanded ? "Show Less" : "Read More"}
                  </span>
                  <svg
                    className={`h-4 w-4 transform transition-transform duration-200 ${isDescriptionExpanded ? "rotate-180" : ""} group-hover:translate-x-0.5`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
     
        {/* Show Number of Members */}
        {countApi && (
          <span className="text-sm text-gray-400">Members: {membersCount}</span>
        )}

        {/* Buttons Section */}
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <h3 className="whitespace-nowrap text-lg font-semibold text-purple-600 sm:text-xl">
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
                className="flex transform items-center justify-center gap-1.5 rounded-xl bg-green-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-green-500 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                disabled={joinGroup.isPending}
              >
                ✅{" "}
                <span>{joinGroup.isPending ? <Loader /> : "Join Group"}</span>
              </button>
            )}

            {/* Add Task Button (Only for owner) */}
            {isOwner && (
            <button
    onClick={() => setIsAddingTask(true)}
    className="flex items-center justify-center gap-1.5 
      rounded-xl text-xs sm:text-sm font-medium text-white
      bg-gradient-to-r from-purple-600 to-pink-600
      px-3 py-1.5 sm:px-4 sm:py-2
      transition-all duration-300 
      hover:shadow-lg hover:shadow-purple-500/20 
      hover:scale-[1.02] active:scale-[0.98]
      whitespace-nowrap"
  >
    <svg 
      className="w-3.5 h-3.5 sm:w-4 sm:h-4" 
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
    <span className="xs:hidden">Add Task</span>
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

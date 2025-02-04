import Loader from "../Loader";
import TaskCard from "./TaskCard";
import { api } from "~/trpc/react";

interface TaskListProps {
    groupId: string;
    isOwner: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ groupId, isOwner }) => {
    const { data: tasks, isLoading } = api.dailyTaskRouter.getTasks.useQuery({ groupId });

    if (isLoading) {
        return <Loader/>
    }

    if (!tasks || tasks.length === 0) {
        return <p className="text-gray-500 text-center mt-4">No tasks available for this group.</p>;
    }

    return (
        <div className="max-w-2xl w-full mx-auto space-y-4 sm:space-y-6 pb-20">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    id={task.id}
                    content={task.content}
                    postedBy={task.postedById}
                    datePosted={task.datePosted.toLocaleDateString()}
                    isOwner={isOwner}
                    isCompleted={task.isCompleted}
                    completedCount={task.completedCount}
                />
            ))}
        </div>
    );
};

export default TaskList;

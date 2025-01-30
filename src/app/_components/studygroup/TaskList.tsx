import TaskCard from "./TaskCard";
import { api } from "~/trpc/react";

interface TaskListProps {
    groupId: string;
    isOwner: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ groupId ,isOwner}) => {

    const {data : tasks} = api.dailyTaskRouter.getTasks.useQuery({ groupId });

    return (
        <div className="space-y-4 sm:space-y-6 pb-20">
            {tasks?.map((task) => (
                <TaskCard key={task.id}
                id={task.id}
                content={task.content}
                postedBy={task.postedById}
                datePosted={task.datePosted.toLocaleDateString()} isOwner={isOwner}  />
            ))}
        </div>
    );
};

export default TaskList;

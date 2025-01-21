import { useState } from "react";

interface DailyTask {
    id: string;
    taskTitle: string;
    description: string;
    datePosted: string;
    postedBy: string;
}

const DailyTaskComponent: React.FC = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState<DailyTask[]>([]);

    const fetchTasks = async (groupId: string) => {
        const response = await fetch(`/api/getDailyTasks?groupId=${groupId}`);
        const data = await response.json();
        setTasks(data);
    };

    const handleSubmitTask = async (e: React.FormEvent, groupId: string) => {
        e.preventDefault();
        const response = await fetch("/api/createDailyTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskTitle, description, groupId }),
        });

        if (response.ok) {
            fetchTasks(groupId);
            setTaskTitle("");
            setDescription("");
        }
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmitTask(e, "some-group-id")}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Post Task
                </button>
            </form>

            <h3 className="text-xl mt-4">Daily Tasks</h3>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="mb-4">
                        <h4 className="font-semibold">{task.taskTitle}</h4>
                        <p>{task.description}</p>
                        <p className="text-sm text-gray-500">Posted by: {task.postedBy}</p>
                        <p className="text-xs text-gray-400">{new Date(task.datePosted).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DailyTaskComponent;

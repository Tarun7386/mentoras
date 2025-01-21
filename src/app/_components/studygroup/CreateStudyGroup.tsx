import { useState } from "react";

const CreateStudyGroup: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/createStudyGroup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
            alert("Study Group Created!");
            setTitle("");
            setDescription("");
        } else {
            alert("Error creating study group!");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Create a New Study Group</h2>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Create Study Group
                </button>
            </form>
        </div>
    );
};

export default CreateStudyGroup;

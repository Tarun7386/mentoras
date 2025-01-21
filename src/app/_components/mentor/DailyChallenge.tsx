import { dataTagErrorSymbol } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ChallengeCard from "../ChallengeCard";

interface Challenge {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    createdBy: string; // Assuming the user has a name field
}

function DailyChallengesPage() {
    const handleJoinChallenge = () => {
        alert("You have joined the challenge!");
    };

    const handleViewLeaderboard = () => {
        alert("Redirecting to leaderboard...");
    };

    const [isAdding, setIsAdding] = useState(false); // To toggle between form and list
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [newChallenge, setNewChallenge] = useState({
        title: "",
        days: "",
        description: "",
        createdBy: "", // Add createdBy for the user
    });

    // Fetch challenges on page load
    useEffect(() => {
        async function fetchChallenges() {
            const response = await fetch("/api/dailyChallenges");
            const data = await response.json();
            setChallenges(data);
        }
        fetchChallenges();
    }, []);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewChallenge((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/dailyChallenges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...newChallenge,
                createdBy: "yourUserNameHere", // Replace with the actual user name
            }),
        });

        const newDailyChallenge = await response.json();
        setChallenges((prev) => [newDailyChallenge, ...prev]);
        setIsAdding(false); // Close form after submission
    };

    return (
        <div className="container p-6 text-black">
            <button
                onClick={() => setIsAdding(!isAdding)}
                className="bg-purple-300 text-black p-2 rounded"
            >
                {isAdding ? "Cancel" : "Create New Challenge"}
            </button>

            {isAdding ? (
                <form onSubmit={handleSubmit} className="mt-4 border-2 border-purple-300 rounded-lg p-4 bg-gray-100">
                    <h2 className="text-xl text-black mb-4">Create a New Challenge</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Challenge Title"
                        value={newChallenge.title}
                        onChange={handleChange}
                        className="w-full p-2 mb-2 border-2 border-purple-300 rounded text-black"
                    />
                    <input
                        type="text"
                        name="days"
                        placeholder="Challenge Days"
                        value={newChallenge.days}
                        onChange={handleChange}
                        className="w-full p-2 mb-2 border-2 border-purple-300 rounded text-black"
                    />
                    <textarea
                        name="description"
                        placeholder="Challenge Description"
                        value={newChallenge.description}
                        onChange={handleChange}
                        className="w-full p-2 mb-2 text-black border-2 border-purple-300 rounded"
                    />
                    <button
                        type="submit"
                        className="mt-4 bg-purple-300 text-black p-2 rounded"
                    >
                        Submit
                    </button>
                </form>
            ) : (
                    <div className="min-h-screen bg-gray-100 p-6">
                        <h1 className="text-2xl font-bold mb-4">Challenges</h1>
                        <ChallengeCard
                            challengeName="30-Day Fitness Challenge"
                            rules="Complete daily fitness tasks, track your progress, and stay consistent."
                            createdBy="John Doe"
                            createdOn="January 21, 2025"
                            onJoin={handleJoinChallenge}
                            onViewLeaderboard={handleViewLeaderboard}
                        />
                    </div>

            )}
        </div>
    );
}

export default DailyChallengesPage;

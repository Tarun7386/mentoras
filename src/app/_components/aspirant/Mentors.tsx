import { useState, useEffect } from "react";

interface Mentor {
    id: string;
    name: string;
    bio: string;
    followerCount: number;
}

const Mentors: React.FC = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);

    // Fetch mentors data
    useEffect(() => {
        async function fetchMentors() {
            const response = await fetch("/api/getMentors");
            const data = await response.json();
            setMentors(data);
        }

        fetchMentors();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Available Mentors</h2>
            <ul>
                {mentors.map((mentor) => (
                    <li key={mentor.id} className="mb-4 p-4 border rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{mentor.name}</h3>
                        <p>{mentor.bio}</p>
                        <p className="text-sm text-gray-500">Followers: {mentor.followerCount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mentors;

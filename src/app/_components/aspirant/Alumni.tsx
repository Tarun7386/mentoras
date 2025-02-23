import type { FC } from "react";
import LoaderComponent from "../LoaderComponent";
import AlumniCard from "./AlumniCard";
import { api } from "~/trpc/react";

interface AlumnusType {
    id: string;
    user: {
        name: string | null;
        image: string | null;
    };
    collegeName: string;
    degree: string;
    description: string;
    sessionCost: number;
    whatsappNumber: number;
}
const mockAlumni = [
    {
        id: "1",
        user: {
            name: "John Doe",
            image: "/avatars/john.jpg"
        },
        collegeName: "IIT Delhi",
        degree: "B.Tech Computer Science",
        description: "I'm a passionate computer science graduate with expertise in algorithms and data structures. I've helped many students prepare for technical interviews and coding challenges. My teaching approach focuses on building strong fundamentals.",
        sessionCost: 1500,
        whatsappNumber: 9876543210
    },
    {
        id: "2",
        user: {
            name: "Jane Smith",
            image: "/avatars/jane.jpg"
        },
        collegeName: "IIM Ahmedabad",
        degree: "MBA Finance",
        description: "With 3 years of experience in investment banking and a strong academic background, I can help you understand complex financial concepts and prepare for MBA entrance exams. I believe in practical learning through case studies.",
        sessionCost: 2000,
        whatsappNumber: 9876543211
    },
    {
        id: "3",
        user: {
            name: "Priya Patel",
            image: "/avatars/priya.jpg"
        },
        collegeName: "IISc Bangalore",
        degree: "M.Tech in AI/ML",
        description: "Currently pursuing research in machine learning at IISc. I can help you with advanced topics in AI/ML, python programming, and math fundamentals. My sessions include hands-on projects and real-world applications.",
        sessionCost: 1800,
        whatsappNumber: 9876543212
    }
];

const Alumni: FC = () => {
    const { data: alumni, isLoading, error } = api.alumniData.getAlumni.useQuery();
    
    // Simulating loading state with useState if needed
    // const [isLoading, setIsLoading] = useState(false);
   
    const isError = false;

    // Handle loading state
    if (isLoading) {
        return <LoaderComponent />;
    }

    // Handle error state
    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500 font-medium">Failed to load alumni profiles.</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 text-purple-500 hover:text-purple-600 text-sm"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!alumni?.length) {
        return (
            <div className="text-center py-8 text-gray-500">
                No alumni profiles available at the moment.
            </div>
        );
    }

    return (
        <div className="space-y-4 p-1">
            {alumni.map((alumnus: AlumnusType) => (
                <AlumniCard
                    key={alumnus.id}
                    id={alumnus.id}
                    name={alumnus.user.name ?? "Anonymous"}
                    profilePic={alumnus.user.image ?? "/default-avatar.png"}
                    collegeName={alumnus.collegeName}
                    degree={alumnus.degree}
                    description={alumnus.description}
                    sessionCost={alumnus.sessionCost}
                    whatsappNumber={alumnus.whatsappNumber}
                />
            ))}
        </div>
    );
};

export default Alumni;
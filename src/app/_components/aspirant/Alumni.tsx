import type { FC } from "react";
import LoaderComponent from "../LoaderComponent";
import AlumniCard from "./AlumniCard";
// import { api } from "~/trpc/react";

// Mock data for testing
const mockAlumni = [
    {
        id: "1",
        user: {
            name: "John Doe",
            image: ""
        },
        achievement: "Cleared UPSC CSE 2023",
        description: "I prepared for 3 years and finally cleared UPSC CSE 2023 with AIR 123. I can guide aspirants about the right strategy and approach to crack this examination. Feel free to reach out for guidance!",
        hashtags: "UPSC,CSE,IAS,CivilServices",
        whatsappNumber: "9876543210",
       
    },
    {
        id: "2",
        user: {
            name: "Jane Smith",
            image: ""
        },
        achievement: "Software Engineer at Google",
        description: "Graduated from IIT Delhi and currently working at Google. I can help you prepare for coding interviews and guide you through DSA concepts. I've helped many students crack FAANG interviews.",
        hashtags: "Programming,DSA,FAANG,Tech",
        whatsappNumber: "9876543211",
       
    },
    {
        id: "3",
        user: {
            name: "Priya Patel",
            image: ""
        },
        achievement: "AIR 45 in GATE 2023",
        description: "Secured AIR 45 in GATE 2023 (CSE). Currently pursuing M.Tech at IISc Bangalore. I can help you with GATE preparation strategies and important topics to focus on.",
        hashtags: "GATE,CSE,Engineering,MTech",
        whatsappNumber: "9876543212",
       
    }
];

const Alumni: FC = () => {
    // Simulating loading state with useState if needed
    // const [isLoading, setIsLoading] = useState(false);
    const isLoading = false;
    const isError = false;

    // Handle loading state
    if (isLoading) {
        return <LoaderComponent />;
    }

    // Handle error state
    if (isError) {
        return (
            <div className="text-center text-red-500">
                Failed to load alumni profiles.
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            {mockAlumni.map((alumnus) => (
                <AlumniCard
                    key={alumnus.id}
                    id={alumnus.id}
                    profilePic={alumnus.user.image ?? "/default-avatar.png"}
                    name={alumnus.user.name ?? "Anonymous Alumni"}
                    achievement={alumnus.achievement}
                    description={alumnus.description}
                    hashtags={alumnus.hashtags?.split(',') ?? []}
                    whatsappNumber={alumnus.whatsappNumber}
                    
                />
            ))}
        </div>
    );
};

export default Alumni;
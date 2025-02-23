import type { FC } from "react";
import LoaderComponent from "../LoaderComponent";
import AlumniCard from "./AlumniCard";
import { api } from "~/trpc/react";


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
            {alumni.map((alumnus) => (
                <AlumniCard
                    key={alumnus.id}
                    id={alumnus.id}
                    name={alumnus.user.name ?? "Anonymous"}
                    profilePic={alumnus.user.image ?? "/default-avatar.png"}
                    collegeName={alumnus.collegeName}
                    degree={alumnus.degree}
                    description={alumnus.description}
                    sessionCost={alumnus.sessionCost}
                    whatsappNumber={Number(alumnus.whatsappNumber)}
                />
            ))}
        </div>
    );
};

export default Alumni;
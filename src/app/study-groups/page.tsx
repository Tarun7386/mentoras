'use client'
import { api } from "~/trpc/react";
import StudyGroupCard from "../_components/studygroup/StudyGroupCard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import LoaderComponent from "../_components/LoaderComponent";

function StudyGroups() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <LoaderComponent />; 
    }

    if (!session) {
        redirect("/api/auth/signin");
        return null; 
    }
        
    const { data: StudyGroups, isLoading } = api.studyGroupRouter.getMemberStudyGrp.useQuery();

    if (isLoading) {
        return <LoaderComponent />;
    }

    if (!StudyGroups || StudyGroups.length === 0) {
        return <p className="text-gray-500 text-center h-screen justify-center mt-4">You are not part of any study group yet.</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {StudyGroups.map((studyGroup) => (
                <StudyGroupCard
                    key={studyGroup.id}
                    id={studyGroup.id}
                    title={studyGroup.title}
                    description={studyGroup.description}
                    createdBy={studyGroup.createdById}
                    createdAt={studyGroup.createdAt.toLocaleDateString()}
                    ownerId={studyGroup.createdById}
                    isMember={true}
                />
            ))}
        </div>
    );
}

export default StudyGroups;

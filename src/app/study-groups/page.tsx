'use client'
import { api } from "~/trpc/react";
import StudyGroupCard from "../_components/studygroup/StudyGroupCard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "../_components/Loader";

function StudyGroups() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Loader />; 
    }

    if (!session) {
        redirect("/api/auth/signin");
        return null; 
    }
        
    const { data: StudyGroups, isLoading } = api.studyGroupRouter.getMemberStudyGrp.useQuery();

    if (isLoading) {
        return <Loader/>;
    }

    if (!StudyGroups || StudyGroups.length === 0) {
        return <p className="text-gray-500 text-center mt-4">You are not part of any study group yet.</p>;
    }

    return (
        <div className="max-w-2xl w-full mx-auto space-y-4 sm:space-y-6 pb-20">
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

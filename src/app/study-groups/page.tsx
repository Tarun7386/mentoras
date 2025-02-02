'use client'
import { api } from "~/trpc/react";
import StudyGroupCard from "../_components/studygroup/StudyGroupCard";

function StudyGroups() {
    const { data: StudyGroups,isLoading } = api.studyGroupRouter.getMemberStudyGrp.useQuery()
    if (isLoading) {return "loading..."}
    return ( 
        StudyGroups?.map((studyGroup) => (
            <StudyGroupCard
                key={studyGroup.id} // Ensure each element has a unique key
                id={studyGroup.id}
                title={studyGroup.title}
                description={studyGroup.description}
                createdBy={studyGroup.createdById}
                createdAt={studyGroup.createdAt.toLocaleDateString()}
                ownerId={studyGroup.createdById} isMember={true}            />
        )
    )
     );
}

export default StudyGroups;
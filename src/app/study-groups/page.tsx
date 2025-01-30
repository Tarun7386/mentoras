'use client'
import { api } from "~/trpc/react";
import StudyGroupCard from "../_components/studygroup/StudyGroupCard";

function StudyGroups() {
    const { data: StudyGroups } = api.studyGroupRouter.getAspirantStudyGroups.useQuery()
    return ( 
        StudyGroups?.map((studyGroup) => (
            <StudyGroupCard
                key={studyGroup.id} // Ensure each element has a unique key
                id={studyGroup.id}
                title={studyGroup.title}
                description={studyGroup.description}
                createdBy={studyGroup.createdById}
                createdAt={studyGroup.createdAt.toLocaleDateString()}
                ownerId={studyGroup.createdById}
            />
        )
    )
     );
}

export default StudyGroups;
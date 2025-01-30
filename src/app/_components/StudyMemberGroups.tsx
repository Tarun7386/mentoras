import { api } from "~/trpc/react";
import StudyGroupCard from "./studygroup/StudyGroupCard";


const StudyMemberGroups = () => {

    const { data: groups } = api.studyGroupRouter.getMemberStudyGrp.useQuery()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {groups?.map((group) => (
                <StudyGroupCard
                    key={group.id}
                    id={group.id}
                    title={group.title}
                    description={group.description}
                    createdBy={group.createdBy.name}
                    createdAt={group.createdAt.toLocaleDateString()}
                    ownerId={group.createdById}
                />
            ))}
        </div>
    );
};

export default StudyMemberGroups;

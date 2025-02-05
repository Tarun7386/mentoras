import { api } from "~/trpc/react";
import StudyGroupCard from "./studygroup/StudyGroupCard";


const StudyMemberGroups = () => {

    const [StudyGroups] = api.studyGroupRouter.getMemberStudyGrp.useSuspenseQuery()

    if (!StudyGroups || StudyGroups.length === 0) {
        return <p className="text-gray-500 text-center mt-4">You are not part of any study group yet.</p>;
    }

    return (
        <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 gap-4 sm:gap-6">
            {StudyGroups?.map((group) => (
                <StudyGroupCard
                    key={group.id}
                    id={group.id}
                    title={group.title}
                    description={group.description}
                    createdBy={group.createdBy.name}
                    createdAt={group.createdAt.toLocaleDateString()}
                    ownerId={group.createdById} isMember={true}                />
            ))}
        </div>
    );
};

export default StudyMemberGroups;

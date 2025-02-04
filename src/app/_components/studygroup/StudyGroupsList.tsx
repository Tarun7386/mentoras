import { api } from "~/trpc/react";
import StudyGroupCard from "./StudyGroupCard";
import Loader from "../Loader";

const StudyGroupsList = ({ ownerId }: { ownerId: string | undefined }) => {
    const { data: groups, isLoading, error } = api.studyGroupRouter.getStudyGroupsByMe.useQuery({ ownerId });

    if (error) {
        return <p className="text-red-500 text-center mt-4">Error fetching study groups.</p>;
    }

    if (isLoading) {
        return <Loader/>
    }

    if (!groups || groups.length === 0) {
        return <p className="text-gray-500 text-center mt-4">{"You haven't created any study groups yet."}</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {groups.map((group) => (
                <StudyGroupCard
                    key={group.id}
                    id={group.id}
                    title={group.title}
                    description={group.description}
                    createdBy={group.createdBy.name}
                    createdAt={group.createdAt.toLocaleDateString()}
                    ownerId={group.createdById}
                    isMember={group.isMember}
                />
            ))}
        </div>
    );
};

export default StudyGroupsList;

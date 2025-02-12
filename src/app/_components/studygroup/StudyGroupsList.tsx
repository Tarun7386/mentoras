import { api } from "~/trpc/react";
import StudyGroupCard from "./StudyGroupCard";
import LoaderComponent from "../LoaderComponent";

const StudyGroupsList = ({ ownerId }: { ownerId: string | undefined }) => {
    const { data: groups, isLoading, error } = api.studyGroupRouter.getStudyGroupsByMe.useQuery({ ownerId });

    if (error) {
        return <p className="text-red-500 text-center mt-4">Error fetching study groups.</p>;
    }

    if (isLoading) {
        return <LoaderComponent />
    }

    if (!groups || groups.length === 0) {
        return <p className="text-gray-500 text-center mt-4">{"You haven't created any study groups yet."}</p>;
    }

    return (
        <div className="max-w-2xl w-full mx-auto space-y-4 sm:space-y-6 pb-20">
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

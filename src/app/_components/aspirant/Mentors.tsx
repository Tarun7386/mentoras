import { api } from "~/trpc/react";
import MentorCard from "./MentorCard";

const Mentors: React.FC = () => {
 const [mentors] = api.mentorsData.getMentors.useSuspenseQuery()
    return (
        <div className="space-y-4">
            {mentors?.map((mentor, index) => (
                <MentorCard
                    key={index}
                    id={mentor.id}
                    profilePic={mentor.user.image ?? "/images"} // Corrected to use `mentor.profilePic`
                    name={mentor.user.name} // Corrected to use `mentor.name`
                    designation={mentor.mainWork} // Corrected to use `mentor.designation`
                    followers={mentor._count.MentorFollower} // Corrected to use `mentor.followers`
                    description={mentor.description} // Corrected to use `mentor.description`
                    hashtags={mentor.hashtags.map((hashtag) => hashtag.name)} // Corrected to use `mentor.hashtags`
                    followedByMe={mentor.followedByMe}                />
            ))}
        </div>
    );
};

export default Mentors;

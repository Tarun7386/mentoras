import { api } from "~/trpc/react";
import MentorCard from "./MentorCard";

const Mentors: React.FC = () => {
 const {data:mentors} = api.mentorsData.getMentors.useQuery()
    return (
        <div className="space-y-4">
            {mentors?.map((mentor, index) => (
                <MentorCard
                    key={index}
                    id={mentor.id}
                    profilePic={mentor.user.image ?? "/images"} // Corrected to use `mentor.profilePic`
                    name={mentor.user.name} // Corrected to use `mentor.name`
                    designation={mentor.mainWork} // Corrected to use `mentor.designation`
                    followers={2} // Corrected to use `mentor.followers`
                    description={mentor.description} // Corrected to use `mentor.description`
                    hashtags={mentor.hashtags.map((hashtag) => hashtag.name)} // Corrected to use `mentor.hashtags`
                    followedByMe={mentor.followedByMe}                />
            ))}
        </div>
    );
};

export default Mentors;

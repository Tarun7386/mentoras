import { api } from "~/trpc/react";
import MentorCard from "./MentorCard";


const Mentors: React.FC = () => {

    const { data: mentors } = api.mentorsData.getMentors.useQuery();
    

    return (
        <div className=" bg-gray-800">
            {mentors?.map((mentor, index) => (
                <MentorCard
                    key={index}
                    profilePic={mentor.user.image ?? "/image"}
                    name={mentor.id}
                    designation={mentor.mainWork}
                    followers={100} // Replace with actual followers count
                    description={mentor.description}
                    hashtags={["ias","ips","jee"]}         />
            ))}
        </div>
    );
};

export default Mentors;

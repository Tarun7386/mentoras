import { api } from "~/trpc/react";
import MentorCard from "./MentorCard";


const Mentors: React.FC = () => {
    const mentors = [
        {
            profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            name: "John Doe",
            designation: "Software Engineer at Google",
            followers: 1200,
            description:
                "Experienced mentor in web development and cloud computing. Passionate about helping others grow.Data Science expert with a focus on machine learning and AI. Lets build smarter solutions together!Data Science expert with a focus on machine learning and AI. Lets build smarter solutions together!",
            hashtags: ["WebDevelopment", "Cloud", "CareerGrowth"],
        },
        {
            profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            name: "Jane Smith",
            designation: "Data Scientist at Facebook",
            followers: 950,
            description:
                "Data Science expert with a focus on machine learning and AI. Lets build smarter solutions together!Data Science expert with a focus on machine learning and AI. Lets build smarter solutions together!Data Science expert with a focus on machine learning and AI. Lets build smarter solutions together!Data Science expert with a focus on machine learning and AI. Lets build smarter solutions together!",
            hashtags: ["DataScience", "AI", "MachineLearning"],
        },
    ];

    return (
        <div className="">
            {mentors.map((mentor, index) => (
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

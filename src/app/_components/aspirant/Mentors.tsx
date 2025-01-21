import MentorCard from "./MentorCard";


const Mentors: React.FC = () => {
    const mentors = [
        {
            profilePic: "https://via.placeholder.com/40",
            name: "John Doe",
            designation: "Software Engineer at Google",
            followers: 1200,
            description:
                "Experienced mentor in web development and cloud computing. Passionate about helping others grow.",
            hashtags: ["WebDevelopment", "Cloud", "CareerGrowth"],
        },
        {
            profilePic: "https://via.placeholder.com/40",
            name: "Jane Smith",
            designation: "Data Scientist at Facebook",
            followers: 950,
            description:
                "Data Science expert with a focus on machine learning and AI. Let’s build smarter solutions together!",
            hashtags: ["DataScience", "AI", "MachineLearning"],
        },
    ];

    return (
        <div className=" bg-gray-800">
            {mentors.map((mentor, index) => (
                <MentorCard
                    key={index}
                    profilePic={mentor.profilePic}
                    name={mentor.name}
                    designation={mentor.designation}
                    followers={mentor.followers}
                    description={mentor.description}
                    hashtags={mentor.hashtags}         />
            ))}
        </div>
    );
};

export default Mentors;

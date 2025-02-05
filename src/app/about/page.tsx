import React from 'react';
import {
    AcademicCapIcon,
    UserGroupIcon,
    CheckCircleIcon,
    ChartBarIcon,
    LightBulbIcon
} from '@heroicons/react/24/outline';
import GetstartedButton from '../_components/getStartedButton';

const features = [
    {
        title: "Connect with Educators",
        description: " Engage with experienced educators who share valuable insights, expert knowledge, and personalized daily tasks designed to keep you on track.",
        icon: <AcademicCapIcon className="w-10 h-10" />
    },
    {
        title: "Collaborate with Mentors",
        description: "Learn from those who've succeeded in various fields, gain practical advice, and receive guidance on how to tackle challenges.",
        icon: <UserGroupIcon className="w-10 h-10" />
    },
    {
        title: "Join Study Groups",
        description: "Stay motivated by joining study groups where you can connect with peers, complete daily tasks, and hold each other accountable as you work towards your goals.",
        icon: <ChartBarIcon className="w-10 h-10" />
    },
    {
        title: "Daily Challenges",
        description: "Educators provide structured daily tasks that help learners stay focused, build discipline, and progress steadily towards their goals.",
        icon: <CheckCircleIcon className="w-10 h-10" />
    },
    {
        title: "Get Motivated",
        description: "Receive inspiration from educators and mentors, push through challenges, and get the support you need to stay on track.",
        icon: <LightBulbIcon className="w-10 h-10" />
    }
];

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#300171]/30 
            to-slate-900 text-white p-4 sm:p-8">

            {/* Hero Section */}
            <section className="text-center mb-12 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 
                    bg-gradient-to-r from-purple-400 to-pink-400 
                    bg-clip-text text-transparent">
                    Welcome to Mentoras
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 
    max-w-3xl mx-auto leading-relaxed tracking-wide px-4 sm:px-6">
                   {" Mentoras is a platform where learners, educators, and professionals share knowledge, offer motivation, and collaborate to grow together. Whether you're starting out or seeking guidance, Mentoras connects you with the support and community you need to succeed."}
                </p>
                {/* <p className="text-base sm:text-lg md:text-xl text-gray-300 
    max-w-2xl mx-auto leading-relaxed tracking-wide px-4 sm:px-6">
    Mentoras is a dynamic platform where learners, educators, and experienced professionals come together to share knowledge, offer inspiration, and support each other's growth. Whether you're just starting out, seeking advice from those who've been there, or looking for study groups to tackle daily challenges, Mentoras is the community to help you learn and succeed.
</p> */}

            </section>

            {/* Mission Section */}
            <section className="bg-black/30 backdrop-blur-sm rounded-xl p-6 sm:p-8 
                mb-12 max-w-4xl mx-auto border border-purple-500/20 
                hover:border-purple-500/40 transition-all duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 
                    bg-gradient-to-r from-purple-400 to-pink-400 
                    bg-clip-text text-transparent">
                    Our Mission
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                    At Mentoras, we aim to create a space where learners can access the tools, insights, and support they need to succeed. We built this platform to connect students with educators and accomplished individuals who can guide, motivate, and challenge them to reach their goals.


                </p>
            </section>

            {/* What We Offer Section */}
            <section className="mb-16 max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 
                    bg-gradient-to-r from-purple-400 to-pink-400 
                    bg-clip-text text-transparent">
                    What We Offer
                </h2>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-black/30 backdrop-blur-sm 
                            rounded-xl p-6 border border-purple-500/20 
                            hover:border-purple-500/40 transition-all duration-300 
                            hover:transform hover:scale-[1.02]">
                            <div className="text-purple-400 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 
                                bg-gradient-to-r from-purple-400 to-pink-400 
                                bg-clip-text text-transparent">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing Statement */}
            <section className="text-center max-w-4xl mx-auto mb-12">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 sm:p-8 
                    border border-purple-500/20 hover:border-purple-500/40 
                    transition-all duration-300">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        {"Mentoras isn't just about learning—it's about creating a community where everyone grows together, one step at a time. Whether you're a learner seeking advice, an educator sharing your knowledge, or a successful individual offering mentorship, Mentoras is the place to make meaningful connections, grow, and achieve your goals."}
                    </p>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 
                    bg-gradient-to-r from-purple-400 to-pink-400 
                    bg-clip-text text-transparent">
                    Join the Mentoras Community
                </h2>
                <p className="text-lg text-gray-300 max-w-lg mx-auto mb-8">
                    Whether you&apos;re a learner, educator, or mentor, Mentoras is here to help you grow, learn, and succeed.
                </p>
                <div >
                    <GetstartedButton/>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
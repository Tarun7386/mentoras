'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';

interface Feature {
    title: string;
    description: string;
    image: string;
    cta: string;
}



const features: Feature[] = 
   
    [
        {
            title: "Study Groups",
            description: "Join collaborative study groups to learn and grow together, staying motivated with a community of learners.",
            image: "/landing.jpg",
            cta: "Join Groups"
        },
        {
            title: "Insights from Mentors",
            description: "Get inspired and learn through valuable insights shared by mentors who have walked the path before you.",
            image: "/landing.jpg",
            cta: "Explore Insights"
        },
        {
            title: "1:1 Mentorship (Coming Soon)",
            description: "Connect with educators or individuals who have succeeded in your field for personalized guidance to help you achieve your goals.",
            image: "/landing.jpg",
            cta: "Learn More"
        },
        {
            title: "Book Recommendations",
            description: "Discover book recommendations from mentors to find out which books inspired their success and shaped their journey.",
            image: "/landing.jpg",
            cta: "View Recommendations"
        }
    ]





export default function LandingPage() {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
    const { scrollY } = useScroll();
    
    useEffect(() => {
        const updateScrollDirection = () => {
            const previous = scrollY.getPrevious()??0;
            const current = scrollY.get();
            setScrollDirection(current > previous ? 'down' : 'up');
        };
        
        return scrollY.onChange(updateScrollDirection);
    }, [scrollY]);

    const slideVariants = {
        hidden: (index: number) => ({
            opacity: 0,
            x: scrollDirection === 'down' 
                ? (index % 2 === 0 ? 100 : -100)
                : (index % 2 === 0 ? -100 : 100)
        }),
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
        exit: (index: number) => ({
            opacity: 0,
            x: scrollDirection === 'down' 
                ? (index % 2 === 0 ? -100 : 100)
                : (index % 2 === 0 ? 100 : -100),
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
            }
        })
    };
    

    return (

<section className="py-16 sm:py-20 px-4 w-full">
<div className="w-full max-w-7xl mx-auto">
    {features.map((feature, index) => (
        <motion.div
            key={feature.title}
            custom={index}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            variants={slideVariants}
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col lg:flex-row items-center gap-8 mb-16 
                sm:mb-32 w-full even:lg:flex-row-reverse"
        >
            
            <div className="w-full lg:w-1/2 relative h-[250px] sm:h-[400px] 
                    flex-shrink-0">
                    <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 p-0 lg:p-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 
                        bg-gradient-to-r from-purple-400 to-pink-400 
                        bg-clip-text text-transparent">
                        {feature.title}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 mb-6">
                        {feature.description}
                    </p>
                    {/* <button className="w-full sm:w-auto px-6 py-3 rounded-xl 
                        bg-gradient-to-r from-purple-600 to-pink-600 
                        text-white font-medium">
                        {feature.cta}
                    </button> */}
                </div>
        </motion.div>
    ))}
</div>
</section>
    );
}
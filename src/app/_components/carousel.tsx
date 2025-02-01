"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface CarouselProps {
    images: { id: number; src: string; alt: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const scrollCarousel = useCallback((direction: number) => {
        const totalSlides = images.length;
        setCurrentSlide((prevIndex) => (prevIndex + direction + totalSlides) % totalSlides);
    }, [images.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            scrollCarousel(1);
        }, 5000);

        return () => clearInterval(interval);
    }, [scrollCarousel]);

    return (
        <div className=" w-full mx-auto">
            <div className="overflow-hidden relative  w-full">
                <div
                    className="flex transition-transform duration-1000 ease-in-out transform"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={image.id} className="min-w-full relative h-60 sm:h-80 md:h-96 lg:h-[600px]">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="w-full h-full object-cover"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={() => scrollCarousel(-1)}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 p-3 bg-gray-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none z-10"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    ></path>
                </svg>
            </button>
            <button
                onClick={() => scrollCarousel(1)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-3 bg-gray-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none z-10"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

export default Carousel;
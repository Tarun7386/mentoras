"use client"
import { useState, useEffect } from "react";
import BookRecommendationCard from "./BookRecommendationCard";
import { api } from "~/trpc/react";

interface BookRecommendation {
    id: string;
    title: string;
    author: string;
    description: string;
    createdAt: string;
    user: { name: string }; // Assuming the user has a name field
}

function BookRecommendationsPage() {
    const books = [
        {
            title: "Atomic Habits",
            author: "James Clear",
            description:
                "Atomic Habits offers a proven framework for improving every day. James Clear, one of the world’s leading experts on habit formation, reveals practical strategies...",
        },
        {
            title: "Deep Work",
            author: "Cal Newport",
            description:
                "Deep Work is an indispensable guide to anyone seeking focused success in a distracted world. It highlights the benefits of concentrated effort and offers tools...",
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            description:
                "Atomic Habits offers a proven framework for improving every day. James Clear, one of the world’s leading experts on habit formation, reveals practical strategies...",
        },
        {
            title: "Deep Work",
            author: "Cal Newport",
            description:
                "Deep Work is an indispensable guide to anyone seeking focused success in a distracted world. It highlights the benefits of concentrated effort and offers tools...",
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            description:
                "Atomic Habits offers a proven framework for improving every day. James Clear, one of the world’s leading experts on habit formation, reveals practical strategies...",
        },
        {
            title: "Deep Work",
            author: "Cal Newport",
            description:
                "Deep Work is an indispensable guide to anyone seeking focused success in a distracted world. It highlights the benefits of concentrated effort and offers tools...",
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            description:
                "Atomic Habits offers a proven framework for improving every day. James Clear, one of the world’s leading experts on habit formation, reveals practical strategies...",
        },
        {
            title: "Deep Work",
            author: "Cal Newport",
            description:
                "Deep Work is an indispensable guide to anyone seeking focused success in a distracted world. It highlights the benefits of concentrated effort and offers tools...",
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            description:
                "Atomic Habits offers a proven framework for improving every day. James Clear, one of the world’s leading experts on habit formation, reveals practical strategies...",
        },
        {
            title: "Deep Work",
            author: "Cal Newport",
            description:
                "Deep Work is an indispensable guide to anyone seeking focused success in a distracted world. It highlights the benefits of concentrated effort and offers tools...",
        }
    ];

    const [isAdding, setIsAdding] = useState(false); // To toggle between form and list
    const [recommendations, setRecommendations] = useState<BookRecommendation[]>([]);
    const [newRecommendation, setNewRecommendation] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        
    });

 

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewRecommendation((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        Addbook.mutateAsync(newRecommendation);
        setNewRecommendation({
            title: "",
            author: "",
            genre: "",
            description: "",

        });

    };

    return (
            // <div className="min-h-screen p-4 sm:p-6 lg:p-8 rounded-lg ">
            //     {/* Mobile Add Button - Only show on small screens */}
            //     <div className="lg:hidden mb-4">
            //         <button
            //             onClick={() => setIsAdding(!isAdding)}
            //             className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg w-full"
            //         >
            //             {isAdding ? "Cancel" : "Add Book Recommendation"}
            //         </button>
            //     </div>
        
            //     {/* Main Content - Flex Container */}
            //     <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
            //         {/* Cards Section - Scrollable */}
            //         <div className={`flex-1 overflow-y-auto pr-4 custom-scrollbar ${isAdding ? 'hidden lg:block' : 'block'}`}>
            //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 
            //     2xl:grid-cols-2 gap-6 
            //     max-w-2xl mx-auto">
            //                 {books.map((book, index) => (
            //                    <BookRecommendationCard
            //                    key={index}
            //                    title={book.title}
            //                    author={book.author}
            //                    description={book.description}
            //                /> 
                               
            //                 ))}
            //             </div>
            //         </div>
        
            //         {/* Form Section - Fixed on Desktop */}
            //         <div className={`lg:w-[400px] lg:flex-shrink-0 ${isAdding ? 'block' : 'hidden lg:block'}`}>
            //             <div className="lg:sticky lg:top-35 mt-20">
            //                 <form onSubmit={handleSubmit} 
            //                     className="bg-black/30 backdrop-blur-sm p-6 rounded-xl 
            //                         border border-purple-500/20 shadow-xl">
            //                     <h2 className="text-xl text-center mb-6 font-semibold
            //                         bg-gradient-to-r from-purple-400 to-pink-400 
            //                         bg-clip-text text-transparent">
            //                         Add Book Recommendation
            //                     </h2>
            //                     <input
            //                         type="text"
            //                         name="title"
            //                         placeholder="Book Title"
            //                         value={newRecommendation.title}
            //                         onChange={handleChange}
            //                         className="w-full p-3 mb-4 bg-black/50 text-white 
            //                             border border-purple-500/30 rounded-lg 
            //                             focus:outline-none focus:border-purple-500 
            //                             placeholder-gray-500"
            //                     />
            //                     <input
            //                         type="text"
            //                         name="author"
            //                         placeholder="Author"
            //                         value={newRecommendation.author}
            //                         onChange={handleChange}
            //                         className="w-full p-3 mb-4 bg-black/50 text-white 
            //                             border border-purple-500/30 rounded-lg 
            //                             focus:outline-none focus:border-purple-500 
            //                             placeholder-gray-500"
            //                     />
            //                     <textarea
            //                         name="description"
            //                         placeholder="Description"
            //                         value={newRecommendation.description}
            //                         onChange={handleChange}
            //                         className="w-full p-3 mb-4 bg-black/50 text-white 
            //                             border border-purple-500/30 rounded-lg 
            //                             focus:outline-none focus:border-purple-500 
            //                             placeholder-gray-500 min-h-[120px]"
            //                     />
            //                     <button
            //                         type="submit"
            //                         className="w-full bg-gradient-to-r from-purple-600 to-pink-600 
            //                             text-white font-medium py-3 px-6 rounded-lg
            //                             transition-all duration-300 hover:scale-[1.02] 
            //                             hover:shadow-lg hover:shadow-purple-500/20"
            //                     >
            //                         Submit
            //                     </button>
            //                 </form>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div className="min-h-screen p-4 sm:p-6 lg:p-8 rounded-lg">
            {/* Mobile Add Button */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg w-full"
                >
                    Add Book Recommendation
                </button>
            </div>
            {isAdding && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
        flex items-center justify-center p-4">
        <div className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 
            rounded-xl p-6 w-full max-w-md transform transition-all duration-300 
            border border-purple-500/20">
            <h2 className="text-xl font-semibold mb-6 text-center
                bg-gradient-to-r from-purple-400 to-pink-400 
                bg-clip-text text-transparent">
                Add Book Recommendation
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Book Title"
                    value={newRecommendation.title}
                    onChange={handleChange}
                    className="w-full p-3 bg-black/50 text-white border 
                        border-purple-500/30 rounded-lg 
                        focus:outline-none focus:border-purple-500 
                        placeholder-gray-500"
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={newRecommendation.author}
                    onChange={handleChange}
                    className="w-full p-3 bg-black/50 text-white border 
                        border-purple-500/30 rounded-lg 
                        focus:outline-none focus:border-purple-500 
                        placeholder-gray-500"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newRecommendation.description}
                    onChange={handleChange}
                    className="w-full p-3 bg-black/50 text-white border 
                        border-purple-500/30 rounded-lg 
                        focus:outline-none focus:border-purple-500 
                        placeholder-gray-500 min-h-[120px]"
                />
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600
                            text-white font-medium py-3 px-6 rounded-lg
                            transition-all duration-300 hover:scale-[1.02]
                            hover:shadow-lg hover:shadow-purple-500/20"
                    >
                        Add Book
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="flex-1 bg-gray-800/50 text-gray-300 font-medium
                            py-3 px-6 rounded-lg border border-purple-500/20
                            transition-all duration-300 hover:scale-[1.02]
                            hover:bg-purple-500/10 hover:text-purple-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
)}
           
            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
               
                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 
                        2xl:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {books.map((book, index) => (
                            <BookRecommendationCard
                            key={index} 
                            title={book.title}
                            author={book.author} 
                            genre={book.genre} 
                            description={book.description}                                
                           /> 
                    ))}
                    </div>
                </div>

                
                <div className="hidden lg:block w-96 bg-gradient-to-b from-gray-900 via-[#300171] 
                    to-slate-900 p-4 rounded-xl border border-purple-500/20 mt-10 mb-40">
                    <h2 className="text-xl font-semibold text-white mb-6">Add Book Recommendation</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Book Title"
                            value={newRecommendation.title}
                            onChange={handleChange}
                            className="w-full p-3 mb-4 bg-black/50 text-white 
                                border border-purple-500/30 rounded-lg 
                                focus:outline-none focus:border-purple-500 
                                placeholder-gray-500"
                        />
                        <input
                            type="text"
                            name="author"
                            placeholder="Author"
                            value={newRecommendation.author}
                            onChange={handleChange}
                            className="w-full p-3 mb-4 bg-black/50 text-white 
                                border border-purple-500/30 rounded-lg 
                                focus:outline-none focus:border-purple-500 
                                placeholder-gray-500"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={newRecommendation.description}
                            onChange={handleChange}
                            className="w-full p-3 mb-4 bg-black/50 text-white 
                                border border-purple-500/30 rounded-lg 
                                focus:outline-none focus:border-purple-500 
                                placeholder-gray-500 min-h-[120px]"
                        />
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 
                                text-white font-medium py-3 px-6 rounded-lg
                                transition-all duration-300 hover:scale-[1.02] 
                                hover:shadow-lg hover:shadow-purple-500/20"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default BookRecommendationsPage;

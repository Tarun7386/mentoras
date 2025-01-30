"use client"
import { useState, useEffect } from "react";
import BookRecommendationCard from "./BookRecommendationCard";
import { api } from "~/trpc/react";
import AddNewBookForm from "./AddNewBookForm";
import MobileAddBook from "./MobileAddNewBook";

interface BookRecommendation {
    id: string;
    title: string;
    author: string;
    description: string;
    createdAt: string;
    user: { name: string }; // Assuming the user has a name field
}

function BookRecommendationsPage({userId}:{userId : string | undefined}) {

    const {data:books,isLoading,error} = api.mentorsData.getBookByMentorId.useQuery({}) || []


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
        // Addbook.mutateAsync(newRecommendation);
        setNewRecommendation({
            title: "",
            author: "",
            genre: "",
            description: "",

        });

    };
    if(isLoading){
        return "loading..."
    }
    if(error){
        return "error"
    }

    return (
            
            <div className="min-h-screen p-4 sm:p-6 lg:p-8 rounded-lg">
            {/* Mobile Add Button */}
            <MobileAddBook />
           
            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
               
                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 
                        2xl:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {books?.map((book, index) => (
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
                {/* Desktop Form */}
                <AddNewBookForm />
            </div>
        </div>
        
    );
}

export default BookRecommendationsPage;

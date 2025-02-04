"use client"
import BookRecommendationCard from "./BookRecommendationCard";
import { api } from "~/trpc/react";
import AddNewBookForm from "./AddNewBookForm";
import MobileAddBook from "./MobileAddNewBook";
import Loader from "../Loader";



function BookRecommendationsPage({ }: { userId: string | undefined }) {

    const { data: books, isLoading, error } = api.mentorsData.getBookByMentorId.useQuery({}) || []


    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-500 text-center mt-4">Error fetching book recommendations.</p>;
    }

    return (

        <div className="min-h-screen p-4 sm:p-6 lg:p-8 rounded-lg">
            {/* Mobile Add Button */}
            <MobileAddBook />

            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">

                {!books || books.length === 0 ? <p className="text-gray-500 text-center mt-4">No book recommendations available yet.</p> 
                :
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
                </div>}
                {/* Desktop Form */}
                <AddNewBookForm />
            </div>
        </div>

    );
}

export default BookRecommendationsPage;

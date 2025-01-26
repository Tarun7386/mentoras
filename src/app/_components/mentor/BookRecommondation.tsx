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
    
    const Addbook = api.mentorsData.addBook.useMutation(
        {
            onSuccess: async () => {
                setIsAdding(false); 

            }
        }
    );

    const books = api.mentorsData.getBook.useQuery();

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
        <div className="container p-6 text-black"> {/* Set the container text color to black */}
            <button
                onClick={() => setIsAdding(!isAdding)}
                className="bg-purple-500 text-black p-2 rounded"
            >
                {isAdding ? "Cancel" : "Add Book Recommendation"}
            </button>

            {isAdding ? (
                <form onSubmit={handleSubmit} className="mt-4 border-2 border-purple-300 rounded-lg p-4 bg-gray-100">
                    <h2 className="text-xl text-black mb-4">Add Book Recommendation</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Book Title"
                        value={newRecommendation.title}
                        onChange={handleChange}
                        className="w-full p-2 mb-2 border-2 border-purple-300 rounded text-black"
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={newRecommendation.author}
                        onChange={handleChange}
                        className="w-full p-2 mb-2 text-black border-2 border-purple-300 rounded"
                    />
                    <input
                        type="text"
                        name="genre"
                        placeholder="genre"
                        value={newRecommendation.genre}
                        onChange={handleChange}
                        className="w-full p-2 mb-2 text-black border-2 border-purple-300 rounded"
                    />
                  
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newRecommendation.description}
                        onChange={handleChange}
                        className="w-full p-2 mb-2 text-black border-2 border-purple-300 rounded"
                    />
                    <button
                        type="submit"
                        className="mt-4 bg-purple-500 text-black p-2 rounded"
                        disabled={Addbook.isPending}
                    >
                        {Addbook.isPending ? "Submitting..." : "submit"}

                    </button>
                </form>
            ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                        {books.data?.map((book, index) => (
                            <BookRecommendationCard
                            key={index} 
                            title={book.title}
                            author={book.author} 
                            genre={book.genre} 
                            description={book.description}                                
                           /> 
                    ))}
                    </div>
            )}
        </div>
    );
}

export default BookRecommendationsPage;

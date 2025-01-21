import { useState, useEffect } from "react";
import BookRecommendationCard from "./BookRecommendationCard";

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
    ];

    const [isAdding, setIsAdding] = useState(false); // To toggle between form and list
    const [recommendations, setRecommendations] = useState<BookRecommendation[]>([]);
    const [newRecommendation, setNewRecommendation] = useState({
        title: "",
        author: "",
        description: "",
        
    });

    // Fetch recommendations on page load
    useEffect(() => {
        async function fetchRecommendations() {
            const response = await fetch("/api/bookRecommendations");
            const data = await response.json();
            setRecommendations(data);
        }
        fetchRecommendations();
    }, []);

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
        const response = await fetch("/api/bookRecommendations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...newRecommendation,
                userId: "yourUserIdHere", // Replace with the actual user ID
            }),
        });

        const newBook = await response.json();
        setRecommendations((prev) => [newBook, ...prev]);
        setIsAdding(false); // Close form after submission
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
                    >
                        Submit
                    </button>
                </form>
            ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                        {books.map((book, index) => (
                            <BookRecommendationCard
                                key={index}
                                title={book.title}
                                author={book.author}
                                description={book.description}
                            />
                        ))}
                    </div>
            )}
        </div>
    );
}

export default BookRecommendationsPage;

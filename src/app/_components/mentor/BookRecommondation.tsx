import { useState, useEffect } from "react";

interface BookRecommendation {
    id: string;
    title: string;
    author: string;
    genre: string;
    description: string;
    recommendedBy: string;
    createdAt: string;
    user: { name: string }; // Assuming the user has a name field
}

function BookRecommendationsPage() {
    const [isAdding, setIsAdding] = useState(false); // To toggle between form and list
    const [recommendations, setRecommendations] = useState<BookRecommendation[]>([]);
    const [newRecommendation, setNewRecommendation] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        recommendedBy: "",
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
                    <input
                        type="text"
                        name="genre"
                        placeholder="Genre"
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
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <div className="mt-4">
                    <h2 className="text-2xl text-black mb-4">Previous Book Recommendations</h2>
                    <ul>
                        {recommendations.map((book) => (
                            <li key={book.id} className="mb-4 border-b pb-4">
                                <h3 className="text-xl font-bold text-black">{book.title}</h3>
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Genre:</strong> {book.genre}</p>
                                <p><strong>Recommended By:</strong> {book.recommendedBy}</p>
                                <p><strong>Description:</strong> {book.description}</p>
                                <p><strong>Posted On:</strong> {new Date(book.createdAt).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BookRecommendationsPage;

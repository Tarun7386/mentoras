import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "~/trpc/react";

function MobileAddBook() {

        const utils = api.useUtils();

        const addBook = api.mentorsData.addBook.useMutation({
            onSuccess: async () => {
                // Show success toast
                toast.success('Book recommendation added successfully!');
                await utils.mentorsData.getBookByMentorId.invalidate();

                // Clear the form after submission
                setNewRecommendation({
                    title: '',
                    author: '',
                    genre: '',
                    description: '',
                });
    
                setIsAdding(false); // Close the modal
            },
            onError: () => {
                toast.error('An error occurred while adding the book.');
            },
        });
    

    const [isAdding, setIsAdding] = useState(false);
    const [newRecommendation, setNewRecommendation] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewRecommendation((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form fields
        const { title, author, genre, description } = newRecommendation;
        if (!title || !author || !genre || !description) {
            toast.error('Please fill out all the fields.');
            return;
        }

        addBook.mutate(newRecommendation);
    };

    return (
        <>
            {/* Mobile Add Button */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg w-full"
                >
                    Add Book Recommendation
                </button>
            </div>

            {/* Mobile Form Modal */}
            {isAdding && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
                        flex items-center justify-center p-4"
                >
                    <div
                        className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 
                            rounded-xl p-6 w-full max-w-md transform transition-all duration-300 
                            border border-purple-500/20"
                    >
                        <h2
                            className="text-xl font-semibold mb-6 text-center
                                bg-gradient-to-r from-purple-400 to-pink-400 
                                bg-clip-text text-transparent"
                        >
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
                            <input
                                type="text"
                                name="genre"
                                placeholder="genre"
                                value={newRecommendation.genre}
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
                                    disabled={addBook.isPending}
                                >
                                    {addBook.isPending ? <Loader/> : "Add Book"}
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
        </>
    );
}

export default MobileAddBook;

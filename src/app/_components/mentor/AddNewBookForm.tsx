'use client';

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { api } from '~/trpc/react';

function AddNewBookForm() {
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

    const [isAdding, setIsAdding] = useState(false); // State for toggling the form
    const [newRecommendation, setNewRecommendation] = useState({
        title: '',
        author: '',
        genre: '',
        description: '',
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
            <div className="min-h-screen p-4 sm:p-6 lg:p-8 rounded-lg">
                {/* ToastContainer component to show the toasts */}
                <ToastContainer />
                {/* Desktop Form */}
                <div
                    className="hidden lg:block w-96 bg-gradient-to-b from-gray-900 via-[#300171] 
                        to-slate-900 p-4 rounded-xl border border-purple-500/20 mt-10 mb-40"
                >
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
                        <input
                            type="text"
                            name="genre"
                            placeholder="Genre"
                            value={newRecommendation.genre}
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
                            disabled={addBook.isPending}
                        >
                            {addBook.isPending ? "wait..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddNewBookForm;

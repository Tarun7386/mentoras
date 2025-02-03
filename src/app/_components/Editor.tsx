'use client'

import { useEffect, useRef } from "react";
import type EditorJS from "@editorjs/editorjs";
import { api } from "~/trpc/react";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the required styles for toast notifications

function Editor() {
    const editorRef = useRef<EditorJS | null>(null);

    const createPost = api.post.createPost.useMutation({
        onSuccess: async () => {
            // Clear the editor content after success
            if (editorRef.current) {
                editorRef.current.clear();  // This will clear the content in the editor
            }

            // Show a success toast
            toast.success("Post published successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },
        onError: () => {
            toast.error("Failed to publish post. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },
    });

    const initializeEditor = async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Table = (await import("@editorjs/table")).default;
        const List = (await import('@editorjs/list')).default;
        const Delimter = (await import('@editorjs/delimiter')).default;
        const SimpleImage = (await import('@editorjs/simple-image')).default ;
        const Quote = (await import('@editorjs/quote')).default;
        const Embed = (await import('@editorjs/embed')).default;

        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: "editorjs", // Identifies the div for EditorJS
                tools: {
                    header: Header,
                    table: Table,
                    list: List,
                    delimiter: Delimter,
                    image: SimpleImage,
                    quote: Quote,
                    embed: Embed,
                    
                },
                placeholder: "Paste an image, video, or link here, or press / for more commands.",
            });

            editorRef.current = editor;
        }
    };

    useEffect(() => {
        const init = async () => {
            await initializeEditor();
        };

        void init();

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null; // Reset the reference
            }
        };
    }, []); // Run only once on mount

    const save = async () => {
        if (editorRef.current) {
            const outputData = await editorRef.current.save();
            const data = JSON.stringify(outputData);
            // console.log(data);
            createPost.mutate({
                content: data,
            });
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 
            rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl 
            transform hover:-translate-y-1 transition-all duration-300 
            border border-purple-500/20 hover:border-purple-500/30 
            max-w-6xl"
        >
            {/* EditorJS Container */}
            <div className="flex w-full gap-6 mb-4 min-h-1">
                <div
                    id="editorjs"
                    className="w-full bg-white text-black rounded-lg p-6 border border-purple-500/30 placeholder-gray-400 
                    focus:outline-none focus:border-purple-500 transition-colors duration-300 "
                ></div>
            </div>

            {/* Save Insight Button */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={save}
                    disabled={createPost.isPending}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-6 rounded-lg 
                    transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 
                    text-sm sm:text-base"
                >
                    {createPost.isPending ? "Saving..." : "Post"}
                </button>
            </div>

            {/* ToastContainer component to show the toasts */}
            <ToastContainer />
        </div>
    );
}

export default Editor;

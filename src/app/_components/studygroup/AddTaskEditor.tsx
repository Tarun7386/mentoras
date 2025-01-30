'use client'

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { api } from "~/trpc/react";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the required styles for toast notifications

function AddTaskEditor({ onClose, groupId }: { onClose: () => void , groupId: string}) {
    const editorRef = useRef<EditorJS | null>(null);

    const createTask = api.dailyTaskRouter.createTask.useMutation({
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

            setTimeout(() => {
                onClose();
            }, 3000);

        },
        onError: (error) => {
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
        //@ts-ignore
        const SimpleImage = (await import('@editorjs/simple-image')).default;
        const Quote = (await import('@editorjs/quote')).default;
        //@ts-ignore
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
                placeholder: "Write Something or press '/' for commands",
            });

            editorRef.current = editor;
        }
    };

    useEffect(() => {
        initializeEditor();

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
            createTask.mutate({
                groupId: groupId,
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
                    className="w-full bg-black/50 text-white rounded-lg p-6 border border-purple-500/30 placeholder-gray-400 
                    focus:outline-none focus:border-purple-500 transition-colors duration-300 "
                ></div>
            </div>

            {/* Save Insight Button */}
            <div className="flex gap-3">
                <button
                    onClick={save}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20"
                    disabled={createTask.isPending}
                >
                    {createTask.isPending ? "Adding..." : "Add Task"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-800/50 text-gray-300 font-medium py-3 px-6 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-purple-500/10 hover:text-purple-300"
                >
                    Cancel
                </button>
            </div>

            {/* ToastContainer component to show the toasts */}
            <ToastContainer />
        </div>
    );
}

export default AddTaskEditor;

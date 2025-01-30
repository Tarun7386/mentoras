import { useState } from "react";
import { api } from "~/trpc/react";

function PostTodayInsight() {

    const [inputValue, setInputValue] = useState("");

    const createPost = api.post.createPost.useMutation({
        onSuccess: async () => {
            setInputValue("");
        },
      });


    // Adjust textarea height based on input
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);

        // Adjust the height of the textarea
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    function handlePost(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        if (!inputValue) {
            return;
        }

        createPost.mutate({
            content: inputValue,
        });
    }

    return (
        <div className="bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900
        rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl 
        transform hover:-translate-y-1 transition-all duration-300 
        border border-purple-500/20 hover:border-purple-500/30
        max-w-6xl ">
        
        <div className="flex w-full gap-6">
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Want to share something?"
                className="w-full text-sm sm:text-base resize-none 
                    bg-black/50 text-white border border-purple-500/30 
                    rounded-lg p-6 placeholder-gray-400
                    focus:outline-none focus:border-purple-500 
                    transition-colors duration-300"
                style={{ maxHeight: '1000px', overflowY: 'hidden' }}
            />
        </div>

        <div className="flex justify-end mt-4">
            <button 
                onClick={handlePost} 
                className="bg-gradient-to-r from-purple-600 to-pink-600
                    text-white font-medium py-2 px-6 rounded-lg
                    transition-all duration-300 hover:scale-[1.02]
                    hover:shadow-lg hover:shadow-purple-500/20
                    active:scale-95 text-sm sm:text-base"
            >
                Share Insight
            </button>
        </div>
    </div>
    );
}

export default PostTodayInsight;

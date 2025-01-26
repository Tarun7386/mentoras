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
        <div className="border-2 border-purple-300 rounded-lg p-4 bg-gray-100">
            <div className="flex w-full gap-4 text-black">
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Want to share something?"
                    className="w-full text-xl resize-none border-0 bg-transparent focus:outline-none"
                    style={{ maxHeight: '500px', overflowY: 'hidden' }}
                />
            </div>
            <button onClick={handlePost} className="mt-4 bg-purple-500 text-white p-2 rounded " disabled={createPost.isPending}>
                {createPost.isPending ? "Submitting..." : "Post"}
            </button>
        </div>
    );
}

export default PostTodayInsight;

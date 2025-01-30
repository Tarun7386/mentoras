import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { api } from "~/trpc/react";

interface StudyGroupCardProps {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    createdAt: string;
    ownerId: string;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ id, title, description, createdBy, createdAt, ownerId }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const loginId = session?.user.id;
    const [isLoading, setIsLoading] = useState(false);

    const joinGroup = api.studyGroupRouter.joinStudyGroup.useMutation({
        onSuccess:()=>{
            toast.success("Joined study group")
        }
        
    })


    function handleGroup(): void {
        if (isLoading) return; // Prevent multiple clicks
        setIsLoading(true);

        const query = new URLSearchParams({ title, description }).toString();
        router.push(`/studygroup/${id}?${query}`);
    }

    function handleOwnerClick(e: React.MouseEvent) {
        if (isLoading) return; // Prevent multiple clicks
        setIsLoading(true);
        router.push(`/studygrpOwner/${ownerId}`);
    }

    return (
        <div
            className={`group bg-gradient-to-b from-gray-900 via-[#300171]/30 to-slate-900 
            backdrop-blur-sm border border-purple-500/20 rounded-xl p-6
            hover:border-purple-500/40 transition-all duration-300 cursor-pointer
            hover:shadow-xl hover:shadow-purple-500/10 hover:scale-[1.02]
            ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
        >
            {/* Title */}
            <h3
                className="text-xl font-semibold mb-3 text-transparent bg-clip-text 
                bg-gradient-to-r from-purple-400 to-pink-400"
                onClick={handleGroup}
            >
                {isLoading ? "Loading..." : title}
            </h3>

            {/* Description */}
            <p
                className="text-gray-300 mb-4 line-clamp-2"
                onClick={handleGroup}
            >
                {isLoading ? "Redirecting..." : description}
            </p>

            {/* Footer */}
            <div
                className="flex items-center justify-between pt-3 border-t border-purple-500/20"
                onClick={handleOwnerClick}
            >
                <div className="flex items-center gap-2">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r 
                    from-purple-600 to-pink-600 flex items-center justify-center 
                    text-white font-semibold text-sm">
                        {createdBy.charAt(0).toUpperCase()}
                    </div>

                    {/* Creator Name */}
                    <span className="text-sm text-gray-400">{createdBy}</span>
                </div>

                {/* Created Date */}
                <span className="text-xs text-gray-500">{createdAt}</span>
            </div>

            {/* 🔹 Join Group Button */}
            {!(loginId === ownerId) && (
                <button
                    onClick={(e) => {
                       joinGroup.mutate({studyGroupId:id})
                    }}
                    className="mt-4 w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500
                    text-white py-2 text-sm font-semibold shadow-md transition-all hover:scale-105"
                    disabled={joinGroup.isPending}
                >
                    {joinGroup.isPending ? "wait..." :" Join Group"}
                </button>
            )}
            <ToastContainer/>
        </div>
    );
};

export default StudyGroupCard;

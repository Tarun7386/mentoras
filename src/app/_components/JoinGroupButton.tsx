import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "~/trpc/react";

function JoinGroupButton({id }:{id:string}) {
    const { data: session } = useSession()
          

    const joinGroup = api.studyGroupRouter.joinStudyGroup.useMutation({
        onSuccess: () => {
            toast.success("Joined study group")
        }

    })

    return ( 
        <button
            onClick={() => {
                if (!session) {
                    redirect("/api/auth/signin");
                }
                joinGroup.mutate({ studyGroupId: id })
            }}
            className="mt-4 w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500
                    text-white py-2 text-sm font-semibold shadow-md transition-all hover:scale-105"
            disabled={joinGroup.isPending}
        >
            {joinGroup.isPending ? <Loader/> : " Join Group"}
        </button>
     );
}

export default JoinGroupButton;
import { Loader } from "lucide-react";
import { api } from "~/trpc/react";

function StreakDisplay() {

    const {data,isLoading} = api.streakRouter.getStreak.useQuery();
    return ( 
        <span className="text-sm font-medium sm:text-base">
            {isLoading ? <Loader/> : `Streak: ${data?.streak}`}
        </span>
     );
}

export default StreakDisplay;
import { api } from "~/trpc/react";

function StreakDisplay() {

    const {data} = api.streakRouter.getStreak.useQuery();
    return ( 
        <>
            <h2>Current Streak: {data?.streak ?? 0}</h2>
        </>
     );
}

export default StreakDisplay;
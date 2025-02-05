'use client'
import { useParams, useSearchParams } from "next/navigation";
import DailyTask from "~/app/_components/studygroup/DailyTask";

 function StudyGroupById() {

    const {id} = useParams<{id : string}>()
    const searchParams = useSearchParams()
     const title = searchParams.get('groupName')
    const description = searchParams.get('description')
    
    return ( 
        <DailyTask groupId={id} groupName={title ?? "not found name"} description={description ?? "description not found"} /> 
);
}

export default StudyGroupById;
"use client";

import { api } from "~/trpc/react";
import { useEffect } from "react";
import AlumniProfile from "./AlumniProfile";
import LoaderComponent from "../LoaderComponent";

interface AlumniProfileContainerProps {
    userId: string;
}

const AlumniProfileContainer = ({ userId }: AlumniProfileContainerProps)=> {
    const { data, isLoading, error } = api.alumniData.getAlumniById.useQuery(
        { id: userId },
        {
            retry: false,
            enabled: !!userId,
            
        }
    );
    const alumniData = data?.data;
    useEffect(() => {
        if (alumniData) {
            console.log("Alumni data:", alumniData);
        }
    }, [alumniData]);
    
  

    if (isLoading) {
        return <LoaderComponent />;
    }
   
    
    if (!alumniData) {
        return <div>No alumni data found</div>;
    }

    return (
        <AlumniProfile alumni={alumniData} />
        
    );
};

export default AlumniProfileContainer;
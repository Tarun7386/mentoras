
import { notFound } from 'next/navigation';
import React from 'react';
import StudyGroupPage from '~/app/_components/aspirant/NavStudyGroup';

async function StudyGroups({
    params,
}: {
    params: Promise<{ button: string }>;
}): Promise<JSX.Element> {

    const { button } = await params;
    const slug = button?.[0] ? (button[0] as "Joined Groups" | "Created Groups") : "Joined Groups";
    // Valid slugs array
    const validSlugs: ("Joined Groups" | "Created Groups")[] = [
        "Joined Groups", "Created Groups"
    ];

    // If slug is not in validSlugs, trigger 404
    if (!validSlugs.includes(slug)) {
        notFound(); // This will render the default 404 page in Next.js
    }
     return (
            <div>
             <StudyGroupPage tabSelected={slug} />
            </div>
    
    );
}


export default StudyGroups;

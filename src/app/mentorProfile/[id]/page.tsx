import MentorProfileClient from "~/app/_components/aspirant/MentorProfileClient";

export default async function MentorById({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <MentorProfileClient id={id} />;
}
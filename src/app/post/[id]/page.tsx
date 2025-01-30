import PostByIdClient from "~/app/_components/aspirant/PostByIdClient";

async function PostById({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
   


    return (
        <PostByIdClient id={id}/>
    );
}

export default PostById;

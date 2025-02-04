// import PostCard from "~/app/_components/aspirant/PostCard";
// import { api } from "~/trpc/react";

function MyBookmarks() {
    // const { data: bookmarks, isLoading, error } = api.engagementsRouter.getBookmarks.useQuery();

    // if (error) {
    //     return <p className="text-red-500 text-center mt-4">Error fetching bookmarks.</p>;
    // }

    // if (isLoading) {
    //     return <Loader/>
    // }

    // // Add a fallback if bookmarks is undefined or empty
    // if (!bookmarks || bookmarks.length === 0) {
    //     return <p className="text-gray-500 text-center mt-4">{"You haven't bookmarked any posts yet."}</p>;
    // }
    // console.log(bookmarks)
    // return (
    //     <div className="max-w-2xl w-full mx-auto space-y-4 sm:space-y-6 pb-20">
    //         {bookmarks.map((bookmark) => (
    //             <PostCard
    //                 key={bookmark.id}
    //                 id={bookmark.id}
    //                 profilePic={bookmark.user.image ?? ""}
    //                 authorName={bookmark.user.name}
    //                 createdAt={bookmark.createdAt.toLocaleDateString()}
    //                 content={bookmark.insight.content}
    //                 hashtags={["hashtags"]}
    //                 authorId={bookmark.insight.mentorId}
    //                 likedByme={true}
    //                 bookMarkedByme={true}
    //                 likeCount={1000}
    //             />
    //         ))}
//     //     </div>
//     );


        return <p className="text-red-500 text-center mt-4">Error fetching bookmarks.</p>;


}



export default MyBookmarks;

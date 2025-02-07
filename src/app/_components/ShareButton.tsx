import { RWebShare } from "react-web-share";

function ShareButton({ url }: { url: string }) {
    return (
        <RWebShare
            data={{
                text: "Mentoras - The perfect place to learn",
                url: url,
                title: "Mentoras",
            }}
            onClick={() => console.log("Shared successfully!")}
        >
            <button
                className="flex justify-center items-center text-blue-400 bg-blue-900/20 
                rounded-md py-2 px-3 text-xs hover:bg-blue-900/30 transition"
            >
                <svg
                    className="h-5 w-5 text-blue-500 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share
            </button>
        </RWebShare>
    );
}

export default ShareButton;

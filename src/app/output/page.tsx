import Blocks from "editorjs-blocks-react-renderer";

const exampleData = {
    "time": 1737993533260,
    "blocks": [
        {
            "id": "header-1",
            "type": "header",
            "data": {
                "text": "Complete React.js Learning Path 2024",
                "level": 1
            }
        },
        {
            "id": "paragraph-1",
            "type": "paragraph",
            "data": {
                "text": "Master React.js from basics to advanced concepts. This comprehensive learning path will guide you through everything you need to know to become a professional React developer."
            }
        },
        {
            "id": "hTXu8nVsuI",
            "type": "link",
            "data": {
                "link": "https://github.com/codewithmentoras",
                "meta": {}
            }
        },
        {
            "id": "table-1",
            "type": "table",
            "data": {
                "withHeadings": true,
                "content": [
                    ["Module", "Topics", "Duration"],
                    ["Fundamentals", "JSX, Components, Props, State", "2 weeks"],
                    ["Advanced Concepts", "Hooks, Context, Performance", "3 weeks"],
                    ["Real-world Projects", "E-commerce, Social Media App", "4 weeks"]
                ]
            }
        },
        {
            "id": "image-1",
            "type": "image",
            "data": {
                "url": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80",
                "caption": "React Development Environment ",
                "withBorder": true,
                "withBackground": true,
                "stretched": false
            }
        },
        {
            "id": "list-1",
            "type": "list",
            "data": {
                "style": "checklist",
                "items": [
                    { "content": "Set up development environment with Node.js and VS Code", "meta": { "checked": true } },
                    { "content": "Complete React Fundamentals course", "meta": { "checked": true } },
                    { "content": "Build 5 mini-projects for portfolio", "meta": { "checked": false } },
                    { "content": "Master state management with Redux", "meta": { "checked": false } }
                ]
            }
        },
        {
            "id": "quote-1",
            "type": "quote",
            "data": {
                "text": "Understanding React's component lifecycle and hooks is crucial for building efficient applications.",
                "caption": "Senior React Developer",
                "alignment": "left"
            }
        },
        {
            "id": "embed-1",
            "type": "embed",
            "data": {
                "service": "youtube",
                "source": "https://youtu.be/w7ejDZ8SWv8",
                "embed": "https://www.youtube.com/embed/w7ejDZ8SWv8",
                "width": 580,
                "height": 320,
                "caption": "React Crash Course 2024"
            }
        }
    ],
    "version": "2.30.7"
};

const config = {
    header: {
        className: "font-bold text-3xl md:text-4xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
    },

    paragraph: {
        className: "text-gray-300 text-lg leading-relaxed mb-8"
    },
    link: {
        className: "block p-3 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-blue-500/10  to-purple-500/10 border-5 border-blue-500/30 rounded-lg text-blue-400  hover:text-blue-300 hover:border-blue-500/50 transition-all duration-300  hover:translate-x-1 flex items-center gap-2 group"

    },
    table: {
        className: "w-full  mb-8 overflow-x-auto block rounded-lg border border-purple-500/20",
        wrapperClassName: "min-w-full whitespace-nowrap",
        cellClassName: "p-5 sm:p-4 bg-black/30 border border-purple-500/20 text-gray-300 text-sm sm:text-base transition-colors hover:bg-purple-500/10 first:font-medium"
    },
    image: {
        className: "rounded-xl overflow-hidden mb-8 shadow-xl max-w-full h-auto border-5 border-white",
        actionsClassNames: {
            stretched: "w-full h-full object-cover",
            withBackground: "p-4 bg-gray-800/50 shadow",
            withBorder: "border-2 border-purple-500/20"
        },
        captionClassNames: {
            "text-align": "center",
        },
    },
    list: {
        className: "space-y-3 mb-8 pl-4",
        styleClassNames: {
            ordered: "list-decimal",
            unordered: "list-disc",
            checklist: "space-y-2 list-none pl-0"
        },
        itemClassName: "pl-2 marker:text-purple-400",
        checklistItemClassName: "flex items-center gap-3 text-gray-300 bg-black/30 p-3 rounded-lg border border-purple-500/20 transition-all hover:border-purple-500/40",
        checkboxClassName: "w-5 h-5 rounded border-2 border-purple-500/30 checked:bg-purple-500 checked:border-transparent transition-all focus:ring-2 focus:ring-purple-500/20"
    }, 
    checkList:{
        className: "space-y-2 list-none pl-0",
        itemClassName: "flex items-center gap-3 text-gray-300 bg-black/30 p-3 rounded-lg border border-purple-500/20 transition-all hover:border-purple-500/40",
        checkboxClassName: "w-5 h-5 rounded border-2 border-purple-500/30 checked:bg-purple-500 checked:border-transparent transition-all focus:ring-2 focus:ring-purple-500/20"
    } ,
    quote: {
        className: "border-l-4 border-purple-500 pl-6 my-8 py-4 bg-black/20 rounded-r-xl relative",
        captionClassName: "mt-4 text-sm text-purple-400/80 italic flex items-center gap-2 before:content-['—'] before:text-purple-500"
    },
    embed: {
        className: "w-full aspect-video rounded-lg sm:rounded-xl  overflow-hidden border border-purple-500/20 mb-4 sm:mb-8 hover:border-purple-500/40 transition-all duration-300  shadow-lg hover:shadow-purple-500/10"
    }
};

const MyComponent = () => {
    return (
        <div className="max-w-4xl mx-auto p-2 space-y-4">
            <div className="bg-gradient-to-b from-gray-900 via-[#300171]/30 to-slate-900 
          backdrop-blur-sm border border-purple-500/20 rounded-xl p-4">
                <Blocks
                    data={exampleData}
                    config={config}
                />
            </div>
        </div>
    );
};
export default MyComponent;
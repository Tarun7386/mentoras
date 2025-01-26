'use client'
import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

function Editor() {
    const editorRef = useRef<EditorJS | null>(null);

    const initializeEditor = async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Table = (await import("@editorjs/table")).default;
        const List = (await import('@editorjs/list')).default;
        const Delimter = (await import('@editorjs/delimiter')).default;
        //@ts-ignore
        const SimpleImage = (await import('@editorjs/simple-image')).default;
        const Quote = (await import('@editorjs/quote')).default;
        //@ts-ignore
        const Embed = (await import('@editorjs/embed')).default;
        //@ts-ignore
        const Link = (await import('@editorjs/link')).default;



        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: "editorjs",
                tools: {
                    header: Header,
                    table: Table,
                    list: List,
                    delimiter: Delimter,
                    image: SimpleImage,
                    quote: Quote,
                    embed: Embed,
                    link: Link,
                },
                placeholder: "Start writing your content here or embed video or drag and drop images...",
            });

            editorRef.current = editor;
        }
    };

    useEffect(() => {
        initializeEditor();

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null; // Reset the reference
            }
        };
    }, []); // Run only once on mount

    const save = async () => {
        if (editorRef.current) {
            const outputData = await editorRef.current.save();
            console.log("Saved Output:", JSON.stringify(outputData));
        }
    };

    return (
        <>
            <div id="editorjs" className="border-purple-300 text-black bg-slate-400 min-h-1" ></div>
            <button onClick={save} style={{ marginTop: "10px", padding: "5px 10px" }}>
                Save
            </button>
        </>
    );
}

export default Editor;

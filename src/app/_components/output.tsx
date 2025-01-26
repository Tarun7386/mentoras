'use client'

import dynamic from "next/dynamic";
import { FC } from "react";

const Output = dynamic(
    async () => (await import("editorjs-react-renderer")).default,
    { ssr: false }
);

interface EditorOutputProps {
    content: any;
}

// Define custom renderers for block types
const customRenderers = {
    paragraph: ({ data }: { data: { text: string } }) => (
        <p style={{ color: "blue", fontSize: "16px" }}>{data.text}</p>
    ),
    table: ({ data }: { data: { content: string[][] } }) => (
        <table style={{ border: "1px solid black", margin: "10px 0" }}>
            <tbody>
                {data.content.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                style={{ border: "1px solid black", padding: "5px" }}
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    ),
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
    return (
        <div>
            <Output data={content} renderers={customRenderers} />
        </div>
    );
};

export default EditorOutput;

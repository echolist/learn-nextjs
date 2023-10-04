"use client"
import { Editor } from "@monaco-editor/react";

export default function Blog() {
    return (
        <div>
            <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />
        </div>
    )
}
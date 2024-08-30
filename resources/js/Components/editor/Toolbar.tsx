import React from "react";
import { type Editor } from "@tiptap/react";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
    Heading3,
} from "lucide-react";

type Props = {
    editor: Editor | null;
    content: string;
};

const Toolbar = ({ editor, content }: Props) => {
    if (!editor) {
        return null;
    }
    return (
        <div
            className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-400"
        >
            <div className="flex justify-start items-center gap-2 w-full lg:w-10/12 flex-wrap ">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBold().run();
                    }}
                    className={
                        editor.isActive("bold")
                            ? "bg-black text-white p-2 rounded-lg"
                            : "bg-white text-black p-2 rounded-lg"
                    }
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    }}
                    className={
                        editor.isActive("italic")
                            ? "bg-black text-white p-2 rounded-lg"
                            : "bg-white text-black p-2 rounded-lg"
                    }
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                    }}
                    className={
                        editor.isActive("strike")
                            ? "bg-black text-white p-2 rounded-lg"
                            : "bg-white text-black p-2 rounded-lg"
                    }
                >
                    <Strikethrough className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? "bg-black text-white p-2 rounded-lg"
                            : "bg-white text-black p-2 rounded-lg"
                    }
                >
                    <Heading3 className="w-4 h-4" />
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBulletList().run();
                    }}
                    className={
                        editor.isActive("bulletList")
                            ? "bg-black text-white p-2 rounded-lg"
                            : "bg-white text-black p-2 rounded-lg"
                    }
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleOrderedList().run();
                    }}
                    className={
                        editor.isActive("orderedList")
                            ? "bg-black text-white p-2 rounded-lg"
                            : "bg-white text-black p-2 rounded-lg"
                    }
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().setCode().run();
                    }}
                    className={
                        editor.isActive("code")
                            ? "bg-black text-white p-2 rounded-lg"
                            : "bg-white text-black p-2 rounded-lg"
                    }
                >
                    <Code className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().undo().run();
                    }}
                    className={
                        editor.isActive("undo")
                            ? "bg-black text-white p-2 rounded-lg"
                            : "bg-white text-black p-2 rounded-lg"
                    }
                >
                    <Undo className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().redo().run();
                    }}
                    className={
                        editor.isActive("redo")
                            ? "bg-black text-white p-2 rounded-lg"
                            : "bg-white text-black p-2 rounded-lg"
                    }
                >
                    <Redo className="w-4 h-4" />
                </button>
            </div>
            {/* {content && (
                <button
                    type="submit"
                    className="px-4 bg-sky-700 text-white py-2 rounded-md"
                >
                    Add
                </button>
            )} */}
        </div>
    );
};

export default Toolbar;
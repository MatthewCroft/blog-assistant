import "../styles/styles.css";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, {useEffect, useState} from "react";
import {Button, MenuItem, Select, IconButton, Tooltip} from "@mui/material";
import {
    FormatBold,
    FormatItalic,
    FormatStrikethrough,
    Code,
    FormatListBulleted,
    FormatListNumbered,
    FormatQuote,
    Undo,
    Redo,
    AddCircleOutline, RemoveCircleOutline, AutoFixHigh
} from "@mui/icons-material";

const AiSuggestionMenu = ({ setMessage, position, editor }) => {
    if (!position || !editor) return null;

    function refineSelection(messageType) {
       const clonedSelection = document.getSelection().getRangeAt(0).cloneContents()
       let div = document.createElement('div');
       div.appendChild(clonedSelection);
       console.log("here");
       setMessage({message: div.innerHTML, messageType: messageType});
    }

    return (
        <div
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                background: "white",
                padding: "5px",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                borderRadius: "4px",
                display: "flex",
                gap: "5px",
                zIndex: 1000,
            }}
            onMouseDown={(e) => e.preventDefault()} // Prevents the editor from losing focus
        >
            <Tooltip title="Rewrite this section using AI">
                <IconButton onMouseDown={() => refineSelection("rewrite")}>
                    <AutoFixHigh />
                </IconButton>
            </Tooltip>
            <Tooltip title="Shorten this section using AI">
                <IconButton onMouseDown={() => refineSelection("shorten")}>
                    <RemoveCircleOutline />
                </IconButton>
            </Tooltip>
            <Tooltip title="Expand this section using AI">
                <IconButton onMouseDown={() => refineSelection("expand")}>
                    <AddCircleOutline />
                </IconButton>
            </Tooltip>
        </div>
    );
};

const MenuBar = ({setMessage}) => {
    const { editor } = useCurrentEditor();
    const [menuPosition, setMenuPosition] = useState();

    useEffect(() => {
        if (!editor) return;

        const updateSelection = () => {
            const { from, to } = editor.state.selection;
            if (from === to) {
                setMenuPosition(null);
                return;
            }

            const selectionCoords = editor.view.coordsAtPos(from);
            setMenuPosition({ top: selectionCoords.top - 50, left: selectionCoords.left });
        };

        editor.on("selectionUpdate", updateSelection);
        return () => editor.off("selectionUpdate", updateSelection);
    }, [editor]);

    if (!editor) {
        return null;
    }

    if (!editor) {
        return null;
    }

    return (
    <>
    <AiSuggestionMenu setMessage={setMessage} position={menuPosition} editor={editor} />
    <div className="control-group" style={{ display: "flex", alignItems: "center", gap: "10px", flexDirection: "row", borderBottom: "2px solid #ccc", paddingBottom: "5px", marginBottom: "10px"}}>
            <Select
                value={editor.isActive("heading", { level: 1 }) ? "h1" :
                    editor.isActive("heading", { level: 2 }) ? "h2" :
                        editor.isActive("heading", { level: 3 }) ? "h3" :
                            editor.isActive("heading", { level: 4 }) ? "h4" :
                                editor.isActive("heading", { level: 5 }) ? "h5" :
                                    editor.isActive("heading", { level: 6 }) ? "h6" : "paragraph"}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === "paragraph") editor.chain().focus().setParagraph().run();
                    else editor.chain().focus().toggleHeading({ level: parseInt(value.replace("h", "")) }).run();
                }}
            >
                <MenuItem value="paragraph">Paragraph</MenuItem>
                {[1, 2, 3, 4, 5, 6].map(level => (
                    <MenuItem key={level} value={`h${level}`}>{`Heading ${level}`}</MenuItem>
                ))}
            </Select>

            <div style={{ display: "flex", gap: "5px" }}>
                <IconButton onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()}>
                    <FormatBold />
                </IconButton>
                <IconButton onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()}>
                    <FormatItalic />
                </IconButton>
                <IconButton onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()}>
                    <FormatStrikethrough />
                </IconButton>
                <IconButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} disabled={!editor.can().chain().focus().toggleCodeBlock().run()}>
                    <Code />
                </IconButton>
                <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <FormatListBulleted />
                </IconButton>
                <IconButton onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <FormatListNumbered />
                </IconButton>
                <IconButton onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                    <FormatQuote />
                </IconButton>
                <IconButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
                    <Undo />
                </IconButton>
                <IconButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
                    <Redo />
                </IconButton>
            </div>
        </div>
        </>
    );
};

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
];

const content = `<h2>
  Hi there,
</h2>
<p>
  this is where you can start creating your blog
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

export const Tiptap = ({setMessage}) => {
    return (
        <EditorProvider slotBefore={<MenuBar setMessage={setMessage}/>} extensions={extensions} content={content} />
    );
};

export default Tiptap;

import React from "react";
import MDEditor from "@uiw/react-md-editor";
// import "./styles.css";
import "@uiw/react-md-editor/dist/mdeditor.min.css";

export default function Editor() {
    const [value, setValue] = React.useState("**Hello world!!!**");
    return (
        <div className="container">
            <MDEditor value={value} onChange={setValue} />
            <MDEditor.Markdown source={value} />
        </div>
    );
}

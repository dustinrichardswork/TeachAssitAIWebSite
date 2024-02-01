import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App({ setContent, empty }) {

    const editorRef = useRef(null);

    const log = (e) => {

        if (editorRef.current) {
            let content = editorRef.current.getContent()
            setContent(content);
            console.log('Content: ', content);
        }
    };

    // useEffect(() => {
    //     if (editorRef.current) {
    //         editorRef.current.setContent()
    //     }
    // }, [empty]);

    return (
        <>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | image |' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onChange={log}
            />
            {/* <button onClick={log}>Log editor content</button> */}
        </>
    );
}
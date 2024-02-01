import React, { useRef } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AiOutlineUpload } from 'react-icons/ai'
// import { FiArrowLeft } from 'react-icons/fi'
import './AddStory.css'
import axios from 'axios';
import { addstory_url } from '../../../../util/variables';
import { toast } from 'react-toastify';

const AddStory = () => {

    const [config, setConfig] = useState({
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("teachai_token")}`,
        },
    })

    const imageEl = useRef(null)
    const editorEl = useRef(null)
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')


    const clearInputs = () => {

        setTitle('')
        setContent('')
        setImage('')
        editorEl.current.editor.setData('')
        imageEl.current.value = ""

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("title", title)
        formdata.append("image", image)
        formdata.append("content", content)

        try {

            for (var pair of formdata.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            const { data } = await axios.post(`${addstory_url}/story/addstory`, formdata, config)

            console.log('Data: ', data);

            // setSuccess('Add story successfully ')
            toast("Add Post Successful")

            clearInputs()
            // setTimeout(() => {
            //     setSuccess('')
            // }, 7000)

        }
        catch (error) {
            // setTimeout(() => {
            //     setError('')
            // }, 7000)
            console.log('Here is error!: ', error); 
            setError(error?.response?.data?.error)

        }

    }
    return (

        <div className="Inclusive-addStory-page">
            {/* <Link to={'/'} >
                <FiArrowLeft />
            </Link> */}
            <form onSubmit={handleSubmit} className="addStory-form">

                {error && <div className="error_msg">{error}</div>}
                {success && <div className="success_msg">
                    <span>
                        {success}
                    </span>
                    <Link to="/">Go home</Link>
                </div>}

                <input
                    type="text"
                    required
                    id="title"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className='mb-3'
                />

                {/* <div className="w-full mt-5">

                    <TinyMCE setContent={setContent} />

                </div> */}
                <div className="prose" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            toolbar: [
                                'heading',
                                '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList']
                        }}
                        onChange={(e, editor) => {
                            const data = editor.getData();
                            setContent(data)
                        }}
                        ref={editorEl}
                    />
                </div>
                {/* <TempEditor /> */}
                {/* <MyComponent /> */}
                {/* <Editor setContent={setContent} /> */}

                {/* <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                /> */}
                <div class="StoryImageField">
                    <AiOutlineUpload />
                    <div class="txt">
                        {image ? image.name :
                            " Include a high-quality image in your story to make it more inviting to readers."
                        }
                    </div>
                    <input
                        name="image"
                        type="file"
                        ref={imageEl}
                        onChange={(e) => {
                            setImage(e.target.files[0])
                        }}
                    />
                </div>
                <button type='submit' disabled={image ? false : true} className={image ? 'addStory-btn' : 'dis-btn'}
                >Publish </button>
            </form>

        </div>

    )
}

export default AddStory



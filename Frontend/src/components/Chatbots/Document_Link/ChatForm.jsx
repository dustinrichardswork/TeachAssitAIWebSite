import React, { useState } from 'react'
import api from '../../../util/api';
import { useContext } from 'react';
import { UsageContext } from '../../../context/UsageContext';
import { toast } from 'react-toastify';
import { ChatbotContext } from '../../../context/ChatbotContext';
// import { backend_resourse } from '../../../util/variables';
import { backend_url } from '../../../util/variables';

const pdfjsLib = require('pdfjs-dist/webpack');
const Tesseract = require('tesseract.js');
// const backend_url = backend_resourse


function convertPdfToImagesAndReadText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
            const typedArray = new Uint8Array(this.result);

            pdfjsLib.getDocument(typedArray).promise.then(function (pdf) {
                const totalPages = pdf.numPages;
                const imagePromises = [];

                for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                    imagePromises.push(
                        pdf.getPage(pageNumber).then(function (page) {
                            const viewport = page.getViewport({ scale: 1.5 });
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;

                            const renderContext = {
                                canvasContext: context,
                                viewport: viewport,
                            };

                            return page.render(renderContext).promise.then(function () {
                                return new Promise((resolve) => {
                                    canvas.toBlob(function (blob) {
                                        const reader = new FileReader();
                                        reader.onloadend = function () {
                                            resolve(this.result);
                                        };
                                        reader.readAsDataURL(blob);
                                    }, 'image/jpeg', 0.75);
                                });
                            });
                        })
                    );
                }

                Promise.all(imagePromises).then(function (imageDataArray) {
                    const textPromises = [];

                    imageDataArray.forEach(function (imageData) {
                        textPromises.push(
                            Tesseract.recognize(imageData, 'eng').then(function (result) {
                                return result.data.text;
                            })
                        );
                    });

                    Promise.all(textPromises).then(function (textArray) {
                        resolve(textArray);
                    }).catch(reject);
                }).catch(reject);
            }).catch(reject);
        };
        reader.readAsArrayBuffer(file);
    });
}

const ChatForm = ({ setAnswer, setLoading, setChatID, setOriginal }) => {

    const [data, setData] = useState({ lang: "English", quiz_type: 'multi-choice' })
    const [docType, setDocType] = useState('file');
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState('')

    const { fetchUsage } = useContext(UsageContext);
    const { setLanguage } = useContext(ChatbotContext);
    const { setOriginalAnswer } = useContext(ChatbotContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        setLoading(true)

        if(docType === 'file'){
            const file_size = file.size;
            const fileMB = file_size / 1024 / 1024;
            if(fileMB > 5){
                toast('File should not be larger than 5MB.')
                setLoading(false)
                return;
            }
            if (isFileTypeAllowed(file.type) === false) {
                toast('Select a file such as pdf, docx, pptx.', 5);
                setLoading(false)
                return
            }
            let extractedText = '';
            let read = false
            if (file.type.includes("pdf")) {
                console.log("extract from pdf...")
                // Step 1: Read the uploaded PDF file
                const reader = new FileReader();
                reader.readAsArrayBuffer(file);

                // Step 2: Wait for the file to be loaded
                await new Promise((resolve) => {
                    reader.onload = resolve;
                });

                const pdfBytes = reader.result;

                // Step 3: Load the PDF using pdfjs-dist
                const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
                const pdf = await loadingTask.promise;

                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const content = await page.getTextContent();
                    const pageText = content.items.map(item => item.str).join(' ');
                    extractedText += pageText;
                }
                if (extractedText != '')
                    read = true
                if (read == false) {
                    console.log("123", file)
                
                    await convertPdfToImagesAndReadText(file).then(function (textArray) {
                        console.log(textArray);
                        extractedText = textArray[0]
                    }).catch(function (error) {
                        console.error(error);
                    });
                }
                console.log('extracted text:     ', extractedText)
                console.log(extractedText.length)
                if(extractedText.length > 10000){
                    toast('File cannot be uploaded.\nyou have exceeded 10000 characters')
                    // Handle any errors from the request
                    setLoading(false)
                    return
                }
                try {
                    const formData = {
                        payload: {
                            question_len: data.ques_len,
                            question_type: data.quiz_type,
                            lang: data.lang,
                            text: extractedText
                        }
                    }
                    const response = await fetch(`${backend_url}/chatbot/docurl/quiz`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("teachai_token")}`
                        },
                        body: JSON.stringify({ body: formData })
                    });
        
                    // Check if the response is successful (status code 200)
                    if (response.status === 200) {
                        const reader = response.body.getReader();
                        let receivedChunks = [];
        
                        let answer = '';
        
                        const read = async () => {
                            const { done, value } = await reader.read();
        
                            if (done) {
                                // All data has been received
                                console.log('Stream finished');
                                answer = answer.replace(/Wait a moment...<br \/>/g, '');
                                setAnswer([{ answer }])
                                setOriginal([{answer}])
                                setLanguage(data.lang)
                                fetchUsage();
                            } else {
                                // Process the received chunk
                                setLoading(false);
                                // receivedChunks.push(value);
                                let text = new TextDecoder().decode(value)
                                // text = text.replace(/\n/g, '<br />');
        
                                if (text.includes('chat_id')) {
                                    try {
                                        // Attempt to parse the string as JSON
                                        let jsonResult = JSON.parse(text);
                                        setChatID(jsonResult['chat_id'])
        
                                        console.log("Parsed JSON:", jsonResult);
                                    } catch (error) {
                                        // If parsing fails, handle the error
                                        console.error("Error parsing JSON:", error);
                                    }
                                } else {
                                    answer += text;
                                }
        
                                setAnswer([{ answer }])
                                // console.log('Received chunk:', text);
        
                                // Call read() again to receive the next chunk
                                read();
                            }
                        };
        
                        read();
                    } else {
                        console.log('pdf error!')
                        if (response.status === 429){
                            toast('You have exceed uploaded limit!')
                        }else toast('File cannot be uploaded.\nyou have exceeded 10000 characters')
                        // Handle any errors from the request
                        setLoading(false)
                    }
                }catch(error){
                    if (error?.response?.status === 429) {
                        toast(error?.response?.data?.error)
                    }
                    console.log('Error: ', error);
                    setLoading(false)
                }
            }else{
                try {
                    let mainData = {
                        file: {
                            filename: file.name,
                            data: ''
                        },
                        payload: {
                            question_len: data.ques_len,
                            question_type: data.quiz_type,
                            lang: data.lang
                        }
                    }
                    const reader = new FileReader();
                    reader.onload = async function (event) {
                        mainData.file.data = event.target.result.split(',')[1];
                        try{
                            const response = await fetch(`${backend_url}/chatbot/docurl/quiz`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem("teachai_token")}`
                                },
                                body: JSON.stringify({ body: mainData })
                            })
                            if (response.status=== 200) {
                                const reader = response.body.getReader();
                                let answer = '';

                                const read = async () => {
                                    const { done, value } = await reader.read();

                                    if (done) {
                                        // All data has been received
                                        console.log('Stream finished');
                                        answer = answer.replace(/Wait a moment...<br \/>/g, '');
                                        setAnswer([{ answer }])
                                        fetchUsage();
                                        setOriginal([{answer}])
                                        setLanguage(data.lang)
                                    } else {
                                        // Process the received chunk
                                        setLoading(false);
                                        // receivedChunks.push(value);
                                        let text = new TextDecoder().decode(value)
                                        // text = text.replace(/\n/g, '<br />');

                                        if (text.includes('chat_id')) {
                                            try {
                                                // Attempt to parse the string as JSON
                                                let jsonResult = JSON.parse(text);
                                                setChatID(jsonResult['chat_id'])

                                                console.log("Parsed JSON:", jsonResult);
                                            } catch (error) {
                                                // If parsing fails, handle the error
                                                console.error("Error parsing JSON:", error);
                                            }
                                        } else {
                                            answer += text;
                                        }

                                        setAnswer([{ answer }])
                                        // console.log('Received chunk:', text);

                                        // Call read() again to receive the next chunk
                                        read();
                                    }
                                };

                                read();
                            } else {
                                console.error('Error:', response.status, response.statusText);
                                if (response.status === 429){
                                    toast('You have exceed uploaded limit!')
                                }else toast('File cannot be uploaded.\nyou have exceeded 10000 characters')
                                // Handle any errors from the request
                                setLoading(false)
                            }
                        }catch(error){
                            console.log('file error!')
                            if (error?.response?.status === 429) {
                                toast(error?.response?.data?.error)
                            }
                            setLoading(false)
                        }
                    };

                    reader.readAsDataURL(file);
                    
                }catch(error){
                    if (error?.response?.status === 429) {
                        toast(error?.response?.data?.error)
                    }
                    console.log('Error: ', error);
                    setLoading(false)
                }
            }
        }else if(docType === 'url'){
            try{
                const formData = {
                    payload: {
                        question_len: data.ques_len,
                        question_type: data.quiz_type,
                        lang: data.lang,
                        url: url
                    }
                }
                const response = await fetch(`${backend_url}/chatbot/docurl/quiz`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("teachai_token")}`
                    },
                    body: JSON.stringify({ body: formData })
                });
    
                // Check if the response is successful (status code 200)
                if (response.status === 200) {
                    const reader = response.body.getReader();
                    let receivedChunks = [];
    
                    let answer = '';
    
                    const read = async () => {
                        const { done, value } = await reader.read();
    
                        if (done) {
                            // All data has been received
                            console.log('Stream finished');
                            answer = answer.replace(/Wait a moment...<br \/>/g, '');
                            setAnswer([{ answer }])
                            setOriginal([{answer}])
                            fetchUsage();
                            setLanguage(data.lang)
                        } else {
                            // Process the received chunk
                            setLoading(false);
                            // receivedChunks.push(value);
                            let text = new TextDecoder().decode(value)
                            // text = text.replace(/\n/g, '<br />');
    
                            if (text.includes('chat_id')) {
                                try {
                                    // Attempt to parse the string as JSON
                                    let jsonResult = JSON.parse(text);
                                    setChatID(jsonResult['chat_id'])
    
                                    console.log("Parsed JSON:", jsonResult);
                                } catch (error) {
                                    // If parsing fails, handle the error
                                    console.error("Error parsing JSON:", error);
                                }
                            } else {
                                answer += text;
                            }
    
                            setAnswer([{ answer }])
                            // console.log('Received chunk:', text);
    
                            // Call read() again to receive the next chunk
                            read();
                        }
                    };
    
                    read();
                } else {
                    console.log('url error!')
                    console.error('Error:', response.status, response.statusText);
                    setLoading(false);
                    toast('Something Wrong!')
                    // Handle any errors from the request
                }
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
                toast('Something Wrong!')
                // Handle any errors from the request
            }
        }
    }

    const isFileTypeAllowed = (fileType) => {
        // Define allowed file types (PDF and DOCX)
        const allowedFileTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];

        // Check if the selected file type is in the allowed types
        return allowedFileTypes.includes(fileType);
    };


    const handleChange = (e) => {

        const { name, value } = e.target
        console.log(name, '    ', value)
        setData({
            ...data,
            [name]: value
        })
    }

    return (
        <div className='mr-4'>
            <form onSubmit={handleSubmit} className='mt-10'>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="ques_len" className='font-medium'>
                    Number Questions
                    </label>
                    <input
                        type="number"
                        id='ques_len'
                        name='ques_len'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        min={1}
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the number of questions.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="quiz_type" className='font-medium'>
                    Quiz Type
                    </label>
                    <select
                        type="text"
                        id='Quiz Type'
                        name='quiz_type'    
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        defaultValue={`multi-choice`}
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please select the type of question.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    >
                        <option value='multi-choice'>Multiple-choice questions</option>
                        <option value={`true or false`}>True or False</option>
                        <option value={`short answer`}>Short Answer</option>
                    </select>
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="act_type" className='font-medium'>
                    Upload file or website page link
                    </label>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{display: 'flex', width: '50%', alignItems: 'center'}}>
                            <label htmlFor='upload' style={{marginRight: 10}}>Document</label>
                            <input
                                type="radio"
                                name='upload'
                                radioGroup='sourceRadio'
                                onChange={() => setDocType('file')}
                                className='px-2 h-8 rounded border  bg-white outline-none'
                                defaultChecked
                                required
                                aria-required="true"
                                onInvalid={(e) => e.target.setCustomValidity('Please upload the file.')}
                                // Reset custom validity when the user interacts with the field again
                                onFocus={(e) => e.target.setCustomValidity('')}
                            />
                        </div>
                        <div style={{display: 'flex', width: '50%', alignItems: 'center'}}>
                            <label htmlFor='upload' style={{marginRight: 10}}>Web Link</label>
                            <input
                                type="radio"
                                name='upload'
                                radioGroup='sourceRadio'
                                onChange={() => setDocType('url')}
                                className='px-2 h-8 rounded border  bg-white outline-none'
                                required
                                aria-required="true"
                                onInvalid={(e) => e.target.setCustomValidity('Please enter URL.')}
                                // Reset custom validity when the user interacts with the field again
                                onFocus={(e) => e.target.setCustomValidity('')}
                            />
                        </div>
                    </div>
                    <div style={{marginTop: 10}}></div>
                    {
                        docType === 'file' && (<input
                            type="file"
                            id='file'
                            name='file'
                            onChange={(e) => { setFile(e.target.files[0]); console.log(e.target.files[0]) }}
                            className='px-2 h-8 rounded border  bg-white outline-none'
                            required
                            aria-required="true"
                            onInvalid={(e) => e.target.setCustomValidity('Please upload the file.')}
                            // Reset custom validity when the user interacts with the field again
                            onFocus={(e) => e.target.setCustomValidity('')}
                        />)
                    }
                    {
                        docType === 'url' && (<input
                            type="text"
                            id='url'
                            name='url'
                            onChange={(e) => setUrl(e.target.value)}
                            className='px-2 h-8 rounded border  bg-white outline-none'
                            required
                            aria-required="true"
                            onInvalid={(e) => e.target.setCustomValidity('Please enter the url.')}
                            // Reset custom validity when the user interacts with the field again
                            onFocus={(e) => e.target.setCustomValidity('')}
                        />)
                    }
                </div>

                
                {/* <div className='flex flex-col mb-5'>
                    <label htmlFor="rubric" className='font-medium'>
                        Custom Rubric
                    </label>
                    <input
                        type="text"
                        id='rubric'
                        name='rubric'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                    />
                </div> */}


                <div className='flex flex-col mb-5'>
                    <label htmlFor="language" className='font-medium'>
                        Language
                    </label>
                    <select
                        type="text"
                        id='lang'
                        name='lang'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please select language.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                        defaultValue={`English`}
                    >
                        <option value='English'>English</option>
                        <option value={`Chinese`}>Chinese Simplified</option>
                        <option value={`French`}>French</option>
                        <option value={`Italian`}>Italian</option>
                        <option value={`Russian`}>Russian</option>
                        <option value={"Spanish" }>Spanish</option>
                        <option value={"German" }>German</option>
                        <option value={"Dutch" }>Dutch</option>
                        <option value={"Portuguese" }>Portuguese</option>
                        <option value={"Japanese" }>Japanese</option>
                        <option value={"Korean" }>Korean</option>
                        <option value={"Swedish" }>Swedish</option>
                        <option value={"Danish" }>Danish</option>
                        <option value={"Norwegian" }>Norwegian</option>
                        <option value={"Polish"}>Polish</option>
                        <option value={"Turkish"}>Turkish</option>
                        <option value={"Finnish"}>Finnish</option>
                    </select>
                </div>
                <div>
                    <button className='px-5 py-2 rounded-lg bg-secondary text-white'>submit</button>
                </div>
            </form>
            {/* <button className=' bg-blue-300 max-w-max px-2 py-2' onClick={generateRubric}>Generate Rubric</button> */}
        </div>
    )
}

export default ChatForm
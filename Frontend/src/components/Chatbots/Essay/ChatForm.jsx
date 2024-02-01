import React, { useState } from 'react'
import api from '../../../util/api';
import { useContext } from 'react';
import { UsageContext } from '../../../context/UsageContext';
import { toast } from 'react-toastify';
import { ChatbotContext } from '../../../context/ChatbotContext';
import { backend_url } from '../../../util/variables';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip'

const pdfjsLib = require('pdfjs-dist/webpack');
const Tesseract = require('tesseract.js');

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

const ChatForm = ({ setAnswer, setLoading, setChatID }) => {


    const [content, setContent] = useState('');
    const [contentCount, setContentCount] = useState(0)

    const [rubric, setRubric] = useState('');
    const [rubricCount, setRubricCount] = useState(0)

    const maxWords = 1000;

    const [data, setData] = useState({ language: "English", rubric: '' })
    const [selectedFile, setSelectedFile] = useState(null);

    const { fetchUsage, usage } = useContext(UsageContext);
    const { setLanguage } = useContext(ChatbotContext);

    const handleFileChange = async (e) => {
        setSelectedFile(e.target.files[0]);
        const file = e.target.files[0]
        console.log(file)
        let text = ''
        if(file === undefined) return
        if(file.type.includes("pdf")){
            let extractedText = '';
            let read = false
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
            text = extractedText
        }
        else if(file.type === 'text/plain'){
            const reader = new FileReader()
            reader.onload = async function(event){
                const arrayBuffer = event.target.result
                // const byteString = new Uint8Array(arrayBuffer);

                // const textDecoder = new TextDecoder('utf-8');
                // const text = textDecoder.decode(arrayBuffer);
                const subStr = arrayBuffer.substring(arrayBuffer.indexOf('base64,') + 7)
                text = atob(subStr)
                const wordCount = countWords(text);
                const name = 'essayContent'

                if (wordCount <= maxWords) {
                    setContentCount(wordCount)
                    setContent(text)
                    handleChange({ target: { name, value: text } })
                } else {
                    // Trim the excess words
                    setContentCount(1000)
                    let words = text.split(' ')
                    words = words.splice(0, maxWords);
                    let thaosandStr = words.join(' ')
                    setContent(thaosandStr);
                    handleChange({ target: { name, value: thaosandStr } })
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else if(file.name.endsWith('.docx')){
            const reader = new FileReader()
            reader.onload = async function(e) {
                const arrayBuffer = e.target.result;
                const doc = new Docxtemplater().loadZip(new PizZip(arrayBuffer));
                const textContent = doc.getFullText();
                const wordCount = countWords(textContent);
                const name = 'essayContent'

                if (wordCount <= maxWords) {
                    setContentCount(wordCount)
                    setContent(textContent)
                    handleChange({ target: { name, value: textContent } })
                } else {
                    // Trim the excess words
                    setContentCount(1000)
                    let words = textContent.split(' ')
                    words = words.splice(0, maxWords);
                    let thaosandStr = words.join(' ')
                    setContent(thaosandStr);
                    handleChange({ target: { name, value: thaosandStr } })
                }
            }
            reader.readAsArrayBuffer(file);
        }

        const wordCount = countWords(text);
        const name = 'essayContent'

        if (wordCount <= maxWords) {
            setContentCount(wordCount)
            setContent(text)
            handleChange({ target: { name, value: text } })
        } else {
            // Trim the excess words
            setContentCount(1000)
            let words = text.split(' ')
            words = words.splice(0, maxWords);
            let thaosandStr = words.join(' ')
            setContent(thaosandStr);
            handleChange({ target: { name, value: thaosandStr } })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(data);
        let fileMB = 0
        if(selectedFile){
            fileMB = selectedFile.size / 1024 / 1024
        }
        if(fileMB > 5){
            toast('File should not be larger than 5mb')
            return;
        }
        setLoading(true)

        const formData = new FormData();
        console.log('File Selected: ', selectedFile);
        formData.append('file', selectedFile);
        // console.log(data);
        formData.append('body', JSON.stringify(data));
        // console.log(formData.get('body'));

        try {
            for (var pair of formData.entries()) {
                console.log(pair[0]);
                console.log(pair[1]);
            }
            console.log(formData);
            // /chatbot/gradeEssay
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${localStorage.getItem("teachai_token")}`);
            // headers.append('Content-Type', `multipart/form-data; boundary=${formData._boundary}`);
            
            const response = await fetch(`${backend_url}/chatbot/gradeEssay`, {
                method: 'POST',
                headers,
                body: formData,
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
                        setAnswer([{ answer }])
                        setLanguage(data.language)
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
                console.error('Error:', response.status, response.statusText);
                setLoading(false);
                toast('File cannot be uploaded you have exceeded 95000 characters.')
                // Handle any errors from the request
            }
        } catch (error) {
            toast('File cannot be uploaded you have exceeded 95000 characters.')

            if (error?.response?.status === 429) {
                toast(error?.response?.data?.error)
            }
            console.log('Error: ', error);
            setLoading(false)

        }

    }

    const generateRubric = async () => {

        let _body = {
            body: {
                essay_question: data.question,
                grade: data.grade
            }
        }

        try {
            let res = await api.post(`/gradeEssay/rubric`, _body)

            if (res.statusText === 'OK') {

                console.log('Response from ChatFrom/Rubric: ', res);
                console.log('Here is the Rubric: ', res.data.rubric);
                // setChatID(res.data.chat_id)
                // setAnswer([{ answer: res.data.answer }])
            }
        } catch (error) {
            console.log('Erro While Rubric Generation');
        }
    }

    const handleChange = (e) => {

        const { name, value } = e.target

        setData({
            ...data,
            [name]: value
        })
    }

    const handleTextAreaChange = (e, fn, setCount) => {

        const { name } = e.target;
        const inputText = e.target.value;
        const wordCount = countWords(inputText);

        if (wordCount <= maxWords) {
            fn(inputText);
            setCount(wordCount)
            handleChange({ target: { name, value: inputText } })
        } else {
            // Trim the excess words
            setCount(1000)
            const words = inputText.split(' ');
            const newWords = words.splice(0, maxWords);
            let thaosandStr = newWords.join(' ')
            fn(thaosandStr);
            handleChange({ target: { name, value: thaosandStr } })
        }
    };

    const countWords = (text) => {
        let tt = text.split(' ');
        return tt.length;
    };

    return (
        <div className='mr-4'>
            <form onSubmit={handleSubmit} className='mt-10'>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="gradeLevel" className='font-medium'>
                        Grade Level
                    </label>
                    <input
                        type="number"
                        id='grade'
                        name='grade'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        min={1}
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the grade level.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="question" className='font-medium'>
                        Question
                    </label>
                    <input
                        type="text"
                        id='question'
                        placeholder='Type here'
                        name='question'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the question type.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>


                <div className='flex flex-col mb-5'>

                    <label
                        htmlFor="essayContent"
                        className="block mb-2 text-sm font-medium text-gray-900">
                        Essay Content
                    </label>
                    <textarea
                        id="essayContent"
                        rows="4"
                        value={content}
                        name='essayContent'
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add essay content here or attach a file document"
                        onChange={(e) => handleTextAreaChange(e, setContent, setContentCount)}
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the essay content.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    >
                    </textarea>
                    <p className='flex justify-end'>
                        {contentCount} / {maxWords}
                    </p>
                    {
                        // (usage?.noOfFilesUploaded !== usage?.noOfFilesUploadedLimit) ? (
                            <input class="block mt-2 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
                                accept='.pdf, .doc, .docx, .txt'
                                onChange={handleFileChange}
                                aria-required="true"
                                onInvalid={(e) => e.target.setCustomValidity('Please upload the file.')}
                                // Reset custom validity when the user interacts with the field again
                                onFocus={(e) => e.target.setCustomValidity('')}
                            />
                        // ) : (
                        //     <input class="block mt-2 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
                        //         accept='.pdf'
                        //         disabled
                        //     />
                        // )
                    }
                </div>

                <div className='flex flex-col mb-5'>
                    <label
                        htmlFor="rubric"
                        className="block mb-2 text-sm font-medium text-gray-900">
                        Rubric
                    </label>
                    <textarea
                        id="rubric"
                        rows="4"
                        value={rubric}
                        name='rubric'
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add your own rubric for assessment here or check the box to use the default one"
                        onChange={(e) => handleTextAreaChange(e, setRubric, setRubricCount)}
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please select the different level.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    >
                    </textarea>
                    <p className='flex justify-end'>
                        {rubricCount} / {maxWords}
                    </p>

                    <label htmlFor="defaultRubric" className='flex gap-2 cursor-pointer'>
                        <input type="checkbox" id='defaultRubric' onChange={(e) => {
                            if (e.target.checked) {
                                setData({ ...data, 'rubric': 'default' })
                                // generateRubric();
                            }else{
                                console.log('rubric not default')
                                setData({ ...data, 'rubric': '' })
                                setRubric('')
                            }
                        }} />
                        Use default
                    </label>

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
                        id='language'
                        name='language'
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
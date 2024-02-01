import React, { useState } from 'react'
import api from '../../../util/api';
import { useContext } from 'react';
import { UsageContext } from '../../../context/UsageContext'
import { toast } from 'react-toastify';
import { ChatbotContext } from '../../../context/ChatbotContext';
import axios from 'axios';
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

const ChatForm = ({ setDetectAnswer, setPlagAnswer, setLoading, chatID, setChatID, plag, setPlag, detect, setDetect }) => {

    const maxWords = 1000;
    const [content, setContent] = useState('');
    const [contentCount, setContentCount] = useState(0)

    const [data, setData] = useState({ language: "English" })

    const [disableDetect, setDisableDetect] = useState(false);
    const [diablePlag, setDisablePlag] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);


    const { fetchUsage, usage } = useContext(UsageContext)
    const { setLanguage } = useContext(ChatbotContext)

    const handleFileChange = async (e) => {
        console.log('File selected: ', e.target.files[0]);
        // const reader = new FileReader();
        // reader.onload = async function (event) {
        //     mainData.file.data = event.target.result.split(',')[1];
        // }
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
                const name = 'text'

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
                const name = 'text'

                if (wordCount <= maxWords) {
                    setContentCount(wordCount)
                    setContent(textContent)
                    handleChange({ target: { name, value: textContent } })
                } else {
                    // Trim the excess words
                    console.log('doc: ', wordCount)
                    setContentCount(1000)
                    let words = textContent.split(' ')
                    const newWords = words.splice(0, maxWords)
                    let thaosandStr = newWords.join(' ')
                    setContent(thaosandStr);
                    handleChange({ target: { name, value: thaosandStr } })
                }
            }
            reader.readAsArrayBuffer(file);
            return;
        }

        const wordCount = countWords(text);
        const name = 'text'

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

        if (!detect && !plag) {
            toast("Select the options SetectAI/Plagirism")
            return;
        }
        console.log(data);

        try {
            if (detect) {
                setLoading(true)
                setDisableDetect(true)
                const res = await api.post('/chatbot/detectai', {
                    body: data,
                    chat_id: chatID || null
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("teachai_token")}`
                    }
                })
                const rlt = res.data.answer.originalityai
                setDetect(true);
                setDetectAnswer(rlt)
                setChatID(res.data.chat_id)
                setDisableDetect(false)
                setLoading(false)
                
            } else {
                setDisableDetect(false);
            }

            if (plag) {
                setLoading(true)
                setDisablePlag(true)
                const res = await api.post('/chatbot/plagirism', {
                    body: data,
                    chat_id: chatID || null
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("teachai_token")}`
                    }
                })

                const rlt = res.data.answer.winstonai
                setPlag(true);
                setPlagAnswer(rlt)
                setChatID(res.data.chat_id)
                setDisablePlag(false)
                setLoading(false)
                
            } else {
                setDisablePlag(false)
            }
            setDisableDetect(false);
            setDisablePlag(false);
            // if (detectAnswer) {

            //     setAnswer((prev) => [...prev, { answer: detectAnswer }])
            // }
            // if (plagAnswer) {

            //     setPlagAnswer((prev) => [...prev, { answer: plagAnswer }])
            // }
            console.log('here is loading')
            fetchUsage();
        } catch (error) {
            toast('Error While detecting your content')
            if (error?.response?.status === 429) {
                toast(error?.response?.data?.error)
            }
            console.log('Error: ', error);
            setLoading(false)

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
        console.log(wordCount)
        if (wordCount <= maxWords) {
            fn(inputText);
            setCount(wordCount)
            handleChange({ target: { name, value: inputText } })
        } else {
            // Trim the excess words
            setCount(1000)
            let words = inputText.split(' ');
            words = words.splice(0, maxWords);
            let thaosandStr = words.join(' ')
            fn(thaosandStr);
            handleChange({ target: { name, value: thaosandStr } })
        }
    };

    const countWords = (text) => {
        const tt = text.split(' ')
        return tt.length
    };

    return (
        <div className='md:mr-4'>
            <form onSubmit={handleSubmit} className='mt-10'>

                {/* <div className='flex flex-col mb-5'>
                    <label htmlFor="gradeLevel" className='font-medium'>
                        Grade Level
                    </label>
                    <input
                        type="text"
                        id='grade'
                        name='grade'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                    />
                </div> */}

                {/* <div className='flex flex-col mb-5'>
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
                    />
                </div> */}


                <div className='flex flex-col mb-5'>

                    <label
                        htmlFor="essayContent"
                        className="block mb-2 text-sm font-medium text-gray-900">
                        Content
                    </label>
                    <textarea
                        id="essayContent"
                        rows="4"
                        value={content}
                        name='text'
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add content here or attach file"
                        onChange={(e) => handleTextAreaChange(e, setContent, setContentCount)}
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the essay context.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    >
                    </textarea>
                    <p className='flex justify-end'>
                        {contentCount} / {maxWords}
                    </p>
                    {
                        (usage?.noOfFilesUploaded !== usage?.noOfFilesUploadedLimit) ? (
                            <input class="block mt-2 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
                                accept='.pdf, .doc, .docx'
                                onChange={handleFileChange}
                                aria-required="true"
                                onInvalid={(e) => e.target.setCustomValidity('Please upload the file.')}
                                // Reset custom validity when the user interacts with the field again
                                onFocus={(e) => e.target.setCustomValidity('')}
                            />
                        ) : (
                            <input class="block mt-2 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
                                disabled
                            />
                        )
                    }
                    {/* <input class="block mt-2 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
                        accept='.pdf'
                        onChange={handleFileChange}
                    /> */}
                </div>

                {/* <div className='flex flex-col mb-5'>
                    <label
                        htmlFor="essayContent"
                        className="block mb-2 text-sm font-medium text-gray-900">
                        Rubric
                    </label>
                    <textarea
                        id="essayContent"
                        rows="4"
                        name='rubric'
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        onChange={handleChange}
                    >
                    </textarea>
            */}
                <div className=' flex flex-col gap-1 mb-5'>
                    <label htmlFor="detectai" className='flex gap-2 cursor-pointer'>
                        <input type="checkbox" id='detectai' onChange={(e) => {
                            if (e.target.checked) {
                                setDetect(true)
                            } else {
                                setDetect(false)
                            }
                        }}
                            disabled={disableDetect}
                            onInvalid={(e) => e.target.setCustomValidity('Please enter the detect AI.')}
                            // Reset custom validity when the user interacts with the field again
                            onFocus={(e) => e.target.setCustomValidity('')}
                        />
                        Detect AI
                    </label>
                    <label htmlFor="plagirism" className='flex gap-2 cursor-pointer'>
                        <input type="checkbox" id='plagirism' onChange={(e) => {
                            if (e.target.checked) {
                                setPlag(true)
                            } else {
                                setPlag(false)
                            }
                        }}
                            disabled={diablePlag}
                            onInvalid={(e) => e.target.setCustomValidity('Please enter a valid username.')}
                            // Reset custom validity when the user interacts with the field again
                            onFocus={(e) => e.target.setCustomValidity('')}
                        />
                        Plagirism
                    </label>
                </div>

                {/* </div> */}


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
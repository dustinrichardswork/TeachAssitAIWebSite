import React, { useEffect, useState } from 'react'
import api from '../../../util/api';
import { useContext } from 'react';
import { UsageContext } from '../../../context/UsageContext';
import { toast } from 'react-toastify';
import { ChatbotContext } from '../../../context/ChatbotContext';
import { backend_url } from '../../../util/variables';


const ChatForm = ({ setAnswer, setLoading, setChatID, setOriginal }) => {

    const [data, setData] = useState({type: 'multiple choice'})

    const { fetchUsage } = useContext(UsageContext);
    const { setLanguage, language, setQuizRequest } = useContext(ChatbotContext);


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(data);
    //     setLoading(true)
    //     setQuizRequest(data);
    //     let _body = {
    //         body: data
    //     }

    //     try {
    //         let res = await api.post(`/chatbot/quiz`, _body)

    //         if (res.statusText === 'OK') {

    //             console.log('Response from chatform: ', res);
    //             console.log('Here is the answer: ', res.data.answer);
    //             setChatID(res.data.chat_id)
    //             setAnswer([{ answer: res.data.answer }])
    //             setLoading(false)
    //             fetchUsage();
    //         }
    //     } catch (error) {

    //         if (error?.response?.status === 429) {
    //             toast(error?.response?.data?.error)
    //         }
    //         console.log('Error: ', error);

    //         setLoading(false)

    //     }

    // }

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(data);
        setLoading(true)
        setQuizRequest(data);

        try {
            const response = await fetch(`${backend_url}/chatbot/quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("teachai_token")}`
                },
                body: JSON.stringify({
                    body: data
                })
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
                        setLanguage(data.language)
                        console.log('form lang: ', data.language)
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
                toast('Something Wrong!')
                // Handle any errors from the request
            }
        } catch (error) {

            if (error?.response?.status === 429) {
                toast(error?.response?.data?.error)
            }
            console.log('Error: ', error);
            setLoading(false)
            console.error('Error:', error);
            // Handle any network or other errors
        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target

        setData({
            ...data,
            [name]: value
        })
    }

    useEffect(() => {
        setData((prev) => ({ ...prev, language }))
    }, [])

    useEffect(() => {

        return () => {
            setQuizRequest({})
        }
    }, [])

    return (
        <div className='mr-4'>
            <form onSubmit={submitForm} className='mt-10'>

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
                    <label htmlFor="topic" className='font-medium'>
                        Quiz Topic
                    </label>
                    <input
                        type="text"
                        id='topic'
                        placeholder='Type here'
                        name='topic'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the grade level.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>


                <div className='flex flex-col mb-5'>
                    <label htmlFor="subject" className='font-medium'>
                        Subject
                    </label>
                    <input
                        type="text"
                        id='subject'
                        name='subject'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the subject.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="summary" className='font-medium'>
                        Short Summary Learning Objectives
                    </label>
                    <textarea
                        id='summary'
                        name='summary'
                        onChange={handleChange}
                        className='px-2 h-28 rounded-md border  bg-white outline-none'
                    ></textarea>
                </div>


                <div className='flex flex-col mb-5'>
                    <label htmlFor="type" className='font-medium'>
                        Quiz Type (Eg: multiple choice, true or false & short answer)
                    </label>
                    <select
                        type="text"
                        id='type'
                        name='type'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please select the activity format.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    >
                        <option value='multiple choice'>Multiple-choice questions</option>
                        <option value={`true or false`}>True or False</option>
                        <option value={`short answer`}>Short Answer</option>
                    </select>
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="questionnumber" className='font-medium'>
                        Number of Questions
                    </label>
                    <input
                        type="number"
                        id='questionnumber'
                        name='questionnumber'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        min={1}
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the number questions.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>
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
        </div>
    )
}

export default ChatForm
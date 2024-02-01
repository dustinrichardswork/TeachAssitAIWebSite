import React, { useState } from 'react'
import api from '../../../util/api';
import { useContext } from 'react';
import { UsageContext } from '../../../context/UsageContext';
import { toast } from 'react-toastify';
import { ChatbotContext } from '../../../context/ChatbotContext';
import { backend_url } from '../../../util/variables';


const ChatForm = ({ setAnswer, setLoading, setChatID }) => {

    const [data, setData] = useState({ language: "English" })

    const { fetchUsage } = useContext(UsageContext);
    const { setLanguage } = useContext(ChatbotContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        setLoading(true)
        let _body = {
            body: data
        }

        try {
            // /chatbot/math/lesson
            const response = await fetch(`${backend_url}/chatbot/math/lesson`, {
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
                toast('Something Wrong!')
                // Handle any errors from the request
            }
        } catch (error) {

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
    return (
        <div className='mr-4'>
            <form onSubmit={handleSubmit} className='mt-10'>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="topic" className='font-medium'>
                        Maths Topic
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
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the math topic.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="gradeLevel" className='font-medium'>
                        Grade Level
                    </label>
                    <input
                        type="number"
                        id='gradeLevel'
                        name='gradeLevel'
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
                    <label htmlFor="lessonDuration" className='font-medium'>
                        Lesson Duration
                    </label>
                    <input
                        type="text"
                        id='lessonDuration'
                        name='lessonDuration'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the duration of lession.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                {/* <div className='flex flex-col mb-5'>
                    <label htmlFor="subject" className='font-medium'>
                        Subject
                    </label>
                    <input
                        type="text"
                        id='subject'
                        name='subject'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                    />
                </div> */}

                <div className='flex flex-col mb-5'>
                    <label htmlFor="keyLearning" className='font-medium'>
                        Key Learning Intention
                    </label>
                    <input
                        type="text"
                        id='keyLearning'
                        name='keyLearning'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the key of learning intension.')}
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
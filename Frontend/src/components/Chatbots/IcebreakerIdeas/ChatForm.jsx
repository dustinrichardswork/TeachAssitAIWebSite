import React, { useState } from 'react'
import api from '../../../util/api';
import { useContext } from 'react';
import { UsageContext } from '../../../context/UsageContext';
import { toast } from 'react-toastify';
import { ChatbotContext } from '../../../context/ChatbotContext';
import { backend_url } from '../../../util/variables';

const ChatForm = ({ setAnswer, setLoading, setChatID, setOriginal }) => {

    const [data, setData] = useState({ lang: "English" })
    const [content, setContent] = useState('');
    const [contentCount, setContentCount] = useState(0)

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
            console.log('data: ', data);
            // /chatbot/mathquiz/gen
            const response = await fetch(`${backend_url}/chatbot/Icebreaker/ideas`, {
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
        console.log(name, '    ', value)
        setData({
            ...data,
            [name]: value
        })
    }

    const handleTextAreaChange = (e, fn, setCount) => {

        const { name } = e.target;
        const inputText = e.target.value;
        const wordCount = countWords(inputText);
        const maxWords = 9000

        if (wordCount <= maxWords) {
            fn(inputText);
            setCount(wordCount)
            handleChange({ target: { name, value: inputText } })
        } else {
            // Trim the excess words
            setCount(1000)
            const words = inputText.trim().split(/\s+/);
            words.splice(maxWords);
            let thaosandStr = words.join(' ')
            fn(thaosandStr);
            handleChange({ target: { name, value: thaosandStr } })
        }
    };

    const countWords = (text) => {
        text = text.trim();
        return text === '' ? 0 : text.split(/\s+/).length;
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
                        id='grade_level'
                        name='grade_level'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        min={1}
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the level of grade.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="gradeLevel" className='font-medium'>
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
                    <label htmlFor="goals/objectives" className='font-medium'>
                        Goals/Objectives (For example focus on team building, communication skills, or introducing a new topic)
                    </label>
                    <input
                        type="text"
                        id='goals/objectives'
                        placeholder='Type here'
                        name='goals/objectives'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the goals or objectives.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="class_Size" className='font-medium'>
                        Class Size
                    </label>
                    <input
                        type="number"
                        id='class_Size'
                        placeholder='Type here'
                        name='class_Size'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the class size.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="duration" className='font-medium'>
                        Duration
                    </label>
                    <input
                        type="text"
                        id='duration'
                        placeholder='Type here'
                        name='duration'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the duration.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="num_Ideas" className='font-medium'>
                        Total Number of Ideas(min 1-max 5)
                    </label>
                    <input
                        type="number"
                        id='num_Ideas'
                        placeholder='Type here'
                        name='num_Ideas'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        min={1}
                        max={5}
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the total number of ideas.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="materials/resources" className='font-medium'>
                        Materials/Resources (Eg: They might have access to whiteboards, props, or technology)
                    </label>
                    <input
                        type="text"
                        id='materials/resources'
                        placeholder='Type here'
                        name='materials/resources'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please select the materials or resources.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="preferredStyle" className='font-medium'>
                        Preferred Style (icebreaker activity, such as games, discussions, role-playing, or creative exercises)
                    </label>
                    <input
                        type="text"
                        id='preferredStyle'
                        placeholder='Type here'
                        name='preferredStyle'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the preferred style.')}
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
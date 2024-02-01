import React, { useState } from 'react'
import api from '../../../util/api';
import { useContext } from 'react';
import { UsageContext } from '../../../context/UsageContext';
import { toast } from 'react-toastify';
import { ChatbotContext } from '../../../context/ChatbotContext';


const ChatForm = ({ setAnswer, setLoading, setChatID, setFileName, updateDoc, currentDoc }) => {

    const [data, setData] = useState({ language: 'English', insert_image: 'simple', image: true })
    const [currentBtn, setCurrentBtn] = useState('simple')

    const { fetchUsage } = useContext(UsageContext);
    const { setLanguage } = useContext(ChatbotContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);

        if (data.number_of_slides > 20) {
            toast("Maximum Slides could be 20")
            return
        }
        let req_data = data;
        if(parseInt(data.number_of_slides) > 20){
            req_data.number_of_slides = 18
        }else{
            req_data.number_of_slides = parseInt(data.number_of_slides) - 1
        }
        console.log('pptxc: ', req_data)
        setLoading(true)
        let _body = {
            body: req_data
        }

        try {
            let res = await api.post(`/chatbot/presentation`, _body)
            console.log(res)
            const { data } = res
            // console.log('Response from chatform: ', res);
            const extractedAnswer = data.substring(data.indexOf("Here is the answer:"))
            const firstDT = extractedAnswer.substring(0, extractedAnswer.indexOf("}") + 1)
            const secondDT = extractedAnswer.substring(extractedAnswer.indexOf("}") + 1)
            const result = JSON.parse(firstDT)
            const chatid = JSON.parse(secondDT)
            setChatID(chatid.chat_id)

            // let fileName = data.answer.split('/')
            // fileName = fileName[fileName.length - 1]

            // console.log('FileName: ', fileName);
            setAnswer([{ answer: result.presentation_link }])
            
            setFileName(result.presentation_link)
            setLoading(false)
            fetchUsage();
            updateDoc(!currentDoc)
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
        console.log(name, value)

        setData({
            ...data,
            [name]: value
        })
    }

    return (
        <div className='mr-4'>
            <form onSubmit={handleSubmit} className='mt-10'>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="grade" className='font-medium'>
                        Title
                    </label>
                    <input
                        type="text"
                        id='title'
                        name='title'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the grade.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="subject" className='font-medium'>
                        Presented by
                    </label>
                    <input
                        type="text"
                        id='person'
                        placeholder='Type here'
                        name='presenter'
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

                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows="4"
                        name='description'
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add description of your PowerPoint Presentation"
                        onChange={handleChange}
                        required
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the description.')}
                        // Reset custom validity when the user interacts with the field again
                        onFocus={(e) => e.target.setCustomValidity('')}
                    >
                    </textarea>
                </div>

                <div>
                    <label>Choose a template: </label>
                    <div style={{display: 'flex', width: '100%', alignItems: 'left', marginBottom: 10}}>
                        <button key={1231242343443} type='button' className={ currentBtn === 'simple' ? 'p-1 rounded bg-orange-200 text-blue mr-2' : 'p-1 rounded bg-secondary text-white mr-2' } onClick={() => { handleChange({ target: { name: 'insert_image', value: 'simple' } }); setCurrentBtn('simple') }}>Simple</button>
                        <button key={1231242343444} type='button' className={ currentBtn === 'bright_modern' ? 'p-1 rounded bg-orange-200 text-blue mr-2' : 'p-1 rounded bg-secondary text-white mr-2' } onClick={() => { handleChange({ target: { name: 'insert_image', value: 'bright_modern' } }); setCurrentBtn('bright_modern') }}>Bright Modern</button>
                        <button key={1231242343445} type='button' className={ currentBtn === 'dark_modern' ? 'p-1 rounded bg-orange-200 text-blue mr-2' : 'p-1 rounded bg-secondary text-white mr-2' } onClick={() => { handleChange({ target: { name: 'insert_image', value: 'dark_modern' } }); setCurrentBtn('dark_modern') }}>Dark Modern</button>
                    </div>
                </div>

                <div className='flex flex-col mb-5'>
                    <label htmlFor="noOfSlides" className='font-medium'>
                        Number of Slides
                    </label>
                    <input
                        type="number"
                        id='noOfSlides'
                        name='number_of_slides'
                        placeholder='Maximum 20 slides'
                        onChange={handleChange}
                        className='px-2 h-8 rounded border  bg-white outline-none'
                        required
                        min={5}
                        max={20}
                        aria-required="true"
                        onInvalid={(e) => e.target.setCustomValidity('Please enter the number of slides.')}
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
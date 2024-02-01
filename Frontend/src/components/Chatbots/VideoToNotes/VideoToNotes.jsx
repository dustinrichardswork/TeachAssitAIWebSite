import React, { useContext, useRef, useState } from 'react'

import ChatForm from './ChatForm'
import Header from '../Header'
import ExportButtons from '../ExportButtons';
import AnswerAndHistory from '../AnswerAndHistory'


import _7_VideotoNotes from '../../../images/bots/7.Video to notes - Vincent.png'

import { ChatbotContext } from '../../../context/ChatbotContext';
import { useEffect } from 'react';
import Categories from '../../Dashboard/components/Categories';

const VideoToNotes = () => {


    const [answer, setAnswer] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatID, setChatID] = useState('')

    const componentRef = useRef(null);


    const { setSelectedCategory, setLanguage } = useContext(ChatbotContext)
    useEffect(() => {
        setSelectedCategory('Digital Learning & Teaching Tools');
        return () => {
            setLanguage('English')
        }
    }, [])

    return (
        <div className='border-b-2 border-black pb-24'>
            <div>
                <Categories />
            </div>
            <div className=' flex flex-col md:flex-row gap-5'>

                <div className='border-r border-secondary max-w-[350px]'>
                    <Header
                        name={'Vincent'}
                        image={_7_VideotoNotes}
                        heading={'Video To Notes'}
                        desc={'Allow me to assist you in summarizing videos effectively for your convenience.'}
                    />

                    <hr className='h-[2px] bg-secondary' />

                    <ChatForm
                        setAnswer={setAnswer}
                        setLoading={setLoading}
                        setChatID={setChatID}
                    />

                </div>

                <AnswerAndHistory
                    url={'/video/chat'}
                    answer={answer}
                    setAnswer={setAnswer}
                    componentRef={componentRef}
                    loading={loading}
                    message={`Content loading for the video may take a moment. Thanks for your patience!`}
                    setLoading={setLoading}
                    chatID={chatID}
                    chatbot="Video To Notes"
                    examplePrompts={[
                        "Can you provide more detail on the main points discussed in the video? I'd like to understand the context better.",
                        "I'm interested in the speaker's perspective on [specific topic from the video]. Could you generate a summary focusing on this aspect?",
                        "The video summary provided a good overview, but I'm curious about any counterarguments or alternative perspectives that were mentioned. Could you expand on those?",
                        "The video seemed to touch on a lot of interesting points. Are there any specific examples or case studies mentioned that I could explore further?"
                    ]}
                />
            </div>

            <ExportButtons componentToPrint={componentRef} answer={answer} />

        </div>
    )
}

export default VideoToNotes
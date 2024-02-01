import React, { useRef, useState } from 'react'

import ChatForm from './ChatForm'
import Header from '../Header'
import ExportButtons from '../ExportButtons';
import AnswerAndHistory from '../AnswerAndHistory';


import _13_avatar from '../../../images/bots/13 Document & Web Link Quiz - Omari.png'

import { useEffect } from 'react';
import { useContext } from 'react';
import { ChatbotContext } from '../../../context/ChatbotContext';
import Categories from '../../Dashboard/components/Categories';
import { UsageContext } from '../../../context/UsageContext';

const Document = () => {

    const [answer, setAnswer] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatID, setChatID] = useState('')
    const [originalAnswer, setOriginalAnswer] = useState('')

    const componentRef = useRef(null)

    const { language, setSelectedCategory, setLanguage } = useContext(ChatbotContext)
    const { fetchUsage } = useContext(UsageContext);

    useEffect(() => {
        setSelectedCategory('Student Engagement & Activity Ideas')
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
                        name={'Omari'}
                        image={_13_avatar}
                        heading={'Document & Web Link Quiz'}
                        desc={'Let me help you with your Document & Web Link Quiz needs. Upload your document or link, and I`ll generate a customized quiz for you.'}
                    />

                    <hr className='h-[2px] bg-secondary' />

                    <ChatForm
                        setAnswer={setAnswer}
                        setLoading={setLoading}
                        setChatID={setChatID}
                        setOriginal={setOriginalAnswer}
                    />

                </div>

                <AnswerAndHistory
                    url={'/quiz/analyze'}
                    answer={answer}
                    original={originalAnswer}
                    setAnswer={setAnswer}
                    componentRef={componentRef}
                    loading={loading}
                    setLoading={setLoading}
                    chatID={chatID}
                    chatbot="Document & Web Link Quiz"
                    examplePrompts={[
                        "Hi, I'm preparing a lesson for my 3rd-grade math class on multiplication. Can you suggest some engaging activities and resources to help my students practice their multiplication skills?",
                    ]}
                />
            </div>

            <div className=' flex gap-4 justify-end items-center'>
                {/* {
                    answer?.length > 0 && (
                        <div>
                            <button onClick={getAnswers} className='px-6 py-3 rounded-md border-2 text-white bg-[#ed7742]'>
                                Reveal Answers
                            </button>
                        </div>
                    )
                } */}
                <ExportButtons componentToPrint={componentRef} answer={answer} />
            </div>

        </div>
    )
};
export default Document;
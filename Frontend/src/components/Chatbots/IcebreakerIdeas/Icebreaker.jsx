import React, { useRef, useState } from 'react'

import ChatForm from './ChatForm'
import Header from '../Header'
import ExportButtons from '../ExportButtons';
import AnswerAndHistory from '../AnswerAndHistory';


import _16_avatar from '../../../images/bots/16 Classroom Icebreaker Ideas - Anne.png'

import { useEffect } from 'react';
import { useContext } from 'react';
import { ChatbotContext } from '../../../context/ChatbotContext';
import Categories from '../../Dashboard/components/Categories';
import { UsageContext } from '../../../context/UsageContext';
import api from '../../../util/api';
import { toast } from 'react-toastify';
import { backend_url } from '../../../util/variables';

const Icebreaker = () => {

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

    const handleTranslate = async (targetLanguage) => {
        try {
            toast.info('Translating your text...');
            const response = await fetch(`${backend_url}/api/translate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lang: targetLanguage, text: answer }),
            })
            const data = await response.json()
            toast.success('Text is translated successfully!');
        } catch (error) {
            toast.error('Translation Error!');
        }
    };

    return (
        <div className='border-b-2 border-black pb-24'>
            <div>
                <Categories />
            </div>
            <div className=' flex flex-col md:flex-row gap-5'>

                <div className='border-r border-secondary max-w-[350px]'>
                    <Header
                        name={'Anne'}
                        image={_16_avatar}
                        heading={'Classroom Icebreaker Ideas'}
                        desc={'Let`s collaborate on introducing exciting icebreaker activities into your classroom. Together, we can energize and engage your students!'}
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
                    chatbot="Classroom Icebreaker Ideas"
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
export default Icebreaker;
import React, { useRef, useState } from 'react'

import ChatForm from './ChatForm'
import Header from '../Header'
import ExportButtons from '../ExportButtons';
import AnswerAndHistory from '../AnswerAndHistory';


import _4_ComprehensionLesson from '../../../images/bots/4.Comprehension Lesson Generator - Cara.png'

import { useEffect } from 'react';
import { useContext } from 'react';
import { ChatbotContext } from '../../../context/ChatbotContext';
import Categories from '../../Dashboard/components/Categories';
import { UsageContext } from '../../../context/UsageContext';
import api from '../../../util/api';
import { toast } from 'react-toastify';


const LessonComprehension = () => {

    const [answer, setAnswer] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatID, setChatID] = useState('')
    const [originalAnswer, setOriginalAnswer] = useState('')
    const [content, setContent] = useState('')

    const componentRef = useRef(null)

    const { language, setSelectedCategory, setLanguage } = useContext(ChatbotContext)
    const { fetchUsage } = useContext(UsageContext);

    useEffect(() => {
        setSelectedCategory('Lesson Planning')
        return () => {
            setLanguage('English')
        }
    }, [])


    const getAnswers = async () => {

        setLoading(true)
        let _body = {
            body: {
                language: language || 'English'
            },
            chat_id: chatID
        }

        try {

            let res = await api.post(`/chatbot/lessonComp/answer`, _body)

            if (res.statusText === 'OK') {

                console.log('Response from chatform: ', res);
                console.log('Here is the answer: ', res.data.answer);
                setAnswer((prev) => [...prev, { question: "Answers", answer: res.data.answer }])
                setLoading(false)
                fetchUsage()
            }
        } catch (error) {

            if (error?.response?.status === 429) {
                toast(error?.response?.data?.error)
            }
            console.log('Error: ', error);
            setLoading(false)

        }

    }

    return (
        <div className='border-b-2 border-black pb-24'>
            <div>
                <Categories />
            </div>
            <div className=' flex flex-col md:flex-row gap-5'>

                <div className='border-r border-secondary max-w-[350px]'>
                    <Header
                        name={'Cara'}
                        image={_4_ComprehensionLesson}
                        heading={'Lesson Comprehension'}
                        desc={'Allow me to offer assistance with generating comprehension lessons tailored to your needs.'}
                    />

                    <hr className='h-[2px] bg-secondary' />

                    <ChatForm
                        setAnswer={setAnswer}
                        setLoading={setLoading}
                        setChatID={setChatID}
                        setOriginal={setOriginalAnswer}
                        setContent={setContent}
                    />

                </div>

                <AnswerAndHistory
                    url={'/lessonComp/chat'}
                    answer={answer}
                    setAnswer={setAnswer}
                    content={content}
                    componentRef={componentRef}
                    loading={loading}
                    setLoading={setLoading}
                    chatID={chatID}
                    chatbot="Lesson Comprehension"
                    examplePrompts={[
                        "Hi, I'm preparing a lesson for my 3rd-grade math class on multiplication. Can you suggest some engaging activities and resources to help my students practice their multiplication skills?",
                        "Hello, I'm teaching a middle school history class, and we're covering the American Civil War. Can you recommend some interactive resources and activities to help my students understand the key events and figures of this period?",
                        "Hey, I'm planning a lesson for my 7th-grade geography class on climate zones. Can you provide me with some resources and activities that will help my students learn about the different climate zones around the world?",
                        "Hi there, I'm working on a lesson for my high school chemistry class about chemical reactions. Can you help me find some safe and engaging lab activities and resources to demonstrate various types of chemical reactions?",
                        "Hello, I'm teaching an elementary school art class, and I'd like to introduce my students to famous artists and their works. Can you recommend some age-appropriate resources and activities that will help my students explore and appreciate different art styles and artists?"
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
}

export default LessonComprehension
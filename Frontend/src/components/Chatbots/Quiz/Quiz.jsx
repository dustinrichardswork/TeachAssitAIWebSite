import React, { useRef, useState } from 'react'

import ChatForm from './ChatForm'

import Header from '../Header'
import ExportButtons from '../ExportButtons';

import _2_Quiz from '../../../images/bots/2.Quiz - Qasim.png'
import AnswerAndHistory from '../AnswerAndHistory';

import { useEffect } from 'react';
import { useContext } from 'react';
import { ChatbotContext } from '../../../context/ChatbotContext';
import Categories from '../../Dashboard/components/Categories';


const Quiz = () => {

    const componentRef = useRef(null);

    const [answer, setAnswer] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatID, setChatID] = useState('')
    const [originalAnswer, setOriginalAnswer] = useState('')


    const { setSelectedCategory, setLanguage } = useContext(ChatbotContext)

    useEffect(() => {
        setSelectedCategory('Student Engagement & Activity Ideas')
        setLanguage('English')

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
                        name={'Qasim'}
                        image={_2_Quiz}
                        heading={'Quiz Generator'}
                        desc={'Allow me to offer assistance with your quiz creation tasks.'}
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
                    setAnswer={setAnswer}
                    componentRef={componentRef}
                    loading={loading}
                    setLoading={setLoading}
                    chatID={chatID}
                    original={originalAnswer}
                    chatbot="General Quiz"
                    examplePrompts={[
                        'Can you provide me with the correct answers to the quiz?',
                        'Can you increase the difficulty level of the quiz?',
                        'I want to track individual student performance on this quiz?',
                        'Are there any resources or study materials available to help students prepare for this quiz'
                    ]}
                />
            </div>

            <ExportButtons componentToPrint={componentRef} answer={answer} />

        </div>
    )
}

export default Quiz
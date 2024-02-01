import React, { useRef, useState } from 'react'

import ChatForm from './ChatForm'
import Header from '../Header'
import ExportButtons from '../ExportButtons';


import _6_MathLessonPlanner from '../../../images/bots/6.Math Lesson Planner - Lucy.png'
import AnswerAndHistory from '../AnswerAndHistory';

import { useContext } from 'react';
import { ChatbotContext } from '../../../context/ChatbotContext';
import { useEffect } from 'react';
import Categories from '../../Dashboard/components/Categories';

const MathLessonPlanner = () => {


    const [answer, setAnswer] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatID, setChatID] = useState('')


    const componentRef = useRef(null);


    const { setSelectedCategory, setLanguage } = useContext(ChatbotContext)
    useEffect(() => {
        setSelectedCategory('Lesson Planning');
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
                        name={'Lucy'}
                        image={_6_MathLessonPlanner}
                        heading={'Math Lesson Planner'}
                        desc={'Allow me to aid you in designing well-structured math lessons that align with your goals and requirements.'}
                    />

                    <hr className='h-[2px] bg-secondary' />

                    <ChatForm
                        setAnswer={setAnswer}
                        setLoading={setLoading}
                        setChatID={setChatID}
                    />

                </div>

                <AnswerAndHistory
                    url={'/math/lesson'}
                    answer={answer}
                    setAnswer={setAnswer}
                    componentRef={componentRef}
                    loading={loading}
                    message={`Loading content for the Math Lesson Planner may take a moment. Thank you for your patience!`}
                    setLoading={setLoading}
                    chatID={chatID}
                    chatbot="Math Lesson Planner"
                    examplePrompts={[
                        "Hi, I'm preparing a lesson for my 5th-grade class on fractions. Can you suggest some engaging activities and resources to help my students understand the concept of fractions and their applications?",
                        "Hello, I'm teaching a high school calculus class, and we're covering the concept of limits. Can you recommend some interactive resources and activities to help my students grasp the fundamentals and applications of limits?",
                        "Hey, I'm planning a lesson for my 8th-grade algebra class on quadratic equations. Can you provide me with some resources and activities that will help my students learn how to solve and graph quadratic equations?",
                        "Hi there, I'm working on a lesson for my middle school geometry class about angles. Can you help me find some engaging activities and resources to demonstrate the properties and types of angles?",
                        "Hello, I'm teaching a pre-calculus class, and I'd like to introduce my students to trigonometric functions. Can you recommend some resources and activities that will help my students understand and apply sine, cosine, and tangent functions?"
                    ]}
                />
            </div>

            <ExportButtons componentToPrint={componentRef} answer={answer} />


        </div>
    )
}

export default MathLessonPlanner
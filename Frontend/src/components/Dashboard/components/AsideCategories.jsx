import React, { useContext } from 'react'

import bot from '../../../images/bots/2.Quiz - Qasim.png'
import { ChatbotContext } from '../../../context/ChatbotContext'
const Categories = () => {

    const { selectedCategory, filterChatbots } = useContext(ChatbotContext);

    return (
        <div className='my-5'>
            <div className='flex flex-col gap-4 pl-10'>
                {
                    [
                        "All",
                        "Lesson Planning",
                        "Student Engagement & Activity Ideas",
                        "Special Education & Inclusive Practice",
                        "Communication & Professional Learning",
                        "Digital Learning & Teaching Tools",
                        "Assessment & Progress Monitoring"
                    ].map((el, i) => (
                        <div className=' min-w-min font-bold flex gap-2 cursor-pointer items-start' onClick={() => filterChatbots(el)}>
                            <img src={bot} alt="" className=' w-5 h-5 rounded-full mt-1' />
                            <p className={`${selectedCategory === el? ' font-extrabold text-xl': ''}`}>
                                {el}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
import React, { useContext, useEffect, useState } from 'react'
import { ChatbotContext } from '../../context/ChatbotContext'

// import Cloud from '../SVGs/Cloud'
// import Globe from '../SVGs/Globe'
// import Performance from '../SVGs/Performance'

const Grid = ({ title, description }) => {

    const { getBots } = useContext(ChatbotContext)
    const [chatbots, setChatbots] = useState(null)

    useEffect(() => {
        let bots = getBots(title)
        setChatbots(bots)
    }, [])

    return (

        <div className='mt-10 mb-10 md:mb-32 border-b-2 border-b-gray-600 pb-20 mx-3 md:mx-10'>

            <h3 className='text-3xl font-semibold my-8 text-primary text-center md:text-start'>
                {title}
            </h3>

            <p className='hidden md:block text-secondary text-sm md:text-xl mb-3'>
                {description}
            </p>

            {
                chatbots?.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-3 rounded-3xl justify-center items-center gap-10'>
                    {
    
                        chatbots?.map((el, i) => (
    
                            <div className={`flex flex-col gap-5 rounded-xl px-5 py-5 h-full`}
                                style={{
                                    boxShadow: '0px 0px 38px -11px rgba(0,0,0,0.35)'
                                }}
                            >
                                <div className='flex gap-4'>
                                    <img src={el.icon} className='h-16 w-16 rounded-xl' alt="bot icon" />
                                    <div>
                                        <h4 className='text-lg font-semibold text-secondary'>
                                            {el.title}
                                        </h4>
                                        <span>{el.name}</span>
                                    </div>
                                </div>
                                <p className='text-secondary'>{el.description}</p>
                            </div>
                        ))
                    }
    
                </div>
                ): (
                    <h3 className='font-bold text-center text-2xl mt-12 -mb-10'>
                        Chatbots coming soon
                    </h3>
                )
            }

        </div>

    )
}

export default Grid
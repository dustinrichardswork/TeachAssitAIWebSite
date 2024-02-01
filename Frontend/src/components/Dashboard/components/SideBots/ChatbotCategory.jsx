import React, { useContext, useState } from 'react'
import ProductivityItem from './ProductivityItem'
import { UserContext } from '../../../../context/UserContext'

const ChatbotCategory = ({ el }) => {
    const [show, setShow] = useState(false)

    // const { categoryOpen } = useContext(UserContext);

    // if (el?.title.toLowerCase() === categoryOpen.toLowerCase()) {
    //     setShow(true);
    // }

    return (
        <div className=''>
            <div className='flex justify-between cursor-pointer' onClick={() => setShow(!show)}>

                <h4 className='text-xl' style={{ flex: 6 }}>
                    {el.title}
                </h4>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`w-6 h-6 ${show ? "rotate-180" : ''}`} style={{ flex: 1 }}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>

            </div>
            {
                show && (
                    el.chatbots.map((el, i) => (
                        <ProductivityItem el={el} key={i} />
                    ))
                )
            }
        </div>
    )
}

export default ChatbotCategory
import { Link } from 'react-router-dom'

import ProductivityItem from './ProductivityItem'
import { useContext } from 'react'
import { ChatbotContext } from '../../context/ChatbotContext';

const Productivity = () => {

    const { homebots } = useContext(ChatbotContext);

    return (
        <div className=' mb-16'>
            <div className=' flex flex-col justify-center items-center mt-16'>
                <h2 className=' text-2xl md:text-4xl text-center font-bold text-secondary'>Meet our AI Teacher Assistants<span className='hidden md:inline'>: Your Innovative Classroom Partners</span></h2>
                <p className='hidden md:block text-xl mt-5 max-w-[70%] text-center'>Teachers are saving 10+ hours a week with Teach Assist AI, harnessing over 40 AI Teacher Chatbot assistants to revolutionize classroom efficiency.</p>
            </div>
            <div className='flex flex-col mt-5 mb-3 px-4 md:px-0 gap-5 py-7'>
                <div className='grid grid-cols-1 md:grid-cols-3 mx-5 gap-7'>
                    {
                        homebots.map((el, i) => (
                            <ProductivityItem el={el} key={i} />
                        ))
                    }
                </div>
            </div>
            <div className=' flex justify-center'>
                <Link to={'/teachers'}>
                <button className='px-6 py-3 rounded-md border-2 text-white bg-[#ed7742]'>
                    See More
                </button>
                </Link>
            </div>
        </div>
    )
}

export default Productivity
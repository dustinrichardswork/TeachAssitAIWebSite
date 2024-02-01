import { Link } from 'react-router-dom'
import history from '../../images/Edited/webp/history.webp'
import Cloud from '../SVGs/Cloud'
import Control from '../SVGs/Control'
import Data from '../SVGs/Data'
const History = () => {


    return (
        <div
            className='flex flex-col-reverse md:flex-row  shadow-2xl shadow-slate-700 mx-2  md:mx-20 py-4 md:py-20 px-2 md:px-10 rounded-lg md:rounded-2xl mb-32'>
            <div className='flex-1 px-2 md:mx-0'>
                <div className='md:mx-8 pt-8 md:pt-0'>

                    {/* <p className='text-secondary'>
                        EASILY FIND WHAT YOU’RE LOOKING FOR
                    </p> */}

                    <img src={history} alt="History" className='rounded-[1rem]' />

                    <h1 className='text-4xl text-center md:text-4xl mb-6 mt-2  font-extrabold text-secondary'>
                        Simplify Teaching <br /> with AI
                        {/* :Harness the Power of AI Assistance */}
                    </h1>

                    <div className='flex gap-5 justify-center md:justify-start mt-8'>
                        <Link to={'/signup'}>
                            <button className='px-6 py-3 rounded-2xl border-2 border-secondary hover:bg-secondary hover:text-white'>
                                Start Your Free Trial
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex-1 pt-6'>
                {
                    [
                        {
                            title: 'Effortless Prompting',
                            desc: 'Say goodbye to prompt troubles. Our solution handles it all for you by providing input fields to effectively meet your teaching requirements.',
                            icon: <Cloud />
                        },
                        {
                            title: 'Capture and Access',
                            desc: 'AI Teacher chatbots capture and store your chat history, ensuring easy retrieval.',
                            icon: <Data />
                        },
                        {
                            title: 'Extract Text, Multiple Formats',
                            desc: 'Seamlessly extract chatbot text to Excel, Word, PDF, and Google Docs for versatile use.',
                            icon: <Control />
                        },
                    ].map((el, i) => (
                        <div className='mb-8 ml-5'>
                            <div className='flex gap-3'>
                                {el.icon}
                                <div className=''>
                                    <h4 className='text-xl font-semibold text-primary'>{el.title}</h4>
                                    <p className='text-secondary text-xl'>{el.desc}</p>
                                </div>
                            </div>
                            <hr className=' bg-gray-200 h-1 mt-5' />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default History
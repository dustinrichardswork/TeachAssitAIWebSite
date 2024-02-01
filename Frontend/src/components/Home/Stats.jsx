import { Link } from 'react-router-dom'
import stats_image from '../../images/Home/AI-Teachers-working.png'

const Stats = () => {

    return (
        <div className='px-2 md:px-20'>

            <div className=' hidden md:flex flex-col md:flex-row-reverse pt-5 bg-gradient-to-bl from-dark via-secondary to-primary bg-secondary rounded-xl py-14 px-10'>

                <div className='flex-1'>

                    <div className='md:mx-8'>

                        <h1 className={`text-5xl mb-6 mt-2 pb-2  font-extrabold text-white`}>
                            Join the 5,000+ Teachers Saving 10+ Hours Every Week!
                        </h1>

                        <p className='text-white text-lg'>
                            Picture a world where you have more 'me time' to truly enjoy the art of teaching. With our AI Teacher chatbots, your daily educational tasks become effortless, leaving you with invaluable hours to spare. Just input your desired topic, and watch as our chatbot transforms your vision into a wealth of top-tier classroom resources, from tailored lesson plans and engaging activities to personalized student reports. Thanks to our cutting-edge language processing algorithms, our chatbots truly understand your needs, ensuring a seamless and efficient teaching experience.
                        </p>

                        <div className='flex gap-5 items-center mt-8'>
                            <Link to={'/signup'}>
                                <button className='px-6 py-3 text-white rounded-md border-2 border-[#ed7742] bg-[#ed7742]'>Start Your Free Trial</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex-1 rounded overflow-hidden'>
                    <img src={stats_image} className='mt-10 md:mt-5 md:m-5 min-h-xs' alt="hero imgae" />
                </div>
            </div>

            <div className=' hidden md:flex bg-[#4c5583] flex-col md:flex-row rounded-3xl mx-4 relative -top-2 -z-10'>
                {
                    [
                        { stat: 5000, title: 'Teachers Registered' },
                        { stat: 250, title: 'Schools Registered' },
                        { stat: 30, title: 'AI Teacher Assistant Chatbots' },
                    ].map((el, i) => (
                        <div className={`p-14 flex flex-col flex-1 ${i !== 0 ? "border-l-2 border-gray-300" : ''}  justify-center items-center gap-5`}>
                            <div className='relative'>
                                <h3 className='text-7xl font-extrabold text-white'>{el.stat}+</h3>

                                {/* <span className={`absolute font-bold text-2xl text-white ${i === 0 ? "top-0" : 'bottom-2'} -right-6`}>{i === 0 ? "+" : "m"}</span> */}

                            </div>
                            <p className='bg-white px-2 text-secondary rounded-full shadow-lg'>{el.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Stats
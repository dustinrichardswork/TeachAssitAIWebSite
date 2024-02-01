import { Link } from 'react-router-dom'
import hero_image from '../../images/Edited/webp/hero_image.jpg'

const Hero = ({ setShowPopup }) => {


    return (
        <div className='flex flex-col md:flex-row items-center justify-between pt-12 mx-2 md:mx-8'>
            <div className='flex-1  mb-8 md:mb-0'>
                <div className='md:mr-8'>

                    <p className='text-gray-600 animate-flash'>
                        RISK-FREE 7 DAY TRIAL
                    </p>

                    <h1
                        className=' text-5xl md:text-6xl mb-6 mt-2  font-extrabold text-secondary'>
                        Embrace the Future of Teaching with Teach Assist AI.
                    </h1>

                    <p
                        className='text-secondary md:text-lg'>
                        Streamline your teacher workload and prioritize your students with an efficient tool that harnesses the power of AI. Whether you're a seasoned pro or starting out, Teach Assist AI simplifies and enhances your teaching experience.
                        <br />
                        <br />
                        Teach Assist AI offers a diverse array of specialized AI chatbots designed to deliver comprehensive support and assistance across various educational lessons and subjects. Discern and choose the AI chatbots that align most effectively with your instructional requirements.

                    </p>

                    <div className='flex flex-col md:flex-row gap-5 items-center mt-8'>
                        <Link to='/signup'>
                            <button className='bg-primary  px-6 py-3 rounded-md border-2 text-white border-primary'>
                                Try for free for 7 days
                            </button>
                        </Link>

                        <button
                            onClick={() => setShowPopup(true)}
                            className='px-6 py-3 rounded-md border-2 cursor-pointer text-white bg-[#ed7742]'>
                            Watch How it Works
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex-1 hidden md:block'>
                <img src={hero_image} className=' rounded-lg md:rounded-[2rem] w-full' alt="hero imgae" />
            </div>
        </div>
    )
}

export default Hero
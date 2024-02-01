import { Link } from 'react-router-dom'
import hero_image from '../../images/Edited/webp/hero_image.jpg'

const FindOut = () => {

    return (
        <div className='flex flex-col-reverse md:flex-row items-center pt-5 px-2 md:px-0 mb-20'>
            <div className='flex-1'>
                <div className='md:mx-8 mt-5 md:mt-0'>

                    <h1 className=' text-3xl md:text-4xl mb-6 mt-2 md:mr-20  font-extrabold text-primary text-center md:text-start'>
                        Transform Teaching Topics into PowerPoint Slides
                    </h1>

                    <p className='text-gray-700 text-xl text-center md:text-start'>
                        With our user-friendly tools and resources, you can effortlessly transform your lesson content into engaging slides that captivate and inspire your students. Our platform allows you to seamlessly incorporate learning aims, outlining what students will gain from each presentation, and success criteria, specifying the questions they will be able to answer by the end of the lesson. Say goodbye to dull and time- consuming PowerPoint creation - our platform empowers you to deliver visually compelling presentations that enhance student engagement and promote effective learning.
                    </p>

                    <div className='flex gap-5 justify-center md:justify-start mt-8'>
                        <Link to={'/signup'}>
                            <button className='px-6 py-3 rounded-md border-2 border-secondary hover:bg-secondary hover:text-white'>
                                See More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex-1 rounded overflow-hidden'>
                <img src={hero_image} className='rounded-lg md:rounded-[2rem]' alt="hero imgae" />
            </div>
        </div>
    )
}

export default FindOut
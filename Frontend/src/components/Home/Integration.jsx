import { Link } from 'react-router-dom'
import hero_image from '../../images/Edited/webp/hero_image.jpg'

import desktop from '../../animation/Final JSON/Design 1 (Essay Grading).json';
import mobile from '../../animation/Final JSON/Mobile (Essay Grading).json';
import LottieAnimation2 from './Animation/LottieAnimation2';
import LottieAnimation from './Animation/LottieAnimation';

const Integration = () => {

    return (
        <div
            className='flex flex-col-reverse md:flex-row items-center mx-2 md:mx-10 md:py-20 md:px-10 rounded-2xl mb-10'
        >
            <div className='flex-1'>
                <div className='md:mx-2 mt-5 md:mt-0'>

                    {/* <p className='text-secondary text-center md:text-start'>
                        EASILY FIND WHAT YOU’RE LOOKING FOR
                    </p> */}

                    <h1 className=' text-3xl md:text-4xl mb-6 mt-2 md:mr-20  font-extrabold text-primary text-center md:text-start'>

                        Automated Essay Scoring and Feedback
                    </h1>

                    <p className='text-secondary text-center md:text-left text-lg md:pr-32'>
                        This powerful tool utilizes natural language processing techniques to extract main ideas, applies a scoring algorithm based on grammar, coherence, idea development, and alignment with the essay question, and generates comprehensive feedback. With customizable marking rubrics and the ability to detect AI-writing and plagiarism, our chatbot simplifies essay assessment and provides valuable suggestions for improvement.
                        Streamline your essay grading process and empower your students to excel with our AI Essay Marking and Feedback chatbot.
                    </p>

                    <div className='flex gap-5 justify-center md:justify-start mt-8'>
                        <Link to={'/signup'}>
                            <button className='px-6 py-3 text-secondary rounded-xl border-2 border-secondary hover:bg-secondary hover:text-white'>See More</button>
                        </Link>
                    </div>

                </div>
            </div>
            <div className='flex-1 w-full'>
                {/* <img src={hero_image} className=' rounded-lg md:rounded-[2rem]' alt="hero imgae" /> */}
                {
                    (window.innerWidth > 786) ? (
                        <LottieAnimation2 animationData={desktop} />
                    ) : (
                        <LottieAnimation animationData={mobile} />
                    )
                }
            </div>
        </div>
    )
}

export default Integration
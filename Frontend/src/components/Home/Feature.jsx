import { Link } from "react-router-dom"
import LottieAnimation from './Animation/LottieAnimation';
import LottieAnimation2 from './Animation/LottieAnimation2';

const Feature = ({ title, description, buttonText, image, desktop, mobile, index }) => {

    return (
        <div
            className={`flex flex-col-reverse ${(index === 1) ? "md:flex-row" : "md:flex-row-reverse"} items-center pt-5 rounded-xl py-14 px-2 md:px-10`}>
            <div className='flex-1'>

                <div className='my-5 md:my-0 md:mx-8 md:pl-14'>

                    <h1 className=' text-3xl md:text-4xl mb-6 mt-2  font-extrabold text-primary text-center md:text-start'>
                        {title}
                    </h1>

                    <p className='text-secondary text-xl text-center md:text-left'>
                        {description}
                    </p>

                    <div className='flex gap-5 justify-center md:justify-start mt-8'>
                        <Link to={'/signup'}>
                            <button className='px-6 py-3 text-secondary rounded-xl border-2 border-secondary hover:bg-secondary hover:text-white'>{buttonText}</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex-1 w-full'>
                {
                    image && (
                        <img src={image} className=' rounded-lg md:rounded-[2rem]' alt="hero imgae" />
                    )
                }
                {
                    (desktop || mobile) && (
                        (window.innerWidth > 786) ? (
                            <LottieAnimation2 animationData={desktop}/>
                        ) : (
                            <LottieAnimation animationData={mobile}/>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Feature
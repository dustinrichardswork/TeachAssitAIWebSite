import React, { useEffect, useRef } from 'react'
import Desktop from '../SVGs/Desktop'
import Cloud from '../SVGs/Cloud'
import Globe from '../SVGs/Globe'
import Performance from '../SVGs/Performance'

const Steps = () => {

    const textRef = useRef(null)


    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slideInUp')
                }
            });
        });

        observer.observe(textRef.current);

        // // Cleanup the observer when the component is unmounted
        // return () => {
        //     observer.unobserve(textRef.current);
        // };
    }, []);

    return (
        <div className='mt-10 mb-20'>
            <p className='text-center text-secondary opacity-50'>INSTANT SETUP</p>
            <h2 className={`text-5xl text-center font-extrabold mt-4 mb-12`} ref={textRef}>Fast, simple & effortless.</h2>
            <div className='flex flex-col md:flex-row rounded-3xl mx-20 md:mx-4 bg-gradient-to-l from-gray-400 via-pink-300 to-orange-300'>
                {
                    [
                        { stat: 100, title: 'Countries supported', icon: <Desktop /> },
                        { stat: 28, title: 'Downloads on App Store', icon: <Cloud /> },
                        { stat: 16, title: 'Verified Users', icon: <Globe /> },
                        { stat: 16, title: 'Verified Users', icon: <Performance /> },
                    ].map((el, i) => (
                        <div className={`p-14 flex flex-col flex-1 ${i !== 0 ? "border-b-2 md:border-b-0 md:border-l-2  border-gray-300" : 'border-b-2 md:border-b-0 border-gray-300'}  justify-center items-center gap-5`}>
                            {el.icon}
                            <p className='bg-white px-2 text-secondary rounded-full'>{el.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Steps
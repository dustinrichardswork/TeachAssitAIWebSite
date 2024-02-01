import TestimonialSlider from './Testimonial/TestimonialSlider'

const Solo = () => {


    return (

        <div className='flex flex-col items-center mx-5 md:mx-20 px-10 rounded-2xl mb-10 shadow-2xl shadow-slate-700 mt-32'>
            {/* <div className='flex-1 mt-8 md:mt-0'>
                <div className='md:mx-8'>
                    <p className='text-gray-600'>EASILY FIND WHAT YOU’RE LOOKING FOR</p>
                    <h1 className='text-6xl mb-6 mt-2  font-extrabold text-secondary'>History you can <br /> see and search</h1>
                    <p className='text-gray-700 text-xl pr-32'>We're a growing family of 382,081 designers and makers from around the world
</p>
                    <div className='flex gap-5 items-center mt-8'>
                        <button className='px-6 py-3 rounded-2xl border-2 border-primary hover:bg-primary hover:text-white'>Learn More</button>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <img src={hero_image} alt="hero imgae" className='rounded-[1rem]'/>
            </div> */}
            <h1 className='text-4xl font-semibold mt-10 text-center'>
                What People
                <br />
                are saying
            </h1>
            <div>

                <TestimonialSlider />
            </div>
        </div>

    )
}

export default Solo
import history from '../../images/Edited/webp/history.webp'

const Banner = () => {

    return (
        <div className='flex flex-col-reverse md:flex-row items-center shadow-2xl shadow-slate-700 py-4 md:py-20 px-4 md:px-10 rounded-2xl mb-32 md:mt-10'>
            <div className='flex-1'>
                <div className='md:mx-8 pt-8 md:pt-0'>


                    <h1 className='text-2xl md:text-4xl mb-6 mt-2  font-extrabold text-secondary md:leading-[3.4rem]'>
                        Maximize earning potential with 20% recurring commission for customer referrals for a year
                    </h1>

                    <p className='text-secondary text-sm md:text-xl md:pr-32'>
                        For a whole year, receive a 20% recurring commission for any client you recommend to us. You may advertise our services and generate a regular stream of cash with ease thanks to our effective tracking system and ready-made marketing materials.
                    </p>
                    <div className='flex gap-5 items-center mt-8'>
                        <button className='px-6 py-3 rounded-2xl border-2 border-secondary hover:bg-secondary hover:text-white capitalize'>
                            Sign Up Now
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <img src={history} alt="History" className='rounded-[1rem]' />
            </div>
        </div>
    )
}

export default Banner
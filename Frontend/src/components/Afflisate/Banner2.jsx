import history from '../../images/Edited/webp/history.webp'

const Banner2 = () => {

    return (
        <div className='flex flex-col-reverse md:flex-row items-center shadow-2xl shadow-slate-700 py-5 md:py-20 px-3 md:px-10 rounded-2xl mb-16 md:mb-32 mt-8 md:mt-40'>
            <div className='flex-1'>
                <div className='md:mx-8 pt-8 md:pt-0'>

                    <h1 className='text-3xl md:text-4xl mb-6 mt-2  font-extrabold text-primary'>
                        How Does It Work?
                    </h1>

                    <p className='text-secondary text-md md:text-xl md:pr-32 text-justify'>
                        When you join our Affiliate Program, we'll provide you with an array of banners and links to promote on your website and social media channels. These links, when clicked by a visitor, will be tracked by our affiliate tool and you'll earn a commission based on their subscription.
                    </p>
                    <ul className=' pl-5 md:pl-10 mt-9'>
                        {
                            [
                                "Sign-up for free and become a partner without any initial cost.",
                                "Promote our services using a variety of banners and text links provided to you, which you can share on your website, blog, and social media.",
                                "Earn 20% recurring commission for a year on every successful referral."
                            ].map((el, i) => (
                                <li className='list-decimal text-md md:text-xl mb-5 md:mr-20 text-justify text-secondary'>
                                    {el}
                                </li>
                            ))
                        }
                    </ul>
                    <div className='flex flex-col gap-5 items-center mt-8'>
                        <h3 className=' text-xl md:text-2xl text-center my-8 font-semibold text-secondary'>
                            Join now and start earning rewards with no joining fee.
                        </h3>
                        <button className='px-12 py-3 rounded-2xl border-2 border-secondary hover:bg-secondary hover:text-white capitalize'>
                            Sign Up Now
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <img src={history} alt="History" className='rounded-[1rem] md:h-full' />
            </div>
        </div>
    )
}

export default Banner2
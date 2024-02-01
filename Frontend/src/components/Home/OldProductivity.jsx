import { Link } from 'react-router-dom'
import bot1 from '../../images/bots/1.Lesson Planning - Lisa.png'
import bot2 from '../../images/bots/2.Quiz - Qasim.png'
import bot3 from '../../images/bots/3.Automated Essay Scoring and Feedback - Elsa.png'

import ProductivityItem from './OldProductivityItem'
const Productivity = () => {

    return (
        <div className='flex flex-col my-5 md:mx-10 md:shadow-2xl shadow-slate-700 md:rounded-[2rem] px-4 md:px-14 gap-5 py-7'>
            {/* <div className='mb-10 md:mb-0 md:mr-20' style={{ flex: 2 }}>
                <div className='flex flex-col gap-2'>
                    <img src={hero_image} className='md:h-80 mb-5 rounded-[1rem]' alt="" />
                    <p className='text-gray-600 pr-20'>RISK-FREE 30 DAY TRIAL</p>
                    <h1 className='text-6xl mb-6 mt-2 md:mr-80  font-extrabold text-secondary'>Increase Productivity</h1>
                    <p className='text-gray-700 text-xl md:mr-80'>We're a growing family of 382,081 designers and makers from around the world</p>
                    <div className='flex gap-5 items-center mt-8'>
                        <button className='px-6 py-3 rounded-md border-2 border-secondary hover:bg-secondary hover:text-white'>Sign up Now</button>
                    </div>
                </div>
            </div>
            <div style={{ flex: 2 }}>
                <div className='flex flex-col gap-7'>
                    {
                        [
                            { title: 'General Assistant', description: '4,729 curated designresources to energize your creative workflow', icon: bot1 },
                            { title: 'Super Smart Search', description: "4,729 curated design resources to energize your creative workflow", icon: bot2 },
                            { title: "Control everything in one place", description: '4,729 curated designresources to energize your creative workflow', icon: bot3 },
                        ].map((el, i) => (
                            <ProductivityItem el={el} key={i} />
                        ))
                    }
                </div>
            </div> */}


            <h1 className=' capitalize text-3xl font-semibold text-secondary'>Meet the AI Teachers</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-7'>
                {
                    [
                        { title: 'General Assistant', description: '4,729 curated designresources to energize your creative workflow', icon: bot1 },
                        { title: 'Super Smart Search', description: "4,729 curated design resources to energize your creative workflow", icon: bot2 },
                        { title: "Control everything in one place", description: '4,729 curated designresources to energize your creative workflow', icon: bot3 },
                        { title: 'General Assistant', description: '4,729 curated designresources to energize your creative workflow', icon: bot1 },
                        { title: 'Super Smart Search', description: "4,729 curated design resources to energize your creative workflow", icon: bot2 },
                        { title: "Control everything in one place", description: '4,729 curated designresources to energize your creative workflow', icon: bot3 },

                    ].map((el, i) => (
                        <ProductivityItem el={el} key={i} />
                    ))
                }
                <div className='mt-10 col-span-1 md:col-span-3 flex justify-center'>
                    <Link to="/teachers">


                        <button className='bg-primary px-6 py-3 rounded-md border-2 text-white border-primary capitalize'>
                            Click Here to explore all our AI teachers
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Productivity
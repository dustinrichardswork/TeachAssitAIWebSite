import React from 'react'
import Desktop from '../SVGs/Desktop'
import Data from '../SVGs/Data'
import Control from '../SVGs/Control'
import Together from '../SVGs/Together'
import Circle from '../SVGs/Circle'
import Managment from '../SVGs/Managment'

// import Cloud from '../SVGs/Cloud'
// import Globe from '../SVGs/Globe'
// import Performance from '../SVGs/Performance'

const Benefits = () => {
    return (
        <div className='mt-10 mb-20 hidden md:block'>

            <h1 className='text-3xl md:text-4xl text-center font-extrabold tracking-tight md:mt-8 md:mb-10 text-primary'>
                Why Teach Assist AI?
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-4 rounded-3xl mx-5 gap-y-20 gap-5 justify-items-center mt-24'>
                {
                    [
                        {
                            title: 'Time-saving',
                            description: 'Teach Assist AI significantly reduces the time spent on various teaching tasks, allowing teachers to focus on other essential aspects of their work.',
                            icon: <Desktop />
                        },

                        {
                            title: 'Workload reduction',
                            description: ": By automating repetitive and time-consuming tasks, Teach Assist AI lightens the overall workload of teachers, freeing up valuable time and energy.",
                            icon: <Data />
                        },
                        {
                            title: "Resource generation",
                            description: 'Teach Assist AI generates high- quality teaching materials, such as lesson plans, activities, and worksheets, saving teachers from the need to create them from scratch.',
                            icon: <Control />
                        },
                        {
                            title: "Personalized learning",
                            description: 'With its advanced algorithms, Teach Assist AI can adapt to individual student needs, providing personalized learning experiences and tailored instructional content.',
                            icon: <Together />
                        },

                        {
                            title: "Instant feedback",
                            description: 'Teach Assist AI offers prompt feedback to students, enabling them to receive immediate insights and corrections on their work, enhancing the learning process.',
                            icon: <Circle />
                        },

                        {
                            title: 'Engagement & interactivity',
                            description: 'Teach Assist AI incorporates interactive elements and engaging features into lessons, making the learning experience more dynamic and captivating for students.',
                            icon: <Managment />
                        },
                        {
                            title: 'Continuous improvement',
                            description: 'Teach Assist AI learns and evolves over time, benefiting from user feedback and updates, ensuring that it continuously improves its performance and effectiveness in supporting teachers and students.', icon: <Desktop />
                        },
                        {
                            title: '24/7 Customer Support',
                            description: 'With Teach Assist AI 24/7 customer support, teachers can count on timely assistance and guidance, ensuring a seamless user experience and prompt resolution of any queries or technical issues.', icon: <Desktop />
                        },
                    ].map((el, i) => (

                        <div className={` max-w-[14rem] flex flex-col gap-5 items-center md:items-start`}>
                            {el.icon}
                            <h4 className=' text-xl md:text-2xl font-semibold text-center md:text-start capitalize'>{el.title}</h4>
                            <hr className='border-2 border-secondary w-28 opacity-25' />
                            <p className=' text-secondary text-sm md:text-md text-center md:text-start'>{el.description}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Benefits
import React from 'react'
import Grid from './Grid'

import history from '../../images/Home/AI-teacher-chatbot.jpg'

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ChatbotProvider } from '../../context/ChatbotContext'


const Teachers = () => {
    return (
        <ChatbotProvider>
            <div className=' max-w-[1440px] mx-auto'>

                <Helmet>
                    <meta charSet="utf-8" />
                    <title>AI Teachers | Teach Assist AI</title>
                </Helmet>
                <div className='flex flex-col-reverse md:flex-row items-center mt-5 md:py-20 px-3 md:px-10 rounded-2xl'>
                    <div className='flex-1 text-center'>
                        <div className='md:mx-8 pt-8 md:pt-0'>

                            <h1 className=' text-center  text-3xl md:text-4xl mb-6 mt-2  font-extrabold text-secondary md:leading-[3.4rem]'>
                                How can these AI Teachers help you?
                            </h1>

                            <p className='text-gray-700 text-md md:text-xl md:pr-32 text-center'>
                                Our AI teachers revolutionize the process of creating outstanding classroom materials, freeing you from the burden of extensive research and design. Simply provide the desired topic, and our app will generate a diverse range of resources, including lesson plans, activities, worksheets, and more. With AI teachers at your disposal, preparing engaging materials has never been easier.
                            </p>
                        </div>
                    </div>
                    {/* <div className='flex-1'>
                        <img src={history} alt="History" className='rounded-[1rem]' />
                    </div> */}
                </div>

                <div>
                    <Grid
                        title="Lesson Planning"
                        // data={data}
                        description={"With our AI teachers, lesson planning is effortless. Just give us the topic, and we'll generate engaging lesson plans, activities, and worksheets. Spend less time on research and design, and more on delivering impactful instruction. Experience the revolution in lesson planning with AI."}
                    />
                    <Grid
                        title="Communication & Professional Learning"
                        // data={data}
                        description={"AI teachers also greatly benefit communication and professional learning. These intelligent bots facilitate seamless collaboration among educators, eliminating communication barriers and enabling efficient sharing of ideas and resources. Additionally, AI-powered platforms offer personalized professional development opportunities, providing tailored learning materials and insights for continuous growth. With these AI teachers, educators can enhance communication channels and engage in targeted professional learning, fostering a culture of collaboration and ongoing professional advancement."}
                    />
                    <Grid
                        title="Special Education & Inclusive Practice"
                        // data={data}
                        description={'With our AI teachers, special education and English as a second language (ESL) instruction are revolutionized. These intelligent bots provide personalized support and resources to meet the unique needs of students in these areas. With our AI teachers, educators gain access to specialized strategies, adaptive materials, and personalized interventions, enhancing their ability to support students with special education requirements or those learning English as a second language. Leveraging AI technology, special education and ESL instruction become more effective and accessible, ensuring every student receives the necessary support for academic success.'}
                    />
                    <Grid
                        title="Student Engagement & Activity Ideas"
                        // data={data}
                        description={"With our AI teachers, special education and English as a second language (ESL) instruction are revolutionized. These intelligent bots provide personalized support and resources to meet the unique needs of students in these areas. With our AI teachers, educators gain access to specialized strategies, adaptive materials, and personalized interventions, enhancing their ability to support students with special education requirements or those learning English as a second language. Leveraging AI technology, special education and ESL instruction become more effective and accessible, ensuring every student receives the necessary support for academic success."}
                    />
                    <Grid
                        title="Digital Learning & Teaching Tools"
                        // data={data}
                        description={"Our AI teachers revolutionize digital learning and teaching tools. With their advanced capabilities, educators gain access to a wide range of interactive resources and platforms. From virtual simulations to personalized learning tools, AI teachers enhance engagement and cater to diverse learning needs. Experience the transformative power of AI in education."}
                    />
                    <Grid
                        title="Assessment & Progress Monitoring"
                        // data={data}
                        description={"With our AI teachers, assessment and progress monitoring are transformed. These advanced bots offer efficient and accurate assessment tools, automated grading systems, and personalized feedback. Educators can track student progress effectively and make data-driven decisions to support growth. Embrace the power of AI teachers for streamlined assessment and monitoring of progress."}
                    />

                    <div className='flex justify-center'>
                        <Link to='/signup'>
                            <button
                                className='bg-primary px-6 py-3 rounded-md border-2 text-white border-primary font-semibold'>
                                Start Your 7-Day Free Trial
                            </button>
                        </Link>
                    </div>
                    <h4 className='text-center  my-7 font-semibold text-xl text-primary'>
                        No payment information needed, Change Plans Anytime. Cancel at any time
                    </h4>
                </div>
            </div>
        </ChatbotProvider>
    )
}

export default Teachers
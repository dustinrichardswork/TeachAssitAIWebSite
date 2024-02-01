import React, { useContext } from 'react'
import Aside from './Aside'
import { UserContext } from '../../context/UserContext'
import { Route, Routes } from 'react-router-dom'
import Chatbots from './components/Chatbots'
import { ChatbotProvider } from '../../context/ChatbotContext'


import LessonPlanner from '../Chatbots/LessonPlanner/LessonPlanner'
import Quiz from '../Chatbots/Quiz/Quiz'
import Essay from '../Chatbots/Essay/Essay'
import LessonComprehension from '../Chatbots/LessonComprehension/LessonComprehension'
import MathQuiz from '../Chatbots/MathQuiz/MathQuiz'
import MathLessonPlanner from '../Chatbots/MathLessonPlanner/MathLessonPlanner'
import VideoToNotes from '../Chatbots/VideoToNotes/VideoToNotes'
import VideoToQuiz from '../Chatbots/VideoToQuiz/VideoToQuiz'
import { UsageProvider } from '../../context/UsageContext'
import DetectAI from '../Chatbots/DetectAI/DetectAI'
import PowerPoint from '../Chatbots/PowerPoint/PowerPoint'
import Report from '../Chatbots/ReportGenerator/Report'
import Settings from './Settings/Settings'
import ESL from '../Chatbots/ESLActivity/ESL'
import Document from '../Chatbots/Document_Link/Document'
import Homework from '../Chatbots/HomeworkAssignmentCreator/Homework'
import Test from '../Chatbots/TestCreator/test'
import Icebreaker from '../Chatbots/IcebreakerIdeas/Icebreaker'

const UserDashboard = () => {

    const { isAuthenticated } = useContext(UserContext)

    if (!isAuthenticated) return <div>Loading....</div>

    return (
        <UsageProvider>
            <ChatbotProvider>
                <div className=' max-w-[1640px] mx-auto'>
                    <div className="flex flex-col md:flex-row">
                        {/* <div className='flex flex-col'> */}
                            {/* <div>
                                <h3 className=' text-xl font-bold'>Package Details</h3>
                            </div> */}
                            <div className=" md:flex-[2] md:mt-52">
                                <Aside />
                            </div>
                        {/* </div> */}

                        <main className="mt-5 min-h-screen md:mt-0 md:flex-[10]">
                            <div className="px-2 md:px-6 pt-2">

                                <Routes>


                                    {/* <Route path={`history/*`} element={<ChatHistory />} /> */}

                                    <Route path={`chatbots`} element={<Chatbots />} />

                                    <Route path={`chatbot/lesson-planner`} element={<LessonPlanner />} />

                                    <Route path={`chatbot/quiz`} element={<Quiz />} />

                                    <Route path={`chatbot/essay`} element={<Essay />} />

                                    <Route path={`chatbot/lessonComp`} element={<LessonComprehension />} />

                                    <Route path={`chatbot/mathquiz`} element={<MathQuiz />} />

                                    <Route path={`chatbot/math-lesson-planner`} element={<MathLessonPlanner />} />

                                    <Route path={`chatbot/video-summarize`} element={<VideoToNotes />} />

                                    <Route path={`chatbot/video-to-quiz`} element={<VideoToQuiz />} />

                                    <Route path={`chatbot/detect-ai`} element={<DetectAI />} />

                                    <Route path={`chatbot/powerpoint-presentation`} element={<PowerPoint />} />

                                    <Route path={`chatbot/report`} element={<Report />} />

                                    <Route path={`chatbot/esl_activity`} element={<ESL />} />

                                    <Route path={`chatbot/document_link`} element={<Document />} />

                                    <Route path={`chatbot/homework`} element={<Homework />} />

                                    <Route path={`chatbot/testcreator`} element={<Test />} />

                                    <Route path={`chatbot/icebreaker`} element={<Icebreaker />} />

                                    <Route path={`settings`} element={<Settings />} />

                                </Routes>

                            </div>
                        </main>
                    </div>
                </div>
            </ChatbotProvider>
        </UsageProvider>
    )
}

export default UserDashboard
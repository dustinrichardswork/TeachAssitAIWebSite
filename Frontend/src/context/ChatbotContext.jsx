import { createContext, useState } from "react";


// bots images
import _1_LessonPlanning from '../images/bots/1.Lesson Planning - Lisa.png'
import _2_Quiz from '../images/bots/2.Quiz - Qasim.png'
import _3_AutomatedEssay from '../images/bots/3.Automated Essay Scoring and Feedback - Elsa.png'
import _4_ComprehensionLesson from '../images/bots/4.Comprehension Lesson Generator - Cara.png'
import _5_MathsQuiz from '../images/bots/5.Maths Quiz - Matthew.png'
import _6_MathLessonPlanner from '../images/bots/6.Math Lesson Planner - Lucy.png'
import _7_VideotoNotes from '../images/bots/7.Video to notes - Vincent.png'
import _8_VideotoQuizBot from '../images/bots/8. Video to Quiz Bot.png'
import _9_DetectAI from '../images/bots/9.Detect AI-Writing & Plagiarism - Ali.png'
import _10_PowerPoint from '../images/bots/10.PowerPoint Presentation - Priyanka.png'
import _11_Report from '../images/bots/11 Reports Generator - Bob.png'
import _12_ESL_Activity from '../images/bots/12 ESL Activity Suggestion -  Amira.png'
import _13_Document_Link from '../images/bots/13 Document & Web Link Quiz - Omari.png'
import _14_Homework_Assignment from '../images/bots/14 Homework Assignment Creator - Ishan.png'
import _15_Test_Creator from '../images/bots/15 Test Creator - Jack.png'
import _16_Classroom_Icebreaker from '../images/bots/16 Classroom Icebreaker Ideas - Anne.png'

const data = [
    {
        title: 'Lesson Planning',
        description: 'The lesson planner assistant chatbot optimizes teaching tasks, providing tailored and efficient support to enhance classroom productivity and organization.',
        icon: _1_LessonPlanning,
        name: 'Lisa',
        url: 'lesson-planner',
        category: 'Lesson Planning'
    },
    {
        title: 'General Quiz',
        description: "QuizBot offers grade-specific quizzes on various subjects, with options like multiple-choice, true/false, and open-ended questions, fostering interactive learning in multiple languages.",
        icon: _2_Quiz,
        name: "Qasim",
        url: "quiz",
        category: 'Student Engagement & Activity Ideas'
    },

    {
        title: "Essay Grading",
        description: 'The Essay Grading bot evaluates essays, considering the question, grade level, and language, using default or custom rubrics for comprehensive assessment.',
        icon: _3_AutomatedEssay,
        name: 'Elsa',
        url: 'essay',
        category: 'Assessment & Progress Monitoring'
    },
    {
        title: 'Comprehension Lesson',
        description: 'The Comprehension Lesson Generator Bot creates lessons with custom write-ups, questions in various formats, fostering language proficiency and understanding.',
        icon: _4_ComprehensionLesson,
        name: 'Cara',
        url: 'lessonComp',
        category: 'Lesson Planning'
    },
    {
        title: 'Maths Quiz',
        description: "The Maths Quiz bot generates grade-appropriate math quizzes, featuring problems, varied question types, and language options to enhance mathematical skills.",
        icon: _5_MathsQuiz,
        name: 'Matthew',
        url: 'mathquiz',
        category: "Student Engagement & Activity Ideas"
    },
    {
        title: "Math Lesson Planner",
        description: 'The Math Lesson Planner bot designs lessons: choose topic, grade, duration, key objectives, and language, for well-structured math teaching plans.',
        icon: _6_MathLessonPlanner,
        name: 'Lucy',
        url: 'math-lesson-planner',
        category: 'Lesson Planning'
    },
    {
        title: "Video to notes",
        description: 'Effortlessly condense videos into concise teacher-friendly summaries with the Video-to-Notes Bot, enhancing lesson planning and content understanding.',
        icon: _7_VideotoNotes,
        name: 'Vincent',
        url: 'video-summarize',
        category: 'Digital Learning & Teaching Tools'
    },
    {
        title: "Video to Quiz",
        description: 'Transform videos into interactive quizzes using the Video to Quiz Bot, crafting questions in chosen formats and languages effortlessly.',
        icon: _8_VideotoQuizBot,
        name: 'Hunter',
        url: 'video-to-quiz',
        category: 'Student Engagement & Activity Ideas'
    },
    {
        title: "Detect AI-Writing & Plagiarism",
        description: 'The Detect AI-Writing & Plagiarism Bot ensures originality by identifying AI-generated content and detecting plagiarism, maintaining academic integrity.',
        icon: _9_DetectAI,
        name: 'Ali',
        url: 'detect-ai',
        category: 'Assessment & Progress Monitoring'
    },
    {
        title: "PowerPoint Presentation",
        description: 'Create dynamic PowerPoint presentations effortlessly through the user-friendly inputs of the Presentation Bot, simplifying content delivery and engagement.',
        icon: _10_PowerPoint,
        name: 'Priyanka',
        url: 'powerpoint-presentation',
        category: 'Digital Learning & Teaching Tools'
    },
    {
        title: 'Reports Generator',
        description: "Effortlessly generate tailored reports for educators and teachers, covering student data and performance, using customizable input fields.",
        icon: _11_Report,
        name: 'Bob',
        url: 'report',
        category: 'Communication & Professional Learning'
    },
    {
        title: 'ESL Activity Suggestion',
        description: "The ESL Activity Suggestion Chatbot aids ESL teachers and learners by suggesting custom activities focusing on language components and skill levels.",
        icon: _12_ESL_Activity,
        name: 'Amira',
        url: 'esl_activity',
        category: 'Special Education & Inclusive Practice'
    },
    {
        title: 'Document & Web Link Quiz',
        description: "Create quizzes effortlessly by uploading documents (Word, PDF, PowerPoint) or website links, customizing question types and languages.",
        icon: _13_Document_Link,
        name: 'Omari',
        url: 'document_link',
        category: 'Student Engagement & Activity Ideas'
    },
    {
        title: 'Homework Assignment Creator',
        description: "Efficiently create curriculum-aligned homework assignments for various subjects, specifying question types, objectives, and assignment types for different grade levels.",
        icon: _14_Homework_Assignment,
        name: 'Ishan',
        url: 'homework',
        category: 'Assessment & Progress Monitoring'
    },
    {
        title: 'Test Creator',
        description: "Facilitate streamlined test creation for educators and teachers by specifying test elements: grade level, subjects, question types, and objectives.",
        icon: _15_Test_Creator,
        name: 'Jack',
        url: 'testcreator',
        category: 'Assessment & Progress Monitoring'
    },
    {
        title: 'Classroom Icebreaker Ideas ',
        description: "Access a repository of engaging icebreaker activities, tailored for educators and teachers based on class specifics and learning objectives.",
        icon: _16_Classroom_Icebreaker,
        name: 'Anne',
        url: 'icebreaker',
        category: 'Student Engagement & Activity Ideas'
    },
]

export const ChatbotContext = createContext()


export const ChatbotProvider = ({ children }) => {

    const [chatbots, setChatbots] = useState(data);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [videoUrl, setVideoURL] = useState('')
    const [language, setLanguage] = useState('');

    const [quizRequest, setQuizRequest] = useState({})
    const [answerForPrint, setAnswerForPrint] = useState([])

    let homebots;
    if (window.innerWidth < 768) {
        // If the user is on a mobile device (width less than 768 pixels), slice to 6
        homebots = data.slice(0, 6);
    } else {
        // If the user is on a desktop (width 768 pixels or more), slice to 9
        homebots = data.slice(0, 9);
    }

    const getBots = (category) => {
        return data.filter((el) => el.category.includes(category) || category.includes(el.category))
    }

    const filterChatbots = (category) => {
        setSelectedCategory(category);

        if (category === 'All') {
            setChatbots(data)
            return
        }

        let temp = data.filter((e) => e.category?.toLowerCase() === category.toLowerCase())
        setChatbots(temp)
    }

    return (
        <ChatbotContext.Provider value={{
            data,
            chatbots,
            filterChatbots,
            selectedCategory,
            setSelectedCategory,
            homebots,
            getBots,
            language, setLanguage,
            videoUrl, setVideoURL,
            quizRequest, setQuizRequest,
            answerForPrint, setAnswerForPrint
        }}>
            {children}
        </ChatbotContext.Provider>
    )
}
import React, { useState } from 'react';
import Productivity from './Productivity';
import Header from './Header';
import Categories from './Categories';


// bots images
import  _1_LessonPlanning from '../../../images/bots/1.Lesson Planning - Lisa.png'
import _2_Quiz from '../../../images/bots/2.Quiz - Qasim.png'
import _3_AutomatedEssay from '../../../images/bots/3.Automated Essay Scoring and Feedback - Elsa.png'
import _4_ComprehensionLesson from '../../../images/bots/4.Comprehension Lesson Generator - Cara.png'
import _5_MathsQuiz from '../../../images/bots/5.Maths Quiz - Matthew.png'
import _6_MathLessonPlanner from '../../../images/bots/6.Math Lesson Planner - Lucy.png'
import _7_VideotoNotes from '../../../images/bots/7.Video to notes - Vincent.png'
import _8_VideotoQuizBot from '../../../images/bots/8. Video to Quiz Bot.png'
import _9_DetectAI from '../../../images/bots/9.Detect AI-Writing & Plagiarism - Ali.png'
import _10_PowerPoint from '../../../images/bots/10.PowerPoint Presentation - Priyanka.png'


const data = [
  {
      title: 'Lesson Planning',
      description: 'Lisa optimizes teaching tasks, providing tailored and efficient support to enhance classroom productivity and organization.',
      icon: _1_LessonPlanning,
      name: 'Lisa',
      url: 'Lesson Planning',
      category: 'Lesson Planning'
  },
  {
      title: 'General Quiz',
      description: "Qasim offers grade-specific quizzes on various subjects, with options like multiple-choice, true/false, and open-ended questions, fostering interactive learning in multiple languages.",
      icon: _2_Quiz,
      name: "Qasim",
      url: "General Quiz",
      category: 'Student Engagement & Activity Ideas'
  },

  {
      title: "Essay Grading",
      description: 'Elsa evaluates essays, considering the question, grade level, and language, using default or custom rubrics for comprehensive assessment.',
      icon: _3_AutomatedEssay,
      name: 'Elsa',
      url: 'Essay Grading',
      category: 'Assessment & Progress Monitoring'
  },
  {
      title: 'Comprehension Lesson',
      description: 'Cara can generate comprehension lessons with custom write-ups, questions in various formats, fostering language proficiency and understanding.',
      icon: _4_ComprehensionLesson,
      name: 'Cara',
      url: 'Lesson Comprehension',
      category: 'Lesson Planning'
  },
  {
      title: 'Maths Quiz',
      description: "Matthew can generate grade-appropriate math quizzes, featuring problem solving, varied question types, and language options to enhance mathematical skills.",
      icon: _5_MathsQuiz,
      name: 'Matthew',
      url: 'Math Quiz Generator',
      category: "Student Engagement & Activity Ideas"
  },
  {
      title: "Math Lesson Planner",
      description: 'Lucy specialises in Math Lesson planning: choose topic, grade, duration, key objectives, and language, for well-structured math teaching plans.',
      icon: _6_MathLessonPlanner,
      name: 'Lucy',
      url: 'Math Lesson Planner',
      category: 'Lesson Planning'
  },
  {
      title: "Video to notes",
      description: 'Vincent effortlessly condenses videos into concise teacher-friendly summaries with the Video-to-Notes Bot, enhancing lesson planning and content understanding for students.',
      icon: _7_VideotoNotes,
      name: 'Vincent',
      url: 'Video To Notes',
      category: 'Digital Learning & Teaching Tools'
  },
  {
      title: "Video to Quiz",
      description: 'Hunter transforms videos into interactive quizzes using the Video to Quiz Bot, crafting questions in chosen formats and languages effortlessly.',
      icon: _8_VideotoQuizBot,
      name: 'Hunter',
      url: 'Video To Quiz',
      category: 'Digital Learning & Teaching Tools'
  },
  {
      title: "Detect AI-Writing & Plagiarism",
      description: 'Ali detects AI-Writing & Plagiarism, ensures originality by identifying AI-generated content and detecting plagiarism, maintaining academic integrity',
      icon: _9_DetectAI,
      name: 'Ali',
      url: 'Detect AI',
      category: 'Assessment & Progress Monitoring'
  },
  {
      title: "PowerPoint Presentation",
      description: 'Priyanka creates dynamic and engaging PowerPoint presentations effortlessly through the user-friendly inputs of the Presentation Bot, simplifying content delivery.',
      icon: _10_PowerPoint,
      name: 'Priyanka',
      url: 'Power Point',
      category: 'Digital Learning & Teaching Tools'
  }
]

const Chatbots = ({ selectedCategory, setSelectedCategory }) => {

  const [chatbots, setChatbots] = useState(data);


  return (
    <div>
      <Header
        heading={"Chatbots History"}
        desc={"Which teachers assistance would you like?"}
      />
      <Categories
        data={data}
        setChatbots={setChatbots}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Productivity
        chatbots={chatbots}
      />
    </div>
  );
};

export default Chatbots;
// import Steps from './Steps';
// import Logos from './Logos';
// import Solo from './Solo';

import React, { useContext, useEffect, lazy, Suspense } from 'react'
import { UserContext } from '../../context/UserContext';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChatbotProvider } from '../../context/ChatbotContext';

import Hero from './Hero';
import Productivity from './Productivity';
import Stats from './Stats';
import animationDesktop from '../../animation/Final JSON/Design 3 (video notes.json'
import animationMobile from '../../animation/Final JSON/mobile video notes.json'
import hero_image from '../../images/Edited/webp/hero_image.jpg'
import PopUp from './Video/PopUp';
import { useState } from 'react';

const Features = lazy(() => import('./Features'));
const History = lazy(() => import('./History'));
const Integration = lazy(() => import('./Integration'));
const Feature = lazy(() => import('./Feature'));
const FindOut = lazy(() => import('./FindOut'));

const TestimonialSlider = lazy(() => import('./Testimonial/TestimonialSlider'));
const Banner = lazy(() => import('./Banner'));


export const Home = () => {

  const location = useLocation()
  const [showPopup, setShowPopup] = useState(false);

  const { isLoggedin, isAuthenticated, getUserData } = useContext(UserContext)

  useEffect(() => {
    console.log('location: ', location.pathname);
    isLoggedin()
    getUserData()
  }, [isAuthenticated])


  return (

    <ChatbotProvider>
      <div className='max-w-[1640px] mx-auto overflow-hidden'>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Teach Assist AI</title>
        </Helmet>

        <Hero setShowPopup={setShowPopup}/>

        {/* <Logos /> */}
        <Productivity />

        <Stats />
        
        <Suspense>

          {/* <Steps /> */}

          <Features />

          <History />

          {/* <Benefits /> */}

          <Banner />

          <Integration />

          <div className='md:px-10'>
            <Feature
              title="Transforming Videos into Notes and Quizzes"
              description="Our innovative platform empowers you to effortlessly create guided notes from any YouTube video, regardless of its length. Utilizing advanced technology, we accurately summarize video content, enabling you to capture key information and insights in a condensed format. Take your learning to the next level with the option to generate custom questions based on the video, facilitating active engagement. Say goodbye to tedious note-taking and embrace the efficiency of video-based learning."
              buttonText="See More"
              desktop={animationDesktop}
              mobile={animationMobile}
            />
          </div>

          <FindOut />

          {/* <Solo /> */}
          <h1 className='text-3xl md:text-4xl text-center font-extrabold tracking-tight md:mt-12 mb-5 md:mb-10 text-primary'>
            What People Say
          </h1>
          <TestimonialSlider />

        </Suspense>
      </div>
      {
        showPopup && (
          <PopUp setShowPopup={setShowPopup} />
        )
      }
    </ChatbotProvider>
  )
}

export default Home;
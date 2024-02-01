import React from 'react'
import Banner from './Banner'
import Banner2 from './Banner2'
import { Helmet } from 'react-helmet'

const Affliate = () => {
  return (
    <div className=' max-w-[1440px] mx-auto'>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Affiliate Program | Teach Assist AI</title>
      </Helmet>

      <div className='mx-3 md:mx-8'>

        <Banner />

        <div>
          <h1 className=' text-3xl md:text-4xl mb-6 mt-2  font-extrabold text-primary'>
            Why Partner with Teach Assist AI?
          </h1>

          <p className='md:mr-10 text-secondary text-md md:text-xl text-justify'>
            As a partner of Teach Assist AI, you can bring many benefits to your business. By offering our AI-powered social media management tools to your customers, you can help them automate and optimize their social media marketing efforts. By joining our partner program, you'll have the opportunity to earn a 20 % recurring commission for up to one year for every customer you refer to us. Partnering with Teach Assist AI is a great way to streamline your own social media marketing efforts, boost your online presence, and drive business growth.
            Here are a few reasons why you should consider joining our partner program:
          </p>

          <ul className=' pl-8 md:pl-20 mr-10 mt-9'>
            {
              [
                'Earn a 20% recurring commission for up to one year for every customer you refer to us with 90 days cookie',
                'Offer cutting-edge AI technology to your customers',
                'Zero joining fees or minimum commitments',
                'Zero joining fees or minimum commitments',
                'We provide a variety of creative banners and pre-written content to help you with your promotion efforts',
                'Our dedicated team manages the partner program and is available to help you at any time.'
              ].map((el, i) => (
                <li className='list-disc text-md md:text-xl mb-4 text-secondary'>
                  {el}
                </li>
              ))
            }
          </ul>
          <h3 className=' text-xl md:text-2xl text-center md:mx-40 my-8 font-semibold text-primary'>
            Don't miss out on this opportunity to take your business to the next level. Join our partner program today and experience the benefits for yourself.
          </h3>
        </div>

        <Banner2 />
      </div>
    </div>
  )
}

export default Affliate
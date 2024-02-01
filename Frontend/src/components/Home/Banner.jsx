import React from 'react'

import banner from '../../images/Home/BannerCrop.png';

const Banner = () => {
  return (
    <div className='mt-10 mb-20 hidden md:block md:mx-20 overflow-hidden'>

      {/* <h1 className='text-3xl md:text-4xl text-center font-extrabold tracking-tight md:mt-8 md:mb-10 text-primary'>
        Why Teach Assist AI?
      </h1> */}
      <div className='relative'>
        <div className=' absolute left-0 top-0 right-0 mt-16'>
          <h2 className=' text-[#ed7742] text-4xl font-bold text-center'>Empower Your Classroom with Teach Assist in Over 30 Languages</h2>
          <p className='text-white text-center text-lg mt-4'>
            Experience a truly inclusive and global education solution. Our AI teacher chatbots are availabe in more than 30 languages,
            <br />
            ensuring every student can learn effectively and comfortably.
          </p>
        </div>
        <img src={banner} alt="" className=' w-full' />
      </div>
    </div>
  )
}

export default Banner
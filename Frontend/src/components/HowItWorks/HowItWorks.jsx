import React from 'react'

import video from '../../images/video.mp4';

const HowItWorks = () => {
  return (
    <div className=' my-20 flex justify-center items-center'>
      <iframe src={video} width="780px" height="438px"></iframe>
    </div>
  )
}

export default HowItWorks
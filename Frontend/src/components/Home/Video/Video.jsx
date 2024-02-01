import React from 'react'

import video from '../../../images/video.mp4';

const Video = () => {
  return (
    <div className=' flex justify-center items-center absolute left-0 top-0 right-0 bottom-0'>
      <iframe src={video} width="780px" height="438px"></iframe>
    </div>
  )
}

export default Video;
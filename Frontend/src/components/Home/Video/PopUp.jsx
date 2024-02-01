import React from 'react'

import Video from './Video';

const PopUp = ({ setShowPopup }) => {
  return (
    <div className=' fixed left-0 top-0 right-0 bottom-0 z-10 flex justify-center items-center bg-gray-500 bg-opacity-50'>

      <div className=' h-[438px] w-[780px] bg-white relative px-3 py-5 rounded-md'>
        <span
          onClick={() => setShowPopup(false)}
          className=' absolute -top-10 -right-10 text-2xl text-white border-4 border-white rounded-full cursor-pointer w-8 h-8 flex justify-center items-center bg-primary'
        >X</span>
        <Video />
      </div>
    </div>
  )
}

export default PopUp;
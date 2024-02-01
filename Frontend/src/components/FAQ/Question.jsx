import React, { useState } from 'react'

const Question = ({ question, answer }) => {
  const [show, setShow] = useState(false)

  return (
    <div className=''>
      <div className='flex justify-between cursor-pointer text-white' onClick={() => setShow(!show)}>
        <h4 className='text-xl' style={{ flex: 6 }}>{question}</h4>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`w-6 h-6 ${show ? "rotate-180" : ''}`} style={{ flex: 1 }}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>

      </div>
      {
        show && <p className='mt-4 ml-2 pl-3 text-justify border-l-2 mr-4 md:mr-14 border-blue-500 text-gray-300'>{answer}</p>
      }
    </div>
  )
}

export default Question
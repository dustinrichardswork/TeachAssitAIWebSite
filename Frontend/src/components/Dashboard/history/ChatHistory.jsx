import React from 'react'

import Chatbots from './Chatbots';
import { Route, Routes } from 'react-router-dom';
import History from './History';


const ChatHistory = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Chatbots />} />
        <Route path='/:chatbot/*' element={<History />} />
      </Routes>
    </div>
  )
}

export default ChatHistory
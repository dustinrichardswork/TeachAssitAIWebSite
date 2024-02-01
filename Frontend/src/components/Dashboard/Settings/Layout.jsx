import React from 'react'

const Layout = ({ heading, children}) => {
  return (
    <div className=' mx-3 my-4 shadow-gray-300 rounded-md shadow-md px-10 py-7'>
        <h3 className=' my-2 mb-4 text-2xl font-bold'>{heading}</h3>
        {
            children
        }
    </div>
  )
}

export default Layout
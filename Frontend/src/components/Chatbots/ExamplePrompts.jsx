import React from 'react'

const ExamplePrompts = ({ examplePrompts }) => {
    return (
        <div className='flex-[0.75]'>

            <h2 className=' text-2xl font-bold mb-5'>
                Follow Up Prompts
            </h2>

            <div className='flex items-center'>
                <div className=' bg-gray-300 px-8 py-5'>
                    {
                        examplePrompts?.map((item, i) => (
                            <div className=' mb-1'>
                                <h4 className=' font-bold'>Example {i + 1}</h4>
                                <p className='text-xs'>Teacher: {item}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ExamplePrompts
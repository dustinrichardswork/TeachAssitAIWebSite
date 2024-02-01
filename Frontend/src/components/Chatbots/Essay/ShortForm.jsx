import React from 'react'

const ShortForm = ({ prompt, setPrompt, handleSubmit }) => {
    return (
        <form
            onSubmit={handleSubmit}
            className='flex gap-4 mt-10'
        >
            <input
                type="text"
                className='w-full px-3 h-10'
                name='prompt'
                placeholder='Write your prompt...'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} />
            <button
                className='px-3 py-1 rounded-md border-2 text-white bg-[#ed7742]'
                disabled={prompt ? false : true}
            >
                Submit
            </button>
        </form>
    )
}

export default ShortForm
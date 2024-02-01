import React from 'react'

const Header = ({ heading, desc, name, image }) => {
    return (
        <div className='pr-4'>
            <div className='flex gap-2 items-end'>
                <img src={image} alt="lesson planner" className=' w-20' />
                <h5 className=' font-bold text-lg'>{name}</h5>
            </div>
            <h1 className=' capitalize text-2xl font-semibold text-secondary'>
                {heading}
            </h1>
            {
                desc && (
                    <p>
                        {desc}
                    </p>
                )
            }
        </div>
    )
}

export default Header
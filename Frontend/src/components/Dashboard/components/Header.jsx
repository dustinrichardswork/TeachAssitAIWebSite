import React from 'react'

const Header = ({ heading, desc }) => {
    return (
        <div>
            <h1 className=' capitalize text-3xl font-semibold text-secondary'>
                {heading}
            </h1>
            {
                desc && (
                    <p>
                        Which teachers assistance would you like?
                    </p>
                )
            }
        </div>
    )
}

export default Header
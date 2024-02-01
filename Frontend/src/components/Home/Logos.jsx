import React from 'react'

import rotashow from '../../images/rotashow.svg'
import waves from '../../images/waves.svg'
import travelers from '../../images/travelers.svg'
import goldlines from '../../images/goldlines.svg'
import velocity from '../../images/velocity.svg'

const images = [rotashow, waves, rotashow, travelers, goldlines, velocity]

const Logos = () => {
    return (
        <div className='my-24'>
            <p className="text-center text-xl">Thousands of teams worldwide are using Solo</p>
            <div className='flex justify-center gap-12 my-6 flex-wrap'>
                {
                    images.map((el, i) => (
                        <div className="min-w-96"><img src={el} alt="Company Logo" /></div>
                    ))
                }
            </div>
        </div>
    )
}

export default Logos
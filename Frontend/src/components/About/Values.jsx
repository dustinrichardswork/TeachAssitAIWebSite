import React from 'react'
// import Desktop from '../SVGs/Desktop'
// import Data from '../SVGs/Data'
// import Control from '../SVGs/Control'
// import Together from '../SVGs/Together'
// import Circle from '../SVGs/Circle'
// import Managment from '../SVGs/Managment'


// Icons
import transparent from '../../images/About/icons/transparent.png'
import responsiveness from '../../images/About/icons/responsive.png'
import personalization from '../../images/About/icons/personilization.png'
import empathy from '../../images/About/icons/empathy.png'
import contineous from '../../images/About/icons/continous-improvement.png'
import loyalty from '../../images/About/icons/loyalty.png'

const Values = () => {
    return (
        <div className='mt-16 md:mt-32'>
            <div

                className='grid grid-cols-1 md:grid-cols-3 rounded-3xl gap-y-20 gap-5 justify-items-center '>
                {
                    [
                        {
                            title: 'Transparency',
                            description: 'Being open and honest with customers about business practices and policies.',
                            icon: transparent
                        },
                        {
                            title: 'Responsiveness',
                            description: "Quickly and effectively addressing customer concerns and complaints.",
                            icon: responsiveness
                        },
                        {
                            title: "Personalization",
                            description: 'Tailoring products, services and experiences to meet individual customer needs and preferences.',
                            icon: personalization
                        },
                        {
                            title: "Empathy",
                            description: "Being able to understand and relate to customers' feelings, needs and expectations",
                            icon: empathy
                        },
                        {
                            title: "Continuous improvement",
                            description: 'Constantly seeking feedback from customers and working to improve the customer experience.',
                            icon: contineous
                        },
                        {
                            title: 'Loyalty',
                            description: 'Building long-term relationships with customers by consistently delivering value and a positive experience. ',
                            icon: loyalty                        }
                    ].map((el, i) => (

                        <div className={` max-w-[16rem] md:max-w-[14rem] flex flex-col items-center md:items-start gap-5`}>
                            <img src={el.icon} className=' w-20 h-20 relative -left-5 -bottom-5' alt="Values Icon" />
                            <h4 className='text-2xl font-semibold text-center md:text-start text-secondary'>{el.title}</h4>
                            <p className=' text-secondary text-center md:text-start rounded-full'>{el.description}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Values
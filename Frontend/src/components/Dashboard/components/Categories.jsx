import React, { useContext } from 'react'
import { ChatbotContext } from '../../../context/ChatbotContext'
import { useLocation, useNavigate } from 'react-router-dom';

const Categories = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { filterChatbots, selectedCategory } = useContext(ChatbotContext);


    const handleClick = (category) => {
        filterChatbots(category);

        if (!pathname.includes('chatbots')) {
            navigate('/user/dashboard/chatbots')
        }
    }

    function truncateString(str, limit) {
        if (str.length > limit) {
          return str.slice(0, limit) + "...";
        }
        return str;
      }
    return (
        <div className='my-5'>
            <div className='flex flex-row gap-4 flex-wrap'>
                {
                    [
                        "All",
                        "Lesson Planning",
                        "Student Engagement & Activity Ideas",
                        "Communication & Professional Learning",
                        "Digital Learning & Teaching Tools",
                        "Assessment & Progress Monitoring",
                        "Special Education & Inclusive Practice"
                    ].map((el, i) => (
                        <div
                            className={` min-w-min border border-secondary rounded-full px-3 cursor-pointer ${selectedCategory === el ? 'bg-black text-white' : ''}`}
                            onClick={() => handleClick(el)}
                        >
                            <p className={`${selectedCategory === el ? 'text-white' : ''}`}>
                                
                                {
                                    window.innerWidth > 780 ? (

                                        el
                                    ): (
                                        truncateString(el, 40)
                                    )
                                }
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
import { Link } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { useContext, useEffect } from "react"
import { UsageContext } from "../../../context/UsageContext"

const ProductivityItem = ({ el }) => {


       const { usage } = useContext(UsageContext)
    //'Detect AI-Writing & Plagiarism', 'Essay Grading'
    return (
        <>
            {
                ((usage?.plan == 'Free') && ([].includes(el?.title))) ? (
                    // <Link to={`/user/dashboard/chatbot/${el?.url ? el.url : ""}`} >
                    <div className={`flex flex-col gap-5 rounded-xl px-5 py-5 min-h-[250px] cursor-not-allowed`}
                        style={{
                            boxShadow: '0px 0px 38px -11px rgba(0,0,0,0.35)'
                        }}
                    >
                        <div className='flex gap-4'>
                            <img src={el.icon} className='h-16 w-16 rounded-xl' alt="bot icon" />
                            <div>
                                <h4 className='text-lg font-semibold text-secondary'>
                                    {el.title}
                                </h4>
                                <span>{el.name ? el.name : "Bob"}</span>
                            </div>
                        </div>
                        <p className='text-secondary'>{el.description}</p>
                    </div>
                    // </Link>
                ) : (
                    <Link to={`/user/dashboard/chatbot/${el?.url ? el.url : ""}`} >
                        <div className={`flex flex-col gap-5 rounded-xl px-5 py-5 min-h-[250px]`}
                            style={{
                                boxShadow: '0px 0px 38px -11px rgba(0,0,0,0.35)'
                            }}
                        >
                            <div className='flex gap-4'>
                                <img src={el.icon} className='h-16 w-16 rounded-xl' alt="bot icon" />
                                <div>
                                    <h4 className='text-lg font-semibold text-secondary'>
                                        {el.title}
                                    </h4>
                                    <span>{el.name ? el.name : "Bob"}</span>
                                </div>
                            </div>
                            <p className='text-secondary'>{el.description}</p>
                        </div>
                    </Link>
                )
            }

        </>
    )
}

export default ProductivityItem
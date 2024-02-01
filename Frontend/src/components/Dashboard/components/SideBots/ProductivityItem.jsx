import { Link, useLocation } from "react-router-dom"

const ProductivityItem = ({ el }) => {

    
    return (
        <Link to={`/user/dashboard/chatbot/${el?.url?el.url:""}`}>
            <div className={`flex flex-col gap-2 rounded-xl px-5 mx-1 py-3 mt-4`}
                style={{
                    boxShadow: '0px 0px 38px -11px rgba(0,0,0,0.35)'
                }}
            >
                <div className='flex gap-4'>
                    <img src={el.icon} className='h-10 w-10 rounded-xl' alt="bot icon" />
                    <div>
                        <h4 className='font-semibold text-secondary'>
                            {el.title}
                        </h4>
                        {/* <span>Bob</span> */}
                    </div>
                </div>
                <p className='text-secondary text-xs'>{el.description}</p>
            </div>
        </Link>
    )
}

export default ProductivityItem
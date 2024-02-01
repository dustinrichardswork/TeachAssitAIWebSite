const ProductivityItem = ({ el }) => {

    return (
        // <div className='flex gap-5 border-b-2 border-b-gray-300 mb-5 pb-5 animate-slideUp'>
        //     <img src={el.icon} alt="" />

        //     <div className='flex flex-col gap-6'>
        //         <h4 className='text-3xl font-semibold mb-3'>{el.title}</h4>
        //         <p className=' text-secondary opacity-50 text-xl'>{el.desc}</p>
        //     </div>
        // </div>
        <div className={`flex flex-col gap-5 rounded-xl px-5 py-5`}
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
                    <span>Bob</span>
                </div>
            </div>
            <p className='text-secondary'>{el.description}</p>
        </div>
    )
}

export default ProductivityItem
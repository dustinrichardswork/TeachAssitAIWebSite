import ProductivityItem from './ProductivityItem'
const Productivity = ({ chatbots }) => {

    return (
        <div className='flex flex-col my-5 px-4 md:px-0 gap-5 py-7'>


            <div className='grid grid-cols-1 md:grid-cols-3 gap-7'>
                {
                    chatbots.map((el, i) => (
                        <ProductivityItem el={el} key={i} />
                    ))
                }
            </div>
        </div>
    )
}

export default Productivity
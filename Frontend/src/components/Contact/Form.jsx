import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../util/api';
import { useNavigate } from 'react-router-dom';

const Form = () => {

    const navigate = useNavigate();
    const [_data, setData] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post('/contact', _data)

            setData({})
            console.log('data: ', data);
            navigate("/contact-submitted")
            // toast("Form Submitted");
        } catch (error) {
            console.log('Error: ', error.message);
            toast("Failed to submit");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <form onSubmit={handleSubmit} enctype="text/plain" className="space-y-4 md:space-y-8 border px-4 md:px-10 py-8 rounded-lg shadow-lg shadow-black-500 bg-white">

            <div className='flex flex-col md:flex-row gap-7 md:gap-10'>
                <div className='flex-1'>
                    <label for="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First Name</label>
                    <input 
                    type="text" 
                    name='firstName' 
                    onChange={handleChange} 
                    value={_data?.firstName}
                    id="firstName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="First Name" required />
                </div>
                <div className='flex-1'>
                    <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Name</label>
                    <input 
                    type="text" 
                    name='lastName'
                    value={_data?.lastName}
                    onChange={handleChange} id="lastName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Last Name" required />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-7 md:gap-10">
                <div className='flex-1'>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                    <input 
                    type="email" 
                    name='email' 
                    onChange={handleChange} 
                    value={_data?.email}
                    id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>
                {/* <div className='flex-1'>
                    <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone Number</label>
                    <input
                        type="phone"
                        name='phone'
                        value={_data?.phone}
                        onChange={handleChange}
                        id="phone"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="(201)-1234-1234" />
                </div> */}
            </div>
            <div className="sm:col-span-2">
                <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">How can We help you?</label>
                <textarea 
                id="message" 
                name='message' 
                value={_data?.message}
                onChange={handleChange} rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
            </div>
            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-secondary rounded-lg sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-300 border-2 hover:bg-dark hover:text-white border-dark">Send message</button>
        </form>
    )
}

export default Form
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../util/api';
import { useNavigate } from 'react-router-dom';

const EnterPriceForm = ({ setShowPop }) => {

    const navigate = useNavigate();
    const [_data, setData] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post('/enterprise/email', _data)

            setData({})
            console.log('data: ', data);
            setShowPop(false)
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
        <form onSubmit={handleSubmit} enctype="text/plain" className="space-y-8 border px-10 py-8 rounded-lg shadow-lg shadow-black-500 bg-white">

            <div className='flex flex-col md:flex-row gap-7 md:gap-10'>
                <div className='flex-1'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        School Name
                    </label>
                    <input
                        type="text"
                        name='schoolName'
                        onChange={handleChange}
                        value={_data?.schoolName}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Enter Your School Name" />
                </div>
                <div className='flex-1'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Your Name
                    </label>
                    <input
                        type="text"
                        name='personName'
                        value={_data?.personName}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Enter Your Name" />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-7 md:gap-3">
                <div className='flex-1'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                    <input
                        type="email"
                        name='email'
                        onChange={handleChange}
                        value={_data?.email}
                        id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@example.com" required />
                </div>
                <div className='flex-1'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Teachers
                    </label>
                    <input
                        type="number"
                        name='numberOfTeachers'
                        value={_data?.numberOfTeachers}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Enter Number of Teachers" />
                </div>
                {/* <div className='flex-1'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        School Type
                    </label>
                    <input
                        type="text"
                        name='schoolType'
                        value={_data?.schoolType}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Enter Your School Type" />
                </div> */}
            </div>
            <div className='flex flex-col md:flex-row gap-7 md:gap-10'>
                <div className='flex-1'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Grade Level
                    </label>
                    <input
                        type="text"
                        name='gradeLevelCovered'
                        onChange={handleChange}
                        value={_data?.gradeLevelCovered}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Enter Grades Covered" />
                </div>
                <div className='flex-1'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Prefered Plan Duration
                    </label>
                    <input
                        type="text"
                        name='preferedPlanDuration'
                        value={_data?.preferedPlanDuration}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Monthly or Yearly Subscription" />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                    Additional Features Required
                </label>
                <textarea
                    name='additionalFeaturesRequired'
                    value={_data?.additionalFeaturesRequired}
                    onChange={handleChange} rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Additional Features"></textarea>
            </div>
            <div className=' flex gap-5 items-center'>
                <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-secondary rounded-lg sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-300 border-2 hover:bg-dark hover:text-white border-dark">Send message</button>
                <button onClick={() => setShowPop(false)} className="py-3 px-5 text-sm font-medium text-center text-secondary rounded-lg sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-300 border-2 hover:bg-dark hover:text-white border-dark">Cancel</button>
            </div>
        </form>
    )
}

export default EnterPriceForm
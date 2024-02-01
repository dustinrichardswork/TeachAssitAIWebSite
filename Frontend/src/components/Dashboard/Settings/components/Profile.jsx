import React from 'react'

import Layout from '../Layout';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../../util/api';

const Profile = () => {

  const [userData, setUserData] = useState({});

  const { user, getUserData } = useContext(UserContext);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log('request_data: ', userData);



      const { data } = await api.put('/me', userData);
      getUserData()
      console.log('data: ', data);
      toast("Profile Updated!");
    } catch (error) {
      console.log("Error: ", error);
      toast("Profile Udpated Failed!")
    }
  }

  useEffect(() => {
    setUserData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      country: user?.country,
      emailUpdate: user?.emailUpdate
    })
  }, [])

  return (
    <Layout heading="My Details">
      <div>
        <form class="w-full max-w-lg" onSubmit={handleSubmit}>
          <div class="flex flex-wrap -mx-3 mb-6">

            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
              </label>
              <input
                onChange={handleChange}
                name='firstName'
                value={userData?.firstName}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
              {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>

            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
              </label>
              <input
                onChange={handleChange}
                name='lastName'
                value={userData?.lastName}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-2">
            {/* <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                City
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
            </div> */}

            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Country
              </label>
              <input
                onChange={handleChange}
                name='country'
                value={userData?.country}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Your Country" />
            </div>
          </div>
          <button className=' bg-blue-600 py-3 px-5 rounded text-white mt-4' type='submit'>Update Details</button>
        </form>
      </div>
    </Layout>
  )
}

export default Profile
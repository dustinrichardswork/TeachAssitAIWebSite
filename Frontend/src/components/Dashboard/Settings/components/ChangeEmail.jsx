import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../../../util/api';
import Layout from '../Layout';

const ChangeEmail = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    let data = {
      email,
      password
    }

    try {
      const res = await api.put('/changeEmail', data)
      toast("Email Changed");
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log('Error: ', error);
      toast("Error While changing the Email!")
    }
  }


  return (
    <Layout heading="Change Email Address">
      <div>
        <div class="flex flex-wrap -mx-3 w-8/12">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Email
            </label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="Enter Your New Email" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 w-8/12">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Confirm Password
            </label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Your Password" />
          </div>
        </div>

        <button onClick={handleSubmit} className=' bg-blue-600 py-3 px-5 rounded text-white mt-4' type='submit'>Change Email Address</button>

      </div>
    </Layout>
  )
}

export default ChangeEmail
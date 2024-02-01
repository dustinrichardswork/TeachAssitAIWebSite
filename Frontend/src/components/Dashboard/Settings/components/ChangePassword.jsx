import React from 'react'
import Layout from '../Layout'
import { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../../../util/api'

const ChangePassword = () => {

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const hanldeSubmit = async () => {


    if (newPassword !== confirmNewPassword) {
      toast("New Password Must repeat same");
      return;
    }

    let data = {
      currentPassword,
      newPassword,
      confirmNewPassword
    }
    try {
      const res = await api.put("/changepassword", data);
      toast("password changed!")
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } catch (error) {
      console.log('Error: ', error);
      toast("Error While Password Change");
    }

  }
  return (
    <Layout heading="Change Password">
      <div class="flex flex-wrap -mx-3 mb-6 w-8/12">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Current Password
          </label>
          <input onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Current Password" />
          {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 w-8/12">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            New Password
          </label>
          <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="New Password" />
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 w-8/12">
        <div class="w-full px-3">
          <input onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Confirm Password" />
          {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
        </div>
      </div>

      <button onClick={hanldeSubmit} className=' bg-blue-600 py-3 px-5 rounded text-white mt-4' type='submit'>Change Password</button>
    </Layout>
  )
}

export default ChangePassword